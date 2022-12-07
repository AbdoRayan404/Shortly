import { updateProfile } from "../../../models/usersContrller.js";

export default async function update(req, res){
    try{
        if(req.body.username.length < 5){
            return res.status(400).send('username is too small')
        }

        await updateProfile(req.body.decoded.email, req.body.username, req.body.profilePicture)

        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}