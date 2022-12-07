import { inspectUser } from './../../../models/usersContrller.js'

export default async function inspect(req, res){
    try{
        let user = await inspectUser(req.body.decoded.email)

        res.json({ user })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}