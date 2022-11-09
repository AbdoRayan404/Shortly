const pool = require('./database')


/**
 * Creates new Link in the database
 * @param {String} shortened - the shortened version
 * @param {String} original - the original version of the url
*/
async function create(shortened, original){
    const link = await pool.query('INSERT INTO link(shortened, original) VALUES($1, $2)', [shortened, original])

    if(link.rowCount == 0){
        throw new Error('was not able to create new link', { cause: 'LinksHandler' })
    }
}

/**
 * Fetch original url using shortened code
 * @param {String} shortened - the shortened code
*/
async function inspect(shortened){
    const link = await pool.query('SELECT original FROM link WHERE shortened = $1', [shortened])

    return link.rows[0].original
}

module.exports = { create, inspect }