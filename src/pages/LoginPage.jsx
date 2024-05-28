import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import SignupButton from '../components/SignupButton.jsx'

const Container = styled.div`
    width: 400px;
    margin-left:auto;
    margin-right:auto;
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

const Text = styled.div`
    width: 300px;
    height: 14px;
    color:red;
    font-size: 12px;
    margin-bottom: 15px;
    margin-left: 20px;
    text-align:left;
`


const LoginButton=({color})=>{

    return(
        <>
        <StyledButton style={{backgroundColor:color}}>제출하기</StyledButton>
        </>
    )
    
}

const LoginPage =()=>{
    const [activation, setActivation] = useState(0);
    const [error, setError] = useState('');
    const [value, setValue] = useState({
        id:"", pw:""
    })
    const navigate = useNavigate();

    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,12}$/

    //나중에 사용될 예정
    const handleSubmit = async (e) =>{
        e.preventDefault();
        if(activation == 1){
            try{
                const payload = {
                    username: value.id,
                    password: value.pw
                }

                const response = await fetch('http://localhost:8080/auth/login',{
                    method: 'POST',
                    headers: {
                        'Content-Type' : 'application/json',
                    },
                    body: JSON.stringify(payload),
                })
                const data = await response.json();

                if(response.ok){
                    localStorage.setItem('token', data.token);
                    alert('로그인이 정상적으로 처리되었습니다!');
                    navigate('/');
                }else{
                    console.log("Server Response: ", data);
                    setError(data.message);
                }
            }catch(error){
                console.error('Error:', error);
                setError('회원가입 중 오류가 발생했습니다.');
            }
        }
    }

    useEffect(()=>{
        console.log("activation: ", activation);
        console.log(value);
    }, [activation]);

    const checkIDValidity = (id) =>{
        if(id == '') return '아이디를 입력해주세요!';
        return '';
    }

    const checkPasswordValidity = (pw)=>{
        if(pw == '') return '비밀번호를 입력해주세요!';
        return '';
    }

    useEffect(()=>{
        const idValidity = checkIDValidity(value.id);
        const pwValidity = checkPasswordValidity(value.pw);

        if(idValidity === '' && pwValidity ==='') setActivation(1);
        else setActivation(0);
    },[value.id, value.pw])

    return(
        <Container><br/><br/><br/><br/>
            <h2>로그인 페이지</h2><br/>
            <form id='LoginForm' onSubmit={handleSubmit}>
                <Input type='text' 
                        name='ID'
                        value={value.id}
                        onChange={e => setValue({...value, id: e.target.value})}
                        placeholder='   아이디를 입력해주세요.'/><br/>
                <Text>{checkIDValidity(value.id)}</Text>
                <Input 
                    type="password" 
                    name = 'pw' 
                    value = {value.pw}
                    onChange = {e => setValue({...value, pw: e.target.value})}
                    placeholder='   비밀번호를 입력해주세요.'/>
                <Text>{checkPasswordValidity(value.pw)}</Text><br/>
                
                {activation === 1?
                <SignupButton type='submit' disabled = {!activation} color='yellow'/> : 
                <SignupButton disabled = {!activation} color='white'/>}
                
            </form>
        </Container>
    )
}

export default LoginPage;