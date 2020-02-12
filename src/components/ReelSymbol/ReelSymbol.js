import React, {Component} from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';

import './ReelSymbol.scss';

class ReelSymbol extends Component {
    render() {
        return (
            <div className={cn({
                "uk-card": true,
                "reel-symbol": true,
                "reel-symbol--win": this.props.isWin
            })}>
                <img src={this.props.config.img} alt={this.props.config.value}/>
            </div>
        );
    }
}

ReelSymbol.propTypes = {
    config: PropTypes.shape({
        img: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired,
    isWin: PropTypes.bool,
};

ReelSymbol.defaultProps = {
    isWin: false,
};

export default ReelSymbol;
