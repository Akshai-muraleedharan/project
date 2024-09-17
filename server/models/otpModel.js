import mongoose from 'mongoose'


const otpSchema = mongoose.Schema({
    mobile:{
        type:String
    },
    otp:{
        type:String,

    },
    createdAt: {
        type: Date,
        expires: "2m",
        default: Date.now,
      },
})


const OtpModel =mongoose.model('otp',otpSchema)

export default OtpModel