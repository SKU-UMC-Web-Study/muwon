import React from 'react';
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
        opacity: 1;
    }
`;

const Overview = ({originalTitle, overView}) => {
    return(
        <BlackBG>
            <p className='s'>{originalTitle}</p>
            <p className='s'>{overView}</p>
        </BlackBG>
    )
}
export default Overview