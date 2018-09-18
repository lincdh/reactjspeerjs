import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Broadcaster from './Broadcaster';
import Guests from './Guests';
import '../styles/Body.css';
import Home from './Home';

class Body extends Component {
    render() {
        return (
            <div id='body-container'>
                <Route exact path='/' component={Home} />
                <Route path="/broadcaster" component={Broadcaster} />
                <Route path="/guest" component={Guests} />
            </div>
        )
    }
}

export default Body;