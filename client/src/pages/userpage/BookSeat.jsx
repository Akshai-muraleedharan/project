import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa6';
import { loadStripe } from "@stripe/stripe-js";
import Loader from "../../components/Loader.jsx";
import {  useDispatch, useSelector } from 'react-redux'
import {moviePayment, seatNumber} from '../../Redux/Slice/showTimeSlice'
function BookSeat() {



  const [Theater, setFetchTheater] = useState({});
  const [TheaterSeat, setTheaterSeat] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch()

  const { id } = useParams();
  const { movieId } = useParams(); 
  const navigate = useNavigate();






  const fetchTheater = async () => {
    try {
      setLoading(true)
      const response = await axiosInstance({
        url: `theater/user-theater/${id}`,
        method: 'GET'
      });
      setFetchTheater(response.data.data);
      setTheaterSeat(response.data.data.seats);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (index) => {
    setTheaterSeat(prevSeats => {
      const newSeats = [...prevSeats];
      const seat = newSeats[index];

      if (!seat.availableSeat) return prevSeats; 

      
      seat.selected = !seat.selected;

      if (seat.selected) {
        setSelectedSeats(prev => [...prev, seat]);
      } else {
        setSelectedSeats(prev => prev.filter(s => s.seatEndNumber !== seat.seatEndNumber));
      }

      return newSeats;
    });
  };

  const totalPayment = selectedSeats.reduce((total, seat) => total + parseFloat(seat.seatPayment), 0);
  const seatNumbers  = selectedSeats.map(item => item.seatEndNumber)

 const paymentAmount = () => {
  return dispatch(moviePayment(totalPayment))
 }

 const seatNumbres = () => {
  return dispatch(seatNumber(seatNumbers))
 }


  const seatBook = async() => {
    try {
      paymentAmount()
      seatNumbres()
       const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY_MY);

   const response = await axiosInstance({
            url:`/movie-ticket/movie/${movieId}/theater/${id}`,
            method:"POST",
            data:{seatArry:selectedSeats}
        })
       

        const sessionId = response?.data?.sessionId;
        
         stripe.redirectToCheckout({
            sessionId: sessionId,

          
        });
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(() => {
    fetchTheater();
  }, [id]); 



  return (
    <>
      <div>
        <button className="mt-8 ml-8 text-[20px]" onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>

        <div className="px-3 md:px-14 cursor-default md:container md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
          <div className='flex justify-between shadow-lg p-2 rounded-md text-lg font-semibold'>
            <p>{Theater.screenName}</p>
            <p>{Theater.screenType}</p>
            <p>{Theater.city}</p>
          </div>
        </div>
        
        <div className='flex justify-center flex-col items-center'>
          <div className='flex flex-wrap justify-evenly gap-2 md:gap-2 w-4/5 md:max-w-[700px]'>
            {TheaterSeat.map((seat, index) => (
              <div
                key={seat.seatEndNumber}
                className={`seat ${seat.availableSeat ? (seat.selected ? 'selected' : 'available') : 'booked'}`}
                onClick={seat.availableSeat ? () => handleClick(index) : undefined}>
               
              </div>
            ))}
          </div>
          <div className='w-full md:w-[50%] h-7 flex justify-between items-center p-1 mt-4 mb-5'>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-green-500 rounded-sm'> </div>   Selected </span>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-500 rounded-sm'> </div>   Booked </span>
            <span className='flex text-xs items-center'><div className='w-6 h-6 bg-gray-300 rounded-sm border-[1px] border-green-500'> </div>  Available </span>
          </div>
          <div className='w-[60%] bg-sky-300 h-5 mb-9 text-xs text-center font-semibold text-blue-500'>Screen</div>
          <div className='h-12'>
            {totalPayment > 0 ? <button className='px-6 py-1 bg-[#c214d7] text-white rounded' onClick={seatBook}> {`Total payment : ${totalPayment.toFixed(2)}`}</button> : ''}
          </div>
        </div>


      </div>
    </>
  );
}

export default BookSeat;
