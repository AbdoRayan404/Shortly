import {create as createLink} from '../../models/LinksHandler.js';
import randomstring from 'randomstring';

export async function create(req, res){
    try{
        let regex = /^((https:\/\/)|(www\.)).*\..*$/g

        if(regex.test(req.body.url) == false){
            return res.sendStatus(400)
        }

        if(/^www\..*\..*$/.test(req.body.url)){
            req.body.url = `https://${req.body.url}`
        }

        let shortened = randomstring.generate(5)

        await createLink(shortened, req.body.url)

        res.json({ shortened: shortened, original: req.body.url })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}