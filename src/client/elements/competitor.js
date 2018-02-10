import React, {Component} from 'react';
import Avatar from './avatar';
import Score from './score';
import Chances from './chances';
import Controls from './controls';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Draggable from 'react-draggable';

import { connect } from 'react-redux';
import * as actions from '../actions/competitors';



export class Competitor extends Component {
    render() {
        const {idx, playerId, data, addPoints, giveChance, takeChance, changeName, remove} = this.props;
        return (
            <Draggable
                axis="both"
                handle=".handle"
                defaultPosition={{x: 0, y: 0}}
                position={null}
                grid={[25, 25]}>
                <div className={cn("competitor", "competitor_" + idx, {lose: data.chances < 1})}>
                    <Avatar photo={data.photo}/>
                    <Score value={data.score}
                           name={data.name}
                           onChangeName={name => changeName(playerId, name)}/>
                    <Chances value={data.chances}/>
                    <Controls onAddPoints={points => addPoints(playerId, points)}
                              onGiveChance={() => giveChance(playerId)}
                              onTakeChance={() => takeChance(playerId)}
                              onRemove={() => remove(playerId)}/>
                </div>
            </Draggable>
        );
    };
}


Competitor.propTypes = {
    idx: PropTypes.number,
    playerId: PropTypes.number,
    data: PropTypes.shape({
        photo: PropTypes.string,
        name: PropTypes.string,
        score: PropTypes.number,
        chances: PropTypes.oneOf([0,1,2,3])
    }),
    addPoints: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    giveChance: PropTypes.func.isRequired,
    takeChance: PropTypes.func.isRequired,
    changeName: PropTypes.func.isRequired
};

const mapStateToProps = (state, props)=>{
    return {
        data: state.players[props.playerId]
    };
};

const ConnectedCompetitor = connect(mapStateToProps, actions)(Competitor);

export default ConnectedCompetitor;