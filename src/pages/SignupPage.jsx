import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import SignupButton from '../components/SignupButton.jsx';

const Container = styled.div`
    width: 400px;
    margin-left:auto;
    margin-right:auto;
    & > h2, & > p {
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

const Text = styled.div`
    width: 300px;
    height: 14px;
    color: red;
    font-size: 12px;
    margin-bottom: 15px;
    margin-left: 20px;
    text-align: left;
`;

const SignupPage = () => {
    const [activation, setActivation] = useState(0);
    const [error, setError] = useState('');
    const [value, setValue] = useState({
        name: '', id: '', email: '', age: '', pw: '', pw2: ''
    });
    const navigate = useNavigate();

    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    const pwPattern = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{4,12}$/;

    // 서버로 전송
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activation === 1) {
            try {
                const payload = {
                    name: value.name,
                    email: value.email,
                    age: value.age,
                    username: value.id,
                    password: value.pw,
                    passwordCheck: value.pw2,
                };
                console.log("Payload:", payload); // 콘솔 출력
                console.log(JSON.stringify(payload));
                const response = await fetch('http://localhost:8080/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });
                // console.log(JSON.stringify(payload));
                const data = await response.json();
                if (response.ok) {
                    alert('회원가입이 정상적으로 처리되었습니다!');
                    navigate('/login');
                } else {
                    console.log("Server Response:", data);
                    setError(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                setError('회원가입 중 오류가 발생했습니다.');
            }
        }
    };

    useEffect(() => {
        const nameValidity = checkNameValidity(value.name);
        const idValidity = checkIDValidity(value.id);
        const emailValidity = checkEmailValidity(value.email);
        const ageValidity = checkAgeValidity(value.age);
        const pwValidity = checkPasswordValidity(value.pw);
        const pw2Validity = checkPasswordMatch(value.pw, value.pw2);

        if (
            nameValidity === '' &&
            idValidity === '' &&
            emailValidity === '' &&
            ageValidity === '' &&
            pwValidity === '' &&
            pw2Validity === ''
        ) {
            setActivation(1);
        } else {
            setActivation(0);
        }
    }, [value]);

    const checkNameValidity = (name) => {
        if (name === '') return '이름을 입력해주세요!';
        return '';
    };

    const checkIDValidity = (id) => {
        if (id === '') return '아이디를 입력해주세요!';
        return '';
    };

    const checkEmailValidity = (email) => {
        if (email === '') return '이메일을 입력해주세요!';
        else if (!emailPattern.test(email)) return '이메일 형식에 맞게 다시 입력해주세요!';
        return '';
    };

    const checkAgeValidity = (age) => {
        if (age === '') return '나이를 입력해주세요!';
        else if (isNaN(age)) return '나이는 숫자를 입력받아야합니다.';
        else if (!Number.isInteger(Number(age) % 1)) return '나이는 소수가 될 수 없습니다.';
        else if (Number(age) < 0) return '나이는 양수여야 합니다.';
        else if (Number(age) < 19) return '19세 이상만 사용 가능합니다.';
        return '';
    };

    const checkPasswordValidity = (pw) => {
        if (pw === '') return '비밀번호를 입력해주세요!';
        else if (pw.length < 4) return '최소 4자리 이상 입력해주세요.';
        else if (pw.length > 12) return '최대 12자리까지 입력 가능합니다.';
        else if (!pwPattern.test(pw)) return '비밀번호는 영어, 숫자, 특수문자를 입력해주세요.';
        return '';
    };

    const checkPasswordMatch = (pw, pw2) => {
        if (pw2 === '') return '비밀번호를 다시 입력해주세요!';
        else if (pw !== pw2) return '비밀번호가 일치하지 않습니다';
        return '';
    };

    return (
        <Container>
            <br/><br/><br/>
            <h2>회원가입 페이지</h2><br/>
            {error && <Text>{error}</Text>}
            <form id='SignUpForm' onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name='name'
                    value={value.name}
                    onChange={e => setValue({ ...value, name: e.target.value })}
                    placeholder='   이름을 입력해주세요.' />
                <Text>{checkNameValidity(value.name)}</Text>
                <Input
                    type="text"
                    name='id'
                    value={value.id}
                    onChange={e => setValue({ ...value, id: e.target.value })}
                    placeholder='   아이디를 입력해주세요.' />
                <Text>{checkIDValidity(value.id)}</Text>
                <Input
                    type="text"
                    name='email'
                    value={value.email}
                    onChange={e => setValue({ ...value, email: e.target.value })}
                    placeholder='   이메일을 입력해주세요.' />
                <Text>{checkEmailValidity(value.email)}</Text>
                <Input
                    type="text"
                    name='age'
                    value={value.age}
                    onChange={e => setValue({ ...value, age: e.target.value })}
                    placeholder='   나이를 입력해주세요.' />
                <Text>{checkAgeValidity(value.age)}</Text>
                <Input
                    type="password"
                    name='pw'
                    value={value.pw}
                    onChange={e => setValue({ ...value, pw: e.target.value })}
                    placeholder='   비밀번호를 입력해주세요.' />
                <Text>{checkPasswordValidity(value.pw)}</Text>
                <Input
                    type="password"
                    name='pw2'
                    value={value.pw2}
                    onChange={e => setValue({ ...value, pw2: e.target.value })}
                    placeholder='   비밀번호 확인' />
                <Text>{checkPasswordMatch(value.pw, value.pw2)}</Text><br/>
                {activation === 1 ? 
                    <SignupButton type='submit' disabled={!activation} color='yellow' /> :
                    <SignupButton disabled={!activation} color='white' />}
            </form>
            <p>이미 아이디가 있으신가요? <Link to="/login">로그인 페이지로 이동하기</Link></p>
        </Container>
    );
}

export default SignupPage;
