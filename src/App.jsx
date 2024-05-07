import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Nav from './components/Nav.jsx'
import MainPage from './pages/MainPage.jsx'
import PopularPage from './pages/PopularPage.jsx'
import NowPlayingPage from './pages/NowPlayingPage.jsx'
import TopRatedPage from './pages/TopRatedPage.jsx'
import UpComing from './pages/UpComing.jsx'
import DetailPage from './pages/DetailPage.jsx'
import Notfound from './pages/Notfound.jsx'
import styled from 'styled-components'

const Container = styled.div`
  background-color: rgb(45, 41, 120);
  /* display: grid; */
  /* grid-template-columns: repeat(6, 1fr); */
  /* grid-gap: 20px; */
  position: relative;
  width:100%;
  padding: 0px;
  margin: 0 auto;
`;

const Content = styled.div`
  background-color: rgb(45, 41, 120);
  width: 100%;
  height: 200px;
  /* position:absolute; */
  top:0;
`;


function App() {
  // const {title} = useParams();

  return (
    <Container>
      <Router>
        <Nav/>
        <Content>
          <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/popular" element={<PopularPage/>}/>
              <Route path="/nowplaying" element={<NowPlayingPage/>}/>
              <Route path="/toprated" element={<TopRatedPage/>}/>
              <Route path="/upcoming" element={<UpComing/>}/>
              <Route path="/movie/:title" element={<DetailPage/>}/>
              <Route path="/notfound" element={<Notfound/>}/>
            </Routes>
        </Content>
        {/* <Footer/> */}
      </Router>
    </Container>

    
  )
}

export default App;

