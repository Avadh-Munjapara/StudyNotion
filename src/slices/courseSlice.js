import { createSlice } from "@reduxjs/toolkit"

const initialState={
    step:1,
    loading:false,
    courseInfo:localStorage.getItem('course')?JSON.parse(localStorage.getItem('course')):null
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload;
        },
        setLoading(state,action){
            state.loading=action.payload;
        }
    }
})

export const {setStep,setLoading}=courseSlice.actions;
export default courseSlice.reducer;