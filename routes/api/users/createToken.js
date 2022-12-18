import { updateToken } from '../../../models/usersContrller.js';
import jwt from 'jsonwebtoken';

export default async function createToken(req, res){
    try{
        const token = jwt.sign({email: req.body.email}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'})
        const refreshToken = jwt.sign({email: req.body.email}, process.env.JWT_REFRESH_SECRET, {algorithm: 'HS256'})

        await updateToken(req.body.email, refreshToken)

        res.cookie('JWT_TOKEN', token, {httpOnly: true, secure: true})

        res.json({ refreshToken })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}