import React from "react";
import "./Nav.css";
import gh from './../../assets/gh.png';
import logo from './../../assets/logo flash.png';

const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-left">
                <img className="flash-logo" src={logo} alt="logo" />
                <p className="flash-logo-text">TypeGraph</p>
            </div>
            <div className="nav-right">
                <a 
                    target='_blank' 
                    className='nav-gh-link' 
                    href="https://github.com/anshumanrana331/TypeGraph"
                    rel='noreferrer'
                >
                    <img className='nav-gh-icon' src={gh} alt=""/>
                </a>
            </div>
        </div>
    );
};

export default Nav;
