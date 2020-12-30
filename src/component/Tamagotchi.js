import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'
import egg from '../images/makegotchi_wide3.png'
import "./Tamagotchi.css"
import Game from './Game'
import UserPetBio from './UserPetBio';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';


export default class Tamagotchi extends React.Component{

        // update database with new user pet
        // reach out to Lantz or Hal JWT
        fetch('http://localhost:3000/user_pets',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
                // ,
                // 'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: "Beans",
                user_id: this.props.userId,
                pet_id: newTama.id,
            })
        })
        .then(resp => resp.json())
        .then(data => this.props.updatePetList(data))
    }

    render(){
        switch (true) {
            case this.props.tamaStore:

                return (
                    // eslint-disable-next-line react/style-prop-object
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <TamaStore 
                                        allSpecies={this.props.allSpecies} 
                                        buysLeft={this.props.buysLeft}
                                        purchaseTama={this.purchaseTama} 
                                    /> 
                                </div>
                            </div>
                        </Row>
                    </div>
                ) 
            case this.props.ticTacToe:
                return (
                   <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <Game />
                                </div>
                            </div>
                        </Row>
                    </div>
                    )
                
            case !!this.props.currentPet:
                return (
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <UserPet 
                                        currentPet={this.props.currentPet}
                                        feedIn={this.props.feedIn}
                                        sleepIn={this.props.sleepIn}
                                        cleanIn={this.props.cleanIn}
                                    />
                                </div>               
                            </div>
                        </Row>

               
                        <Row className="btn-container" onClick={this.props.handleActionBtnClick}>
                          <button className="controls" value="feed" id="feed-btn"><p>FEED</p></button>
                          <button className="controls" value="clean" id="clean-btn"><p>CLEAN</p></button>
                          <button className="controls" value="sleep" id="sleep-btn"><p>SLEEP</p></button>
                        </Row>

                        <Row>
                            <UserPetBio currentPet={this.props.currentPet} />
                        </Row>
                    </div>
                )
            default:
                return (
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                </div>
                            </div>
                        </Row>
                    </div>
                )
        }

    }
}

