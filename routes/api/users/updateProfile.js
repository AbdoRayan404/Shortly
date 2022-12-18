import { updateProfile } from "../../../models/usersContrller.js";

export default async function update(req, res){
    try{
        const MINIMUM_USERNAME_LENGTH = 5

        if(req.body.username.length < MINIMUM_USERNAME_LENGTH){
            return res.status(400).json({ error: 'username is too small' })
        }

        await updateProfile(res.locals.jwtDecoded.email, req.body.username, req.body.profilePicture)

        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}