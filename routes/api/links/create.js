import {createLink} from '../../../models/linksController.js';
import randomstring from 'randomstring';

export default async function create(req, res){
    try{
        const shortenedUrlCode = randomstring.generate(5)

        await createLink(res.locals.jwtDecoded.email, shortenedUrlCode, req.body.url)

        res.json({ shortened: shortenedUrlCode, original: req.body.url })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}