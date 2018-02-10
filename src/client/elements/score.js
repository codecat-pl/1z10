import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Score extends Component{
    constructor(props){
        super(props);
        this.state = {
            userInput: props.name
        }
    }

    change(ev){
        this.setState({userInput: ev.target.value});
        this.props.onChangeName(ev.target.value);
    }

    render(){
        const props = this.props;
        return (
            <div className="competitor_data">
                <input className="name" value={props.name} onChange={ev=>this.change(ev)}/>
                <div className="score">{props.value}</div>
            </div>
        );
    }
}

Score.propTypes = {
    onChangeName: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired
};

Score.defaultProps = {
    onChangeName: ()=>{}
};


export default Score;