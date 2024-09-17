import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import NewMovieModel from "../models/newMovieModel.js";

export const movieCreate = async (req, res, next) => {
  try {
    const { title,  duration, genres,language } = req.body;



  
    const {theaterId} = req.params;
    
    if(!title ||  !duration || !genres || !language){
      return res.status(400).json({success:false,message:"All fields required"})
    }

    if(!theaterId){
      return res.status(400).json({success:false,message:"theater id get"})
    }
    const movieExist = await NewMovieModel.findOne({ title });

    if (!req.file) {
      return res.status(400).json({ success: false, message: "please add movie image" });
    }

    const uploadResult = await cloudinaryInstance.uploader
      .upload(req.file.path, { folder: "movie ticket application/movies" })
      .catch((error) => {
        console.log(error);
      });


      if(!uploadResult) return res.status(400).json({success:true,message:"image required"})

    if (movieExist) {
      return res
        .status(400)
        .json({ success: false, message: "movie already exist" });
    }

   

    const newMovie = new NewMovieModel({
      title,
      image: uploadResult.url,
      duration,
      theaterId,
      genres,
      language,
      showTime:[]
    });

    await newMovie.save();

    res
      .status(200)
      .json({ success: true, message: " movie create successfully",data:newMovie });
  } catch (error) {
    console.log(error);
  }
};

export const movieTime = async (req,res) => {
  try {
    const { timeShedule} =req.body
    const {movieId} = req.params
   


    const newMovieTime = await NewMovieModel.findByIdAndUpdate(movieId)
    

if(newMovieTime.showTime.length >= 1){
  return res.status(400).json({success:false,message:"you can add only one  time"})
}
    newMovieTime.showTime.push({
     timeShedule
    })

    newMovieTime.save()
res.status(200).json({success:true,message:"successfully added"})
  } catch (error) {
    console.log(error)
  }
}


export const singleMovie = async (req,res) => {
  try {
   
    const {id} =req.params

    if(!id) return res.status(400).json({success:false,message:"id not found"})
    const fetchSingleMovie = await NewMovieModel.findById(id).populate({path:"theaterId",model:"theater"})
    
    res.json({success:true,message:"data-fetched",data:fetchSingleMovie})
  } catch (error) {
    console.log(error)
  }
}

export const movieList = async (req, res) => {
  try {
    const allMovie = await NewMovieModel.find().populate({path:"theaterId",model:"theater"});

    const moviesLength = allMovie.length;
    if (moviesLength <= 0) {
      return res.status(400).json({
        success: false,
        message: "no movies",
        movieLenth: moviesLength,
      });
    }
    res.json({ status: true, movies: allMovie, movieLenth: moviesLength });
  } catch (error) {
    console.log(error);
  }
};

export const movieUpdate = async (req, res) => {
  try {
    const { title, desc, image, rating, duration, genres } = req.body;

    const { id } = req.params;

    const timeShedule = ["12:00pm", "03:00pm", "07:00:pm", "1:00pm"];

    const updatedMovie = await NewMovieModel.findByIdAndUpdate(
      id,
      {
        title,
        desc,
        image,
        rating,
        duration,
        genres,
        showTime: timeShedule,
      },
      { new: true }
    );

    res.json({ success: true, message: "movie updated", updatedMovie });
  } catch (error) {
    console.log(error);
  }
};

export const movieDelete = async (req, res) => {
  const { id } = req.params;

  await NewMovieModel.findByIdAndDelete(id);

  res.json({ success: true, message: "movie deleted successfully" });
};
