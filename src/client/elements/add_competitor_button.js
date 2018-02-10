import React, {Component} from 'react';

import PropTypes from 'prop-types';

const AddCompetitorButton = props=>(
    <div className="add_competitor" onClick={props.onClick}>✴ Dodaj osobę</div>
);

AddCompetitorButton.propTypes = {
    onClick: PropTypes.func.isRequired
};

export default AddCompetitorButton;