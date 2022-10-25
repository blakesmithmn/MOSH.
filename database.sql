
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!





CREATE TABLE "user"(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "first_name" VARCHAR (1000) NOT NULL,
    "last_name" VARCHAR (1000) NOT NULL,
    "zipcode" NUMERIC NOT NULL,
    "color" VARCHAR NOT NULL,
    "admin" BOOLEAN DEFAULT FALSE,
    "about_me" VARCHAR (240),
    "profile_picture" VARCHAR (1000),
    "inserted_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
	"updated_at" TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- EVENTS TABLE
-- STILL NEEDS DATETIME

CREATE TABLE "events" (
	"id" INT NOT NULL PRIMARY KEY,
	"image" VARCHAR NOT NULL,
	"event_name" VARCHAR (150) NOT NULL,
	"event_venue" VARCHAR (150) NOT NULL,
	"event_artist" VARCHAR (150) NOT NULL,
	"event_datetime" TIMESTAMP,
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


-- want user.id user.
SELECT * from "user"
         JOIN users_events
                ON "user".id = users_events.user_id
         JOIN events
                ON users_events.event_id = events.id
            WHERE "user".id = 6;
            
            
SELECT * from "events"
            WHERE events."API_key" = 5825128;
            
DELETE from "users_events"
            WHERE "event_id" = 13 AND "user_id" = 6;
            
            
SELECT * from "event_comments"
		JOIN "user"
			ON user_id = "user".id
		JOIN "events" 
			ON event_id = "events".id
		WHERE "API_key" = 5723791;

INSERT INTO "event_comments"
	("user_id", "event_id", "comment")
	VALUES
	('6','5825128','test comment from Blake - love the knocks!'),
	('7','5825128','comment from test dummy ... cant make it to the knocks');

SELECT "user_id", "event_id", "status" FROM "events"
	JOIN "users_events"
		ON events.id = users_events.event_id
	JOIN "user"
		ON users_events.id = "user".id
	WHERE users_events.event_id = 5659749;

-- SQL CHECKING EVENT STATUS 
SELECT "user_id", "event_id", "status" FROM "users_events"
                JOIN "user"
                    ON users_events.user_id = "user".id
            WHERE users_events.event_id = 5830427 AND users_events.user_id = 1;
            
SELECT "user_id", "event_id", "status" FROM "user"
	JOIN "users_events"
		ON "user".id = users_events.user;
		
SELECT "user_id", "event_id", "comment", "username", "first_name","last_name","color" from "event_comments"
		JOIN "user"
			ON user_id = "user".id
		JOIN "events" 
			ON event_id = "events".id
		WHERE "events".id = 5679907;
		
SELECT * from "user"
        JOIN users_events
           ON "user".id = users_events.user_id
        JOIN events
           ON users_events.event_id = events.id
        WHERE "user".id = 1
        ORDER BY events.event_datetime;
