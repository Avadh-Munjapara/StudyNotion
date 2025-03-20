import { createSlice } from "@reduxjs/toolkit"

const initialState={
    step:1,
    courseInfo:localStorage.getItem('course')?JSON.parse(localStorage.getItem('course')):null
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload;
        }
    }
})

export const {setStep}=courseSlice.actions;
export default courseSlice.reducer;