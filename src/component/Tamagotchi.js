import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'

// import { Link } from 'react-router-dom';
import egg_draft from '../images/makegotchi_egg.png'
import "./Tamagotchi.css"

export default class Tamagotchi extends React.Component{



    render(){
        return(
            // eslint-disable-next-line react/style-prop-object
            <div className="tamagotchi_container" id='screen_div'>
                <div className="tamagotchi_background">
                    <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                    <div id='screen'>
                        "If you see this, you're reading off of the screen c: . . . Look for the div that has an ID of screen"
                    </div>

                    {/* render specific pet chose by user */}
                    {/* <UserPet /> */}
                    {/* add AllSpecies to show all species */}
                    {/* <TamaStore /> */}
                    {/* maybe minigames latur ? */}
                </div>
                <div className="btn-container">
                    <button> random HELLO</button>
                </div>

            </div>
        )
    }
}

