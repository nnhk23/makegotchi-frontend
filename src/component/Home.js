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
        sleepIn: -1
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

    checkPetStatus = async () => {
        console.log(this.state)
        const currentTime = new Date()
        let deletePets = new Array(this.state.userPets.length).fill(false)
        let decreaseHappinessArr = new Array(this.state.userPets.length).fill(0)

        for (let i = 0; i < this.state.userPets.length; i++) {
            const userPet = this.state.userPets[i]
            
            if (userPet.happiness_score <= 0) {
                deletePets[i] = true
            }

            else {
                const timeSinceLastFed = userPet.last_fed ? (currentTime - Date.parse(userPet.last_fed))/1000 : userPet.pet.hunger_rate
                const timeSinceLastSlept = userPet.last_slept ? (currentTime - Date.parse(userPet.last_slept))/1000 : userPet.pet.sleepy_rate
                const timeSinceLastCleaned = userPet.last_cleaned? (currentTime - Date.parse(userPet.last_cleaned))/1000 : userPet.pet.dirt_rate
                let decreaseHappinessBy = 0

                decreaseHappinessBy = timeSinceLastFed >= userPet.pet.hunger_rate ? decreaseHappinessBy+1 : decreaseHappinessBy
                decreaseHappinessBy = timeSinceLastSlept >= userPet.pet.sleepy_rate ? decreaseHappinessBy+1 : decreaseHappinessBy
                decreaseHappinessBy = timeSinceLastCleaned >= userPet.pet.dirt_rate ? decreaseHappinessBy+1 : decreaseHappinessBy

                if (this.state.currentPet && this.state.currentPet.id === userPet.id) {
                    timeSinceLastFed < userPet.pet.hunger_rate ? 
                        this.setState({ feedIn: Math.floor(userPet.pet.hunger_rate - (currentTime - Date.parse(userPet.last_fed))/1000) }) :
                        this.setState({ feedIn: -1 })

                    timeSinceLastSlept < userPet.pet.sleepy_rate ?
                        this.setState({ sleepIn: Math.floor(userPet.pet.sleepy_rate - (currentTime - Date.parse(userPet.last_slept))/1000) }) :
                        this.setState({ sleepIn: -1 })

                    timeSinceLastCleaned < userPet.pet.dirt_rate ?
                        this.setState({ cleanIn: Math.floor(userPet.pet.dirt_rate - (currentTime - Date.parse(userPet.last_cleaned))/1000) }) :
                        this.setState({ cleanIn: -1 })
                }
                // this.decreaseHappiness(i, decreaseHappinessBy)
                decreaseHappinessArr[i] = decreaseHappinessBy
            }
        }

        await this.decreaseHappiness(decreaseHappinessArr)
        this.deletePets(deletePets)
    }

    decreaseHappiness = async (decreaseHappinessArr) => {
        for(let i = 0; i < decreaseHappinessArr.length; i++) {
            const userPet = this.state.userPets[i]
            const body = { happiness_score: userPet.happiness_score - decreaseHappinessArr[i] }
            await fetch(`http://localhost:3000/user_pets/${userPet.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(updatedUserPet => this.setState(prevState => {
                let updatedUserPets = [...prevState.userPets]
                updatedUserPets[i] = updatedUserPet
                console.log("decHappiness", updatedUserPets)
                return userPet.id === prevState.currentPet.id ? 
                { currentPet: updatedUserPet, userPets: updatedUserPets} : 
                { userPets: updatedUserPets}
            }))
        }
    }

    deletePets = async (deletePetsArr) => {
        for (let i = 0; i < deletePetsArr.length; i++) {
            if (deletePetsArr[i]) {
                const userPet = this.state.userPets[i]
                await fetch(`http://localhost:3000/user_pets/${userPet.id}`, { method: 'DELETE'})
                .then(() => {
                    this.setState(prevState => {
                        let updatedUserPets = prevState.userPets
                        updatedUserPets.splice(i, 1)
                        console.log("delete", updatedUserPets)
                        return userPet.id === prevState.currentPet.id ? 
                        { currentPet: updatedUserPets.length > 0 ? updatedUserPets[0] : null, userPets: updatedUserPets } :
                        { userPets: updatedUserPets }
                    })
                })
            }
        }
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
        console.log(e.target.id)
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
            let feedIn = this.state.feedIn
            let sleepIn = this.state.sleepIn
            let cleanIn = this.state.cleanIn
            switch (e.target.id) {
                case 'feed-btn':
                    feedIn = updatedPet.pet.hunger_rate
                    break
                case 'sleep-btn':
                    sleepIn = updatedPet.pet.sleepy_rate2
                    break
                case 'clean-btn':
                    cleanIn = updatedPet.pet.dirt_rate
                    break
                default:
                    break
            }

            this.setState(prevState => {
                let updatedUserPets = prevState.userPets
                let petIdx = prevState.userPets.findIndex(userPet => userPet.id === prevState.currentPet.id)
                updatedUserPets[petIdx] = updatedPet
                return {
                    userPets: updatedUserPets,
                    currentPet: updatedPet,
                    feedIn,
                    sleepIn,
                    cleanIn
                }
            })
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

        alert('generating Tamagotchi. Pls wait!')
    }

    purchaseTama = (newTama) => {
        this.openModal()
        this.renderModalForm()
        this.setState({ newTama })
    }


    startMiniGame = (e) => {
        alert('Start minigame')
        this.setState({ ticTacToe: true, tamaStore: false })
        // empty tamagotchi's screen
        // populate with minigames
    }

    render(){
        return(
            <div className="home">
                <SideNav
                    userPets={this.state.userPets}
                    tamaStore={this.state.tamaStore}
                    purchasePets={this.purchasePets}
                    handleIconClick={this.handleIconClick}
                    startMiniGame={this.startMiniGame}
                />


                <div id="greeting">{!!this.props.user ? `Hi ${this.props.user.name}! You have ${this.state.buysLeft} slots left.` : null}</div>
                <Tamagotchi
                    allSpecies={this.state.allSpecies}
                    currentPet={this.state.currentPet}
                    tamaStore={this.state.tamaStore}
                    user={this.props.user}
                    token={this.props.token}
                    purchaseTama={this.purchaseTama}
                    // updateBuysLeft={this.updateBuysLeft}
                    buysLeft={this.state.buysLeft}
                    ticTacToe={this.state.ticTacToe}
                    handleActionBtnClick={this.handleActionBtnClick}
                    feedIn ={this.state.feedIn}
                    sleepIn = {this.state.sleepIn}
                    cleanIn = {this.state.cleanIn}
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
