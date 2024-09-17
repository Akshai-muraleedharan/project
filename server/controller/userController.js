import UserModel from "../models/userModel.js";
import OtpModel from "../models/otpModel.js";
import { matchPassword } from "../utils/comparePassword.js";
import { createToken } from "../utils/generateToken.js";
import { cloudinaryInstance } from "../config/cloudneryConfig.js";
import { hashPassword } from "../utils/hashedPassword.js";
import otpGenerator from "otp-generator";
import TheaterModel from "../models/theaterModel.js";
import twilio from "twilio";

//  User create controller

export const userSignup = async (req, res, next) => {
  try {
    const { username, email, password, mobile, profilePic } = req.body;

    const userExist = await UserModel.findOne({ email });
    const mobileExist = await UserModel.findOne({ mobile });

    if (userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user already exist" });
    }

    if (mobileExist) {
      return res
        .status(400)
        .json({ success: false, message: "mobile number already exist" });
    }

    const hashedPassword = hashPassword(password);

    const NewUser = new UserModel({
      username,
      email,
      password: hashedPassword,
      mobile,
      profilePic,
    });

    await NewUser.save();

    const token = createToken(email, "user");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res
      .status(201)
      .json({
        success: true,
        message: "user signup successfully",
        date: NewUser,
      });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

//user login controller

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exist" });
    }

    const deletedUser = userExist.userDeleted;

    if (deletedUser == true) {
      return res
        .status(400)
        .json({ success: false, message: "user doesn't exist" });
    }

    const PasswordValue = userExist.password;

    const passwordMatch = matchPassword(password, PasswordValue);

    if (!passwordMatch) {
      return res
        .status(400)
        .json({
          success: false,
          message: "invalid password",
          values: "password",
        });
    }

    const token = createToken(email, "user");

    res.cookie("token", token, {
      sameSite: "None",
      secure: true,
      httpOnly: true,
    });

    res.status(200).json({ success: true, message: "user login successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user profile update

export const userUpdate = async (req, res) => {
  try {
    const { username, city, mobile } = req.body;
    const verifiedUser = req.user.email;
    let image;

    if (!req.file) {
      image =
        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";
    } else {
      image = req.file.path;
    }
    const uploadResult = await cloudinaryInstance.uploader
      .upload(image, { folder: "movie ticket application/user profile" })
      .catch((error) => {
        console.log(error);
      });

    const updatedData = await UserModel.findOneAndUpdate(
      { email: verifiedUser },
      { username, city, mobile, profilePic: uploadResult.url },
      { new: true }
    );

    res.json({
      success: true,
      message: "updated successfully",
      data: updatedData,
    });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user profile

export const userProfile = async (req, res) => {
  try {
    const verifiedUser = req.user.email;

    const userProfileData = await UserModel.findOne({
      email: verifiedUser,
    }).select("-password");

    if (!userProfileData) {
      return res.status(400).json({ success: false, message: "no account" });
    }

    res
      .status(200)
      .json({
        success: true,
        message: "profile fetched",
        data: userProfileData,
      });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user booked movies
export const bookedMovies = async (req, res) => {
  try {
    const verifiedUser = req.user.email;

    if (!verifiedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user id did not get" });
    }

    const user = await UserModel.findOne({ email: verifiedUser })
      .select("-password")
      .select("-profilePic")
      .select("-userDeleted")
      .populate([
        {
          path: "movieBooked",
          populate: {
            path: "movieId",
            select: ["-showTime", "-duration", "-rating"],
            model: "movies",
          },
        },
      ])
      .populate([
        {
          path: "movieBooked",
          populate: {
            path: "theaterId",
            select: ["-seats", "-Ownermail", "-movieSchedules"],
            model: "theater",
          },
        },
      ]);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "user not exist" });
    }

    const movieBooked = user.movieBooked;

    res.json({ success: true, message: "successfully fetched", data: user });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const bookedMovieDelete = async (req, res) => {
  try {
    const verifiedUser = req.user.email;
    const { ticketId } = req.params;

    if (!ticketId) {
      return res
        .status(400)
        .json({ success: false, message: "Ticket ID is required" });
    }

    await UserModel.findOneAndUpdate(
      { email: verifiedUser },
      { $pull: { movieBooked: ticketId } },
      { new: true }
    );

    res.json({ success: true, message: "movie deleted" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user seat booking
export const SeatBooking = async (req, res) => {
  try {
    const { theaterId } = req.params;
    const { seatNumber } = req.body;

    if (!seatNumber)
      return res
        .status(400)
        .json({ success: false, message: "please select seats" });

    const updatePromises = seatNumber.map((seats) =>
      TheaterModel.findByIdAndUpdate(
        theaterId,
        { $set: { "seats.$[elem].availableSeat": false } },
        { arrayFilters: [{ "elem.seatEndNumber": seats }], new: true }
      )
    );

    const results = await Promise.all(updatePromises);

    res.json({ data: results });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

export const userMovies = async (req, res) => {
  try {
    const { movieTime } = req.body;
    const { moviePayment } = req.body;
    const { movieSeat } = req.body;
    const { movieName } = req.body;
    const verifiedUser = req.user.email;
    const { movieId } = req.params;
    const { theaterId } = req.params;

    const user = await UserModel.findOne({ email: verifiedUser }).select(
      "-password"
    );
    const theater = await TheaterModel.findById(theaterId);

    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const dates = new Date();

    const year = dates.getFullYear();
    const month = dates.getMonth() + 1;
    const day = dates.getDate();

    const formatedDate = `${day}/${month}/${year}`;

    user.movieBooked.push({
      moviePayment,
      movieTime,
      movieSeat,
      movieId,
      theaterId,
      bookedId: otp,
      date: formatedDate,
      movieName:movieName
    });
    theater.userPayment.push({
      moviePayment,
      movieTime,
      movieSeat,
      movieId,
      theaterId,
      userbookedId: otp,
      date: formatedDate,
      movieName:movieName
    });
    await theater.save();
    await user.save();

    res.json({ success: true, message: "movie added successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user booked movie delete

export const userBookedDelete = async (req, res) => {
  try {
    const { CardId } = req.params;

    const verifiedUser = req.user.email;
    await UserModel.findOneAndUpdate(
      { email: verifiedUser },
      { $pull: { movieBooked: { _id: CardId } } },
      { new: true }
    );

    res.status(200).json({ success: true, message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user logout
export const userLogout = async (req, res, next) => {
  try {
    res.clearCookie("token");

    res.json({ success: true, message: "logout successfully" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user authentication check
export const checkUser = async (req, res, next) => {
  try {
    const verifiedUser = req.user;

    if (!verifiedUser) {
      return res
        .status(400)
        .json({ success: false, message: "user not authenticated" });
    }

    res.json({ success: true, message: "user authenticatd" });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user get all
export const userGetALL = async (req, res) => {
  try {
    const userGetAll = await UserModel.find({ userDeleted: false });

    const userLength = userGetAll.length;

    res.json({
      success: true,
      message: "data fetched",
      allUser: userGetAll,
      userlength: userLength,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user hard delete

export const userDelete = async (req, res) => {
  try {
    const verifiedUser = req.user.email;

    const accountExist = await UserModel.findOne({ email: verifiedUser });

    if (!accountExist) {
      return res
        .status(400)
        .json({ success: false, message: "your account could not delete now" });
    } else {
      await UserModel.findOneAndDelete({ email: verifiedUser });
      res.clearCookie("token");
      res.json({
        success: true,
        message: "your account permanently deleted successfully",
      });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user soft delete

export const userSoftDelete = async (req, res) => {
  try {
    const verifiedUser = req.user.email;

    if (!verifiedUser) {
      return res.status(400).json({ error: "User not authenticated" });
    }
    const userExist = await UserModel.findOne({ email: verifiedUser });

    const userDelete = await UserModel.findOneAndUpdate(
      userExist,
      { userDeleted: true },
      { new: true }
    );
    res.clearCookie("token");
    await userDelete.save();

    res.json({
      success: true,
      message: "user soft-delete successfully",
      data: userDelete,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user otp generate

export const otpGenerate = async (req, res) => {
  try {
    const { mobile } = req.body;
    if (!mobile) {
      return res
        .status(400)
        .json({ success: false, message: "mobile number is required " });
    }
    const validMobile = await UserModel.findOne({ mobile });

    if (!validMobile) {
      return res
        .status(200)
        .json({ success: false, message: "Not registered number " });
    }
    const otp = otpGenerator.generate(6, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const accountSid = process.env.TWILIO_ACCOUNT_SID_NUMBER;
    const authToken = process.env.TWILIO_AUTH_TOKEN_ID;
    const client = twilio(accountSid, authToken);

    if (otp) {
      createMessage();
    }

    async function createMessage() {
      await client.messages.create({
        body: `Your verification code is :${otp}`,
        from: "+16506035413",
        to: `+91${mobile}`,
      });
    }

    const generatedOtp = await OtpModel({ mobile, otp: otp });

    await generatedOtp.save();

    res.json({
      success: true,
      message: "otp generated successfull",
      data: generatedOtp,
    });
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};

// user account restore

export const accoutRestore = async (req, res) => {
  try {
    const { mobile, otp } = req.body;

    const mobileNumberExist = await UserModel.findOne({ mobile });

    if (!mobileNumberExist)
      return res
        .status(400)
        .json({ success: false, message: "mobile number not valid" });

    const validOtp = await OtpModel.findOne({ mobile, otp });

    if (!validOtp) {
      return res
        .status(400)
        .json({ success: false, message: "invalid otp", error: "otps" });
    } else {
      const accountRestored = await UserModel.findOneAndUpdate(
        { mobile },
        {
          userDeleted: false,
        },
        { new: true }
      );
      res.json({
        success: true,
        message: "your account restore successfully",
        data: accountRestored,
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(error.status || 500)
      .json({ message: error || "internal server error" });
  }
};
