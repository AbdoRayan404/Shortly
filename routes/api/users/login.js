import { inspectUser, updateToken } from '../../../models/usersContrller.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function login(req, res){
    try{
        let user = await inspectUser(req.body.email)

        if(!user){
            return res.status(400).send('Email or password is incorrect')
        }

        //Password check
        let isCorrect = await bcrypt.compare(req.body.password, user.password)
        
        if(isCorrect == false){
            return res.status(400).send('Email or password is incorrect')
        }

        let token = jwt.sign({email: user.email, password: user.password}, process.env.JWT_SECRET, {algorithm: 'HS256', expiresIn: '1d'})
        let refreshToken = jwt.sign({email: user.email, password: user.password}, process.env.JWT_REFRESH_SECRET, {algorithm: 'HS256'})

        await updateToken(user.email, refreshToken)

        res.setHeader('set-cookie', [`JWT_TOKEN=${token}; max-age=86400; httponly; samesite=lax; path=/`])
        res.json({ refreshToken })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}