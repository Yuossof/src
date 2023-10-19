import React from 'react';
import './Smbtns.css'
const SmediaBtns = () => {
    return (
        <div>
            <ul className="wrapper">
                <li className="icon facebook">
                    <span className="tooltip">Facebook</span>
                    <span>
                        <i className="fab fa-facebook-f" />
                    </span>
                </li>
                <li className="icon twitter">
                    <span className="tooltip">Twitter</span>
                    <span>
                        <i className="fab fa-twitter" />
                    </span>
                </li>
                <li className="icon instagram">
                    <span className="tooltip">Instagram</span>
                    <span>
                        <i className="fab fa-instagram" />
                    </span>
                </li>
            </ul>

        </div>
    );
}

export default SmediaBtns;
