
import jwt from 'jsonwebtoken'

export const authUser =  (req,res,next) => {

  try {
    const {token} = req.cookies


    if(!token){
        return res.status(400).json({success:false,message:"user has no token"}) 
    }
    
    const verifiedToken =  jwt.verify(token, process.env.JWT_KEY);

    if(!verifiedToken){
        res.status(400).json({success:false,message:"user not athenticated"})
    }
     
    
    req.user = verifiedToken;

    next()
  } catch (error) {
    console.log(error);
    
  }
    

} 