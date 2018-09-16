import React, { Component } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import { Button, Input } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

class Header extends Component {
    renderNavBar = () => {
        return (
            <nav id='nav-wrapper'>
                <div id='left-nav'>
                    <h3 id="logo">LiveEnter</h3>
                    <ul>
                        <li>home</li>
                        <li>
                            <div id='search-input'>
                                <Input placeholder="Search…"
                                    disableUnderline
                                />
                                <SearchIcon style={{ color: 'black'}} />
                            </div>
                         </li>
                    </ul>
                </div>
                <div id='right-nav'>
                    <Button variant='contained' size='small' style={{ marginRight: '5px' }} color='default'>SIGN IN</Button>
                    <Button variant='contained' size='small' color="primary">JOIN NOW</Button>
                </div>
            </nav>
        );
    }

    renderActivityBar = () => {
        return (
            <div id='activity-bar'>
                <div style={{ width: '85'}}>
                    <ul>
                        <li>start broadcasting</li>
                        <li>tags</li>
                        <li>top cam</li>
                    </ul>
                </div>
                <div id='button-gamer-signup'>
                    <Button variant='contained' color="secondary" size='small'>GAMER SIGNUP</Button>
                </div>
            </div>
        )
    }
    render() {
        return (
            <header className="App-header">
                {this.renderNavBar()}
                {this.renderActivityBar()}
                
            </header>
        )
    }
}

export default Header;