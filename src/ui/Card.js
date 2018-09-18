import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PlayIcon from '@material-ui/icons/PlayCircleFilled';

import '../styles/ui/Card.css';

class Card extends Component {
    render() {
        return (
            <div id='card-container'>
                <img src={this.props.imgSrc} />
                <div id='card-desc'>
                    <strong id='card-username'>{this.props.username}</strong>
                    <div id='desc'>{this.props.desc}</div>
                </div>
                <div id='card-action'>
                    <Link to={this.props.href}><PlayIcon /></Link>
                </div>
            </div>
        )
    }
}

export default Card;