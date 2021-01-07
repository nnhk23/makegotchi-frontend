import React from 'react'
import UserPet from './UserPet'
import TamaStore from './TamaStore'
import egg from '../images/makegotchi_wide3.png'
import "../css/Tamagotchi.css"
import UserPetBio from './UserPetBio'
import Row from 'react-bootstrap/Row'
import Minigames from './Minigames'



export default class Tamagotchi extends React.Component{

    render(){
        switch (true) {
            case this.props.tamaStore:
                return (
                    <div>
                        <Row className="tamagotchi_container" id='screen_div'>
                            <div className="tamagotchi_background">
                                <img src={egg} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <TamaStore
                                        allSpecies={this.props.allSpecies}
                                        purchaseTama={this.props.purchaseTama}
                                        money={this.props.money}
                                    />
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

                                <Minigames 
                                        name={this.props.user.name}
                                        money={this.props.money} 
                                        updateMoneyLeft={this.props.updateMoneyLeft}
                                        disable={this.props.disable} 
                                        playsLeft={this.props.playsLeft}
                                        decrementPlaysLeft={this.props.decrementPlaysLeft}
                                        />
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
                          <button className="controls" value="feed" id="feed-btn" disabled={this.props.feedIn > -1}>FEED</button>
                          <button className="controls" value="sleep" id="sleep-btn" disabled={this.props.sleepIn > -1}>SLEEP</button>
                          <button className="controls" value="clean" id="clean-btn" disabled={this.props.cleanIn > -1}>CLEAN</button>
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

