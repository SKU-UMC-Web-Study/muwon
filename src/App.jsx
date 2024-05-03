import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

import './App.css'
import Nav from './components/Nav.jsx'
import MainPage from './components/pages/MainPage.jsx'
import PopularPage from './components/pages/PopularPage.jsx'
import NowPlayingPage from './components/pages/NowPlayingPage.jsx'
import TopRatedPage from './components/pages/TopRatedPage.jsx'
import UpComing from './components/pages/UpComing.jsx'


function App() {
  
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
          </Routes>
        </div>
        {/* <Footer/> */}
      </Router>
    </div>

    
  )
}

export default App;

