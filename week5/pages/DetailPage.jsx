import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Detail from '../components/Detail.jsx'
// import Notfound from './Notfound.jsx'

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
                      Authorization: 'Bearer'
                    }
                }
                const response = await fetch(`https://api.themoviedb.org/3/movie/${title}?language=en-US&page=1`, options)
                if(response.ok){
                    const data = await response.json();
                    setDetails(data);
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
        return null;
    }

    return(
        <div>
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