
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "zipcode" NUMERIC NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE,
    "about_me" VARCHAR (240),
    "profile_picture" VARCHAR (1000),
    "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- EVENTS TABLE
-- STILL NEEDS DATETIME

CREATE TABLE "events" (
	"id" SERIAL PRIMARY KEY,
	"event_id" NUMERIC NOT NULL,
	"event_name" VARCHAR (150) NOT NULL,
	"event_venue" VARCHAR (150) NOT NULL,
	"event_artist" VARCHAR (150) NOT NULL,
	"event_date" DATE,
	"event_time" TIMESTAMPTZ,
	"event_description" VARCHAR (500),
	"ticket_link" VARCHAR NOT NULL,
	"inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- USER / EVENTS JUNCTION TABLE


CREATE TABLE "users_events" (
  "id" SERIAL PRIMARY KEY,
  "user_id" INT REFERENCES "user" NOT NULL,
  "event_id" INT REFERENCES "events" NOT NULL,
  "status" BOOLEAN DEFAULT FALSE
);

CREATE TABLE "event_comments" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"event_id" INT REFERENCES "events" NOT NULL,
	"comment" VARCHAR NOT NULL,
	"inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE "friends"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"friend_id" INT REFERENCES "user" NOT NULL,
	"friend_status" BOOLEAN DEFAULT FALSE
	);
	
CREATE TABLE "genres"(
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR NOT NULL
	);
	
CREATE TABLE "users_genres"(
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user" NOT NULL,
	"genre_id" INT REFERENCES "genres" NOT NULL
	);

