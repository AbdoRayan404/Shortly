import jwt from 'jsonwebtoken';

/**
 * Validates the JWT token in the cookies 
*/
export default async function validate(req, res, next){
    try{
        try{
            var isValid = jwt.verify(rqe.cookies.JWT_TOKEN, process.env.JWT_SECRET)
        }catch(err){
            var isValid = null
        }

        if(!isValid){
            return res.sendStatus(401)
        }

        next()
    }catch(err){
        console.log(err)
        res.sendStatus(500)
    }
}