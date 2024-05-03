import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Detail from '../components/Detail.jsx'
// import Notfound from './Notfound.jsx'
import './Page.css'

const DetailPage = () =>{
    // console.log(title);
    const { title } = useParams();
    const [detail, setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchDetails = async () =>{
            try{
                // const movieId = 'MOVIE_ID';
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                }
                const response = await fetch(`https://api.themoviedb.org/3/movie/${encodeURIComponent(title)}?language=en-US&page=1`, options)
                if(response.ok){
                    const data = await response.json();
                    setDetails(data.result);
                }
                else{
                    navigate('/notfound');
                    setTimeout(() => navigate('/'), 2000);
                }
                
            }
            catch(error){
                console.error('Error fetching movies:', error);
            }
        };
        fetchDetails();
    },[title, navigate])

    if (!detail) {
        // console.log("Loading");
        // return <div>Loading...</div>;
        navigate('/notfound');
        setTimeout(() => navigate('/'), 2000);
        return null;
    }

    return(
        <div>
            {/* {console.log(detail.id)}
            {console.log(detail.poster_path)}
            {console.log(detail.original_title)}
            {console.log(detail.vote_average)}
            {console.log(detail.release_date)}
            {console.log(detail.overview)} */}
            <Detail 
            key={detail.id}
            posterPath={detail.poster_path}
            originalTitle={detail.original_title}
            voteAverage={detail.vote_average}
            releaseDate={detail.release_date}
            overview={detail.overview}/>
        </div>
    )
}

export default DetailPage;