import { createFeedback } from "../../../models/usersContrller.js";

export default async function feedback(req, res){
    try{
        await createFeedback(req.body.name, req.body.email, req.body.subject)

        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}