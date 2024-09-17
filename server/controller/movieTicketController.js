import MovieTicket from "../models/movieTicketModel.js"
import NewMovieModel from "../models/newMovieModel.js"
import SessionModel from "../models/sessionId.js";
import TheaterModel from "../models/theaterModel.js"
import Stripe from "stripe";

const client_domain = process.env.CLIENT_DOMAIN
let movieId

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_MY);

export const movieTicket = async(req,res) => {
    try {
        const {movie} =req.params;
        const {theater} = req.params;
        const {seatArry} =req.body;

       
         movieId = movie

        if(!movie){
            return res.status(400).json({success:false,message:"movie id not get"})
        }

        if(!theater){
            return res.status(400).json({success:false,message:"theater id not get"})
        }

      
        const findMovie = await NewMovieModel.findById(movie);
        const movieName =  findMovie.title

        const findTheater = await TheaterModel.findById(theater);

        const TheaterName = findTheater.screenName;
        const TheaterCity = findTheater.city;
        const TheaterscreenType = findTheater.screenType;


        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: seatArry.map(seat => ({
                price_data: {
                  currency: 'inr',
                  product_data: {
                    name: `Seat ${seat.seatEndNumber} - ${movieName} at ${TheaterName}`,
                    description: `Theater: ${TheaterName}, City: ${TheaterCity}, Screen Type: ${TheaterscreenType}`,
                  },
                  unit_amount: seat.seatPayment * 100, 
                },
                quantity: 1,
              })),
           
            mode: "payment",
            success_url: `${client_domain}/user/payment/success/${movie}/${theater}`,
            cancel_url: `${client_domain}/user/payment/cancel`,
        });


   

        if(!session.id) {
            return res.status(400).json({success:false,message:"session id not get"})
        }
        const sessionId = await SessionModel({
            sessionId: session.id
        })

        sessionId.save()

        res.json({ success: true, sessionId: session.id });

        const sessionStatus = await stripe.checkout.sessions.retrieve(session.id );
        console.log(sessionStatus.status)

    } catch (error) {
        console.log(error)
    }
}



export const ticketTest = async (req,res) => {
    try {
        const sessionId = req.query.session_id;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            status: session?.status,
          
        });
       
    } catch (error) {
        console.log(error)
    }
}


export const totalPaymentList = async (req,res) => {
    try {
        const ticketList = await MovieTicket.find()

        if(!ticketList){
            return res.status(400).json({success:false,message:"no payments"})
        }else{
            res.json({success:true,message:ticketList})
        }
    } catch (error) {
        res.status(error.status || 500).json({message:error || "internal server error"})
    }
}