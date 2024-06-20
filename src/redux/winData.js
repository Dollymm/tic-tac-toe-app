import {createSlice} from '@reduxjs/toolkit'

const initialState={
    scores:{
        A:0,
        B:0,
    },
};

const winData=createSlice({
    name:"winData",
    initialState,
    reducers:{
        dataA:(state,action)=>{
            state.scores.A += action.payload;
        },
        dataB:(state,action)=>{
            state.scores.B += action.payload;
        }
    }
})

export const {dataA,dataB}=winData.actions;

export default winData.reducer;