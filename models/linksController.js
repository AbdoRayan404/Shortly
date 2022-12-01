import {pool} from './database.js';

/**
 * Creates new Link in the database
 * @param {String} userEmail - user's email
 * @param {String} shortened - the shortened version
 * @param {String} original - the original version of the url
*/
export async function createLink(userEmail, shortened, original){
    await pool.query('INSERT INTO links(owned_by, shortened, original, created_at) VALUES($1, $2, $3, $4)', [userEmail, shortened, original, new Date(Date.now()).toDateString()])
}

/**
 * Fetch the data of a link using shortened code
 * @param {String} shortened - the shortened code
 * @param {Object} - link object
*/
export async function inspectLink(shortened){
    const link = await pool.query('SELECT * FROM links WHERE shortened = $1', [shortened])

    return link.rows[0]
}

/**
 * Fetch all links associated with a specific user, NOTE: links object will include visits count
 * @param {String} email - the user email
 * @param {Object[]} - link objects
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
 * @param {Object} - contains statistics array & timestamps array
*/
export async function inspectVisits(shortened){
    const statistics = await pool.query(
        'SELECT \'os\' AS Type, os AS Value, count(*) AS visits from visits WHERE link = $1 GROUP BY os '+
        'UNION ALL '+
        'SELECT \'country\' AS Type, country AS Value, count(*) AS visits from visits WHERE link = $1 GROUP BY country '+
        'UNION ALL '+
        'SELECT \'browser\' AS Type, browser AS Value, count(*) AS visits from visits WHERE link = $1 GROUP BY browser '+
        'UNION ALL '+
        'SELECT \'device\' AS Type, device AS Value, count(*) AS visits from visits WHERE link = $1 GROUP BY device '+
        'UNION ALL '+
        'SELECT \'referer\' AS Type, referer AS Value, count(*) AS visits from visits WHERE link = $1 GROUP BY referer ',
        [shortened]
    )

    const timestamps = await pool.query(
        'SELECT visited_at, count(*) AS visists FROM visits WHERE link = $1 GROUP BY visited_at',[shortened]
    )

    return {statistics: statistics.rows, timestamps: timestamps.rows}
}

/**
 * Check if a user owns the shortened url specified
 * @param {String} email - user's email
 * @param {String} shortened - shortened url code
 * @return {Boolean} - yes or no
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
 * @param {Object} details - ip, visit date, headers data, user agent, country.
*/
export async function addVisit(shortened,  details){
    await pool.query(
        'INSERT INTO visits(link, ip, visited_at, country, device, browser, os, referer) '+
        'VALUES($1, $2, $3, $4, $5, $6, $7, $8)', 
        [shortened, details.ip, details.date, details.country, details.device, details.browser, details.os, details.referer]
        )
}