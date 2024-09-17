import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is requird"],
    },
    profilePic: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png",
    },
    userDeleted: {
      type: Boolean,
      default: false,
    },
    mobile: {
      type: String,
      required: true,
    },
    movieBooked: [
      {
        moviePayment: {
          type: String, 
       
        },
        movieSeat: {
          type: [Number],
         
        },
        movieTime: {
          type: String,
         
        },
        bookedId: {
          type: String,
        },
        movieId: {
          type: mongoose.Types.ObjectId,
          ref: "movies",
        },
        movieName: {
          type:String
        },
        date: {
          type: String,
        },
        theaterId: {
          type: mongoose.Types.ObjectId,
          ref: "theater",
        },
      },
    ],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("users", userSchema);

export default UserModel;
