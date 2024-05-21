import React, {useState, useEffect}  from 'react';

import Movie from '../components/Movie.jsx'
import Overview from '../components/Overview.jsx'
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-wrap: wrap; /* 자식 요소들을 여러 줄에 걸쳐 정렬 */
    justify-content: center; /* 수평 가운데 정렬 */
    gap: 20px; /* 자식 요소들 간의 간격 */
`;

const OvvBox = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 20px; 
`;

const UpComing= () => {
    const [movies, setMovies] = useState([]);

    useEffect(()=>{
        const fetchMovies = async () => {
            try{
                const options = {
                    method: 'GET',
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer API_KEY'
                    }
                }
                const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options);
                const data = await response.json();
                setMovies(data.results);
            }
            catch(error){
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, [])

    return(
        <Container>
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
        </Container>
    )
}

export default UpComing;
