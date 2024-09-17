import OwnerModel from '../models/theaterOwnerModel.js'
import otpGenerator from 'otp-generator'
import { createToken } from '../utils/generateToken.js'
import { cloudinaryInstance } from '../config/cloudneryConfig.js'
import { hashPassword } from '../utils/hashedPassword.js'
import { matchPassword } from '../utils/comparePassword.js'
import OtpModel from '../models/otpModel.js'
import TheaterModel from '../models/theaterModel.js'
import NewMovieModel from '../models/newMovieModel.js'


export const ownerSignup = async (req,res) => {
    try {
       
        const {username,email,password,profilePic, mobile} = req.body
                  
    
        const userExist = await OwnerModel.findOne({email})
        
        if(userExist){
            return res.status(400).json({success:false,message:"user already exist"})
            
        }
        
        const hashedPassword = hashPassword(password);

        const NewOwner = new OwnerModel({username,email,password:hashedPassword,profilePic,mobile}) 
        await NewOwner.save()

        const token = createToken(email,"owner")
 
        res.cookie('token',token,{
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        
        res.status(200).json({success:true,message:"owner signup successfully"})
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    } 
}



export const ownerLogin = async (req,res,next) => {
    try {
        const {email,password} = req.body

        const ownerExist = await OwnerModel.findOne({email})
        
       

        if(!ownerExist ){
            return res.status(400).json({success:false,message:"owner doesn't exist"})
            
        }
        
        const deletedOwner = ownerExist.ownerDeleted

        if (deletedOwner == true) {
          return res.status(400).json({ success: false, message: "owner doesn't exist" });
        }

        const PasswordValue = ownerExist.password

        const passwordMatch = matchPassword(password,PasswordValue)

        if(!passwordMatch){
            return res.status(400).json({success:false,message:"invalid password"})
        }
        
        const token = createToken(email,"owner")
 
        res.cookie('token',token,{
          sameSite: "None",
          secure: true,
          httpOnly: true,
        })
        
        res.status(200).json({success:true,message:"owner login successfully"})
    } catch (error) {
      
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
}


export const ownerUpdate = async (req,res)=>{
    try {
        
        const verifiedOwner = req.owner.email;
        const {username,mobile,email} =req.body
        let image;

        const owner = await OwnerModel.findOne({email:verifiedOwner})



        if(!req.file ){
            image = 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
        }else{
            image = req.file.path
        }
        const uploadResult = await cloudinaryInstance.uploader.upload(image,{folder:'movie ticket application/owner profile'})
          
       
        const updatedData = await OwnerModel.findOneAndUpdate(owner,{
            username,
            profilePic:uploadResult.url,
            mobile,
            email
        },{new:true})

        await updatedData.save()

        res.json({success:true,message:'successfully updated',data:updatedData})

    } catch (error) {
      res.status(error.status || 500).json({message:error || "internal server error"})
    }
}

 
export const ownerProfile= async (req,res,next) => {
    try {
       const verifiedOwner = req.owner.email;
       
       const ownerProfileData = await OwnerModel.findOne({email:verifiedOwner}).select('-password')
  
        
       if(!ownerProfileData){
       return res.status(400).json({success:false,message:"no account"})
       }
    
       res.status(200).json({success:true,message:"fetched successfully",data:ownerProfileData})
       
       
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export const ownerLogout= async (req,res,next) => {
    try {
           
        res.clearCookie('token')

        res.json({success:true,message:"owner logout"})
       
       
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 

export const checkOwner= async (req,res,next) => {
    try {
       
      const verifiedOwner = req.owner;
      
      if(!verifiedOwner){
      return  res.status(400).json({success:false,message:"owner not authenticated"})
      }
      res.json({success:true,message:"owner authenticatd",})
     
        
    } catch (error) {
        console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
       
        
    }
} 


export const ownerDelete = async (req,res) => {

    try {

       const verifiedOwner = req.owner.email;
       const {theaterId} = req.params
   console.log(theaterId)
        const accountExist = await OwnerModel.findOne({email:verifiedOwner})

        if(!accountExist){
            return res.status(400).json({success:false,message:"your account could not delete now"})
        }else{
            res.clearCookie('token')
            await OwnerModel.findOneAndDelete({email:verifiedOwner})
            await TheaterModel.findOneAndDelete({Ownermail:verifiedOwner})
            await NewMovieModel.findOneAndDelete({theaterId:theaterId})
            res.json({success:true,message:"your account deleted successfully"}) 
        }

      
    } catch (error) {
      console.log(error)
        res.status(error.status || 500).json({message:error || "internal server error"})
    }

}

//  owner get all
export const ownerGetALL = async (req, res) => {
  try {
    const OwnerGetAll = await OwnerModel.find({ownerDeleted:false});

    const ownerLength = OwnerGetAll.length;

    res.json({ success: true, message:"data fetched",data:OwnerGetAll, ownerLength: ownerLength });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};


// admin soft delete start


export const ownerSoftDelete = async (req, res) => {
    try {
  
      
      const verifiedOwner = req.owner.email;
  
      if (!verifiedOwner) {
        return res.status(400).json({ error: "User not authenticated" });
      }
      const ownerExist = await OwnerModel.findOne({ email: verifiedOwner });
  
      const ownerDelete = await OwnerModel.findOneAndUpdate( ownerExist,{ ownerDeleted: true,}, { new: true });
      res.clearCookie("token");
      await ownerDelete.save();
  
      res.json({success:true,message:"owner soft delete successfully"  });
    } catch (error) {
      console.log(error)
      res.status(error.status || 500) .json({ message: error || "internal server error" });
    }
  }; 
  
  export const ownerOtpGenerate = async (req, res) => {
    try {
      const { mobile } = req.body;
  
    const validMobile = await OwnerModel.findOne({ mobile });
  
    if (!validMobile) {
      return res.status(200).json({ success: false, message: "invalid number" });
    }
    const otp = otpGenerator.generate(6, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false,});
  
    const generatedOtp = await OtpModel({mobile,otp:otp})
  
    await generatedOtp.save()
  
    res.json({success:true,message:"otp generated successfull",data:generatedOtp})
    } catch (error) {
      console.log(error)
      res .status(error.status || 500).json({ message: error || "internal server error" });
    }
  
  };
  
  export const ownerAccoutRestore = async (req, res) => {
    try {
      const { mobile,otp} = req.body;
       if(!mobile || !otp) return res.json({success:false,message:"all fields required"})
        
       const validOtp =await OtpModel.findOne({mobile,otp})
  
  
      if (!validOtp) {
        return res.status(200).json({ success: false, message: "invalid otp" });
      }else{
        const accountRestore = await OwnerModel.findOneAndUpdate({mobile},{
            ownerDeleted: false,
        },{new:true})
        await accountRestore.save(); 
      }
  
      res.json({success:true,message:"your account restore successfully",})
    } catch (error) {
      console.log(error)
      res .status(error.status || 500).json({ message: error || "internal server error" });
    }
  };
  
  // admin soft delete and account-restore end 