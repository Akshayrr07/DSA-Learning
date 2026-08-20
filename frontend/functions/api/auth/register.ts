import { hashPassword, signJWT } from '../utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    
    // Parse JSON body
    let body: any;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { email, password } = body;

    // Validate inputs
    if (!email || !password) {
      return new Response(JSON.stringify({ error: 'Email and password are required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address format' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (password.length < 6) {
      return new Response(JSON.stringify({ error: 'Password must be at least 6 characters long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Check if user already exists
    const existingUser = await env.DB.prepare('SELECT id FROM users WHERE email = ?')
      .bind(email.toLowerCase().trim())
      .first();

    if (existingUser) {
      return new Response(JSON.stringify({ error: 'An account with this email already exists' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Insert user and return details
    const newUser = await env.DB.prepare(
      'INSERT INTO users (email, password_hash) VALUES (?, ?) RETURNING id, email'
    )
      .bind(email.toLowerCase().trim(), passwordHash)
      .first<{ id: number; email: string }>();

    if (!newUser) {
      throw new Error('Database failed to create new user');
    }

    // Initialize user progress
    await env.DB.prepare(
      'INSERT INTO user_progress (user_id, completed_modules) VALUES (?, ?)'
    )
      .bind(newUser.id, '[]')
      .run();

    // Generate JWT (expires in 7 days)
    const payload = {
      sub: newUser.id,
      email: newUser.email,
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60
    };

    const token = await signJWT(payload, env.JWT_SECRET || 'fallback-secret-key');

    return new Response(
      JSON.stringify({
        token,
        user: {
          id: newUser.id,
          email: newUser.email
        }
      }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error during registration' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
