import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { cleanCart } from '../features/cart/cartSlice';
import { closeModal } from '../features/modal/modalSlice';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const Button = styled.button`
  margin: 0 1rem;
  padding: 0.5rem 1rem;
  background: #007BFF;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;

const Modal =()=>{
    const dispatch = useDispatch();
    const { isOpen } = useSelector((state) => state.modal);

    if(!isOpen) return null;

    return(
        <ModalContainer>
            <ModalContent>
                <h4>담아둔 모든 음반들을 삭제하시겠습니까?</h4> 
                <ButtonContainer>
                    <Button
                        onClick={()=>{
                            dispatch(cleanCart());
                            dispatch(closeModal());
                        }}>
                        네
                    </Button>
                    <Button onClick={()=>dispatch(closeModal())}>아니요</Button>
                </ButtonContainer>
            </ModalContent>
        </ModalContainer>
    )
};

export default Modal;