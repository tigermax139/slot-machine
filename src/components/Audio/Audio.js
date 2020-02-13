import React from 'react';
import PropTypes from 'prop-types';
import ee, {eventTypes} from "../../config/emitter";

// Extend Audio class
Audio.prototype.reset = function () {
    this.pause();
    this.currentTime = 0;
    return this;
};

class AudioContainer extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio(props);

        this.onStart = this.onStart.bind(this);
        this.onReset = this.onReset.bind(this);

        ee.on(props.playOn, this.onStart);
        ee.on(props.resetOn, this.onReset);
    }

    componentWillUnmount() {
        ee.off(this.props.playOn, this.onStart);
        ee.off(this.props.resetOn, this.onReset);
    }

    onStart() {
        this.audio.play();
    }

    onReset() {
        this.audio.reset();
    }

    render() {
        return super.render();
    }
}

AudioContainer.propTypes = {
    src: PropTypes.string.isRequired,
    playOn: PropTypes.oneOf(Object.keys(eventTypes)).isRequired,
    resetOn: PropTypes.oneOf(Object.keys(eventTypes)).isRequired
};

export default AudioContainer;