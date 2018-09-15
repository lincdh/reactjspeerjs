import React, { Component } from 'react';
import io from 'socket.io-client';
import RecordRTC from 'recordrtc';
//import SimplePeer from 'simple-peer';
import Peer from 'peerjs';
import uid from 'uid';

const socket = io.connect('http://localhost:3001');

class Guests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            peerId: ''
        }
    }
    componentWillMount() {
        const config = { 
            host: 'quiet-plateau-63014.herokuapp.com', 
            port: 443, secure: true, 
            key: 'peerjs', 
            config: {
            'iceServers': [
                { url: 'stun:stun1.l.google.com:19302' },
                {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                }
            ]
        }};

        const peer = Peer('p4567', config);

        socket.emit('new-peer-id', 'p4567');

        peer.on('call', function(call) {
            call.answer();
            call.on('stream', retmoteStream => {
                 const video = document.getElementById('video');
                video.srcObject = retmoteStream;
                video.onloadedmetadata = function() {
                    video.play();
                }
            });
        });
    //     const peer = new SimplePeer({});
    //     peer.on('signal', token => {
    //         socket.emit('answerPeer', token)
    //     });

    //     socket.on('sentOfferPeer', token => {
    //         peer.signal(token);
    //         console.log(token);
    //     });

    //     peer.on('data', function(data) {
    //       var string = new TextDecoder("utf-8").decode(data);
    //       console.log(string);
    //     });

    //     peer.on('stream', (stream) => {
    //         this.setState({ stream: stream });
    //         const video = document.getElementById('video');
    //         video.srcObject = stream;
    //         video.onloadedmetadata = function() {
    //             video.play();
    //         }
    //         console.log(stream);
    //     });
    }

    onGetUid = () => {
        const id = uid(10);
        document.getElementById('peer-id').append(id);
        return id;
    }

    onPeerIdChange = (event) => {
        this.setState({ peerId: event.target.value });
    }

    onCall = () => {
        const config = { 
            host: 'quiet-plateau-63014.herokuapp.com', 
            port: 443, secure: true, 
            key: 'peerjs', 
            config: {
            'iceServers': [
                { url: 'stun:stun1.l.google.com:19302' },
                {
                    url: 'turn:numb.viagenie.ca',
                    credential: 'muazkh',
                    username: 'webrtc@live.com'
                }
            ]
        }};

        const peer = Peer(this.state.peerId, config);

        socket.emit('new-peer-id', this.state.peerId);

        peer.on('call', function(call) {
            call.answer();
            call.on('stream', retmoteStream => {
                 const video = document.getElementById('video');
                video.srcObject = retmoteStream;
                video.onloadedmetadata = function() {
                    video.play();
                }
            });
        });
    }

    render() {
        return (
            <div>
                <video controls id='video' style={{ display: 'block', margin: '10px auto', maxWidth: '50%'}} ></video>
                <input value={this.state.peerId} onChange={this.onPeerIdChange} type='text' />
                <br/>
                <button onClick={this.onCall}>Call</button>
            </div>
        )
    }
}

export default Guests;