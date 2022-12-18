import { inspectUserByToken } from '../../../models/usersContrller.js';
import jwt from 'jsonwebtoken';

/**
 * Creates new temporary JWT token using the Refresh token
*/
export default async function token(req, res){
    try{
        try{
            var verified = jwt.verify(req.body.token, process.env.JWT_REFRESH_SECRET)
        }catch(err){
            return res.status(400).json({ error: 'token is invalid' })
        }

        let token = await inspectUserByToken(req.body.token)

        if(!token){
            return res.status(400).json({ error: 'token is invalid, please relogin'})
        }

        let newToken = jwt.sign({ email: verified.email }, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'})

        res.cookie('JWT_TOKEN', newToken, {httpOnly: true, secure: true})

        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}