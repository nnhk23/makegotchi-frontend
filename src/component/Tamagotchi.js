import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'

// import { Link } from 'react-router-dom';
import egg_draft from '../images/makegotchi_egg.png'
import "./Tamagotchi.css"

export default class Tamagotchi extends React.Component{

    state = {
        currentUser: null
    }

    componentDidMount(){
        fetch(`http://localhost:3000/users/${this.props.userId}`)
        .then(resp => resp.json())
        .then(data => this.setState({currentUser: data}))
    }

    purchaseTama = (newTama) => {
        // add new tama to user's pet list
        // adjust buys_left
        alert('Tama is bought!')

        // update locally
        if(this.state.currentUser){
            this.setState(prevState => {
                return{
                    currentUser: prevState.currentUser.user_pets.push(newTama)
                }
            })
        }

        // update database with new user pet arr
        // fetch(`http://localhost:3000/users/${this.props.userId}/user_pets`,{
        //     method: 'PATCH',
        //     headers: {
        //         'Content-Type' : 'application/json',
        //         'Accept' : 'application/json'
        //     },
        //     body: JSON.stringify({
        //         pets: this.state.currentUser.user_pets
        //     })
        // })
        // .then(resp => resp.json())
        // .then(data => console.log(data))
        
        console.log(this.state.currentUser)        
    }


    render(){
        return(
            // eslint-disable-next-line react/style-prop-object
            <div className="tamagotchi_container" id='screen_div'>
                <div className="tamagotchi_background">
                    <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                    <div id='screen'>
                        {this.props.tamaStore ? <TamaStore allSpecies={this.props.allSpecies} purchaseTama={this.purchaseTama} /> : <UserPet /> }
                    </div>

                    {/* maybe minigames latur ? */}
          
                </div>
          
                <div className="btn-container">
                    <button> random HELLO</button>
                </div>
            </div>
        )
    }
}

