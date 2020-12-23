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
    

    render(){
        return(
            <div className="home">
                <SideNav userPets={this.state.userPets} tamaStore={this.state.tamaStore} purchasePets={this.purchasePets />
                {!!this.props.user ? `Hi ${this.props.user.name}!` : null}
                <Tamagotchi allSpecies={this.state.allSpecies} tamaStore={this.state.tamaStore} userId={this.props.user.id}/>
            </div>
        )
    }
}
