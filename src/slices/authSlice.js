import { createSlice } from "@reduxjs/toolkit";

const initialState={
    token:localStorage.getItem("token")?JSON.parse(localStorage.getItem('token')):null,
}
const authSclie=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setToken(state,action){
            state.token=action.payload.token
        },
        removeToken(state,action){
            state.token=null
        }
    }
})

export const{setToken,removeToken}=authSclie.actions;
export default authSclie.reducer;
