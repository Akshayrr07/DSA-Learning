import { verifyJWT } from '../utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'No authorization token provided' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer '
    const payload = await verifyJWT(token, env.JWT_SECRET || 'fallback-secret-key');

    if (!payload) {
      return new Response(JSON.stringify({ error: 'Invalid or expired token' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Verify user exists in the database
    const user = await env.DB.prepare('SELECT id, email FROM users WHERE id = ?')
      .bind(payload.sub)
      .first<{ id: number; email: string }>();

    if (!user) {
      return new Response(JSON.stringify({ error: 'User account no longer exists' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(
      JSON.stringify({
        user: {
          id: user.id,
          email: user.email
        }
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Session validation error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error during session validation' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
