
import image from '../../assets/image/payment.png'
import {  useNavigate, useParams } from 'react-router-dom'
import { axiosInstance } from '../../config/axiosInstance';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function PaymentSuccessPage() {
  const time = useSelector((state) => state.payment.value)
  const payment = useSelector((state) => state.payment.payment)
  const selectedSeat = useSelector((state) => state.payment.seat)
  const movieName = useSelector((state) => state.payment.movie)

 const navigate = useNavigate()


const {movie} = useParams()
const {theater} = useParams()
 



 const paymentGet = async () => {
  try {
    await axiosInstance({
      url:`/user/book-seat/${theater}`,
      method:"PUT",
      data:{seatNumber:selectedSeat}
    })
    
  } catch (error) {
    console.log(error)
  }
 }

 const paymentSuccess = async () => {
  try {
    await axiosInstance({
          url:`/user/payment-movie/movie/${movie}/theater/${theater}`,
          method:"POST",
          data:{
            moviePayment:payment,
            movieTime:time,
            movieSeat:selectedSeat,
            movieName:movieName
          }
    })
     

  } catch (error) {
    console.log(error)
  }
 } 

useEffect(()=>{
  paymentSuccess()
  paymentGet()

  setTimeout(()=>{
    navigate('/user/movies')
  },3000)
})

  return (
   <>
   <div className='flex justify-center items-center h-[90vh]'>

   <div className="card bg-base-100 static h-[100%]  md:h-[50%] w-96 mt-5 mb-5 md:shadow-xl">

  <div className="card-body ">
   <div className='flex justify-center'>
    <img src={image} className='w-[100px] h-[100px]' alt="payment" />
   </div>

   <h1 className='text-center font-semibold text-1xl text-green-400'>Payment successfully completed</h1>

   
  </div>
</div>

   </div>
   </>
  )
}

export default PaymentSuccessPage