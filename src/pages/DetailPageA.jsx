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
            const Authorization = '8fa9d29c4a5d88bacd18219eaffec6e0'
            const url = `https://api.themoviedb.org/3/movie/${id}?language=ko-KR`
            try{
                const response = await axios.get(url,{
                    headers: {
                        accept: 'application/json',
                        // Authorization: `Bearer ${Authorization}`
                    }
                });
                // const response = await axios.get(url);
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

    if (!detail) {
        return <div>Loading...</div>; // 로딩 상태 처리
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