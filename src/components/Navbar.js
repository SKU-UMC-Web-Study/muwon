import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const NavContainer = styled.div`
    padding: 1rem 2rem;
    background: #f5f5f5;
    display: flex;
`;

const Navbar =()=>{
    return(
        <NavContainer>
            <h2>UMC PlayList</h2>
        </NavContainer>
    )
};

export default Navbar;