import React, { useState, useLocation} from 'react';
import { Link } from 'react-router-dom'
import './Nav.css';
// import Spinner from 'Spinner.jsx'

const Nav = () => {
    // const location = useLocation();
    const [isLoginned, setIsLoginned] = useState(false);

    const loginClick = () =>{
        setIsLoginned(!isLoginned);
    }

    return(
        <div className='nav'>
            <Link className='navItem' to="/">UMC Movie</Link>
            <Link className='navItem' to="/" onClick = {loginClick}>
                {isLoginned ? '로그아웃' : '로그인'}
            </Link>
            <Link className='navItem' to="/popular" >Popular</Link>
            <Link className='navItem' to="/nowplaying" >Now Playing</Link>
            <Link className='navItem' to="/toprated" >Top Rated</Link>
            <Link className='navItem' to="/upcoming">Upcoming</Link>
            {/* {loading && <Spinner/>} */}
        </div>
        
    )
}

export default Nav;