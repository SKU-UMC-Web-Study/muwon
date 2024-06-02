import React, { useState, useEffect, useRef } from 'react';
import Movie from '../components/Movie.jsx';
import Overview from '../components/Overview.jsx';
import Spinner from '../components/Spinner.jsx'; 
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
body{
  background-color: #262952;
}
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center;
    gap: 20px; 
    position: relative;
`;

const OvvBox = styled.div`
    display: flex;
    flex-wrap: wrap; 
    justify-content: center; 
    gap: 20px; 
    position: absolute;
    top:0;
    left:0;
`;

const NowPlayingPage = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 상태 추가
    const [page, setPage] = useState(1);
    const loaderRef = useRef(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                }
                const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`, options);
                const data = await response.json();
                setMovies(prevMovies => [...prevMovies, ...data.results]);
                setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 변경
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        };

        const observer = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) {
                setPage(prevPage => prevPage + 1);
            }
        }, { threshold: 1 });

        if (loaderRef.current) {
            observer.observe(loaderRef.current);
        }

        fetchMovies(); // 페이지 로딩 시 처음 데이터를 가져오도록 변경

        return () => observer.disconnect();
    }, [page]);

    return (
        <>
            <GlobalStyle/>
            {loading && <Spinner />} {/* 로딩 중일 때 Loading 컴포넌트 표시 */}
            <Container>
                {movies.map(movie => (
                    <Movie
                        key={movie.id}
                        originalTitle={movie.original_title}
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                    />
                ))}
                <OvvBox>
                    {movies.map(movie => (
                        <Overview
                            key={movie.id}
                            originalTitle={movie.original_title}
                            overView={movie.overview}
                        />
                    ))}
                </OvvBox>
                <div ref={loaderRef}></div>
            </Container>
            
        </>
    );
}

export default NowPlayingPage;
