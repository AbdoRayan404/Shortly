import { inspectLinksByEmail } from "../../../models/linksController.js";

export default async function inspect(req, res){
    try{
        let links = await inspectLinksByEmail(req.body.decoded.email)

        res.json({ links })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}