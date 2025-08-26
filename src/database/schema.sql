-- Ensure using the right database and schema
\c postgres;
SET search_path TO public;

-- Drop tables if exist (order matters because of foreign keys)
DROP TABLE IF EXISTS submissions CASCADE;
DROP TABLE IF EXISTS challenges CASCADE;
DROP TABLE IF EXISTS progress CASCADE;
DROP TABLE IF EXISTS lessons CASCADE;
DROP TABLE IF EXISTS resources CASCADE;
DROP TABLE IF EXISTS courses CASCADE;
DROP TABLE IF EXISTS enrollments CASCADE;
DROP TABLE IF EXISTS programs CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Users
CREATE TABLE users
(
    user_id       SERIAL PRIMARY KEY,
    email         TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    role          TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Programs
CREATE TABLE programs
(
    program_id  SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    description TEXT
);

-- Enrollments
CREATE TABLE enrollments
(
    enrollment_id SERIAL PRIMARY KEY,
    user_id       INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    program_id    INT NOT NULL REFERENCES programs (program_id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses
(
    course_id   SERIAL PRIMARY KEY,
    program_id  INT  NOT NULL REFERENCES programs (program_id) ON DELETE CASCADE,
    title       TEXT NOT NULL,
    description TEXT
);

-- Lessons
CREATE TABLE lessons
(
    lesson_id    SERIAL PRIMARY KEY,
    course_id    INT  NOT NULL REFERENCES courses (course_id) ON DELETE CASCADE,
    title        TEXT NOT NULL,
    content      TEXT,
    order_index  INT,
    duration     INT,
    video_url    TEXT
);

-- Progress
CREATE TABLE progress
(
    progress_id   SERIAL PRIMARY KEY,
    user_id       INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    lesson_id     INT NOT NULL REFERENCES lessons (lesson_id) ON DELETE CASCADE,
    completed     BOOLEAN DEFAULT FALSE,
    updated_at    TIMESTAMPTZ DEFAULT NOW(),
    completed_at  TIMESTAMPTZ
);

-- Resources
CREATE TABLE resources
(
    resource_id SERIAL PRIMARY KEY,
    title       TEXT NOT NULL,
    url         TEXT NOT NULL,
    category    TEXT
);

-- Challenges
CREATE TABLE challenges
(
    challenge_id SERIAL PRIMARY KEY,
    title        TEXT NOT NULL,
    description  TEXT,
    difficulty   TEXT
);

-- Submissions
CREATE TABLE submissions
(
    submission_id SERIAL PRIMARY KEY,
    challenge_id  INT NOT NULL REFERENCES challenges (challenge_id) ON DELETE CASCADE,
    user_id       INT NOT NULL REFERENCES users (user_id) ON DELETE CASCADE,
    solution_url  TEXT,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);
