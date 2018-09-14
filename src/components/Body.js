import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import ScreenRTC from './ScreenRTC';
import Guests from './Guests';

class Body extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={ScreenRTC} />
                <Route path="/guest" component={Guests} />
            </div>
        )
    }
}

export default Body;