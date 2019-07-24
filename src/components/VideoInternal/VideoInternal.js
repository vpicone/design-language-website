import React from 'react';
import PropTypes from 'prop-types';
import { settings } from 'carbon-components';

import PlayPauseButton from '../PlayPauseButton';

const { prefix } = settings;

class VideoInternal extends React.Component {
  state = {
    playing: true,
    hovering: false,
  };

  componentDidMount() {
    this.videoRef.addEventListener('ended', this.onVideoEnded);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextState.playing !== this.state.playing) {
      if (nextState.playing) {
        this.videoRef.play();
      } else {
        this.videoRef.pause();
      }
    }
    return true;
  }

  componentWillUnmount() {
    this.videoRef.removeEventListener('ended', this.onVideoEnded);
  }

  onPlayPauseClick = () => {
    this.setState(prevState => ({
      playing: !prevState.playing,
    }));
  };

  onVideoEnded = () => {
    const { loop } = this.props;

    if (!loop) {
      this.setState({
        playing: false,
      });
    }
  };

  onMouseOver = () => {
    this.setState({
      hovering: true,
    });
  };

  onMouseOut = () => {
    this.setState({
      hovering: false,
    });
  };

  render() {
    const {
      poster,
      src,
      loop,
      overlay,
      cornerPlayButton,
      children,
    } = this.props;
    const { playing, hovering } = this.state;

    return (
      <div
        className={`${prefix}--video-internal-container`}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
        onFocus={this.onMouseOver}
        onBlur={this.onMouseOut}>
        <video
          className={`${prefix}--video-internal`}
          controls={false}
          autoPlay
          loop={loop}
          muted
          preload="auto"
          playsInline
          poster={poster}
          ref={video => (this.videoRef = video)}>
          <source src="videos/hero-video.webm" type="video/webm" />
          <source src="videos/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {overlay && <div className={`${prefix}--video-internal-overlay`} />}
        {children}
        {
          <PlayPauseButton
            onClick={this.onPlayPauseClick}
            playing={playing}
            loop={loop}
            cornerPlayButton={cornerPlayButton}
            hovering={hovering}
          />
        }
      </div>
    );
  }
}

VideoInternal.propTypes = {
  // poster image path
  poster: PropTypes.string,

  // video image path
  src: PropTypes.string,

  // loop boolean
  loop: PropTypes.bool,

  // black overlay over video
  overlay: PropTypes.bool,

  // button in lower left corner
  cornerPlayButton: PropTypes.bool,
};

export default VideoInternal;
