import React, { useEffect, useState } from 'react';

const Header = () =>{
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(()=>{
        const timer = setInterval(()=>setCurrentTime(new Date()), 1000);
        return ()=>clearInterval(timer);
    },[]);

    const formatDate = (date) =>{
        const options = {year: 'numeric', month:'long', day:'numeric', weekday: 'long'};
        return date.toLocaleDateString('ko-KR', options);
    };

    const formatTime = (date) =>{
        return date.toLocaleTimeString('ko-KR');
    }

    return(
        <div>
            <h1>{formatDate(currentTime)}</h1>
            <p>{formatTime(currentTime)}</p>
        </div>
    );
};

export default Header;