import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Movie from '../components/Movie.jsx';
import Overview from '../components/Overview.jsx';
import Loading from './Loading.jsx';

const BannerBG = styled.div`
    // float:left;
    width:100%;
    height: 300px;
    background-color: black;

`;

const BannerText = styled.p`
    color:rgb(224, 222, 222);
    font-size: 30px;
    font-weight: bold;
    padding: 70px;
    /* position: absolute */
`;

const FindMovie = styled.div`
    margin-left: auto;
    margin-right: auto;
`;

const Search = styled.input`
    width: 500px;
    height: 30px;
    border-radius: 20px;
    border-color: white;
    box-shadow: inset 0px 0px 0px 0px;
    margin-right: 10px;
`;

const ResultBox = styled.div`
    width: 1000px;
    height: 700px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 30px;
    padding-right: 30px;
    background-color: rgb(24,21,89);
    overflow: auto;
    display: grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    grid-gap: 10px;

    &::-webkit-scrollbar {
        width: 6px;
        color: black;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: yellow;
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
    position: absolute;
    top: 0;
    left: 20px;
`;

const MainPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [userName, setUserName] = useState('');
    const [loadingUser, setLoadingUser] = useState(true);
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    function debounce(func, delay) {
        let timer;

        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }

    function optimizedSearch(value, delay) {
        debounce(handleSearch, delay)(value);
    }

    useEffect(() => {
        const fetchUserData = async () => {
            const token=localStorage.getItem('token');
            if (!token) {
                setLoadingUser(false);
                return;
            }

            try {
                const response = await fetch('http://localhost:8080/auth/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                console.log("data?");
                console.log(data);
                console.log("data.username?:" + data.username);
                if (response.ok) {
                    setUserName(data.username);
                    setIsLogin(true);
                } else {
                    console.error('Failed to fetch user data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setLoadingUser(false);
            }
        };

        fetchUserData();
    }, []);
    console.log("userName?: " + userName);
    console.log("isLogin?: "+isLogin);

    useEffect(() => {
        const searchMovies = async () => {
            if (searchTerm.trim() === '') {
                setSearchResults([]);
                return;
            }

            setIsLoading(true);

            try {
                const options = {
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/search/movie',
                    params: {
                        include_adult: 'false',
                        language: 'en-US',
                        page: '1',
                        query: searchTerm,
                    },
                    headers: {
                        accept: 'application/json',
                        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                };
                const response = await axios.request(options);
                const results = response.data.results;
                setSearchResults(results);
                setIsLoading(false);
            } catch (error) {
                console.error('Error searching movies:', error);
            }
        };
        searchMovies();
    }, [searchTerm]);

    const gotoDetail = (id) => {
        navigate(`/movie/${id}`);
    };

    return (
        <div>
            {loadingUser ? (
                <Loading />
            ) : (
                <>
                    <BannerBG>
                        <BannerText>{loadingUser ? '로딩 중...' 
                                    : isLogin ? `${userName}님, 환영합니다.` 
                                    : '환영합니다'}</BannerText>
                    </BannerBG>
                    {/* <Banner>{userName ? `${userName}님, 환영합니다.` : '로딩 중...'}</Banner> */}
                    {/* userName ? <Banner>`${userName}님, 환영합니다.`</Banner> : <Banner>Hi</Banner> */}
                    {/* <Banner>{userName ? `${userName}님, 환영합니다.` : 'hi!'}</Banner> */}
                    {/* <Banner>{loadingUser ? '로딩 중...' : 
                             userName ? `${userName}님, 환영합니다.`:'환영합니다.'}</Banner> */}
                    <br />
                    <FindMovie>
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '30px' }}>🎥 Find your movies!</p>
                        <form>
                            <Search type="text" value={searchTerm} onChange={(e) => optimizedSearch(e.target.value, 200)} />
                        </form>
                        <br /><br />
                        <ResultBox>
                            {searchResults && (
                                searchResults.map(movie => (
                                    <Container key={movie.id} onClick={() => gotoDetail(movie.id)}>
                                        <Movie
                                            originalTitle={movie.original_title}
                                            posterPath={movie.poster_path}
                                            voteAverage={movie.vote_average}
                                        />
                                        <OvvBox>
                                            <Overview
                                                originalTitle={movie.original_title}
                                                overView={movie.overview}
                                            />
                                        </OvvBox>
                                    </Container>
                                ))
                            )}
                        </ResultBox>
                    </FindMovie>
                </>
            )}
        </div>
    );
}

export default MainPage;
