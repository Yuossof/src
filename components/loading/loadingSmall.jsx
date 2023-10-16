import React from 'react';
import './loadingSmall.css'
const LoadingSmall = () => {
    return (

        <div className="loader">
            <div className='l'>
                <li className="ball" />
                <li className="ball" />
                <li className="ball" />
            </div>
        </div>

    );
}

export default LoadingSmall;
