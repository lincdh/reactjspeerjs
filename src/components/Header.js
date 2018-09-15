import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '../styles/Header.css'

class Header extends Component {
    render() {
        return (
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Link to='/'><h1 className="App-title">Home</h1></Link>
            </header>
        )
    }
}

export default Header;