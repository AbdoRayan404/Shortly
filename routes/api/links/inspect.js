import { inspectLinksByEmail } from "../../../models/linksController.js";

export default async function inspect(req, res){
    try{
        const links = await inspectLinksByEmail(res.locals.jwtDecoded.email)

        res.json({ links })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}