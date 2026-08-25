import { verifyJWT } from '../../utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { env, params, request } = context;
    const slug = params.slug as string;

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

    const userId = Number(payload.sub);

    // Get problem ID
    const problem = await env.DB.prepare('SELECT id FROM problems WHERE slug = ?')
      .bind(slug)
      .first<{ id: number }>();

    if (!problem) {
      return new Response(JSON.stringify({ error: 'Problem not found' }), {
        status: 404,
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

    const { language, code } = body;
    if (!language || code === undefined) {
      return new Response(JSON.stringify({ error: 'Language and code are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Upsert code draft
    await env.DB.prepare(
      `INSERT INTO code_drafts (user_id, problem_id, language, code, updated_at) 
       VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
       ON CONFLICT(user_id, problem_id, language) 
       DO UPDATE SET code = excluded.code, updated_at = CURRENT_TIMESTAMP`
    )
      .bind(userId, problem.id, language, code)
      .run();

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Save draft error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error saving code draft' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { env, params, request } = context;
    const slug = params.slug as string;

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

    const userId = Number(payload.sub);

    // Get problem ID
    const problem = await env.DB.prepare('SELECT id FROM problems WHERE slug = ?')
      .bind(slug)
      .first<{ id: number }>();

    if (!problem) {
      return new Response(JSON.stringify({ error: 'Problem not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch drafts
    const draftResults = await env.DB.prepare(
      'SELECT language, code FROM code_drafts WHERE user_id = ? AND problem_id = ?'
    )
      .bind(userId, problem.id)
      .all<{ language: string; code: string }>();

    const drafts: Record<string, string> = {};
    if (draftResults.results) {
      for (const row of draftResults.results) {
        drafts[row.language] = row.code;
      }
    }

    return new Response(JSON.stringify({ drafts }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Fetch drafts error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error fetching code drafts' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
