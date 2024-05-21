import React from 'react';
import styled from 'styled-components'

const PosterBox = styled.div`
    width: 200px;
    height: 400px;
    background-color: rgb(68, 72, 161);
    border-radius: 10px;
    margin-top: 100px;
`;

const Image = styled.img`
    display: block;
    width: 100%;
    height: auto;
    float: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const Info = styled.div`
    width: 140px;
    color: white;
    font-size: 13px;
    float: left;
`;

const Movie = ({originalTitle, posterPath, voteAverage }) =>{
    return(
        <PosterBox>
            <Image src = {`https://image.tmdb.org/t/p/w500/${posterPath}`}/>
            <Info>
            <p>{originalTitle}</p>
            </Info>
            <Info style={{paddingLeft: '10px', width: '50px'}}>
                <p>{voteAverage}</p>
            </Info>
        </PosterBox>
    )
}

export default  Movie;