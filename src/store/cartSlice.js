import {createSlice} from '@reduxjs/toolkit'

const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        add:(state,action)=>{
           // state.push(action.payload)
           const inCart= state.cart.find((item) => item.id === action.payload.id);
            if (inCart) {
                    inCart.quantity += 1;
            } 
            else {
                    state.cart.push({...action.payload,'quantity':1});
            }
        },
        remove:(state,action)=>{
            const inCart= state.cart.find((item) => item.id === action.payload.id);
            if(!inCart) return 
            inCart.quantity-=1 ;
            if(inCart.quantity<=0){
                state.cart=state.cart.filter((obj)=>obj.id !== inCart.id)
            }
        },
        clearCart:(state)=>{
            state.cart=[]
        }
    },
});

export const {add,remove,clearCart}=cartSlice.actions
export default cartSlice.reducer