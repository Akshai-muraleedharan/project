import express from "express";
import { accoutRestore, bookedMovieDelete, bookedMovies, checkUser, otpGenerate, SeatBooking, userBookedDelete, userDelete, userLogin, userLogout, userMovies, userProfile, userSignup,userSoftDelete, userUpdate,} from "../../controller/userController.js";
import { authUser } from "../../middleware/authUser.js";
import { upload } from "../../middleware/imageUploadMiddleware.js";
import {  errorSignupHandler, loginErrorHandler, otpErroHandler } from "../../middleware/error.js";


const Router = express.Router();

// user signup and login

Router.post("/signup",errorSignupHandler, userSignup);
Router.post("/login",loginErrorHandler, userLogin);
Router.post("/otp-generate", otpGenerate);
Router.put("/account-restore",otpErroHandler, accoutRestore);




Router.put('/book-seat/:theaterId',SeatBooking)
Router.put("/soft-delete", authUser, userSoftDelete);
Router.delete("/delete", authUser, userDelete);
Router.put("/update/", authUser, upload.single("profile-pic"), userUpdate);

Router.get("/logout", userLogout);
Router.get("/check-user", authUser, checkUser);
Router.get("/profile", authUser, userProfile);
Router.post("/payment-movie/movie/:movieId/theater/:theaterId", authUser, userMovies);

Router.get("/booked-movies", authUser, bookedMovies);
Router.put("/booked-delete/:CardId", authUser, userBookedDelete);

export default Router;
 