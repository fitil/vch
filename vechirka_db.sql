DROP DATABASE IF EXISTS vechirka_db;
CREATE DATABASE vechirka_db;

\c vechirka_db;

CREATE TABLE news (
  nid SERIAL PRIMARY KEY,
  uid INTEGER,
  status INTEGER,
  created VARCHAR,
  changed VARCHAR,
  body_value TEXT,
  body_summary TEXT
);

INSERT INTO news (uid, status, created, changed)
  VALUES (1, 1, 1383519788, 1383519788);

CREATE TABLE files (
  fid SERIAL PRIMARY KEY,
  uid INTEGER,
  uri VARCHAR(255),
  filemime VARCHAR(255),
  created VARCHAR
);

CREATE TABLE users (
  uid SERIAL PRIMARY KEY,
  username VARCHAR(60),
  name VARCHAR(60),
  password VARCHAR(128),
  email VARCHAR(128),
  created VARCHAR,
  access VARCHAR
);

CREATE TABLE users_roles (
  uid INTEGER,
  rid INTEGER
);

CREATE TABLE roles (
  rid SERIAL PRIMARY KEY,
  name VARCHAR(64)
);