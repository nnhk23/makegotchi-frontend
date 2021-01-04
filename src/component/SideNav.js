import React from 'react';
import RenderPetBtn from './RenderPetBtn';
import Button from 'react-bootstrap/Button'
import './SideNav.css';

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
            <Button className="buyPet_btn" variant="outline-warning" onClick={purchasePets}>Buy a Pet</Button>
            <Button className="minigames_btn" id="miniGames" variant="outline-warning" onClick={startMiniGame}>Mini Games</Button>
            <h2 id="sideNav_header">Your Tamagotchis</h2>
            
            <br /><br />

            {renderBtns()}
        </div>
    )
}
export default SideNav