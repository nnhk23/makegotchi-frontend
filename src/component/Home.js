import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
import ModalForm from './ModalForm';


import "./Home.css"

export default class Home extends React.Component{

    state={
        allSpecies: [],
        userPets: [],
        tamaStore: false,
        currentPet: null,
        buysLeft: null,
        ticTacToe: false,
        isOpen: false,
        modalForm: false,
        newTama: null,
        interval: null,
        feedIn: -1,
        cleanIn: -1,
        sleepIn: -1,
        janKen: false,
        miniGames: false
    }

    // fetching list of all species.
    componentDidMount() {
        fetch('http://localhost:3000/getuser',{
          method: 'GET',
          headers: {
            "Content-Type": "application/json",
            'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
        }})
        .then(res => res.json())
        .then(data => {
            this.setState({ buysLeft: data.user.buys_left})
            this.props.refresh(data)
        })
        .then(() => {
        this.getAllPets()
        this.getUserPets()
        this.setState({ interval: setInterval(this.checkPetStatus, 1000)})
        })

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
        // render tamaStore in tamagotchi
        this.setState({ tamaStore: true })
    }

    updateBuysLeft = () => {

        let buysLeft = this.state.buysLeft - 1
        // let userPetsLength

        // await this.sleep(1000)
        // pets ? userPetsLength = pets.length : userPetsLength = this.state.userPets.length

        // userPetsLength === 0 ? buysLeft = 3 : buysLeft = 3 - userPetsLength

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
            ticTacToe: false,
            currentPet
        })
    }

    updatePetList = (newUserPet) =>{
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

    // create new userpets
    createUserPetData =  () => {
        // update database with new user pet
        // reach out to Lantz or Hal JWT
        fetch('http://localhost:3000/user_pets',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json'
            },
            body: JSON.stringify({
                name: this.state.newTama.name,
                user_id: this.props.user.id,
                pet_id: this.state.newTama.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.updatePetList(data)
        })
    }

    // handle modal form
    openModal = () => this.setState({ isOpen: true });
    closeModal = () => this.setState({ isOpen: false });
    renderModalForm = () => this.setState({ modalForm: true })

    // naming tama
    handleSubmit = (tamaName) => {
        this.setState(prevState =>{
          return{
            modalForm: false,
            newTama: {...prevState.newTama, name: tamaName}
          }
        }, () => {
            this.createUserPetData()
            this.updateBuysLeft()
        })

        this.closeModal()
    }

    purchaseTama = (newTama) => {
        this.openModal()
        this.renderModalForm()
        this.setState({ newTama })
    }


    startMiniGame = (e) => {
        // debugger
        // alert('Start minigame')
        let name = e.target.id
        if (name === "miniGames"){
            this.setState({[name]: true, tamaStore: false, ticTacToe: false, janKen: false})}
        else { 
            this.setState({[name]: true, tamaStore: false, miniGames: false})}
        // this.setState({ janKen: true, tamaStore: false })
        // this.setState({ ticTacToe: true, tamaStore: false })
        // empty tamagotchi's screen
        // populate with minigames
    }

    render(){
        // console.log(this.state.buysLeft)
        return(
            <div className="home">
                <SideNav
                    userPets={this.state.userPets}
                    tamaStore={this.state.tamaStore}
                    purchasePets={this.purchasePets}
                    handleIconClick={this.handleIconClick}
                    startMiniGame={this.startMiniGame}
                />


                <div id="greeting">{!!this.props.user ? `Hi ${this.props.user.name}!     You have ${this.state.buysLeft} slots left.`: null}</div>
                <Tamagotchi
                    allSpecies={this.state.allSpecies}
                    currentPet={this.state.currentPet}
                    tamaStore={this.state.tamaStore}
                    user={this.props.user}
                    token={this.props.token}
                    purchaseTama={this.purchaseTama}
                    buysLeft={this.state.buysLeft}
                    ticTacToe={this.state.ticTacToe}
                    handleActionBtnClick={this.handleActionBtnClick}
                    feedIn ={this.state.feedIn}
                    sleepIn = {this.state.sleepIn}
                    cleanIn = {this.state.cleanIn}

                    startMiniGame={this.startMiniGame}
                    janKen={this.state.janKen}
                    miniGames={this.state.miniGames}
                />

                { this.state.modalForm ?
                    <ModalForm
                        closeModal={this.closeModal}
                        isOpen={this.state.isOpen}
                        handleSubmit={this.handleSubmit}
                    />
                    : null
                }

            </div>
        )
    }
}
