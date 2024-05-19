import React from "react"
import styled from "styled-components"


const StyledButton = styled.button`
    width: 400px;
    height: 40px;
    border-radius: 20px;
    margin-bottom: 20px;
    color: black;
`
const SignupButton=({color})=>{

    return(
        <>
        <StyledButton style={{backgroundColor:color}}>제출하기</StyledButton>
        </>
    )
    
}

export default SignupButton;