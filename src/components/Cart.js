import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import CartItem from'./CartItem';
import { calculateTotals, fetchCartItems } from '../features/cart/cartSlice';
import { openModal } from '../features/modal/modalSlice';

const Cart=()=>{
    const { cartItems, totalPrice, status, error } = useSelector((state)=>state.cart);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchCartItems());
    },[dispatch]);

    useEffect(()=>{
        if(status==='succeeded'){
            dispatch(calculateTotals());
        }
    },[cartItems, dispatch, status]);

    if(status==='loading') return <p>Loading...</p>;
    if(status==='failed') return console.log('에러가 발생했습니다. 데이터 요청 경로를 확인해주세요!');

    return(
        <CartContainer>
            <h2>당신이 선택한 음반</h2>
            {cartItems.length === 0 ?(
                <p>고객님이 좋아하는 음반을 담아보세요~!</p>)
                :(
                    <>
                    {cartItems.map((item)=>(
                        <CartItem key={item.id} {...item}/>
                    ))}
                    <CartFooter>
                        <h3>총 가격: {totalPrice}원</h3>
                        <button onClick={()=>dispatch(openModal())}>장바구니 초기화</button>
                    </CartFooter>
                    </>
                )
            }
        </CartContainer>
    )
};

export default Cart;

const CartContainer = styled.div`
    padding:2rem;
`;

const CartFooter = styled.div`
    display:flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;

    button{
        padding: 0.5rem 1rem;
        border:none;
        cursor:pointer;
    }
`;

