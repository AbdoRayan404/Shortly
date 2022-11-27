import {inspectUser, createUser} from '../../../models/usersContrller.js';
import bcrypt from 'bcrypt';

export default async function register(req, res){
    try{
        let user = await inspectUser(req.body.email)

        if(user){
            return res.status(400).json({ error: 'this email is already used' })
        }

        let salt = await bcrypt.genSalt(10)
        let hashedPassword = await bcrypt.hash(req.body.password, salt)

        await createUser(req.body.email, hashedPassword, salt)

        res.json({ success: 'Created account successfully' })
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}