import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css'
import { Button, Input, Dialog   } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import AuthModal from './AuthModal';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false
        }
    }

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
                    <Button variant='contained' size='small' style={{ marginRight: '5px' }} color='default' onClick={this.handleModalOpen}>SIGN IN</Button>
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

    renderModal = () => (
        <Dialog 
            aria-labelledby="responsive-dialog-title"
            open={this.state.isModalOpen}
            onClose={this.handleModalClose}
        >
            <AuthModal />
        </Dialog>
    )

    handleModalClose = () => {
        this.setState({ isModalOpen: false });
    }

    handleModalOpen = () => {
        this.setState({ isModalOpen: true });
    }

    render() {
        return (
            <header className="App-header">
                {this.renderNavBar()}
                {this.renderActivityBar()}
                {this.renderModal()}
            </header>
        )
    }
}

export default Header;