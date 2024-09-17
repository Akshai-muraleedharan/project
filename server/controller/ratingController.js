import RatingModel from '../models/ratingModel.js';
import UserModel from "../models/userModel.js";


export const movieRatingCreate = async (req,res) => {
    try {
        const {movieId} = req.params
        const verifiedUser = req.user.email;
        const {comment} =req.body
        const User = await UserModel.findOne({email:verifiedUser})    
        const userId = User._id
        const usermail = User.email

        console.log(usermail)

        if(!movieId){
            return res.status(400).json({success:false,message:"id not exist"})
        }

        if(!comment){
            return res.status(400).json({success:false,message:"review required"})
        }

        // if(!rating ){
        //     return res.status(400).json({success:false,message:"rating is required"})
        // }

        // if(rating > 5 || rating <= 0){
        //     return res.status(400).json({success:false,message:"rating min-1 max-5 required"})
        // }

        const UserRating = await RatingModel({ username:userId,comment,movie:movieId ,usermail})

      const data = await UserRating.save()

            res.status(200).json({success:true,message:"successfully created",data:data})
    } catch (error) {
       console.log(error)
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}


export  const movieRatingGet = async  (req,res) => {
    try{
        const {movieId} = req.params;

        const allComment = await RatingModel.find({movie:movieId})
        .populate( {  path: "username",select:['-password','-profilePic','-movieBooked','-userDeleted','-mobile','-city']})

        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}

// for admin

export  const movieRatingGetAdmin = async  (req,res) => {
    try{
        const {id} = req.params;
         console.log("hitted")
        const allComment = await RatingModel.find({movie:id})
        .populate( {  path: "username",select:['-password','-profilePic','-movieBooked','-userDeleted','-mobile','-city']})

        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}
export  const movieRatingGetAll = async  (req,res) => {
    try{

        const allComment = await RatingModel.find()
        .populate( {  path: "username",select:['-password','-profilePic','-movieBooked','-userDeleted','-mobile','-city']})
        .populate({path:'movie',model:'movies',select:['-showTime','-duration','-genres','-image','-theaterId','-language']})
        res.json({success:true,message:"fetched",data:allComment})

    }catch(error){
        res.status(error.status || 500).json({ message: error || "internal server error" });
    }
}


export  const movieRatingUpdate = async  (req,res) => {
    try{
        const {id} = req.params;
        const {comment} =req.body
    
        const ratingUpdate = await RatingModel.findByIdAndUpdate(id,{
            comment
        },{new:true})
        

        res.status(200).json({success:true,message:"updated successfully",data:ratingUpdate})

    }catch(error){
      
       res.status(error.status || 500).json({ message: error || "internal server error" });
    } 
}



export  const movieRatingDelete = async  (req,res) => {
    try{
        const {id} = req.params;
       
       
            const ratingUpdate = await RatingModel.findByIdAndDelete(id)
              res.status(200).json({success:true,message:"deleted successfully",data:ratingUpdate})
          
        
        

      

    }catch(error){
     
       res.status(error.status || 500).json({ message: error || "internal server error" });
    } 
}