import {pool} from './database.js';

/**
 * Creates new Link in the database
 * @param {String} userEmail - user's email
 * @param {String} shortened - the shortened version
 * @param {String} original - the original version of the url
*/
export async function createLink(userEmail, shortened, original){
    const link = await pool.query('INSERT INTO links(owned_by, shortened, original, created_at) VALUES($1, $2, $3, $4)', [userEmail, shortened, original, new Date(Date.now()).toDateString()])

    if(link.rowCount == 0){
        throw new Error('was not able to create new link', { cause: 'LinksHandler' })
    }
}

/**
 * Fetch the data of a link using shortened code
 * @param {String} shortened - the shortened code
*/
export async function inspectLink(shortened){
    const link = await pool.query('SELECT * FROM links WHERE shortened = $1', [shortened])

    return link.rows[0]
}

/**
 * Fetch all links associated with a specific user, NOTE: links object will include visits count
 * @param {String} email - the user email
*/
export async function inspectLinksByEmail(email){
    const links = await pool.query(
        'SELECT count(v.link)::INTEGER as visits, l.original, l.shortened, l.created_at FROM links l '+
        'JOIN visits v ON v."link" = l.shortened '+
        'WHERE l.owned_by = $1'+
        'GROUP BY l.original, l.shortened, l.created_at',
        [email])

    return links.rows
}

/**
 * Fetch all visits data associated with a specific shortened url
 * @param {String} shortened - shortened url code
*/
export async function inspectVisits(shortened){
    const visits = await pool.query(
        'SELECT visits.country, visits.device, visits.browser, visits.os, visits.visited_at FROM visits '+
        'WHERE visits.link = $1',
        [shortened])

    return visits.rows
}

/**
 * Return true if user own a specific link, false if not
 * @param {String} email - user's email
 * @param {String} shortened - shortened url code
*/
export async function doesOwn(email, shortened){
    const link = await pool.query('SELECT original FROM links WHERE owned_by = $1 AND shortened = $2', [email, shortened])

    if(link.rowCount == 1){
        return true
    }else{
        return false
    } 
}
/**
 * Inserts a visit to a specific link in the visits table
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
        'INSERT INTO visits(link, ip, country, device, browser, os, visited_at) '+
        'VALUES($1, $2, $3, $4, $5, $6, $7)', 
        [shortened, ip, country, device, browser, os, visitedAt]
        )
}