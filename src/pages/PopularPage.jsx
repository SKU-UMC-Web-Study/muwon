import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Movie from '../components/Movie';
import Overview from '../components/Overview';
import styled from 'styled-components';

const PageContainer = styled.div`
  background-color: rgb(45, 41, 120);
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 0.2fr));
  position: relative;
  justify-content: center; 
`;

const OvvBox = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(100px, 0.5fr));
  position: absolute;
  top: 0;
  left: 0;
  justify-content: center; 
`;

const fetchMovies = async (page) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
    }
  };
  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`, options);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const PopularPage = () => {
  const { page: pageParam } = useParams();
  const navigate = useNavigate();
  const page = parseInt(pageParam, 10) || 1; // 기본 페이지 번호를 1로 설정

  const { data, error, isLoading } = useQuery({
    queryKey: ['movies', page],
    queryFn: () => fetchMovies(page),
    keepPreviousData: true,
  });

  const handlePageBack = () => {
    if (page > 1) {
      navigate(`/popular/${page - 1}`);
    }
  };

  const handlePageForward = () => {
    navigate(`/popular/${page + 1}`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching movies: {error.message}</div>;
  }

  const movies = data.results;

  return (
    <>
      <PageContainer>
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
        <div style={{ width: '1000px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <img
            src='src/img/pBack.png'
            style={{ width: '50px', marginTop: '50px', marginBottom: '50px', 
            visibility: page === 1 ? 'hidden' : 'visible'
            }}
            onClick={handlePageBack}
            alt="Pre"
          />
          <p style={{ width: '100px', color: 'white' }}>{page}</p>
          <img
            src='src/img/pForward.png'
            style={{ width: '50px', marginTop: '50px', marginBottom: '50px' }}
            onClick={handlePageForward}
            alt="Next"
          />
        </div>
      </PageContainer>
    </>
  );
};

export default PopularPage;
