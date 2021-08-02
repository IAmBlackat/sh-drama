import React, { Component } from 'react';
import Hls from 'hls.js';

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls({
      xhrSetup: (xhr) => {
        // xhr.withCredentials = true
        // xhr.setRequestHeader({
        //   "Content-Type": "application/x-mpegURL",
        //   "Access-Control-Allow-Origin": "*",
        //   "Referrer Policy": "no-referrer"
        // })
        // xhr.setRequestHeader("Host", "v.vrv.co")
      }
    });
  }

  componentDidMount() {
    // `src` is the property get from this component
    // `video` is the property insert from `Video` component
    // `video` is the html5 video element
 
    const { src, video } = this.props;
    // load hls video source base on hls.js
    if (Hls.isSupported()) {
      // this.hls.loadSource(src);
      this.hls.attachMedia(video);
      // this.hls.config.xhrSetup(config)
      // this.hls.config.xhrSetup({
      //   "Referrer Policy": "no-referrer"
      // })
      this.hls.on(Hls.Events.MEDIA_ATTACHED, () => {
        this.hls.loadSource(src)
        this.hls.on(Hls.Events.MANIFEST_PARSED, (e, data) => {
          video.play();
          console.log(data)
  
        });
      })
      
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
        
      />
    );
  }
}