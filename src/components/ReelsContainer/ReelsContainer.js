import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import Reel from '../Reel';
import ee, {eventTypes} from "../../config/emitter";

import './ReelsContainer.scss';

class ReelsContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftReel: [],
            centerReel: [],
            rightReel: [],
        };

        ee.on(eventTypes.result, ({combination}) => {
            const [leftReel, centerReel, rightReel] = this.convertCombinationToReels(combination);
            this.setState({
                leftReel,
                centerReel,
                rightReel
            })
        })
    }

    convertCombinationToReels(combination) {
        const result = [
            [combination[0][0], combination[1][0], combination[2][0]], // leftReel
            [combination[0][1], combination[1][1], combination[2][1]], // centerReel
            [combination[0][2], combination[1][2], combination[2][2]] // rightReel
        ];
        return result;
    };

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
                    <Reel reelKey="left" slots={this.state.leftReel.length ? this.state.leftReel : undefined}/>
                </div>
                <div>
                    <Reel reelKey="center" slots={this.state.centerReel.length ? this.state.centerReel : undefined}/>
                </div>
                <div>
                    <Reel reelKey="right" slots={this.state.rightReel.length ? this.state.rightReel : undefined}/>
                </div>
            </div>
        );
    }
}

ReelsContainer.propTypes = {};

export default ReelsContainer;
