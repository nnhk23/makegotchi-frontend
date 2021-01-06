import React from 'react'
import RenderPetBtn from './RenderPetBtn'
import Button from 'react-bootstrap/Button'
import '../css/SideNav.css'

const SideNav = ({goToTamaStore, userPets, handleUserPetIconClick, startMiniGame}) => {

    const renderBtns = () => {
        return userPets.map(userPet => {
            return (
                <RenderPetBtn key={userPet.id} userPet={userPet} handleUserPetIconClick={handleUserPetIconClick} />
            )
        })
    }

    return(
        <div className="sideNav">
            <Button className="buyPet_btn" variant="outline-warning" onClick={goToTamaStore}>Buy a Pet</Button>
            <Button className="minigames_btn" id="miniGames" variant="outline-warning" onClick={startMiniGame}>Mini Games</Button>
            <h2 id="sideNav_header">Your Tamagotchis</h2>
 
            {renderBtns()}
        </div>
    )
}
export default SideNav