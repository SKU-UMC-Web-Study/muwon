import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../../constants/cartItems';

const initialState = {
    cartItems: cartItems,
    totalAmount: 0,
    totalPrice:0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        increase:(state, action)=>{
            const item = state.cartItems.find(item=>item.id===action.payload);
            item.amount += 1;
        },
        decrease:(state,action)=>{
            const item = state.cartItems.find(item=>item.id===action.payload);
            if(item.amount>1) item.amount -= 1;
            else state.cartItems = state.cartItems.filter(item=>item.id !==action.payload);
        },
        removeItem:(state,action)=>{
            state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
        },
        cleanCart:(state,action)=>{
            state.cartItems = [];
        },
        calculateTotals:(state)=>{
            let totalAmount = 0;
            let totalPrice = 0;
            state.cartItems.forEach(item =>{
                totalAmount += item.amount;
                totalPrice += item.amount * item.price;
            });
            state.totalAmount = totalAmount;
            state.totalPrice = totalPrice;
        },
    },
});

export const { increase, decrease, removeItem, cleanCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;