import { verifyJWT } from './utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

// GET /api/progress - Retrieve logged-in user's progress
export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7);
    const payload = await verifyJWT(token, env.JWT_SECRET || 'fallback-secret-key');

    if (!payload) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid session' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch user progress
    const progress = await env.DB.prepare(
      'SELECT completed_modules FROM user_progress WHERE user_id = ?'
    )
      .bind(payload.sub)
      .first<{ completed_modules: string }>();

    let completedModules: string[] = [];
    if (progress && progress.completed_modules) {
      try {
        completedModules = JSON.parse(progress.completed_modules);
      } catch {
        completedModules = [];
      }
    }

    return new Response(JSON.stringify({ completedModules }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Fetch progress error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error fetching progress' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// POST /api/progress - Update logged-in user's progress
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized: No token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7);
    const payload = await verifyJWT(token, env.JWT_SECRET || 'fallback-secret-key');

    if (!payload) {
      return new Response(JSON.stringify({ error: 'Unauthorized: Invalid session' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Parse request body
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { completedModules } = body;
    if (!Array.isArray(completedModules)) {
      return new Response(JSON.stringify({ error: 'completedModules must be an array of strings' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Serialize array
    const completedModulesJson = JSON.stringify(completedModules);

    // Upsert user progress
    await env.DB.prepare(
      `INSERT INTO user_progress (user_id, completed_modules, updated_at) 
       VALUES (?, ?, CURRENT_TIMESTAMP) 
       ON CONFLICT(user_id) 
       DO UPDATE SET completed_modules = excluded.completed_modules, updated_at = CURRENT_TIMESTAMP`
    )
      .bind(payload.sub, completedModulesJson)
      .run();

    return new Response(JSON.stringify({ success: true, completedModules }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Update progress error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error updating progress' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
