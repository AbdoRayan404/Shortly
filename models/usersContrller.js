import {pool} from './database.js';

/**
 * Fetch the data of a specific user's account using JWT-Token
 * @param {String} token - user's token
 * @param {Object} - user object
*/
export async function inspectToken(token){
    let data = await pool.query('SELECT * FROM users WHERE token = $1', [token])

    return data.rows[0]
}

/**
 * Fetch the data of a specific user's account using email
 * @param {String} email - email of the account
 * @param {Object} - user object
*/
export async function inspectUser(email){
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    return user.rows[0]
}

/**
 * Registers new user in the users table
 * @param {String} email - user's email
 * @param {String} username - user's profile username
 * @param {String} password - user's password
 * @param {String} salt - password salt
*/
export async function createUser(email, username, password, salt){
    await pool.query('INSERT INTO users(email, username, password, salt, created_at) VALUES($1, $2, $3, $4, $5)', [email, username, password, salt, new Date(Date.now()).toDateString()])
}

/**
 * Updates user's profile data
 * @param {String} email - user's email
 * @param {String} username - user's username
 * @param {String} profilePicture - user's profile picture
*/
export async function updateProfile(email, username, profilePicture){
    await pool.query('UPDATE users SET username = $1, profile_picture = $2 WHERE email = $3', [username, profilePicture, email])
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
 * Inserts new feedback in the feedback table
 * @param {String} name - name of the feedback
 * @param {String} email - email of the feedback sender
 * @param {String} subject - feedback subject
*/
export async function addFeedback(name, email, subject){
    await pool.query('INSERT INTO feedbacks(name, email, subject) VALUES($1, $2, $3)', [name, email, subject])
}