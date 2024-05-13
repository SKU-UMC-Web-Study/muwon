import React, {useState, useEffect}  from 'react';
import ReactDOMServer from 'react-dom/server' //srcDoc 속성값으로 HTML 문자열을 받기위해 사용
import Banner from '../components/Banner.jsx'
import Movie from '../components/Movie.jsx'
import styled from 'styled-components';
import axios from 'axios';


const FindMovie = styled.div`
    margin-top: 200px;
    position:fixed;
    margin-left: 25%;
`;

const Search = styled.input`
    width: 400px;
    height: 30px;
    border-radius: 20px;
    border-color: white;
    box-shadow: inset 0px 0px 0px 0px;
    margin-right:10px;
`;

const IframeContainer = styled.div`
    margin-top: 20px;
    width: 100%;
    height: 200px;

    iframe{
        border: none;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        grid-gap: 10px;
    }
`;

const MainPage= () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(()=>{
        const searchMovies = async(e) =>{
            if(searchTerm.trim()==='') return; //검색어가 비어있으면 함수 종료
    
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
                      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZmE5ZDI5YzRhNWQ4OGJhY2QxODIxOWVhZmZlYzZlMCIsInN1YiI6IjY2MmU1NzMyMDNiZjg0MDEyNWVhZGE5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w00sWoRJw_0sqWhMuuINho69qGOHu_jkC9HbH2Rw2Hk'
                    }
                };
                const response = await axios.request(options);
                const results = response.data.results;
                const iframeContent = generateIframeContent(results);
                setSearchResults(iframeContent); // 검색 결과 업데이트
                console.log('Received response from search:', response.data); // 요청 후 응답 로그 출력
            }
            catch(error){
                console.error('Error searching movies:', error);
            }
            
        };
        searchMovies();
    },[searchTerm]);
    

    const handleSearch = (e) =>{
        setSearchTerm(e.target.value);//검색어 입력 값 업데이트
    }

    const generateIframeContent = (results) =>{
        const content = results.map(result => (
            <div key={result.id}>
                <Movie 
                    originalTitle={result.original_title} 
                    posterPath={result.poster_path} 
                    voteAverage={result.vote_average} 
                />
            </div>
        ));

        const htmlString = ReactDOMServer.renderToStaticMarkup(//jsx를 문자열로 변환하여 전달
            <html>
                <head>
                    <title>Search Results</title>
                </head>
                <body>
                    <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px'}}>
                        {content}
                    </div>
                </body>
            </html>
        )

        return htmlString;
    }

    return(
        <div>
            <Banner/>
            <FindMovie>
                <p style={{color: 'white', fontWeight:'bold',fontSize:'20px'}}>Find your movies!</p>
                <></>
                <form onSubmit={handleSearch}>
                    <Search type = 'text' value={searchTerm} onChange={handleSearch}/>
                    <button type='submit'><img style={{width:'20px'}} src='src\img\lens.png'/></button>
                </form>
                <IframeContainer>
                    {searchResults && (
                        <iframe 
                            title="Search Results"
                            srcDoc={searchResults}
                            width="1000px"
                            height="400px"
                        />
                    )}
                </IframeContainer>
            </FindMovie>
        </div>
        
    )
}

export default MainPage;