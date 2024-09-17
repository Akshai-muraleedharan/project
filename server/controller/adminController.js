

import { createToken } from "../utils/generateToken.js";
import AdminModel from "../models/adminModel.js";
import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import { hashPassword } from "../utils/hashedPassword.js";
import { matchPassword } from "../utils/comparePassword.js";
import otpGenerator from "otp-generator";
import OtpModel from "../models/otpModel.js";
import UserModel from "../models/userModel.js";
import OwnerModel from "../models/theaterOwnerModel.js";


// admin signup
export const adminSignup = async (req, res) => {
  try {

    const { username, email, password, profilePic,mobile } = req.body;


    // check for admin already exist
    const adminExist = await AdminModel.findOne({ email });

    if (adminExist) {
      return res.status(400).json({ success: false, message: "admin already exist" });
    }

    // to check the admin account in db to set maximum admin
    const totalAdmin = await AdminModel.find();
    const adminLength = totalAdmin.length + 1;

    if (adminLength > 4) {
      return res.status(400).json({ success: false, message: "maximum number of admins added" });
    }

    // This hashing password before save in db 
    const hashedPassword = hashPassword(password);

    // To save data to db
    const NewAdmin = new AdminModel({
      username,
      email,
      password: hashedPassword,
      profilePic,
      
      mobile
    });
    await NewAdmin.save();

    // Token creation for authentication and set role 
    const token = createToken(email, "admin");

    // created token save in cookies in frontend
    res.cookie("token", token,{
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "admin signup successfully" });
  } catch (error) {
   
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin login
export const adminLogin = async (req, res, next) => {
  try {
        
    // data from client-side
        const { email, password } = req.body;

        // to check the data is empty
        if (!email || !password) {
          return res .status(400).json({ success: false, message: "All fields are required" });
        }

        // to find the admin account exist
        const adminExist = await AdminModel.findOne({ email });

      
        if (!adminExist ) {
          return res .status(400) .json({ success: false, message: "admin doesn't exist" });
        }
          // To check the admin is soft delete
        const deletedAdmin = adminExist.adminDeleted

        if (deletedAdmin == true) {
          return res.status(400).json({ success: false, message: "admin doesn't exist" });
        }

        const PasswordValue = adminExist.password

        // To forward the password for compare for login
        const passwordMatch = matchPassword(password,PasswordValue)
        
        if (!passwordMatch) {
          return res .status(400) .json({ success: false, message: "invalid password" });
        }

        // Token create for  authentication and set role 
        const token = createToken(email, "admin");

        // created token save in cookies in frontend
        res.cookie("token", token,{
          sameSite: "None",
          secure: true,
          httpOnly: true,
        });

        res .status(200) .json({ success: true, message: "admin login successfully" });
  } catch (error) {
   
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};


export const adminGet = async(req,res) => {
  try {
    const adminFetch = await AdminModel.find();

    if(!adminFetch){
      return res.status(400).json({success:false,message:"could not fetch"})
    }

     res.json({success:true,message:"fetched successfully", data:adminFetch})
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
}


// admin profile updation
export const adminUpdate = async (req, res) => {
    try {
      const { username,email } = req.body;
      const  verifiedAdmin  = req.admin.email;
      let image;

      
      // This condition for check the update profile-pic
      if (!req.file) {
        image ="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
      } else {
        image = req.file.path;
      }

        // The profile pic uplods cloudinary
      const uploadResult = await cloudinaryInstance.uploader
        .upload(image, { folder: "movie ticket application/admin profile" })
        .catch((error) => {
          res.status(error.status|| 400).json(error.message ||  "cloudinary server error")
        });
        
        // update the admin profile
      await AdminModel.findOneAndUpdate({email:verifiedAdmin},{ username, profilePic: uploadResult.url,email},{ new: true });

      res.json({success: true,message: "updated successessfully", });
    } catch (error) {
      res.status(error.status || 500).json({ message: error || "internal server error" });
    }
};

// admin profile
export const adminProfile = async (req, res, next) => {
  try {

    const  verifiedAdmin  = req.admin.email;

      //  to find the acccount for fetching
    const adminProfileData = await AdminModel.findOne({email:verifiedAdmin}).select( "-password");

    if (!adminProfileData) {
      return res.status(400).json({ success: false, message: "no account" });
    }

    res.json({ success: true, message: "data fetched" ,data:adminProfileData });
  } catch (error) {
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin logout
export const adminLogout = async (req, res, next) => {
  try {
   
  
    // to clear cookie
    res.clearCookie("token");
    res.json({ success: true, message: "admin logout" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin authentication check
export const checkAdmin = async (req, res, next) => {
  try {
    // to check admin authenticate this value from token verification
    const verifiedAdmin = req.admin;

    if (!verifiedAdmin) {
      return res.status(400).json({ success: false, message: "admin not authenticated" });
    }
    res.json({ success: true, message: "admin authenticatd" });
  } catch (error) {
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin hard delete
export const adminDelete = async (req, res) => {
  try {
    const verifiedAdmin = req.admin.email;
    //  account exist for delete
    const accountExist = await AdminModel.findOne({email:verifiedAdmin});

    if (!accountExist) {
      return res .status(400).json({ success: false, message: "your account could not delete now" });
    } else {
      // delete the account
      await AdminModel.findOneAndDelete({email:verifiedAdmin});
      res.clearCookie("token");
      res.json({ success: true, message: "your account deleted successfully" });
    }
  } catch (error) {
    res .status(error.status || 500) .json({ message: error || "internal server error" });
  }
};

// admin soft delete 
export const adminSoftDelete = async (req, res) => {
  try {

    
    const verifiedAdmin = req.admin.email;

    if (!verifiedAdmin) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    const adminExist = await AdminModel.findOne({ email: verifiedAdmin });

    // admin account could not delete permenant to change the value adminDeleted = true
    const userDelete = await AdminModel.findOneAndUpdate( adminExist,{ adminDeleted: true,}, { new: true });
    res.clearCookie("token");
    await userDelete.save();

    res.json({success:true,message:"user delete successfully"  });
  } catch (error) {
    console.log(error)
    res.status(error.status || 500) .json({ message: error || "internal server error" });
  }
}; 

// otp generate
export const adminOtpGenerate = async (req, res) => {
  try {
    const { mobile } = req.body;
    
// the mobile number for check admin exist
  const validMobile = await AdminModel.findOne({ mobile });

  if (!validMobile) {
    return res.status(200).json({ success: false, message: "invalid number" });
  }
  // the otp generate is a package 
  const otp = otpGenerator.generate(6, {digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false,});

  const generatedOtp = await OtpModel({mobile,otp:otp})

  await generatedOtp.save()

  res.json({success:true,message:"otp generated successfull",data:generatedOtp})
  } catch (error) {
    
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }

};

export const adminAccoutRestore = async (req, res) => {
  try {
    
    
    const { mobile,otp} = req.body;

     if(!mobile || !otp) return res.json({success:false,message:"all fields required"})
      
     const validOtp =await OtpModel.findOne({mobile,otp})


    if (!validOtp) {
      return res.status(200).json({ success: false, message: "invalid otp" });
    }else{
      //  admin account  to change the value adminDeleted = false
      const accountRestore = await AdminModel.findOneAndUpdate({mobile},{ adminDeleted: false, },{new:true})
      await accountRestore.save(); 
    }

    res.json({success:true,message:"your account restore successfully"})
  } catch (error) {
    console.log(error)
    res .status(error.status || 500).json({ message: error || "internal server error" });
  }
};

// admin soft delete and account-restore end 




// user delete by admin
export const userDeleteByAdmin = async (req, res) => {
  try {
   
      const {id} = req.params 

      if(!id){
        return res.status(200).json({success:false,message:"id not get"})
      }
    
    await UserModel.findByIdAndDelete(id);
    res.json({ success: true, message: "user deleted successfully" });
    
    
  } catch (error) {
   
    res.status(error.status || 500).json({ message: error || "internal server error" });
  }

}


 export const AdminTheaterOwnerDelete = async (req,res) => {
 
  try {

     const {id} =req.params
 
      await OwnerModel.findByIdAndDelete(id)
 
      res.json({ success: true, message: "theater owner deleted successfully" });

  } catch (error) {
      res.status(error.status || 500).json({message:error || "internal server error"})
  }

}