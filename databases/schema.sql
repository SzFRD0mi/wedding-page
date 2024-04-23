CREATE TABLE submissions (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  name TEXT UNIQUE NOT NULL,
  attend TEXT NOT NULL,
  allergies TEXT,
  partner_name TEXT,
  partner_allergies TEXT,
  accommodation TEXT
)