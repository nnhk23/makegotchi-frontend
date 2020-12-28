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
        tamaStore: false,
        currentPet: null,
        buysLeft: this.props.user.buys_left
    }
    
    // fetching list of all species.
    componentDidMount() {
        this.getAllPets()
        this.getUserPets()
    }
    
    getAllPets = () => {
        fetch('http://localhost:3000/pets')
        .then(resp => resp.json())
        .then(data => this.setState({allSpecies: data}))
    }

    getUserPets = () => {
        return fetch(`http://localhost:3000/users/${this.props.user.id}/user_pets`)
        .then(res => res.json())
        .then(pets => this.setState({userPets: pets, currentPet: pets[0]})
        )
    }

    purchasePets = () => {
        alert('tama store is activated')
        // render tamaStore in tamagotchi
        this.setState({tamaStore: true})
    }

    updateBuysLeft = () => this.setState(prevState => { return {
            buysLeft: prevState.buysLeft - 1
        }
    })

    handleIconClick = (currentPet) => {
        this.setState({ 
            tamaStore: false,
            currentPet
        })
    }

    updatePetList = (newUserPet) => {
        this.setState(prevState => {
            return{
                userPets: [...prevState.userPets, newUserPet]
            }
        })
    }

    startMiniGame = (e) => {
        alert('Start minigame')
        // empty tamagotchi's screen
        // populate with minigames
    }

    render(){
        console.log(this.state.buysLeft)
        return(
            <div className="home">
                <SideNav 
                    userPets={this.state.userPets} 
                    tamaStore={this.state.tamaStore} 
                    purchasePets={this.purchasePets} 
                    handleIconClick={this.handleIconClick} 
                    startMiniGame={this.startMiniGame}
                />

                {!!this.props.user ? `Hi ${this.props.user.name}!` : null}

                <Tamagotchi 
                    updatePetList={this.updatePetList}
                    allSpecies={this.state.allSpecies} 
                    currentPet={this.state.currentPet} 
                    tamaStore={this.state.tamaStore}
                    user={this.props.user}
                    token={this.props.token}
                    renderModalForm={this.props.renderModalForm}
                    openModal={this.props.openModal}
                    tamaName={this.props.tamaName} 
                    modalForm={this.props.modalForm}
                    updateBuysLeft={this.updateBuysLeft}
                    buysLeft={this.state.buysLeft}
                />
            </div>
        )
    }
}
