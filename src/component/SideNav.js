import React from 'react';
import { Link } from 'react-router-dom';
import RenderPetBtn from './RenderPetBtn';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const SideNav = ({purchasePets, userPets, handleIconClick, startMiniGame}) => {
    // appear after logged in
    // render Alex's pets from Home
    // buy pet buttons would trigger a callback function onClick.
    // click on specific pet would trigger a callback function onClick.
    // => re-render tamagotchi's screen

    const renderBtns = () => {
        return userPets.map(userPet => {
            return (
                <RenderPetBtn key={userPet.id} userPet={userPet} handleIconClick={handleIconClick} />
            )
        })
    }

    return(
        <div className="sideNav">
            <h2>User's Tamagotchis</h2>
            <Button variant="outline-warning" onClick={purchasePets}>Buy Pet</Button>
            <br />
            <Button variant="outline-success" onClick={startMiniGame}>Minigames</Button>
            <br />
            {renderBtns()}
        </div>
    )
}
export default SideNav