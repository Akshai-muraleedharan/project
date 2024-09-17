
import jwt from 'jsonwebtoken'

export const authOwner =  (req,res,next) => {

  try {
    const {token} = req.cookies

    
    

    if(!token){
        return res.status(400).json({success:false,message:"user has no token"}) 
    }
    
    const verifiedToken =  jwt.verify(token, process.env.JWT_KEY);

    

    if(!verifiedToken){
        res.status(400).json({success:false,message:"user not athenticated"})
    }
     
    if (verifiedToken.role !==  "owner") {
      return res.status(400).json({ message: "owner not authenticated" });
  }
     
    req.owner = verifiedToken;

    next()
  } catch (error) {
    console.log(error);
    
  }
    

} 