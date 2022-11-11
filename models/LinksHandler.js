import {pool} from './database.js';

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
 * Fetch original url using shortened code
 * @param {String} shortened - the shortened code
*/
export async function inspect(shortened){
    const link = await pool.query('SELECT original FROM links WHERE shortened = $1', [shortened])

    return link.rows[0].original
}