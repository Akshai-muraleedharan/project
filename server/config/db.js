import mongoose from 'mongoose';

mongoose.set('debug', true);
// mongodb url
const mongodbUrl = process.env.MONGO_URL;

// mongoDB connection its a function call at server page

 const dbConnect = async () => {
   try {
      await mongoose.connect(mongodbUrl)
      console.log("mongodb connect successfully")
   } catch (error) {
      console.log(error)
   }
 }

 export default dbConnect;