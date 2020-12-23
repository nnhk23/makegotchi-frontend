import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom';

export default class Home extends React.Component{

    // side nav appearwhen logged in.
    // fetching Alex's pets.
    // fetching list of all species.
    
    state = {
        userPets: [],
        currentPet: null
    }

    componentDidMount() {
        fetch(`http://localhost:3000/users/${this.props.user.id}/user_pets`)
        .then(res => res.json())
        .then(userPets => this.setState({ userPets, currentPet: userPets[0] }))
    }

    handleIconClick = (currentPet) => {
        this.setState({ currentPet })
    }

    render(){
        return(
            <div>
                <Row>
                    <Col sm={3} id='sideNav'> <SideNav userPets={this.state.userPets} handleIconClick={this.handleIconClick}/> </Col>
                    <Col> <Tamagotchi currentPet={this.state.currentPet}/> </Col>
                </Row>
            </div>
        )
    }
}