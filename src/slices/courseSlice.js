import { createSlice } from "@reduxjs/toolkit"

const initialState={
    step:1,
    loading:false,
    courseInfo:null
}

const courseSlice=createSlice({
    name:"course",
    initialState,
    reducers:{
        setStep(state,action){
            state.step=action.payload;
        },
        setCourseInfo(state,action){
            state.courseInfo=action.payload;
        },
        setLoading(state,action){
            state.loading=action.payload;
        }
    }
})

export const {setStep,setLoading,setCourseInfo}=courseSlice.actions;
export default courseSlice.reducer;