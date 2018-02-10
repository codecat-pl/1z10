import React, {Component} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

const Chances = props=>(
    <div className="chances">
        <div className={cn("chance","chance_1", {available: props.value>0})}/>
        <div className={cn("chance","chance_2", {available: props.value>1})}/>
        <div className={cn("chance","chance_3", {available: props.value>2})}/>
    </div>
);

Chances.propTypes = {
    value: PropTypes.oneOf([0,1,2,3]).isRequired
};

module.exports =Chances;
