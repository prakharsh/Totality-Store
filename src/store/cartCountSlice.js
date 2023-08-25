import {createSlice} from '@reduxjs/toolkit'

const countSlice=createSlice({
    name:'count',
    initialState:{value:0},
    reducers:{
        increase(state){
            state.value+=1
        },
        decrease(state){
            state.value-=1
        },
        removeAll(state){
            state.value=0
        }
    }
}) ;
export const{increase,decrease,removeAll}=countSlice.actions

export default countSlice.reducer