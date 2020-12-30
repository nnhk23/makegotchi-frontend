import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'
import UserPetBio from './UserPetBio';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';
import egg_draft from '../images/makegotchi_egg.png';
import "./Tamagotchi.css";

export default class Tamagotchi extends React.Component{

    // state = {
    //     currentUser: null
    // }

    // componentDidMount(){
    //     fetch(`http://localhost:3000/users/${this.props.userId}`)
    //     .then(resp => resp.json())
    //     .then(data => this.setState({currentUser: data}))
    // }

    purchaseTama = (newTama) => {
        // add new tama to user's pet list
        // adjust buys_left
        alert('Tama is bought!')

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
        // .then(data => {debugger})
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
                                <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <TamaStore 
                                        allSpecies={this.props.allSpecies} 
                                        purchaseTama={this.purchaseTama} 
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
                                <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                    <UserPet 
                                        currentPet={this.props.currentPet}
                                        feedIn={this.props.feedIn}
                                        sleepIn={this.props.sleepIn}
                                        cleanIn={this.props.cleanIn}
                                    />
                                </div>

                                {/* maybe minigames latur ? */}
                    
                            </div>
                        </Row>

                        {/* temporary, to be able to press buttons */}
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>
                        <br/>

                        <Row className="btn-container" onClick={this.props.handleActionBtnClick}>
                            <Button id="feed-btn">Feed</Button>
                            <Button id="sleep-btn">Sleep</Button>
                            <Button id="clean-btn">Clean</Button>
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
                                <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                                <div id='screen'>
                                </div>
                            </div>
                        </Row>
                    </div>
                )
        }
    }
}

