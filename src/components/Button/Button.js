import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

class Button extends Component {
    render() {
        return (
            <button type="button" className={cn({
                'uk-button': true,
                'uk-button-round': this.props.round,
                'uk-button-small': this.props.size === 'small',
                'uk-button-large': this.props.size === 'large',
            })}>
                {this.props.value}
            </button>
        );
    }
}

Button.propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
    round: PropTypes.bool,
    size: PropTypes.oneOf(['small' , 'large'])
};

Button.defaultProps = {
    round: false,
    size: 'small'
};

export default Button;
