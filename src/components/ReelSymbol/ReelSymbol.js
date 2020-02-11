import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReelSymbol extends Component {
    render() {
        return (
            <div className="uk-card reel-symbol">
                <img src={this.props.config.img} alt={this.props.config.value} />
            </div>
        );
    }
}

ReelSymbol.propTypes = {
    config: PropTypes.shape({
        img: PropTypes.string.isRequired,
        value: PropTypes.string.isRequired
    }).isRequired
};

export default ReelSymbol;
