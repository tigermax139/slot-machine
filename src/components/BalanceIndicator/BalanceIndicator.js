import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BalanceIndicator extends Component {
    render() {
        return (
            <div className="uk-card">
                <p className="uk-text-bold">
                    Your balance: { this.props.balance }
                </p>
            </div>
        );
    }
}

BalanceIndicator.propTypes = {
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default BalanceIndicator;
