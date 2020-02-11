import React, {Component} from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import './Reel.scss';

import ReelSymbol from '../ReelSymbol';

import slotConfig from '../../config/slot.config';

class Reel extends Component {
    render() {
        return (
            <div className="uk-position-relative reel">
                <div
                   // className="reel-visible"
                    data-slot-count={this.props.slots.length}>
                    {
                        this.props.slots
                            .map((symbolName, i) => (
                                    <ReelSymbol
                                        config={slotConfig.symbolsList[symbolName]}
                                        key={this.props.reelKey + symbolName + i}/>
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

Reel.propTypes = {
    slots: PropTypes.array,
    isStatic: PropTypes.bool,
    reelKey: PropTypes.oneOf(['left', 'center', 'right']).isRequired
};

Reel.defaultProps = {
    slots: _.shuffle(slotConfig.symbolsOrder),
    isStatic: false
};

export default Reel;
