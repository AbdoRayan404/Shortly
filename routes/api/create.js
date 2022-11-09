const LinksHandler = require('../../models/LinksHandler')
const randomstring = require('randomstring')

async function create(req, res){
    try{
        let shortened = randomstring.generate(5)

        await LinksHandler.create(shortened, req.body.url)

        res.json({ shortened: shortened, original: req.body.url })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = create