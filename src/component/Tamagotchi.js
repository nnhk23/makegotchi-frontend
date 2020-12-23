import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'
// import { Link } from 'react-router-dom';

export default class Tamagotchi extends React.Component{

    render(){
        return(
            <div>
                <UserPet currentPet={this.props.currentPet}/>
                {/* render specific pet chose by user */}
                {/* <UserPet /> */}
                {/* add AllSpecies to show all species */}
                {/* <TamaStore /> */}
                {/* maybe minigames latur ? */}
            </div>
        )
    }
}