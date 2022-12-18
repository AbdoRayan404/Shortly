import { doesOwn, inspectLinkByCode } from "../../../models/linksController.js";

export default async function visits(req, res){
    try{
        const isOwned = await doesOwn(res.locals.jwtDecoded.email, req.body.shortenedCode)

        if(!isOwned){
            return res.sendStatus(403).json({ error: 'You does not have access to this shortened url' })
        }
        
        const visits = await inspectLinkByCode(req.body.shortenedCode)

        res.json({ visits })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}