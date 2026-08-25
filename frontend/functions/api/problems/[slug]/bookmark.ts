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

    // Check if bookmarked
    const existing = await env.DB.prepare(
      'SELECT 1 FROM user_bookmarks WHERE user_id = ? AND problem_id = ?'
    )
      .bind(userId, problem.id)
      .first();

    let bookmarked = false;

    if (existing) {
      // Remove bookmark
      await env.DB.prepare('DELETE FROM user_bookmarks WHERE user_id = ? AND problem_id = ?')
        .bind(userId, problem.id)
        .run();
      bookmarked = false;
    } else {
      // Add bookmark
      await env.DB.prepare('INSERT INTO user_bookmarks (user_id, problem_id) VALUES (?, ?)')
        .bind(userId, problem.id)
        .run();
      bookmarked = true;
    }

    return new Response(JSON.stringify({ bookmarked }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Bookmark toggle error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error toggling bookmark' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
