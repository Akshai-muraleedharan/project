import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axiosInstance";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
function BookedMovies() {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  console.log(movies)
  const bookedMovies = async () => {
    try {
      const response = await axiosInstance({
        url: "/user/booked-movies",
        method: "GET",
      });

      setMovies(response.data.data.movieBooked);
    } catch (error) {
      console.log(error);
    }
  };

  const bookedMovieDelete = async (id) => {
    try {
      await axiosInstance({
        url: `/user/booked-delete/${id}`,
        method: "PUT",
      });
      bookedMovies();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookedMovies();
  }, []);

  return (
    <>
      <button
        className="mt-8 ml-8 text-[20px] "
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />
      </button>

      <div className=" px-3 md:px-14 md:container flex gap-3 flex-wrap  justify-center md:mx-auto mb-10 mt-6 lg:max-w-[800px]">
        {movies < 1 ? (
          <h2 className="text-red-500 font-semibold">No Movie Booked</h2>
        ) : (
          movies.map((item, index) => (
            <div key={index} className="min-w-[300px] md:w-72 p-2 shadow-lg cursor-default">
              <div className="p-2  rounded-t-lg ">
                <div className="flex justify-between ">
                  <div className="font-semibold"> {item.movieId.title} </div>
                  <span className="cursor-pointer" onClick={() => bookedMovieDelete(item._id)} >
                    {" "}
                    <X />
                  </span>
                </div>
                <div className="font-semibold"> {item.movieId.language} </div>
              </div>
              <img
                className="max-h-48 w-full"
                src={item.movieId.image}
                alt={item.movieId.title}
              />
              <div className="p-2">
                <div>
                  <div className="m-1 text-xs  font-semibold">{`Theater name : ${item.theaterId.screenName}`}</div>
                  <div className="m-1 text-xs  font-semibold">{`Screen type : ${item.theaterId.screenType}`}</div>  
                  <div className="m-1 text-xs  font-semibold">{`Seat No : ${item.movieSeat.join(" , ")}`}</div>
                  <div className="m-1 text-xs  font-semibold">{`Movie Time: ${item.movieTime}`}</div>
                  <div className="m-1 text-xs font-semibold">{`Date : ${item.date}`}</div>
                </div>
                <div>
                  <div className="flex justify-end text-xs font-semibold">
                    Price
                  </div>
                  <div className="text-end font-semibold text-xs mb-5">
                    {" "}
                    {`₹${item.moviePayment}`}{" "}
                  </div>
                  <div className="text-center border border-bg-primary">
                    {item.bookedId}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default BookedMovies;
