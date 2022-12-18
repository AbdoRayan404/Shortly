import { inspectUserByEmail } from '../../models/usersContrller.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const validator = (validatorFn) => {
    return async (req, res, next) => {

        const isValid = await validatorFn(req, res)
        if(isValid !== true) return res.status(isValid.status).json({ error: isValid.message })
    
        next()
    }
}

export function JWTValidator(req, res){
    try{
        jwt.verify(req.cookies.JWT_TOKEN, process.env.JWT_SECRET)
        res.locals.jwtDecoded = jwt.decode(req.cookies.JWT_TOKEN)

        return true
    }catch(err){
        return {status: 401, message: 'JWT is invalid'}
    }
}

export function UrlValidator(req){
    if(!req.body.url) return {status: 400, message: 'no url was provided'}

    if(/^((https:\/\/)|(www\.)).*\..*$/g.test(req.body.url) == false) return {status: 400, message: 'url is invalid'}

    if(/^www\..*\..*$/.test(req.body.url)){
        req.body.url = `https://${req.body.url}`
    }

    return true
}

export async function loginCredentialsValidator(req){
    if(!req.body.email || !req.body.password) return {status: 400, message: 'You should provide email and password'}

    const user = await inspectUserByEmail(req.body.email)

    if(!user) return {status: 400, message: 'Email or password is incorrect'}

    //Password check
    const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
    
    if(isPasswordCorrect == false) return {status: 400, message: 'Email or password is incorrect'}

    return true
}

export function registerInputValidator(req, res){
    const emailRegex = /^.{1,}@.{1,}\.[A-z]{1,}$/
    const passwordRegex = /^.{8,32}$/

    let isEmailValid = emailRegex.test(req.body.email)
    let isPasswordValid = passwordRegex.test(req.body.password)

    if(!isEmailValid || !isPasswordValid) return {status: 400, message: 'Email or Password is not valid'}

    const MINIMUM_USERNAME_LENGTH = 5

    res.locals.username = req.body.email.split('@')[0].split('')
    while(res.locals.username.length < MINIMUM_USERNAME_LENGTH){
        res.locals.username.push(Math.floor(Math.random() * 9))
    }

    res.locals.username = res.locals.username.join('')
    
    return true
}