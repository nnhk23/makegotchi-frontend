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
        buysLeft: this.props.user.buys_left,
        ticTacToe: false
    }
    
    // fetching list of all species.
    componentDidMount() {
        this.getAllPets()
        this.getUserPets()
    }
    
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    getAllPets = () => {
        fetch('http://localhost:3000/pets')
        .then(resp => resp.json())
        .then(data => this.setState({allSpecies: data}))
    }

    getUserPets = () => {
        return fetch(`http://localhost:3000/users/${this.props.user.id}/user_pets`)
        .then(res => res.json())
        .then(pets => {
            this.setState({userPets: pets, currentPet: pets[0]})
            this.updateBuysLeft(pets)
            }
        )
    }

    purchasePets = () => {
        alert('tama store is activated')
        // render tamaStore in tamagotchi
        this.setState({ tamaStore: true })
    }

    updateBuysLeft = async (pets) => {
        let buysLeft
        let userPetsLength

        await this.sleep(1000)
        pets ? userPetsLength = pets.length : userPetsLength = this.state.userPets.length

        userPetsLength === 0 ? buysLeft = 3 : buysLeft = 3 - userPetsLength

        fetch(`http://localhost:3000/users/${this.props.user.id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                buys_left: buysLeft
            })
        })
        .then(resp => resp.json())
        .then(data => this.setState({ buysLeft: data.buys_left }))
    }

    handleIconClick = (currentPet) => {
        this.setState({ 
            tamaStore: false,
            currentPet
        })
    }

    updatePetList = (newUserPet) =>{ 
        this.setState(prevState => {
            return{
                userPets: [...prevState.userPets, newUserPet]
            }
        })
    }
    
    startMiniGame = (e) => {
        alert('Start minigame')
        this.setState({ticTacToe: true, tamaStore: false})
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

                {!!this.props.user ? `Hi ${this.props.user.name}! You have ${this.state.buysLeft} slots left.` : null}
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
                    clearTamaName={this.props.clearTamaName}
                    updateBuysLeft={this.updateBuysLeft}
                    buysLeft={this.state.buysLeft}
                    ticTacToe={this.state.ticTacToe}
                />
            </div>
        )
    }
}
