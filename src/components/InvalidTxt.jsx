import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Vt = styled.div`
    width: 300px;
    height: 14px;
    color:red;
    font-size: 12px;
    margin-bottom: 15px;
    margin-left: 20px;
    text-align:left;
    
`

const InvalidTxt =({name, value, pw})=>{
    const [valid, setValid] = useState({
        name: 0, email: 0, age: 0, pw:0, pw2:0
    })

    const [txt, setTxt] = useState('')

    const emailPattern = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
    const pwPattern = /^[a-zA-Z0-9._%+-]+$/

    useEffect(()=>{
        switch(name){
            case 'name':
                if(value==='') setTxt('이름을 입력해주세요!');
                else setTxt('  ');
                break;

            case 'email':
                if(value==='') setTxt('이메일을 입력해주세요!');
                // else if(emailPattern.test(txt)===false) setTxt('이메일 형식에 맞게 다시 입력해주세요!');
                else setTxt('  ');
                break;

            case 'age':
                if(value==='') setTxt('나이를 입력해주세요!');
                else if(!Number.isInteger(Number(value))) setTxt('나이를 실수로 입력할 수 없습니다.');
                else if(Number(value)<0) setTxt('나이는 양수여야 합니다.');
                else if(0<=Number(value) && Number(value)<19) setTxt('19세 이상만 사용 가능합니다.');
                else setTxt('  ');
                break;

            case 'pw':
                if(value==='') setTxt('비밀번호를 입력해주세요!');
                else if(value.length < 4) setTxt('최소 4자리 이상 입력해주세요.');
                else if(12 < value.length) setTxt('최대 12자리까지 입력 가능합니다.');
                else if(pwPattern.test(value)==false) setTxt('비밀번호는 영어, 숫자, 특수문자를 입력해주세요.');
                else setTxt('  ');
                break;

            case 'pw2':
                if(value==='' || value !== pw) setTxt('비밀번호를 다시 입력해주세요!');
                else setTxt('  ');
                break;
        }
    },[value, pw])

    return(
        <>
            <Vt>{txt}</Vt>
        </>
    )
}

export default InvalidTxt