import { verifyJWT } from './utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

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

    const userId = Number(payload.sub);

    // Query D1 database for user submissions
    const { results } = await env.DB.prepare(`
      SELECT s.id, s.problem_id, s.language, s.code, s.status, s.runtime, s.memory, 
             s.error_message, s.passed_cases, s.total_cases, s.created_at,
             p.title as problem_title, p.slug as problem_slug, p.difficulty as problem_difficulty
      FROM submissions s 
      JOIN problems p ON s.problem_id = p.id
      WHERE s.user_id = ?
      ORDER BY s.created_at DESC
    `)
      .bind(userId)
      .all<any>();

    return new Response(JSON.stringify({ submissions: results || [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Fetch submissions list error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error fetching submissions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
