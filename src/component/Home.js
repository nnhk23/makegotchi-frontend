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
        interval: null,
        feedIn: -1,
        cleanIn: -1,
        sleepIn: -1
    }
    
    // fetching list of all species.
    componentDidMount() {
        this.getAllPets()
        this.getUserPets()
        this.setState({ interval: setInterval(this.checkPetStatus, 1000) })
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }
    
    getAllPets = () => {
        fetch('http://localhost:3000/pets')
        .then(resp => resp.json())
        .then(data => this.setState({allSpecies: data}))
    }

    getUserPets = () => {
        return fetch(`http://localhost:3000/users/${this.props.user.id}/user_pets`)
        .then(res => res.json())
        .then(userPets => {
            const currentPet = userPets[0]
            const currentTime = new Date()
            if (currentPet) {
                return this.setState({    
                userPets: userPets, 
                currentPet: currentPet, 
                feedIn: (currentTime - currentPet.last_fed)/1000 < currentPet.pet.hunger_rate ?
                    currentPet.pet.hunger_rate - (currentTime - currentPet.last_fed)/1000 :
                    -1,
                sleepIn: (currentTime - currentPet.last_fed)/1000 < currentPet.pet.sleepy_rate ?
                    currentPet.pet.sleepy_rate - (currentTime - currentPet.last_slept)/1000 :
                    -1,
                cleanIn: (currentTime - currentPet.last_fed)/1000 < currentPet.pet.dirt_rate ?
                    currentPet.pet.dirt_rate - (currentTime - currentPet.last_cleaned)/1000 :
                    -1
                })
            }
            else {
                return this.setState({    
                    userPets: userPets
                })
            }
        })
    }

    checkPetStatus = () => {
        const currentPet = this.state.currentPet
        if (currentPet) {
            const currentTime = new Date()

            const timeSinceLastFed = (currentTime - Date.parse(currentPet.last_fed))/1000
            if (timeSinceLastFed < currentPet.pet.hunger_rate) {
                this.setState({ 
                    feedIn: Math.floor(currentPet.pet.hunger_rate - (currentTime - Date.parse(currentPet.last_fed))/1000)
                })
            } else {
                this.setState({ feedIn: -1 })
                this.decreaseHappiness()
            }


            const timeSinceLastSlept = (currentTime - Date.parse(currentPet.last_slept))/1000
            if (timeSinceLastSlept < currentPet.pet.sleepy_rate) {
                this.setState({ 
                    sleepIn: Math.floor(currentPet.pet.sleepy_rate - (currentTime - Date.parse(currentPet.last_slept))/1000)
                }) 
            } else {
                this.setState({ sleepIn: -1 })
                this.decreaseHappiness()
            }

            const timeSinceLastCleaned = (currentTime - Date.parse(currentPet.last_cleaned))/1000
            if (timeSinceLastCleaned < currentPet.pet.dirt_rate) {
                this.setState({ 
                    cleanIn: Math.floor(currentPet.pet.dirt_rate - (currentTime - Date.parse(currentPet.last_cleaned))/1000)
                }) 
            } else {
                this.setState({ cleanIn: -1 })
                this.decreaseHappiness()
            }
        }
        return null
    }

    decreaseHappiness = () => {
        const body = { happiness_score: this.state.currentPet.happiness_score - 1 }
        fetch(`http://localhost:3000/user_pets/${this.state.currentPet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(currentPet => this.setState({ currentPet }))
    }

    purchasePets = () => {
        alert('tama store is activated')
        // debugger
        // render tamaStore in tamagotchi
        this.setState({tamaStore: true})
    }

    handleIconClick = (currentPet) => {
        this.setState({ currentPet, tamaStore: false })
    }

    updatePetList = (newUserPet) => {
        this.setState(prevState => {
            return{
                userPets: [...prevState.userPets, newUserPet],
                currentPet: newUserPet,
                tamaStore: false
            }
        })
    }

    handleActionBtnClick = (e) => {
        let dateTime = new Date();
        let body = {}
        if (e.target.id === 'feed-btn') {
            body = {
                'last_fed': dateTime,
                'happiness_score': this.state.currentPet.happiness_score + 5
            }
        }
        else if (e.target.id === 'sleep-btn') {
            body = {
                'last_slept': dateTime,
                'happiness_score': this.state.currentPet.happiness_score + 5
            }
        }
        else if (e.target.id === 'clean-btn') {
            body = {
                'last_cleaned': dateTime,
                'happiness_score': this.state.currentPet.happiness_score + 5
            }
        }
        else {
            return
        }

        fetch(`http://localhost:3000/user_pets/${this.state.currentPet.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(updatedPet => {
            switch (e.target.id) {
                case 'feed-btn':
                    return this.setState({ 
                        currentPet: updatedPet,
                        feedIn: updatedPet.pet.hunger_rate
                    })
                case 'sleep-btn':
                    return this.setState({ 
                        currentPet: updatedPet,
                        sleepIn: updatedPet.pet.sleepy_rate
                    })
                case 'clean-btn':
                    return this.setState({ 
                        currentPet: updatedPet,
                        cleanIn: updatedPet.pet.dirt_rate
                    })
                default:
                    return this.setState({
                        currentPet: updatedPet
                    })
            }
        })
    }

    render(){
        return(
            <div className="home">
                <SideNav 
                userPets={this.state.userPets} 
                tamaStore={this.state.tamaStore} 
                purchasePets={this.purchasePets} 
                handleIconClick={this.handleIconClick} 
                />

                {!!this.props.user ? `Hi ${this.props.user.name}!` : null}

                <Tamagotchi 
                updatePetList={this.updatePetList}
                allSpecies={this.state.allSpecies} 
                currentPet={this.state.currentPet} 
                tamaStore={this.state.tamaStore}
                userId={this.props.user.id}
                token={this.props.token}
                handleActionBtnClick={this.handleActionBtnClick}
                feedIn ={this.state.feedIn}
                sleepIn = {this.state.sleepIn}
                cleanIn = {this.state.cleanIn}
                />
            </div>
        )
    }
}
