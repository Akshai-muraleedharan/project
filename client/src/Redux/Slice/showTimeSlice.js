import { createSlice } from '@reduxjs/toolkit'


let time
let payment
let seat
let movie
const initialState = {
  value:time,
  payment:payment,
  seat:seat,
  movie:movie
}

export const showTimeSlice = createSlice({
    name:'payment',
    initialState,

    reducers:{
        movieTime:(state,action) => {
           state.value = action.payload
        },
        moviePayment:(state,action) => {
            state.payment = action.payload
        },
        seatNumber:(state,action) => {
          state.seat = action.payload
        },
        movieName:(state,action) => {
          state.movie = action.payload
        }
    }
})


export const { movieTime,moviePayment,seatNumber,movieName} =showTimeSlice.actions

export default showTimeSlice.reducer