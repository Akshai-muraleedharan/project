import mongoose from 'mongoose'


const sessionSchema = mongoose.Schema({
    sessionId:{
        type:String
    },
   
})


const SessionModel =mongoose.model('session',sessionSchema)

export default SessionModel