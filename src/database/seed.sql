-- Ensure using the right database and schema
\c postgres;
SET search_path TO public;

-- Reset programs table (clear all data)
TRUNCATE TABLE programs RESTART IDENTITY CASCADE;

-- Insert sample program
INSERT INTO programs (title, description)
VALUES ('JavaScript Fundamentals', 'Learn the basics of JavaScript programming.');
