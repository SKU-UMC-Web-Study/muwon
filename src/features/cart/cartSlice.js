import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async(_, thunkAPI)=>{
        try{
            const response = await axios.get('/musics');
            return response.data;
        }catch(error){
            return thunkAPI.rejectWithValue('404 Page Not Found');
        }

    }
)

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalPrice: 0,
    status: 'idle',
    error: null,
}

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
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCartItems.pending, (state)=>{
                state.status = 'loading';
            })
            .addCase(fetchCartItems.fulfilled, (state, action)=>{
                state.status = 'succeeded';
                state.cartItems = action.payload;
            })
            .addCase(fetchCartItems.rejected, (state, action)=>{
                state.status = 'failed';
                state.error = action.payload;
                alert(action.payload);
            });
    },
});

export const { increase, decrease, removeItem, cleanCart, calculateTotals } = cartSlice.actions;
export default cartSlice.reducer;
export { fetchCartItems }; 