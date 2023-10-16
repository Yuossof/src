import React from 'react';
import './loading.css'

const Loading = () => {
    return (
        <div>
            <div className="cssload-container">
                <ul className="cssload-flex-container">
                    <li>
                        <span className="cssload-loading cssload-one" />
                        <span className="cssload-loading cssload-two" />
                        <span className="cssload-loading-center" />
                    </li>
                </ul>
            </div>


        </div>
    );
}

export default Loading;
