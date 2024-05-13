import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    width: 400px;
    &>h2, &>p{
        color: white;
    }
`;

const Input = styled.input`
    width: 400px;
    height: 30px;
    border-radius: 20px;
    margin-bottom: 5px;
    color: black;
`;

const Button = styled.button`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    color: black;
`;

const StyledButton = styled.button`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    color: black;
`
const LoginButton=({color})=>{

    return(
        <>
        <StyledButton style={{backgroundColor:color}}>제출하기</StyledButton>
        </>
    )
    
}

const LoginPage =()=>{

    return(
        <Container><br/><br/><br/><br/>
            <h2>로그인 페이지</h2><br/>
            <form id='LoginForm'>
                <Input type='text' name='ID'/><br/>
                <Input type='password' name='pw'/><br/>
                <br/>
                <LoginButton>로그인</LoginButton>
            </form>
        </Container>
    )
}

export default LoginPage;