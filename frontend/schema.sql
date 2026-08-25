-- Cloudflare D1 Schema for DSA Learning Vault

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS user_progress (
  user_id INTEGER PRIMARY KEY,
  completed_modules TEXT NOT NULL, -- Stored as a JSON array of strings, e.g., '["01-Arrays-and-Strings"]'
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS problems (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  difficulty TEXT NOT NULL, -- 'Easy', 'Medium', 'Hard'
  acceptance_rate REAL DEFAULT 0.0,
  tags TEXT NOT NULL, -- JSON array of strings, e.g., '["Arrays", "Two Pointers"]'
  description TEXT NOT NULL,
  examples TEXT NOT NULL, -- JSON array of objects: '[{"input": "...", "output": "...", "explanation": "..."}]'
  constraints TEXT NOT NULL, -- JSON array of strings
  hints TEXT NOT NULL, -- JSON array of strings
  sample_test_cases TEXT NOT NULL, -- JSON array of objects: '[{"input": "...", "expected_output": "..."}]'
  hidden_test_cases TEXT NOT NULL, -- JSON array of objects: '[{"input": "...", "expected_output": "..."}]'
  starter_code TEXT NOT NULL -- JSON object mapping lang to code snippet: '{"python": "...", "javascript": "...", ...}'
);

CREATE TABLE IF NOT EXISTS submissions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  problem_id INTEGER,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  status TEXT NOT NULL, -- 'Accepted', 'Wrong Answer', 'Time Limit Exceeded', 'Runtime Error', 'Compilation Error'
  runtime INTEGER, -- in ms
  memory REAL, -- in MB
  error_message TEXT,
  passed_cases INTEGER,
  total_cases INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_bookmarks (
  user_id INTEGER,
  problem_id INTEGER,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, problem_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS code_drafts (
  user_id INTEGER,
  problem_id INTEGER,
  language TEXT NOT NULL,
  code TEXT NOT NULL,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, problem_id, language),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE
);

