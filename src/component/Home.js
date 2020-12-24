import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom';

export default class Home extends React.Component{

    // side nav appearwhen logged in.
    // fetching Alex's pets.
    
    state={
        allSpecies: [],
        userPets: [],
        tamaStore: false
    }
    
    // fetching list of all species.
    componentDidMount() {
        fetch('http://localhost:3000/pets')
        .then(resp => resp.json())
        .then(data => this.setState({allSpecies: data}))
    }

    purchasePets = () => {
        alert('tama store is activated')
        // debugger
        // render tamaStore in tamagotchi
        this.setState({tamaStore: true})
    }
    
    state = {
        userPets: [],
        currentPet: null
    }

    // should we fetch this with the user in App instead?
    componentDidMount() {
        return fetch(`http://localhost:3000/users/${this.props.user.id}/user_pets`)
        .then(res => res.json())
        .then(pets => this.setState({ userPets: pets, currentPet: pets[0] }))
    }

    handleIconClick = (currentPet) => {
        this.setState({ currentPet })
    }

    render(){
        return(
            <div className="home">
                <SideNav userPets={this.state.userPets} tamaStore={this.state.tamaStore} purchasePets={this.purchasePets} handleIconClick={this.handleIconClick} />
                {!!this.props.user ? `Hi ${this.props.user.name}!` : null}
                <Tamagotchi allSpecies={this.state.allSpecies} currentPet={this.state.currentPet} tamaStore={this.state.tamaStore} userId={this.props.user.id}/>
            </div>
        )
    }
}
