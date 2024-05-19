import React from 'react';
import styled from 'styled-components'

export const PosterBox = styled.div`
    width: 200px;
    height: 400px;
    background-color: rgb(68, 72, 161);
    border-radius: 10px;
    margin-top: 100px;
`;

export const Image = styled.img`
    display: block;
    width: 200px;
    height: auto;
    // float: left;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

export const Info = styled.div`
    width: 130px;
    color: white;
    font-size: 13px;
    float: left;
`;

const Movie = ({ originalTitle, posterPath, voteAverage }) =>{
    return(
        <PosterBox>
            <Image src = {`https://image.tmdb.org/t/p/w500/${posterPath}`}/>
            <Info style={{textAlign:'left', paddingLeft:'10px'}}>
                <p>{originalTitle}</p>
            </Info>
            <Info style={{paddingLeft: '5px', paddingRight:'5px', width: '50px'}}>
                <p>⭐{voteAverage}</p>
            </Info>
        </PosterBox>
    )
}

export default  Movie;