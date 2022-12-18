import {pool} from './database.js';

/**
 * Fetch the data of a specific user's account using JWT-Token
 * @param {String} token - user's token
 * @param {Object} - user object
*/
export async function inspectUserByToken(token){
    const user = await pool.query('SELECT * FROM users WHERE token = $1', [token])

    return user.rows[0]
}

/**
 * Fetch the data of a specific user's account using email
 * @param {String} email - email of the account
 * @param {Object} - user object
*/
export async function inspectUserByEmail(email){
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email])

    return user.rows[0]
}

/**
 * Registers new user in the users table
 * @param {String} email - user's email
 * @param {String} username - user's profile username
 * @param {String} password - user's password
*/
export async function createUser(email, username, password){
    const currentDate = new Date(Date.now())
    currentDate.setSeconds(0, 0)

    await pool.query('INSERT INTO users(email, username, password, created_at) VALUES($1, $2, $3, $4)', [email, username, password, currentDate.toUTCString()])
}

/**
 * Updates user's profile data
 * @param {String} email - user's email
 * @param {String} username - user's username
*/
export async function updateProfile(email, username, profilePicture = 'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg'){
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
export async function createFeedback(name, email, subject){
    await pool.query('INSERT INTO feedbacks(name, email, subject) VALUES($1, $2, $3)', [name, email, subject])
}