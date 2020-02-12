import React from 'react';
// import PropTypes from 'prop-types';
import ee, {eventTypes} from "../../config/emitter";

class DebugArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gameResult: undefined,
            gameId: 0
        };

        this.onLoose = this.onLoose.bind(this);
        this.onWin = this.onWin.bind(this);
        this.onGameStart = this.onGameStart.bind(this);

        ee.on(eventTypes.win, this.onWin);
        ee.on(eventTypes.loose, this.onLoose);
        ee.on(eventTypes.gameStart, this.onGameStart);
    }

    componentWillUnmount() {
        ee.off(eventTypes.win, this.onWin);
        ee.off(eventTypes.loose, this.onLoose);
        ee.off(eventTypes.gameStart, this.onGameStart);
    }

    onWin() {
        this.setState({ gameResult: 'WIN'})
    }

    onLoose() {
        this.setState({ gameResult: 'LOOSE'})
    }

    onGameStart({ gameId }) {
        this.setState({
            gameId,
            gameResult: 'PENDING',
        })
    }

    render() {
        return (
            <div className="uk-card">
                <h5>Debug Area.</h5>
                Game id: {this.state.gameId}
                <br/>
                Game Result: <span className="uk-text-uppercase">{this.state.gameResult} </span>
            </div>
        );
    }
}

export default DebugArea;
