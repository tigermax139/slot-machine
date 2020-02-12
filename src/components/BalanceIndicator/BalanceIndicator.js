import React, {Component} from 'react';
import PropTypes from 'prop-types';

class BalanceIndicator extends Component {
    render() {
        return (
            <div className="uk-card uk-card-default uk-card-body">
                <h3 className="uk-text-center">
                    Your balance: { this.props.balance }
                </h3>
            </div>
        );
    }
}

BalanceIndicator.propTypes = {
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};

export default BalanceIndicator;
