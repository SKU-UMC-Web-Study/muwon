import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
// import DetailPage from '../pages/DetailPage';
import styled from 'styled-components';

const BlackBG = styled.div`
    width: 200px;
    height: 400px;
    background-color: rgb(0, 0, 0, 0.8);
    border-radius: 10px;
    opacity: 0;
    color: white;
    font-size: 13px;
    overflow: hidden;
    margin-top: 100px;

    &:hover{
        opacity: 0.9;
    }
`;



// if(!detail){
//     return <div>Loading...</div>;
// }


const Overview = ({originalTitle, overView}) => {
    const navigate = useNavigate();

    return(
        <BlackBG>
            <p>{originalTitle}</p>
            <p>{overView}</p>
        </BlackBG>
    )
}
export default Overview