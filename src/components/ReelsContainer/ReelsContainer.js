import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import Reel from '../Reel';

import _ from 'lodash';
import slotConfig from '../../config/slot.config';
import gameConfig from '../../config/game.config';
import ee, {eventTypes} from "../../config/emitter";

import './ReelsContainer.scss';

class ReelsContainer extends Component {
    constructor(props) {
        super(props);

        this.finishedReels = 0;

        this.state = {
            leftReel: this.getRandomSlots(3),
            centerReel: this.getRandomSlots(3),
            rightReel: this.getRandomSlots(3),
            winSlots: [
                [false, false, false], // leftReel
                [false, false, false], // centerReel
                [false, false, false] // rightReel
            ],
        };

        this.onResult = this.onResult.bind(this);
        this.onGameStart = this.onGameStart.bind(this);
        this.onGameEnd = this.onGameEnd.bind(this);
        this.onSpinEnd = this.onSpinEnd.bind(this);

        ee.on(eventTypes.result, this.onResult);
        ee.on(eventTypes.gameStart, this.onGameStart);
        ee.on(eventTypes.gameEnd, this.onGameEnd);
    }

    componentWillUnmount() {
        ee.off(eventTypes.result, this.onResult);
        ee.off(eventTypes.gameStart, this.onGameStart);
        ee.off(eventTypes.gameEnd, this.onSpinEnd);
    }

    getRandomSlots(limit = 1) {
        return _(slotConfig.symbolsOrder)
            .shuffle()
            .take(limit)
            .valueOf()
    }

    convertCombinationToReels(combination) {
        const result = [
            [combination[0][0], combination[1][0], combination[2][0]], // leftReel
            [combination[0][1], combination[1][1], combination[2][1]], // centerReel
            [combination[0][2], combination[1][2], combination[2][2]] // rightReel
        ];
        return result;
    }

    convertLinesToWinSlots(winLines) {
        const winSlots = [
            winLines.has('top'),
            winLines.has('center'),
            winLines.has('bottom'),
        ];
        return [winSlots, winSlots, winSlots];
    }

    onResult({ winLines, combination }) {
        const [leftReel, centerReel, rightReel] = this.convertCombinationToReels(combination);

        this.setState({
            leftReel,
            centerReel,
            rightReel,
            winSlots: this.convertLinesToWinSlots(winLines),
        });
    }

    onSpinEnd() {
        this.finishedReels++;
        if (this.finishedReels >= gameConfig.reelsCount) {
            _.defer(() => ee.emit(eventTypes.spinEnd));
        }
    }

    onGameStart() {
        // Clear win slots
        this.setState({
            winSlots: [
                [false, false, false], // leftReel
                [false, false, false], // centerReel
                [false, false, false] // rightReel
            ]
        });
    }

    onGameEnd() {
        this.finishedReels = 0;
    }

    render() {
        return (
            <div className="uk-grid uk-grid-collapse reels-container">
                <div>
                    <div className="uk-flex-column uk-flex uk-flex-between uk-height-1-1 uk-padding-small">
                        <span>Top line: </span>
                        <span>Center line: </span>
                        <span>Bottom line: </span>
                    </div>
                </div>
                <div className="reel-1">
                    <Reel onSpinEnd={() => this.onSpinEnd('left')} reelKey="left" winSlots={this.state.winSlots[0]} slots={this.state.leftReel}/>
                </div>
                <div className="reel-2">
                    <Reel onSpinEnd={() => this.onSpinEnd('center')} reelKey="center" winSlots={this.state.winSlots[1]} slots={this.state.centerReel}/>
                </div>
                <div className="reel-3">
                    <Reel onSpinEnd={() => this.onSpinEnd('right')} reelKey="right" winSlots={this.state.winSlots[2]} slots={this.state.rightReel}/>
                </div>
            </div>
        );
    }
}

ReelsContainer.propTypes = {};

export default ReelsContainer;
