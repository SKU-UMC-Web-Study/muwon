import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { increase, decrease, removeItem } from '../features/cart/cartSlice';

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem 0;

  img {
    width: 100px;
  }

  button {
    margin: 0 0.5rem;
  }
`;

const CartItem=({id, title, singer, price, img, amount})=>{
    const dispatch = useDispatch();

    const handleDecrease =()=>{
        if(amount > 1) dispatch(decrease(id));
        else dispatch(removeItem(id));
    }

    return(
        <CartItemContainer>
            <img src={img} alt={title}/>
            <div>
                <h4>{title}</h4>    
                <p>{singer}</p>
                <p>{price}원</p>
            </div>
            <div>
                <button onClick={()=>dispatch(increase(id))}>+</button>
                <p>{amount}</p>
                <button onClick={handleDecrease}>-</button>
            </div>
        </CartItemContainer>
    );
};

export default CartItem;