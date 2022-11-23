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
 * Inserts new user in the users table
 * @param {String} email - user's email
 * @param {String} password - user's password
 * @param {String} salt - password salt
*/
export async function createUser(email, password, salt){
    await pool.query('INSERT INTO users(email, password, salt) VALUES($1, $2, $3)', [email, password, salt])
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
 * Creates new Link in the database
 * @param {String} shortened - the shortened version
 * @param {String} original - the original version of the url
*/
export async function create(shortened, original){
    const link = await pool.query('INSERT INTO links(shortened, original) VALUES($1, $2)', [shortened, original])

    if(link.rowCount == 0){
        throw new Error('was not able to create new link', { cause: 'LinksHandler' })
    }
}

/**
 * Fetch original and id of a link using shortened code
 * @param {String} shortened - the shortened code
*/
export async function inspect(shortened){
    const link = await pool.query('SELECT id, original FROM links WHERE shortened = $1', [shortened])

    return link.rows[0]
}


/**
 * Inserts a visit to a specific link
 * @param {String} shortened - the shortened code
 * @param {String} ip - visit ip
 * @param {String} country - visit country
 * @param {String} device - visit device
 * @param {String} browser - visit browser
 * @param {String} os - visit operating system
 * @param {Date} visitedAt - visit date, default is now()
*/
export async function addVisit(shortened, ip, country, device, browser, os, visitedAt = new Date(Date.now()).toDateString()){
    const visit = await pool.query(
        'INSERT INTO visits(link, ip, country, device, browser, os, clickedAt) '+
        'VALUES($1, $2, $3, $4, $5, $6, $7)', 
        [shortened, ip, country, device, browser, os, visitedAt]
        )
}