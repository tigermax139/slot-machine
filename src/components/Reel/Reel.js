import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import ReelSymbol from '../ReelSymbol';

import slotConfig from '../../config/slot.config';

import './Reel.scss';

class Reel extends Component {
    constructor(props) {
        super(props);
        this.isSymbolWin = this.isSymbolWin.bind(this);
    }

    isSymbolWin(i) {
        return this.props.winSlots[i];
    }

    render() {
        return (
            <div className="uk-position-relative reel">
                <div
                   className={
                       cn({
                           "reel-visible": this.props.slots.length > 3
                       })
                   }
                >
                    {
                        this.props.slots
                            .map((symbolName, i) => (
                                    <ReelSymbol
                                        config={slotConfig.symbolsList[symbolName]}
                                        key={this.props.reelKey + symbolName + i}
                                        isWin={this.isSymbolWin(i)}
                                    />
                                )
                            )
                    }
                </div>
            </div>
        );
    }
}

Reel.propTypes = {
    slots: PropTypes.array.isRequired,
    winSlots: PropTypes.array.isRequired,
    reelKey: PropTypes.oneOf(['left', 'center', 'right']).isRequired,
    isStatic: PropTypes.bool
};

Reel.defaultProps = {
    isStatic: false
};

export default Reel;
