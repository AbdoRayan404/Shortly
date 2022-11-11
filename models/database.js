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
pool.query(
    'CREATE TABLE IF NOT EXISTS users( '+
    'id bigserial PRIMARY KEY, '+
    'email varchar UNIQUE, '+
    'password varchar NOT NULL, '+
    'salt varchar NOT NULL) '
    )
pool.query(
    'CREATE TABLE IF NOT EXISTS links( '+
    'id bigserial PRIMARY KEY, '+
    'owned_by integer REFERENCES users(id), '+
    'shortened varchar NOT NULL, '+
    'original varchar NOT NULL, '+
    'clicks integer)'
)