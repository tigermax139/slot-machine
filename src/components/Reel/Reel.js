import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import _ from 'lodash';
import './Reel.scss';

import ReelSymbol from '../ReelSymbol';

import slotConfig from '../../config/slot.config';

class Reel extends Component {
    render() {
        const slots = _.shuffle(slotConfig.symbolsOrder);
        return (
            <div className="uk-position-relative reel">
                <div className="reel-visible" data-slot-count={slots.length}>
                    {
                        slots
                            .map(symbolName => (
                                    <ReelSymbol
                                        config={slotConfig.symbolsList[symbolName]}
                                        key={symbolName}/>
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

Reel.propTypes = {};

export default Reel;
