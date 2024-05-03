import React from 'react';
import './Detail.css';
import { FaStar } from "react-icons/fa";

const Detail =({posterPath, originalTitle, voteAverage, releaseDate, overview})=>{
    return(
        <div>
            <img src = {`https://image.tmdb.org/t/p/w500/${posterPath}`} alt="Failed to image loading"/>
            <div>
                <h2>{originalTitle}</h2>
                <p>평점</p>
                <FaStar />
                <p>개봉일 {releaseDate}</p>
                <p>줄거리 {overview ? <p>{overview}</p> : <p>줄거리 정보가 없습니다.</p>}</p>
                

            </div>
        </div>
    )
}

export default Detail;