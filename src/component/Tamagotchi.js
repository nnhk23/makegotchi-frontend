import React from 'react';
import UserPet from './UserPet'
import TamaStore from './TamaStore'

import egg_draft from '../images/makegotchi_egg.png'
import "./Tamagotchi.css"

export default class Tamagotchi extends React.Component{
    
    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    updateUserPetData =  (newTama) => {
        // update database with new user pet
        // reach out to Lantz or Hal JWT
        fetch('http://localhost:3000/user_pets',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Accept' : 'application/json',
                'Authorization' : `Bearer ${this.props.token}`
            },
            body: JSON.stringify({
                name: this.props.tamaName,
                user_id: this.props.user.id,
                pet_id: newTama.id
            })
        })
        .then(resp => resp.json())
        .then(data => {
            // debugger
            this.props.updatePetList(data)
        })
    }

    purchaseTama = async (newTama) => {
        // add new tama to user's pet list
        // adjust buys_left
        alert('Tama is bought!')

        // enable modal form in App
        this.props.renderModalForm()
        this.props.updateBuysLeft()
        
        // delay for 8sec to make sure states are set (ex: tamaName, modalForm)
        await this.sleep(8000)
        if (!this.props.modalForm && this.props.tamaName){
            this.updateUserPetData(newTama)
        }
    }


    render(){
      
        return(
            <div className="tamagotchi_container" id='screen_div'>
                <div className="tamagotchi_background">
                    <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
                    <div id='screen'>
                        {this.props.tamaStore ? 
                            <TamaStore 
                                allSpecies={this.props.allSpecies} 
                                purchaseTama={this.purchaseTama}
                                openModal={this.props.openModal}
                                buysLeft={this.props.buysLeft}
                            /> 
                            : 
                            <UserPet 
                                currentPet={this.props.currentPet}
                            /> 
                        }
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

