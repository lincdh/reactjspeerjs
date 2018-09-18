import React, { Component } from 'react';
import { Input, Button } from '@material-ui/core';

import '../styles/AuthModal.css';

class AuthModal extends Component {
    render() {
        return (
            <div id='auth-modal-container'>
                <div id='username-field' >
                    <label>Email:</label>
                    <Input placeholder='email' />
                </div>
                <div id='username-field' >
                    <label>Username:</label>
                    <Input placeholder='username' />
                </div>
                <div id='password-field' >
                    <label>Password:</label>
                    <Input placeholder='username' />
                </div>
                <Button variant='contained' size='small' color='default' onClick={this.handleModalOpen}>SIGN IN</Button>
            </div>
        )
    }
}

export default AuthModal;