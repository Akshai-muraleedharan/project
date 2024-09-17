import mongoose from 'mongoose'


  const newMovieSchema = new mongoose.Schema({
        title:{
            type:String,
            required:true
        },
        image:{
            type:String,
            default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaLGtEd0MJro4X9wDmT2vrvLT-HjKkyyWVmg&s",
        },
        theaterId:{
            type:mongoose.Types.ObjectId, 
            ref:"theater"
        },
      
        language:{
            type:String,
            required:true
        },
        duration:{
            type:String,
            required:true
        },
        genres:{
            type:String,
            required:true
        } ,
         showTime: [],
               
        showDate: {
            type: String, 
            
        },
        
  })

  const NewMovieModel = mongoose.model('movies',newMovieSchema);

  export default NewMovieModel