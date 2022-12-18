import { inspectUserByEmail } from './../../../models/usersContrller.js'

export default async function inspect(req, res){
    try{
        const {email, username, profile_picture} = await inspectUserByEmail(res.locals.jwtDecoded.email)

        res.json({ email, username, profile_picture })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}