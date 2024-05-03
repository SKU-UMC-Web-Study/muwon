import React, {useState, useEffect}  from 'react';

import './Page.css'
import Banner from '../components/Banner.jsx'

const MainPage= () => {
    return(
        <div>
            <Banner/>
            <div id='findMovie'>
                <p style={{color: 'white', fontWeight:'bold',fontSize:'20px'}}>Find your movies!</p>
                <></>
                <form>
                    <input id='search' type='text' style={{marginRight:'10px'}}/>
                    <button><img style={{width:'20px'}} src='src\img\lens.png'/></button>
                </form>
            </div>
            
        </div>
        
    )
}

export default MainPage;