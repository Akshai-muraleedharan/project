
import jwt from 'jsonwebtoken'

export const authAdmin =  (req,res,next) => {

  try {
    const {token} = req.cookies

    
    

    if(!token){
        return res.status(400).json({success:false,message:"admin has no token"}) 
    }
    
    const verifiedToken =  jwt.verify(token, process.env.JWT_KEY);

    

    if(!verifiedToken){
        res.status(400).json({success:false,message:"admin not athenticated"})
    }
     
    if (verifiedToken.role !==  "admin") {
      return res.status(400).json({ message: "admin not authenticated" });
  }
     

    req.admin = verifiedToken;
 
    next()
  } catch (error) {
    console.log(error);
    
  }
    

} 