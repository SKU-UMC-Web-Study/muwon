import React, {useState, useEffect}  from 'react';
import Movie from '../components/Movie.jsx'
import Overview from '../components/Overview.jsx'
// import Spinner from 'src\components\Spinner.jsx'
import styled from 'styled-components';

const PageContainer = styled.div`
    background-color: rgb(45, 41, 120);
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 20px; 
`;

const OvvBox = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 20px; 
`;


const PopularPage= () => {
    const [movies, setMovies] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const fetchMovies = async () => {
            try{
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                }
                const response = await fetch('https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1', options);
                const data = await response.json();
                setMovies(data.results);
            }
            catch(error){
                console.error('Error fetching movies:', error);
            }
            // finally{
            //     setLoading(false);
            // }
        };

        fetchMovies();
    }, [])

    return(
        <PageContainer>
            {/* {loading && <Spinner/>} */}
            {movies.map(movie => (
            <Movie key={movie.id} 
            originalTitle={movie.original_title} 
            posterPath={movie.poster_path} 
            voteAverage={movie.vote_average}/>
            ))}
            <OvvBox>
                {movies.map(movie => (
                <Overview key={movie.id}
                originalTitle={movie.original_title} 
                overView={movie.overview}/>
                ))}
            </OvvBox>
        </PageContainer>
    )
}

export default PopularPage;