import { createSlice } from '@reduxjs/toolkit'


let  theaterIds;

const initialState = {
  theaterIds:theaterIds

}

export const OwnerSlice = createSlice({
    name:'owner',
    initialState,

    reducers:{
      theaterIdValue:(state,action) => {
        state.theaterIds = action.payload
     }
    }
})


export const {theaterIdValue} =OwnerSlice.actions

export default OwnerSlice.reducer