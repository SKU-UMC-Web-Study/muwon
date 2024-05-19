import React from 'react'
import styled from 'styled-components'

const BannerBG = styled.div`
    // float:left;
    width:1400px;
    height: 300px;
    background-color: black;
    position: realative;
`;

const BannerText = styled.p`
    color:rgb(224, 222, 222);
    font-size: 30px;
    font-weight: bold;
    padding: 70px;
    /* position: absolute */
    // margin-top:auto;
`;

const Banner = () =>{
    return(
        <BannerBG>
            <BannerText>환영합니다</BannerText>
        </BannerBG>
        
    )
}

export default Banner;