import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import Reel from '../Reel';

import _ from 'lodash';
import slotConfig from '../../config/slot.config';
import ee, {eventTypes} from "../../config/emitter";

import './ReelsContainer.scss';

class ReelsContainer extends Component {
    constructor(props) {
        super(props);

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

        ee.on(eventTypes.result, this.onResult);
        ee.on(eventTypes.gameStart, this.onGameStart);
    }

    componentWillUnmount() {
        ee.off(eventTypes.result, this.onResult);
        ee.off(eventTypes.gameStart, this.onGameStart);
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
        const winSlots =[
            winLines.has('top'),
            winLines.has('center'),
            winLines.has('bottom'),
        ];
        const result = [
            _.fill(this.state.winSlots[0], false).concat(winSlots),
            _.fill(this.state.winSlots[1], false).concat(winSlots),
            _.fill(this.state.winSlots[2], false).concat(winSlots),
        ];
        return result;
    }

    onResult({ winLines, combination }) {
        const [leftReel, centerReel, rightReel] = this.convertCombinationToReels(combination);

        this.setState(state => ({
            leftReel: state.leftReel.concat(leftReel),
            centerReel: state.centerReel.concat(centerReel),
            rightReel: state.rightReel.concat(rightReel),
            winSlots: this.convertLinesToWinSlots(winLines),
        }));
    }

    onGameStart() {
        // Remove redundant slots
        this.setState(({leftReel, centerReel, rightReel}) => ({
            leftReel: _.takeRight(leftReel, 3),
            centerReel: _.takeRight(centerReel, 3),
            rightReel: _.takeRight(rightReel, 3),
            winSlots: [
                [false, false, false], // leftReel
                [false, false, false], // centerReel
                [false, false, false] // rightReel
            ]
        }));
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
                <div>
                    <Reel reelKey="left" winSlots={this.state.winSlots[0]} slots={this.state.leftReel}/>
                </div>
                <div>
                    <Reel reelKey="center" winSlots={this.state.winSlots[1]} slots={this.state.centerReel}/>
                </div>
                <div>
                    <Reel reelKey="right" winSlots={this.state.winSlots[2]} slots={this.state.rightReel}/>
                </div>
            </div>
        );
    }
}

ReelsContainer.propTypes = {};

export default ReelsContainer;
