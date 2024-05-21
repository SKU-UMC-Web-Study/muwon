import React, { useState, useEffect }  from 'react';
import Banner from '../components/Banner.jsx'
import Movie from '../components/Movie.jsx'
import Overview from '../components/Overview.jsx'
import styled, { css } from 'styled-components';
import axios from 'axios';


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
    margin-right:10px;
`;


const ResultBox = styled.div`
    width: 1000px;
    height: 700px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 30px;
    padding-right:30px;
    background-color: rgb(24,21,89);
    overflow: auto;
    display:grid;
    grid-template-columns: repeat(4, minmax(100px, 1fr));
    grid-gap: 10px;

    &::-webkit-scrollbar{
        width: 6px;
        color: black;
    }
    &::-webkit-scrollbar-thumb{
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
    gap: 20px; 
    position: absolute;
    top:0;
    left:20;
`;

const MainPage= () => {
    //상태 관리: 검색어, 검색결과, 결과창활성화
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (value) =>{
        console.log(value);
        setSearchTerm(value);
    }

    //DEBOUNCING
//    const debouncedSearch = (func, delay, e) =>{
//         let timer;

//         return function(e){
//             const context = this;
//             // const event = args[0]; //args 배열의 첫번 째 요소인 이벤트 객체를 가져온다. 
//             clearTimeout(timer);
//             timer = setTimeout(()=>{
//                 func.apply(context, e);
//             }, delay);
//         };
//     }
    //const optimizedSearch = debouncedSearch((e) => handleSearch(e), 200);

    function debounce(func, delay){
        let timer;

        return function(...args){
            clearTimeout(timer);
            timer = setTimeout(()=>{
                func.apply(this, args);
            },delay);
        }
    }

    function optimizedSearch(value, delay){
        debounce(handleSearch, delay)(value);
        
    }

    //API CALL with Controlling 'searchTerm'
    useEffect(()=>{
        const searchMovies = async() =>{
            if(searchTerm.trim()==='') {
                setSearchResults([]);
                return; //검색어가 비어있으면 함수 종료
            }
    
            try{
                const options = {
                    method: 'GET',
                    url: 'https://api.themoviedb.org/3/search/movie',
                    params: {
                        include_adult: 'false', 
                        language: 'en-US',
                        page: '1',
                        query: searchTerm},//검색어 추가
                    headers: {
                      accept: 'application/json',
                      Authorization: 'Bearer API_KEY'
                    }
                };
                const response = await axios.request(options);
                const results = response.data.results;
                setSearchResults(results);
                console.log('Received response from search:', response.data);
            }
            catch(error){
                console.error('Error searching movies:', error);
            }
            
        };
        searchMovies();
        console.log("Search term:", searchTerm);
    },[searchTerm]);



    return(
        <div>
            <Banner/><br/>
            <FindMovie>{/*div*/}
                <p style={{color: 'white', fontWeight:'bold',fontSize:'30px'}}>🎥 Find your movies!</p>
                <></>
                <form>
                    <Search type = 'text' value={searchTerm} onChange={(e) => optimizedSearch(e.target.value, 200)}/>
                </form><br/><br/>

                <ResultBox>
                    {searchResults&&(
                        searchResults.map(movie=>(
                        <React.Fragment key={movie.id}>    
                        <Container>
                            <Movie
                                originalTitle={movie.original_title} 
                                posterPath={movie.poster_path} 
                                voteAverage={movie.vote_average}
                                style={{}}
                            />
                            <OvvBox>
                            <Overview 
                                originalTitle={movie.original_title} 
                                overView={movie.overview}
                                style={{
                                    float:'left'}}/>
                            </OvvBox>
                        </Container>
                        </React.Fragment>
                        )
                    ))}
                </ResultBox>
            </FindMovie>
        </div>
        
    )
}

export default MainPage;
