import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../../config/axiosInstance";
import { Bar } from "react-chartjs-2";
import { useDispatch } from "react-redux";
import Chart from 'chart.js/auto';

function UserChart() {
  const [user, setUser] = useState([]);

 
 

  const userGet = async () => {
    try {
      const response = await axiosInstance({
        url: "/admin/all-users",
        method: "GET",
      });

      setUser(response?.data?.allUser);
     
    } catch (error) {}
  };

  const dates = user.map((item) => item.createdAt);

  const extractDate = dates.reduce((acc, timestamp) => {
    const date = new Date(timestamp);
    const yearMonth = `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}`;

    const [year, month] = yearMonth.split("-");

    // Rearrange to DD-MM-YYYY format
    const formattedDate = `${month}-${year}`;

    acc[formattedDate] = (acc[formattedDate] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(extractDate);
  const dataValues = Object.values(extractDate);

  useEffect(() => {
    userGet();
  }, []);

  return (
    <>
      <div className=" flex w-full items-center p-3 border-2 rounded-sm border-indigo-200 justify-around flex-wrap-reverse md:flex-wrap gap-5">
        <div className=" w-96 overflow-x-auto shadow-lg">
          <h1 className="text-center text-xs underline font-semibold mb-4">
            Users flow chart
          </h1>
          <Bar
            className="m-2 lg:p-2 "
            data={{
              labels: labels,
              datasets: [
                {
                  label: "Users",
                  data: dataValues,
                  backgroundColor: [
                    "rgb(55,48,163)",
                    "rgb(109 40 217)",
                    "rgb(30 27 75)",
                  ],
                  borderRadius: 5,
                },
              ],
            }}
          />
        </div>
        <div className="w-60 h-32 md:h-44 flex items-center text-2xl font-semibold text-white justify-center bg-indigo-400 rounded-lg shadow-xl">
          {`Total Users : ${user.length}`}
        </div>
      </div>
    </>
  );
}

export default UserChart;
