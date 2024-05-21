import React,{ useState } from 'react'
import styled from 'styled-components'

const SpinContainer=styled.div`
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SpinCycle=styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid white;
    border-radius: 50%;
    border-top-color: royalblue;
    animation: spin 0.8s infinite ease-in-out;

    /* @keyframes 이용해서 spin 애니메이션 정의 */
    @keyframes spin{
        to{
            transform: rotate(1turn);
        }
}
`;

const Spinner = ({loadingState}) =>{
    return(
        <SpinContainer>
            <SpinCycle/>
        </SpinContainer>
    )
}

export default Spinner;