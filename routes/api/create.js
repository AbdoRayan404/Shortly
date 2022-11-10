const LinksHandler = require('../../models/LinksHandler')
const randomstring = require('randomstring')

async function create(req, res){
    try{
        let regex = /^((https:\/\/)|(www\.)).*\..*$/g

        if(regex.test(req.body.url) == false){
            return res.sendStatus(400)
        }

        if(/^www\..*\..*$/.test(req.body.url)){
            req.body.url = `https://${req.body.url}`
        }

        let shortened = randomstring.generate(5)

        await LinksHandler.create(shortened, req.body.url)

        res.json({ shortened: shortened, original: req.body.url })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}

module.exports = create