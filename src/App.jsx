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


function App() {
  // const {title} = useParams();

  return (
    <div className = 'container'>
      <Router>
        <Nav/>
        <div className = 'content'>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/popular" element={<PopularPage/>}/>
            <Route path="/nowplaying" element={<NowPlayingPage/>}/>
            <Route path="/toprated" element={<TopRatedPage/>}/>
            <Route path="/upcoming" element={<UpComing/>}/>
            <Route path="/movie/:title" element={<DetailPage/>}/>
            <Route path="/notfound" element={<Notfound/>}/>
          </Routes>
        </div>
        {/* <Footer/> */}
      </Router>
    </div>

    
  )
}

export default App;

