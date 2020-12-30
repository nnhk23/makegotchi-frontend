import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
import ModalForm from './ModalForm';


export default class Home extends React.Component{

    
    state={
        allSpecies: [],
        userPets: [],
        tamaStore: false,
        currentPet: null,
        buysLeft: this.props.user.buys_left,
        ticTacToe: false,
        isOpen: false,
        modalForm: false,
        newTama: null
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
            ticTacToe: false,
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
                    // updatePetList={this.updatePetList}
                    allSpecies={this.state.allSpecies} 
                    currentPet={this.state.currentPet} 
                    tamaStore={this.state.tamaStore}
                    user={this.props.user}
                    token={this.props.token}
                    // renderModalForm={this.props.renderModalForm}
                    // openModal={this.props.openModal}
                    // tamaName={this.props.tamaName} 
                    // modalForm={this.props.modalForm}
                    // clearTamaName={this.props.clearTamaName}
                    purchaseTama={this.purchaseTama}
                    updateBuysLeft={this.updateBuysLeft}
                    buysLeft={this.state.buysLeft}
                    ticTacToe={this.state.ticTacToe}
                />

                { this.state.modalForm ? 
                    <ModalForm 
                        closeModal={this.closeModal} 
                        isOpen={this.state.isOpen} 
                        handleSubmit={this.handleSubmit}

                    /> 
                    : 
                    null 
                }           

            </div>
        )
    }
}
