import jwt from 'jsonwebtoken';

/**
 * Validates the JWT token in the cookies 
*/
export default async function validate(req, res, next){
    try{
        jwt.verify(req.cookies.JWT_TOKEN, process.env.JWT_SECRET)
        req.body.decoded = jwt.decode(req.cookies.JWT_TOKEN)

        next()
    }catch(err){
        return res.sendStatus(401)
    }
}