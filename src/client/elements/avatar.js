import React, {Component} from 'react';

import PropTypes from 'prop-types';

import config from '../config';

const Avatar = props=>(
    <div className="head handle">
        <img src={props.photo} alt="" />
    </div>
);

Avatar.propTypes = {
    photo: PropTypes.string
};

Avatar.defaultProps = {
    photo: config.images.default_competitor
};

module.exports = Avatar;