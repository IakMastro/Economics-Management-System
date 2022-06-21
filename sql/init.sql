CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT,
  created DATE DEFAULT CURRENT_DATE,
  isActive BOOLEAN DEFAULT true
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES users(id),
  categoryId INTEGER,
  cost FLOAT,
  date DATE DEFAULT CURRENT_DATE
);

INSERT INTO users (name) VALUES ('Test');