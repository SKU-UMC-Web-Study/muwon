import React, {useState, useEffect}  from 'react';
import Banner from '../components/Banner.jsx'
import styled from 'styled-components';

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

const MainPage= () => {
    return(
        <div>
            <Banner/>
            <FindMovie>
                <p style={{color: 'white', fontWeight:'bold',fontSize:'20px'}}>Find your movies!</p>
                <></>
                <form>
                    <Search type = 'text'></Search>
                    <button><img style={{width:'20px'}} src='src\img\lens.png'/></button>
                </form>
            </FindMovie>
        </div>
        
    )
}

export default MainPage;