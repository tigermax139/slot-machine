import React, {Component} from 'react';
// import PropTypes from 'prop-types';

import Reel from '../Reel';

class ReelsContainer extends Component {
    render() {
        return (
            <div className="uk-grid uk-grid-collapse">
                <div>
                    <Reel/>
                </div>
                <div>
                    <Reel/>
                </div>
                <div>
                    <Reel/>
                </div>
            </div>
        );
    }
}

ReelsContainer.propTypes = {};

export default ReelsContainer;
