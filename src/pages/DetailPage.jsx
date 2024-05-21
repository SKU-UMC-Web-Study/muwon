import React, {useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Detail from '../components/Detail.jsx'
import axios from 'axios';

const DetailPage = () =>{
    const { id } = useParams();
    const [detail, setDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchDetails = async () =>{
            const Authorization = 'API_KEY'
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${Authorization}&language=ko-KR`
            try{
                const response = await axios.get(url,{
                    headers: {
                        accept: 'application/json',
                        // Authorization: `Bearer ${Authorization}`
                    }
                });
                // const response = await axios.get(url);
                if(!detail){
                    return <div>Loading...</div>
                }
                if(response.status === 200){
                    setDetails(response.data);
                }else {
                    console.error("Else Error: ", response.status);
                    navigate('/notfound');
                    setTimeout(() => navigate('/'), 2000);
                    console.log("id: ", id);
                }
            } catch(error){
                navigate('/notfound');
                console.error('Error fetching movies:', error);
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log("id: ", id);
                }
                setTimeout(() => navigate('/'), 2000);
            }
        };
        fetchDetails();
    },[id])

 
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
