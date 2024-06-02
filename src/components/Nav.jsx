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


    // position: fixed;
    // top: 0;
    // left:0;
    // right:0;
    // z-index: 999;

`;

const Large = styled.div`
    margin:0;
    padding: 0;
    @media (max-width: 600px){
        display:none;
    }
`

const Small = styled.div`
    margin-top: 0;   
    padding: 0;
    position: relative;
    @media (min-width: 600px){
        display:none;
    }
`

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
`
const Toggle = styled.button`
    font-size: 24px;
    background: none;
    border: none;
    color: white;

    &:hover{
        cursor:pointer;
    }
`

const OffCanvas = styled.div`
    height: 1000px;
    width: ${(props) => (props.isOpen ? '100%' : '0')};
    position: fixed;
    z-index: 999;
    right: ${(props) => (props.isOpen ? '0' : '-250px')}; // Adjusted for right to left slide
    background-color: rgb(27, 23, 104);
    transition: right 0.5s;
    opacity: 90%;
    position: absolute;
    top: 20px;


    ${NavItem}{
        &:first-child{
            margin-right: 0%;
        }
        display:${(props) => (props.isOpen ? 'block' : 'none')};
        margin-top: 30px;
    }
`


const Nav = () => {
    // const location = useLocation();
    const [isLogin, setIsLogin] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
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
            }
        };

        fetchUserData();
    }, []);
    // console.log("nav 확인" + isLogin);

    const handleLoginItem =()=>{
        if(isLogin){
            localStorage.removeItem("token");
            setIsLogin(false);
            alert("로그아웃 되었습니다!");
        }else{
            setIsLogin(true);
        }
    }

    const toggling=()=>{
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        console.log("isOpen: " + isOpen);
    }, [isOpen]);

    const handleCloseSidebar = () =>{
        setIsOpen(false);
    }

 return(
        <Navbar>

            <Large>
                <NavItem to="/">UMC Movie</NavItem>
                <NavItem to={isLogin ? "/" : "/login"} onClick={handleLoginItem}>{isLogin ? '로그아웃' : '로그인'}</NavItem>
                {isLogin ? null :<NavItem to="/signup">회원가입</NavItem> }
                <NavItem to="/popular/:page">Popular</NavItem>
                <NavItem to="/nowplaying">Now Playing</NavItem>
                <NavItem to="/toprated">Top Rated</NavItem>
                <NavItem to="/upcoming">Upcoming</NavItem>
                {/* {loading && <Spinner/>} */}
            </Large>
            <Small>
                <NavItem to="/" style={{marginTop: '-30px'}}>UMC Movie</NavItem>
                <Toggle onClick={toggling} style={{marginTop: '-30px'}}>☰</Toggle>
                <OffCanvas isOpen={isOpen}>
                    <NavItem to={isLogin ? "/" : "/login"} onClick={()=>{handleLoginItem(); handleCloseSidebar();}}>{isLogin ? '로그아웃' : '로그인'}</NavItem>
                    {isLogin ? null :<NavItem to="/signup">회원가입</NavItem> }
                    <NavItem to="/popular/:page" onClick={handleCloseSidebar}>Popular</NavItem>
                    <NavItem to="/nowplaying" onClick={handleCloseSidebar}>Now Playing</NavItem>
                    <NavItem to="/toprated" onClick={handleCloseSidebar}>Top Rated</NavItem>
                    <NavItem to="/upcoming" onClick={handleCloseSidebar}>Upcoming</NavItem>
                </OffCanvas>
            </Small>

        </Navbar>
        
    )
}

export default Nav;