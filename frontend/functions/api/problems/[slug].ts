import { verifyJWT } from '../utils/auth';

interface Env {
  DB: D1Database;
  JWT_SECRET: string;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  try {
    const { env, params, request } = context;
    const slug = params.slug as string;

    if (!slug) {
      return new Response(JSON.stringify({ error: 'Problem slug is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch problem details
    const problem = await env.DB.prepare('SELECT * FROM problems WHERE slug = ?')
      .bind(slug)
      .first<any>();

    if (!problem) {
      return new Response(JSON.stringify({ error: 'Problem not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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

    // Fetch user bookmarks and code drafts if logged in
    let bookmarked = false;
    let drafts: Record<string, string> = {};

    if (userId !== null) {
      // Check bookmark
      const bookmarkResult = await env.DB.prepare(
        'SELECT 1 FROM user_bookmarks WHERE user_id = ? AND problem_id = ?'
      )
        .bind(userId, problem.id)
        .first();
      bookmarked = !!bookmarkResult;

      // Fetch code drafts
      const draftResults = await env.DB.prepare(
        'SELECT language, code FROM code_drafts WHERE user_id = ? AND problem_id = ?'
      )
        .bind(userId, problem.id)
        .all<{ language: string; code: string }>();

      if (draftResults.results) {
        for (const row of draftResults.results) {
          drafts[row.language] = row.code;
        }
      }
    }

    // Parse JSON columns
    let parsedTags = [];
    let parsedExamples = [];
    let parsedConstraints = [];
    let parsedHints = [];
    let parsedSampleTestCases = [];
    let parsedStarterCode = {};

    try { parsedTags = JSON.parse(problem.tags); } catch {}
    try { parsedExamples = JSON.parse(problem.examples); } catch {}
    try { parsedConstraints = JSON.parse(problem.constraints); } catch {}
    try { parsedHints = JSON.parse(problem.hints); } catch {}
    try { parsedSampleTestCases = JSON.parse(problem.sample_test_cases); } catch {}
    try { parsedStarterCode = JSON.parse(problem.starter_code); } catch {}

    const responseData = {
      problem: {
        id: problem.id,
        title: problem.title,
        slug: problem.slug,
        difficulty: problem.difficulty,
        acceptance_rate: problem.acceptance_rate,
        tags: parsedTags,
        description: problem.description,
        examples: parsedExamples,
        constraints: parsedConstraints,
        hints: parsedHints,
        sample_test_cases: parsedSampleTestCases,
        starter_code: parsedStarterCode,
      },
      bookmarked,
      drafts
    };

    return new Response(JSON.stringify(responseData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Fetch problem details error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error fetching problem details' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
