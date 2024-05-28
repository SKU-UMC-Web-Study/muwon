import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [isLogin, setIsLogin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const token=localStorage.getItem('token');
            if (!token) {
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
                if (response.ok) {
                    setIsLogin(true);
                } else {
                    console.error('Failed to fetch user data:', data.message);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
            }
        };

        fetchUserData();
    }, []);
    console.log("nav 확인" + isLogin);

    const handleLoginItem =()=>{
        if(isLogin){
            localStorage.removeItem("token");
            setIsLogin(false);
            alert("로그아웃 되었습니다!");
        }else{
            setIsLogin(true);
        }
    }

 return(
        <Navbar>
            <NavItem to="/">UMC Movie</NavItem>
            <NavItem to={isLogin ? "/" : "/login"} onClick={handleLoginItem}>{isLogin ? '로그아웃' : '로그인'}</NavItem>
            {isLogin ? null :<NavItem to="/signup">회원가입</NavItem> }
            <NavItem to="/popular/:page">Popular</NavItem>
            <NavItem to="/nowplaying">Now Playing</NavItem>
            <NavItem to="/toprated">Top Rated</NavItem>
            <NavItem to="/upcoming">Upcoming</NavItem>
            {/* {loading && <Spinner/>} */}
        </Navbar>
        
    )
}

export default Nav;