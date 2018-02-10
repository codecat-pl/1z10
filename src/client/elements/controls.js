import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Controls extends Component{
    render(){
        const {onAddPoints, onRemove, onTakeChance, onGiveChance} = this.props;
        return (
            <div className="controls">
                <div className="chances_control">
                    <span className="take_chance" onClick={()=>onTakeChance()}>⊖</span>
                    <span className="give_chance" onClick={()=>onGiveChance()}>⊕</span>
                </div>
                <span className="sub_one_point" onClick={()=>onAddPoints(-1)}>-➊</span>
                <span className="sub_ten_points" onClick={()=>onAddPoints(-10)}>-➓</span>
                <span className="add_ten_points" onClick={()=>onAddPoints(10)}>+➓</span>
                <span className="add_one_point" onClick={()=>onAddPoints(1)}>+➊</span>
                <span className="remove_competitor" onClick={()=>onRemove()}>✗</span>
            </div>
        );
    }
}


Controls.propTypes = {
    onAddPoints: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onTakeChance: PropTypes.func.isRequired,
    onGiveChance: PropTypes.func.isRequired
};


export default Controls;