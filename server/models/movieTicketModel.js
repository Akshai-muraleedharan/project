import mongoose from 'mongoose' 
const movieTicketSchema = new mongoose.Schema({
   
    movieId:{
        type:mongoose.Types.ObjectId,
        ref:"movies"
    },
    theaterId:{
        type:mongoose.Types.ObjectId,
        ref:"theater"
    },
    userId:{
        type:mongoose.Types.ObjectId, 
        ref:"users"
    },
   
    seats:[],
  
})
const MovieTicket = mongoose.model('movieTicket',movieTicketSchema)

export default MovieTicket;