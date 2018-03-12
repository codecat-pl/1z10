import React, {Component} from 'react';

import { connect } from 'react-redux';
import * as actions from '../actions/competitors';

import Competitor from './competitor';
import config from '../config';
import AddCompetitorButton from './add_competitor_button';
import PropTypes from 'prop-types';

export class Hall extends Component {
    constructor(props){
        super(props);

    }

    addCompetitor(){
        const {create} = this.props;
        create("Tadeusz?", config.images.default_competitor);
    }

    render(){
        const {players} = this.props.competitors;

        const competitors = Object.getOwnPropertyNames(players).map(id=>(
            <Competitor playerId={Number(id)} idx={Number(id)} key={id}/>
        ));
        //console.log(competitors);
        return (
            <div>
                {competitors}
                <AddCompetitorButton onClick={()=>this.addCompetitor()}/>
            </div>
        );
    }
}

Hall.propTypes = {
    create: PropTypes.func.isRequired
};


function mapStateToProps(state, ownProps) {
    return state;
}

const ConnectedHall = connect(mapStateToProps, actions)(Hall);

export default ConnectedHall;
