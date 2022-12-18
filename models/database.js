import pg from 'pg';

//configs
const {POSTGRES_USER, POSTGRES_HOST, POSTGRES_DATABASE_NAME, POSTGRES_PASSWORD, POSTGRES_PORT} = process.env

export const pool = new pg.Pool({
    user: POSTGRES_USER,
    host: POSTGRES_HOST,
    database: POSTGRES_DATABASE_NAME,
    port: Number(POSTGRES_PORT)
})

//TABLES creation
await pool.query(
    'CREATE TABLE IF NOT EXISTS users( '+
    'email varchar PRIMARY KEY, '+
    'username varchar NOT NULL, '+
    'profile_picture varchar NOT NULL DEFAULT \'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg\', '+
    'password varchar NOT NULL, '+
    'token varchar, '+
    'created_at timestamp NOT NULL )'
    )

await pool.query(
    'CREATE TABLE IF NOT EXISTS links( '+
    'shortened varchar NOT NULL PRIMARY KEY, '+
    'original varchar NOT NULL, '+
    'owned_by varchar REFERENCES users(email) NOT NULL, '+
    'created_at date NOT NULL )'
)

await pool.query(
    'CREATE TABLE IF NOT EXISTS visits('+
    'id bigserial PRIMARY KEY, '+
    'link varchar REFERENCES links(shortened) NOT NULL, '+
    'visited_at timestamp NOT NULL, '+
    'ip varchar, '+
    'country varchar, '+
    'device varchar, '+
    'browser varchar, '+
    'os varchar, '+
    'referer varchar )'
    )

await pool.query(
    'CREATE TABLE IF NOT EXISTS feedbacks('+
    'id bigserial PRIMARY KEY, '+
    'name varchar, '+
    'email varchar, '+
    'subject varchar)'
)