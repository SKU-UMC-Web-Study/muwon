import React from 'react';
import { FaStar } from "react-icons/fa";
import styled from 'styled-components'

const Img = styled.img`
    float:left;
    width: 250px;
    margin-right: 40px;
`;

const Info = styled.div`
    width: 450px;
    display: inline-block;
    color: white;

    h2,h3,p{
        text-align:left;
    }
    
`;


const Detail =({posterPath, originalTitle, voteAverage, releaseDate, overview})=>{
    // const starCount = `repeat(Math.floor(voteAverage), 1fr) ` 
    const starCount = Math.floor(voteAverage);
    const stars = [];
    for (let i = 0; i < starCount; i++) {
        stars.push(<FaStar key={i} />);
    }
    const columnValue = `repeat(${starCount}, 0fr)`;

    return(
        <div>
            <Img src = {`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Failed to image loading"></Img>
            <Info>
                <h2>{originalTitle}</h2><br/>
                {/* <h3>평점 <FaStar style={{gridTemplateColumns:starCount}}/></h3><br/> */}
                <h3>평점 
                    <div style={{ display: 'grid', gridTemplateColumns: columnValue }}>
                        {stars.map((star, index) => (
                            <div key={index}>{star}</div>))}
                    </div>
                </h3>
                <h3>개봉일 {releaseDate}</h3><br/>
                <p><h3>줄거리</h3> {overview ? <p>{overview}</p> : <p>줄거리 정보가 없습니다.</p>}</p>
            </Info>
        </div>
    )
}

export default Detail;