import createSlice from 'redux-starter-kit';
const initialState={
    entireCourseData:{},
    sectionData:[],
    completedLectures:[],
    totalLectures:0,
}

const viewCourseSlice=createSlice({
    name:'viewCourse',
    initialState,
    reducers:{
        setEntireCourseData:(state,action)=>{
            state.entireCourseData=action.payload;
        },
        setSectionData:(state,action)=>{
            state.sectionData=action.payload;
        },
        setCompletedLectures:(state,action)=>{
            state.completedLectures=action.payload;
        },
        setTotalLectures:(state,action)=>{
            state.totalLectures=action.payload;
        },
        updateCompletedLectures:(state,action)=>{
            state.completedLectures=[
                ...state.completedLectures,
                action.payload
            ]
        }
    }
})

export const {setEntireCourseData,setSectionData,setCompletedLectures,setTotalLectures,updateCompletedLectures}=viewCourseSlice.actions;
export default viewCourseSlice.reducer;