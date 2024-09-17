import mongoose from 'mongoose';


 
    const movieShowSchema = new mongoose.Schema({
        screenName:{
            type:String,
            required:true
        },
        Ownermail:{
            type:String,
        },
        city:{
            type:String,
            required:true
        },
        screenType:{
            type:String,
            required:true
        },
        seats:{
            type:[]
           
        },
        userPayment:[
           
               {
                moviePayment: {
                    type: String, // Should be a string, e.g., '200'
                   
                  },
                  movieSeat: {
                    type: [Number],
                  
                  },
                  movieTime: {
                    type: String,
                  
                  },
                  userbookedId: {
                    type: String,
                  },
                  movieId: {
                    type: mongoose.Types.ObjectId,
                    ref: "movies",
                  },
                  movieName: {
                    type: String,
                  },
                  date: {
                    type: String,
                  },
                  theaterId: {
                    type: mongoose.Types.ObjectId,
                    ref: "theater",
                  },
               }
            
              ],
        movieSchedules:[{
            movieId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'movies', // Reference to the Movie model
              
            },
            
        }]
    })

    const TheaterModel = mongoose.model('theater',movieShowSchema);

    export default TheaterModel