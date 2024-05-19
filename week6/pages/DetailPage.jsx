import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import Detail from "../components/Detail.jsx";
import Credit from '../components/Credit.jsx';
import styled from 'styled-components';

const MappingBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    grid-gap: 10px;
    justify-content: center; 
    gap: 20px; 

`;

const DetailPage = () =>{
    const { key } = useParams();
    const [detail, setDetails] = useState(null);
    const [detail_credit, setDetails_credit] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{

        const fetchDetails = async () =>{
            // const movieId = parseInt(id,10);
            // if(isNaN(movieId) || movieId < -2147483648 || movieId > 2147483647){
            //     console.error('Invalid input');
            //     navigate('/notfound');
            //     return;
            // }
    
            try{
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                };
                const response = await fetch(`https://api.themoviedb.org/3/movie/${key}?language=en-US`, options);
                const response_credit = await fetch(`https://api.themoviedb.org/3/movie/${key}/credits?language=en-US`,options);
                if(response.ok && response_credit.ok){
                    const data = await response.json();
                    const data_credit = await response_credit.json();
                    setDetails(data);
                    setDetails_credit(data_credit.cast);
                }
                else{
                    navigate('/notfound');
                    setTimeout(() => navigate('/'), 2000);
                }
            }catch(error){
                console.error('Error fetching movies: ', error);
                navigate('/notfound');
                setTimeout(() => navigate('/'), 2000);
            }
        };
        fetchDetails();
    },[key])

    if(!detail){
        return <div>Loading...</div>;
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
            

            <br/><br/><br/><br/><br/>
            <h2 style={{textAlign:'center', color:'white'}}>출연진 및 제작진</h2>
            <div style={{display:'block'}}>
                <MappingBox>
                    {detail_credit.map(det => (
                        <Credit
                        // key={det.credit_id}
                        profile_path = {det.profile_path}
                        name = {det.name}
                        known_for_department = {det.known_for_department}/>
                    ))} 
                </MappingBox>
            </div>

        </div>
    )
}

export default DetailPage;