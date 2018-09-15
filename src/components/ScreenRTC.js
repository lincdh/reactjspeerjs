import React, { Component } from 'react';
import io from 'socket.io-client';
import RecordRTC from 'recordrtc';
//import SimplePeer from 'simple-peer';
import Peer from 'peerjs';
import uid from 'uid';
import $ from 'jquery';
import { Link } from 'react-router-dom';

//const socket = io.connect('http://localhost:3001');
const socket = io.connect('https://livebroadcasting.herokuapp.com'); // production

const isFirefox = typeof window.InstallTrigger !== 'undefined';
const isOpera = !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
const isChrome = !!window.chrome && !isOpera;

let chromeMediaSource = 'screen';
let sourceId;
let screenCallback;

let xirsysConfig;
$.ajax ({
  url: "https://global.xirsys.net/_turn/MyFirstApp/",
  type: "PUT",
  async: false,
  headers: {
    "Authorization": "Basic " + btoa("jimmydo174:b7914192-b822-11e8-8675-7e29e045fd79")
  },
  success: function (res){
    xirsysConfig = res.v.iceServers;
  }
});

const onMessageCallback = (data) => {
  if (data === 'PermissionDeniedError') {
    chromeMediaSource = 'PermissionDeniedError';
    if (screenCallback)  return screenCallback('PermissionDeniedError')
    else throw new Error('PermissionDeniedError');
  }

  if (data === 'rtcmulticonnection-extension-loaded') {
    chromeMediaSource = 'desktop';
  }

  if (data.sourceId && screenCallback) {
    screenCallback(sourceId = data.sourceId, data.canRequestAudioTrack === true);
  }
}

window.addEventListener('message', function(event) {
  if (event.origin !== this.window.location.origin) {
    return;
  }
  try {
    onMessageCallback(event.data);
  } catch (err) {
    console.log(err);
  }
  
});

class ScreenRTC extends Component {
    constructor(props) {
      super(props);
      this.state = {
        stream: null
      }
    }

    getScreenConstraints = (cb, captureSourceIdWithAudio) => {
      const firefoxScreenConstraints = {
        mozMediaSource: 'window',
        mediaSource: 'window',
      };

      if(isFirefox) return cb(null, firefoxScreenConstraints);

      const screen_constraints = {
        mandatory: {
          chromeMediaSource: chromeMediaSource,
          maxWidth: window.screen.width > 1920 ? window.screen.width : 1920,
          maxHeight: window.screen.height > 1080 ? window.screen.height : 1080
        },
        optional: []
      }

      if (chromeMediaSource == 'desktop' && !sourceId) {
        if(captureSourceIdWithAudio) {
            this.getSourceIdWithAudio(function(sourceId, canRequestAudioTrack) {
                screen_constraints.mandatory.chromeMediaSourceId = sourceId;

                if(canRequestAudioTrack) {
                    screen_constraints.canRequestAudioTrack = true;
                }
                cb(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
            });
        }
        else {
            this.getSourceId(function(sourceId) {
                screen_constraints.mandatory.chromeMediaSourceId = sourceId;
                cb(sourceId == 'PermissionDeniedError' ? sourceId : null, screen_constraints);
            });
        }
        return;
      }

      // this statement sets gets 'sourceId" and sets "chromeMediaSourceId" 
      if (chromeMediaSource == 'desktop') {
          screen_constraints.mandatory.chromeMediaSourceId = sourceId;
      }

      // now invoking native getUserMedia API
      cb(null, screen_constraints);
    }
    
    getSourceId = (callback) => {
      if (!callback) throw '"callback" parameter is mandatory.';
      if(sourceId) return callback(sourceId);
      
      screenCallback = callback;
      window.postMessage('get-sourceId', '*');
    }
    
    getSourceIdWithAudio = (callback) => {
      if (!callback) throw '"callback" parameter is mandatory.';
      if(sourceId) return callback(sourceId);
      
      screenCallback = callback;
      window.postMessage('audio-plus-tab', '*');
    }
    
    componentWillMount() {
    }

    onGetScreen = () => {
      this.getScreenConstraints((err, screen_constraints) => {
        if (err) {
          return console.log(err);
        }

        if (navigator.mediaDevices.getUserMedia === undefined) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
  
              // First get ahold of the legacy getUserMedia, if present
              var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
  
              // Some browsers just don't implement it - return a rejected promise with an error
              // to keep a consistent interface
              if (!getUserMedia) {
                  return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
              }
  
              // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
              return new Promise(function(resolve, reject) {
                  getUserMedia.call(navigator, constraints, resolve, reject);
              });
          }
      }
      
      navigator.mediaDevices.getUserMedia({ video: screen_constraints, audio: screen_constraints.canRequestAudioTrack ? screen_constraints: false })
          .then((stream) => {
              this.setState({ stream: stream });
              var video = document.querySelector('video');
              // Older browsers may not have srcObject
              if ("srcObject" in video) {
                  video.srcObject = stream;
              } else {
                  // Avoid using this in new browsers, as it is going away.
                  video.src = window.URL.createObjectURL(stream);
              }
              video.onloadedmetadata = function(e) {
                  video.play();
              };

              // peer streaming
              const config = { 
                  host: 'quiet-plateau-63014.herokuapp.com', 
                  port: 443, secure: true, 
                  key: 'peerjs', 
                  config:  { iceServers: xirsysConfig}
              };

              const peer = Peer('123', config);
              console.log(peer);

              socket.on('new-connection', peerId => {
                peer.call(peerId, stream);
                // the code below cause prolbem when guest page reloading
                // const conn = peer.connect(peerId);
                // conn.on('open', () => {
                //   conn.send('hi!');
                // });
              })

              // simple-peer
              //const peer = new SimplePeer({ initiator: window.location.hash === '#1', trickle: false, stream: stream });
              ///const peer2 = new SimplePeer({});
              
              // if (window.location.hash === '#1') {
              //   peer.on('signal', function(token) {
              //     const textArea = document.getElementById('text-area');
              //     textArea.value = JSON.stringify(token);
              //     //peer2.signal(token);
              //     socket.emit('offerPeer', token);
              //   });

              //   socket.on('sentAnswerPeer', token => {
              //     peer.signal(token);
              //     console.log(token);
              //   })
  
              //   // peer2.on('signal', function(token) {
              //   //   peer.signal(token);
              //   // });
  
              //   peer.on('connect', function () {
              //     console.log('connect');
              //     // wait for 'connect' event before using the data channel
              //     peer.send('hey peer2, how is it going?')
              //   })
  
                document.getElementById('stop-screen').addEventListener('click', function() {
                  stream.getTracks().forEach(track => track.stop());
                  var video = document.querySelector('video');
                  video.srcObject = null;
                  peer.on('close', () => {
                    console.log('closed');
                  })
                });
              // }
              
          })
          .catch(function(err) {
              console.log(err.name + ": " + err.message);
          });
      }, true);
    }

    onStopScreen = () => {
      sourceId = null;
      this.state.stream.getTracks().forEach(track => track.stop());
      var video = document.querySelector('video');
      video.srcObject = null;
    }

    onGetUid = () => {
      const id = uid(10);
      document.getElementById('peer-id').append(id);
      return id;
    }
    
    render() {
        return (
            <div>
              <h3 id="peer-id">My peer id: </h3>
              <video controls style={{ display: 'block', margin: '10px auto', maxWidth: '50%'}} autoPlay id="screen-view"></video>
              <video controls style={{ display: 'block', margin: '10px auto', maxWidth: '50%'}} autoPlay id="remote-screen-view"></video>
              <button id="get-screen" onClick={this.onGetScreen} >Get the screen</button>
              <button id="stop-screen" >Stop the screen</button>
              <Link to='/guest'><button>Go to guest page</button></Link>
            </div>
        );
    }
}

export default ScreenRTC;