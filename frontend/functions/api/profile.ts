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

    // 1. Solved counts by difficulty
    const solvedCountsQuery = await env.DB.prepare(`
      SELECT p.difficulty, COUNT(DISTINCT s.problem_id) as count
      FROM submissions s
      JOIN problems p ON s.problem_id = p.id
      WHERE s.user_id = ? AND s.status = 'Accepted'
      GROUP BY p.difficulty
    `)
      .bind(userId)
      .all<{ difficulty: string; count: number }>();

    // 2. Total problems count by difficulty
    const totalCountsQuery = await env.DB.prepare(`
      SELECT difficulty, COUNT(*) as count
      FROM problems
      GROUP BY difficulty
    `).all<{ difficulty: string; count: number }>();

    // 3. Bookmarked problems list
    const bookmarksQuery = await env.DB.prepare(`
      SELECT p.id, p.title, p.slug, p.difficulty, p.acceptance_rate
      FROM user_bookmarks b
      JOIN problems p ON b.problem_id = p.id
      WHERE b.user_id = ?
    `)
      .bind(userId)
      .all<any>();

    // 4. Heatmap activity (last 365 days of submissions)
    const activityQuery = await env.DB.prepare(`
      SELECT date(created_at) as date, COUNT(*) as count
      FROM submissions
      WHERE user_id = ? AND created_at >= date('now', '-365 days')
      GROUP BY date(created_at)
    `)
      .bind(userId)
      .all<{ date: string; count: number }>();

    // 5. Skill tags based on solved problems
    const solvedTagsQuery = await env.DB.prepare(`
      SELECT DISTINCT p.tags
      FROM submissions s
      JOIN problems p ON s.problem_id = p.id
      WHERE s.user_id = ? AND s.status = 'Accepted'
    `)
      .bind(userId)
      .all<{ tags: string }>();

    const skillTags: Record<string, number> = {};
    if (solvedTagsQuery.results) {
      for (const row of solvedTagsQuery.results) {
        try {
          const tags = JSON.parse(row.tags) as string[];
          for (const t of tags) {
            skillTags[t] = (skillTags[t] || 0) + 1;
          }
        } catch {}
      }
    }

    // Format final structure
    const difficultyStats = {
      Easy: { solved: 0, total: 0 },
      Medium: { solved: 0, total: 0 },
      Hard: { solved: 0, total: 0 }
    };

    if (totalCountsQuery.results) {
      for (const row of totalCountsQuery.results) {
        const diff = row.difficulty as 'Easy' | 'Medium' | 'Hard';
        if (difficultyStats[diff]) {
          difficultyStats[diff].total = row.count;
        }
      }
    }

    if (solvedCountsQuery.results) {
      for (const row of solvedCountsQuery.results) {
        const diff = row.difficulty as 'Easy' | 'Medium' | 'Hard';
        if (difficultyStats[diff]) {
          difficultyStats[diff].solved = row.count;
        }
      }
    }

    const activityHeatmap: Record<string, number> = {};
    if (activityQuery.results) {
      for (const row of activityQuery.results) {
        if (row.date) {
          activityHeatmap[row.date] = row.count;
        }
      }
    }

    return new Response(
      JSON.stringify({
        difficultyStats,
        bookmarks: bookmarksQuery.results || [],
        activityHeatmap,
        skillTags
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error: any) {
    console.error('Fetch profile stats error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error fetching profile stats' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
