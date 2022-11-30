import {pool} from './database.js';

/**
 * Fetch a row using token
 * @param {String} token - user's token
*/
export async function inspectToken(token){
    let data = await pool.query('SELECT * FROM users WHERE token = $1', [token])

    return data.rows[0]
}


/**
 * Updates a specific user's token
 * @param {String} email - user's email
 * @param {String} token - JWT token
*/
export async function updateToken(email, token){
    await pool.query('UPDATE users SET token = $1 WHERE email = $2', [token, email])
}

/**
 * Registers new user in the users table
 * @param {String} email - user's email
 * @param {String} password - user's password
 * @param {String} salt - password salt
*/
export async function createUser(email, password, salt){
    await pool.query('INSERT INTO users(email, password, salt, created_at) VALUES($1, $2, $3, $4)', [email, password, salt, new Date(Date.now()).toDateString()])
}


/**
 * Fetch the data of a specific user's account using email
 * @param {String} email - email of the account
*/
export async function inspectUser(email){
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    return user.rows[0]
}

/**
 * Inserts new feedback in the feedback table
 * @param {String} name - name of the feedback
 * @param {String} email - email of the feedback sender
 * @param {String} subject - feedback subject
*/
export async function addFeedback(name, email, subject){
    await pool.query('INSERT INTO feedbacks(name, email, subject) VALUES($1, $2, $3)', [name, email, subject])
}