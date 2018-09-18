import React, { Component } from 'react';

import NowPlayingIcon from '@material-ui/icons/Equalizer';

import logo from '../../src/logo.svg';
import '../styles/Home.css';
import Card from '../ui/Card';

class Home extends Component {
    render() {
        return (
            <div id='home-container'>
                <div id='home-header'>
                    <div id='now-playing-tab'>
                        <div style={{ marginRight: '5px' }}>Now Playing</div>
                        <NowPlayingIcon />
                    </div>
                    <div id='next-to-now-playing'></div>
                </div>
                <div id='video-list'>
                    <div id='video'>
                        <Card
                            imgSrc={logo}
                            username='username'
                            desc='#lol #yasuo #leagueoflegends'
                            href='/broadcaster'
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;