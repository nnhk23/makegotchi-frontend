import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'
import egg from '../images/makegotchi_wide3.png'
import "./Tamagotchi.css"
import Game from './Game'
import UserPetBio from './UserPetBio';
import Row from 'react-bootstrap/Row';
import JankenGame from './JankenGame'
import Minigames from './Minigames'



export default class Tamagotchi extends React.Component{

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
                                        purchaseTama={this.props.purchaseTama}
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
            case this.props.janKen:
                return (
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <JankenGame user={this.props.user} startMiniGame={this.props.startMiniGame} />
                                </div>
                            </div>
                        </Row>
                    </div>
                    )
            case this.props.miniGames:
                return (
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                <Minigames startMiniGame={this.props.startMiniGame}/>
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
                          <button className="controls" value="feed" id="feed-btn">FEED</button>
                          <button className="controls" value="sleep" id="sleep-btn">SLEEP</button>
                          <button className="controls" value="clean" id="clean-btn">CLEAN</button>
                        </Row>

                        <Row id="pet_bio">
                            <UserPetBio currentPet={this.props.currentPet} />
                        </Row>
                    </div>
                )
            default:
                return (
                    <div id="tamagotchi_component">
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

