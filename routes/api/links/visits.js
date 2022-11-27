import { inspectVisits, doesOwn } from "../../../models/linksController.js";

export default async function visits(req, res){
    try{
        let isOwned = await doesOwn(req.body.decoded.email, req.body.link)
        if(isOwned == false){
            return res.sendStatus(403)
        }
        
        let visits = await inspectVisits(req.body.link)

        res.json({ visits })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}