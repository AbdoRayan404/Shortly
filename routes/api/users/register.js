import {inspectUserByEmail, createUser} from '../../../models/usersContrller.js';
import bcrypt from 'bcrypt';

export default async function register(req, res){
    try{
        const user = await inspectUserByEmail(req.body.email)

        if(user){
            return res.status(400).json({ error: 'This email is already used' })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        await createUser(req.body.email, res.locals.username, hashedPassword)

        res.json({email: req.body.email, username: res.locals.username})
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}