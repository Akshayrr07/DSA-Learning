import { verifyJWT } from '../utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const url = new URL(request.url);
    const difficultyParam = url.searchParams.get('difficulty');
    const tagParam = url.searchParams.get('tag');
    const searchParam = url.searchParams.get('search');

    // Optional authentication check
    const authHeader = request.headers.get('Authorization');
    let userId: number | null = null;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = await verifyJWT(token, env.JWT_SECRET || 'fallback-secret-key');
      if (payload) {
        userId = Number(payload.sub);
      }
    }

    // Query D1
    let query: string;
    let params: any[] = [];

    if (userId !== null) {
      query = `
        SELECT p.id, p.title, p.slug, p.difficulty, p.acceptance_rate, p.tags,
               EXISTS(SELECT 1 FROM submissions s WHERE s.user_id = ? AND s.problem_id = p.id AND s.status = 'Accepted') as solved,
               EXISTS(SELECT 1 FROM user_bookmarks b WHERE b.user_id = ? AND b.problem_id = p.id) as bookmarked
        FROM problems p
      `;
      params.push(userId, userId);
    } else {
      query = `
        SELECT p.id, p.title, p.slug, p.difficulty, p.acceptance_rate, p.tags,
               0 as solved,
               0 as bookmarked
        FROM problems p
      `;
    }

    const { results } = await env.DB.prepare(query).bind(...params).all<any>();

    // Parse and filter results in JS
    let problems = results.map(p => {
      let tags: string[] = [];
      try {
        tags = JSON.parse(p.tags);
      } catch {
        tags = [];
      }
      return {
        ...p,
        tags,
        solved: Boolean(p.solved),
        bookmarked: Boolean(p.bookmarked)
      };
    });

    if (difficultyParam) {
      problems = problems.filter(p => p.difficulty.toLowerCase() === difficultyParam.toLowerCase());
    }

    if (tagParam) {
      problems = problems.filter(p => p.tags.some((t: string) => t.toLowerCase() === tagParam.toLowerCase()));
    }

    if (searchParam) {
      const searchLower = searchParam.toLowerCase();
      problems = problems.filter(p => 
        p.title.toLowerCase().includes(searchLower) || 
        p.tags.some((t: string) => t.toLowerCase().includes(searchLower))
      );
    }

    return new Response(JSON.stringify({ problems }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('List problems error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error listing problems' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
