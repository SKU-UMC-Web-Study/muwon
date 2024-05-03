import React from 'react';
import './Movie.css'

const Overview = ({originalTitle, overView}) => {
    return(
        <div className='black-bg'>
            <p className='s'>{originalTitle}</p>
            <p className='s'>{overView}</p>
        </div>
    )
}
export default Overview