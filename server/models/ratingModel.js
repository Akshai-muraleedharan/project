import mongoose from 'mongoose';


const ratingSchema = mongoose.Schema({
    username: {type:mongoose.Types.ObjectId,ref :"users"},
    movie: { type: String, required: true },
    comment: { type: String },
    usermail: { type: String }
},{timestamps: true })


const RatingModel = mongoose.model('ratings',ratingSchema);

export default RatingModel