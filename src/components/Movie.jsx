import React from 'react';
import './Movie.css'

const Movie = ({originalTitle, posterPath, voteAverage }) =>{
    return(
        <div className='posterBox'>
            <img src = {`https://image.tmdb.org/t/p/w500/${posterPath}`}/>
            <div className='info' style={{width: '140px'}}>
                <p>{originalTitle}</p>
            </div>
            <div className='info' style={{paddingLeft: '10px', width: '50px'}}>
                <p>{voteAverage}</p>
            </div>
        </div>
    )
}

export default  Movie;