import React, { useState, useLocation} from 'react';
import { Link } from 'react-router-dom'
// import Spinner from 'Spinner.jsx'
import styled from 'styled-components';

const Navbar = styled.div`
    width: 100%;
    height: 20px;
    background-color:rgb(27, 23, 104);
    padding: 20px;


    position: fixed;
    top: 0;
    left:0;
    right:0;
    z-index: 999;
`;

const NavItem = styled(Link)`
    color: white;
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.3s ease;

    &:first-child{
        margin-right: 40%;
    }

    &:hover{
        font-size: 18px;
        cursor: pointer; 
        color: yellow;
    }
}
`;

const Nav = () => {
    // const location = useLocation();
 return(
        <Navbar>
            <NavItem to="/">UMC Movie</NavItem>
            <NavItem to="/signup">회원가입</NavItem>
            <NavItem to="/popular">Popular</NavItem>
            <NavItem to="/nowplaying">Now Playing</NavItem>
            <NavItem to="/toprated">Top Rated</NavItem>
            <NavItem to="/upcoming">Upcoming</NavItem>
            {/* {loading && <Spinner/>} */}
        </Navbar>
        
    )
}

export default Nav;