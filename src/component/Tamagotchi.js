import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'
// import { Link } from 'react-router-dom';

export default class Tamagotchi extends React.Component{

    render(){
        return(
            <div>
                <h2>Me Tamagotchi</h2>
                {/* conditional rendering between tamastore and user's pet */}
                {this.props.tamaStore ? <TamaStore allSpecies={this.props.allSpecies}/> : <UserPet /> }

                {/* maybe minigames latur ? */}
            </div>
        )
    }
}