import React, { Component } from 'react';
import io from 'socket.io-client';
import RecordRTC from 'recordrtc';
import SimplePeer from 'simple-peer';

const socket = io.connect('http://localhost:3001');

class Guests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stream: null
        }
    }
    componentWillMount() {
        const peer = new SimplePeer({});
        peer.on('signal', token => {
            socket.emit('answerPeer', token)
        });

        socket.on('sentOfferPeer', token => {
            peer.signal(token);
            console.log(token);
        });

        peer.on('data', function(data) {
          var string = new TextDecoder("utf-8").decode(data);
          console.log(string);
        });

        peer.on('stream', (stream) => {
            this.setState({ stream: stream });
            const video = document.getElementById('video');
            video.srcObject = stream;
            video.onloadedmetadata = function() {
                video.play();
            }
            console.log(stream);
        });
    }

    render() {
        return (
            <video controls id='video' style={{ display: 'block', margin: '10px auto', maxWidth: '50%'}} ></video>
        )
    }
}

export default Guests;