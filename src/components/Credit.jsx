import React from "react";
import styled from "styled-components";

const Container=styled.div`
    height: 200px;
    text-align: center;
`;

const Img=styled.div`
    display:block;
    // width: 500;
    // height: auto;
`;

const Credit =({profile_path, name, known_for_department})=>{
    return(
        <Container>
            <Img src={`https://image.tmdb.org/t/p/w45/${profile_path}`} alt='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s'/>
            <p style={{color:'white'}}>{name}</p>
            <p style={{color:'white'}}>{known_for_department}</p>
        </Container>
        
    )
};
export default Credit;