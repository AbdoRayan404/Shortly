import {inspectUser, createUser} from '../../../models/usersContrller.js';
import bcrypt from 'bcrypt';

export default async function register(req, res){
    let emailRegex = /^.{1,}@.{1,}\.[A-z]{1,}$/
    let passwordRegex = /^.{8,32}$/

    try{
        let isEmailValid = emailRegex.test(req.body.email)
        let isPasswordValid = passwordRegex.test(req.body.password)

        if(!isEmailValid || !isPasswordValid){
            return res.status(400).send('Email or password is not valid')
        }


        let user = await inspectUser(req.body.email)

        if(user){
            return res.status(400).send('This email is already used')
        }

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(req.body.password, salt)

        await createUser(req.body.email, hashedPassword, salt)

        res.send('Account Created Successfully')
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}