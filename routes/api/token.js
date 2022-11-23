import { inspectToken } from '../../models/linksController.js';
import jwt from 'jsonwebtoken';

export default async function token(req, res){
    try{
        try{
            var verified = jwt.verify(req.body.token, process.env.JWT_SECRET, {})
        }catch(err){
            var verified = null
        }

        if(!verified){
            return res.status(400).json({ error: 'token is invalid' })
        }

        let token = await inspectToken(req.body.token)

        if(!token){
            return res.status(400).json({ error: 'token is invalid, please relogin'})
        }

        let newToken = jwt.sign({ email: verified.email, password: verified.password }, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'})

        res.setHeader('set-cookie', [`JWT_TOKEN=${newToken}; httponly`])
        res.sendStatus(200)
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}