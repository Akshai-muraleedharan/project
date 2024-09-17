import {toast,Toaster }from "react-hot-toast";
import { CreateTheater } from "../../components/ui/buttons/Buttons";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../config/axiosInstance";
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function CreateTheaterPageClient() {
  const [errorMessage, setErrorMessage] = useState([]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
   await axiosInstance({
        url:"/theater/create-theater",
        method:"POST",
        data
    })

    toast.success("Theater created successfully")
    } catch (error) {
      setErrorMessage(error.response.data)
     toast.error("somethig error")
      console.log(error);
    }
  };

  return (
    <>
  
      <div className="backGround_img_client ">
      <button className="mt-8 ml-8 text-[20px] text-white"  onClick={() => navigate(-1)}>
          <FaArrowLeft />
        </button>
        <div className="w-full flex  justify-center mt-8 mb-4  items-center ">
      
          <div className="border-0 p-5 w-full md:w-[80%] rounded-md shadow-lg ">
            <h2 className="text-center mb-2 font-bold text-2xl text-white">
             Add Theater
            </h2>
            <form
              className=" gap-3 flex flex-col "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    {...register("screenName")}
                    className="grow"
                    placeholder="Theater Name"
                  />
                </label>
              </div>

              <div>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    {...register("city")}
                    className="grow"
                    placeholder="city"
                  />
                </label>
              </div>

              <div>
                <select {...register("screenType")} className="select select-bordered w-full">
                  <option disabled selected>
                    Select ScreenType
                  </option>
                  <option>IMAX</option>
                  <option>4DX</option>
                  <option>Standard digital</option>
                  <option>ScreenX</option>
                </select>
              </div>
              <div className="h-4 text-xs text-end text-red-500 font-semibold">
                {errorMessage.success === false ? errorMessage.message : null}
                  
                </div>

              <CreateTheater type="submit" />
              <Toaster/>
            </form>
          </div>
          {/* </div> */}
        </div>
      </div>
    </>
  );
}

export default CreateTheaterPageClient;
