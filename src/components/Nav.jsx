import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './Nav.css';
// import Spinner from 'Spinner.jsx'

const Nav = () => {

    return(
        <div className='nav'>
            <Link className='navItem' to="/" >UMC Movie</Link>
            <Link className='navItem' to="/" >회원가입</Link>
            <Link className='navItem' to="/popular" >Popular</Link>
            <Link className='navItem' to="/nowplaying" >Now Playing</Link>
            <Link className='navItem' to="/toprated" >Top Rated</Link>
            <Link className='navItem' to="/upcoming" np>Upcoming</Link>
            {/* {loading && <Spinner/>} */}
        </div>
        
    )
}

export default Nav;