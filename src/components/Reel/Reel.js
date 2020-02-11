import React, {Component} from 'react';
// import PropTypes from 'prop-types';
import './Reel.scss';

import ReelSymbol from '../ReelSymbol';

import slotConfig from '../../config/slots.config';

class Reel extends Component {
    render() {
        return (
            <div className="uk-card reel">
                {
                    slotConfig.symbolsOrder.map(symbolName => (
                        <ReelSymbol config={slotConfig.symbolsList[symbolName]} key={symbolName}/>
                        )
                    )
                }
            </div>
        );
    }
}

Reel.propTypes = {};

export default Reel;
