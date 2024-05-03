import React,{ useState } from 'react'

const Spinner = ({loadingState}) =>{
    const [loading, setLoading] = useState(loadingState);

    const Loading =()=>{
        setLoading(false);
    }

    return(
        <div class='spinContainer'>
            <div class='spinCycle'></div>
        </div>
    )
}