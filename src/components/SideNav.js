import React from 'react'
import RenderPetBtn from './RenderPetBtn'
import Button from 'react-bootstrap/Button'
import '../css/SideNav.css'

const SideNav = ({user, money, goToTamaStore, userPets, handleUserPetIconClick, startMiniGame, isDisabled}) => {

    const renderBtns = () => {
        return userPets.map(userPet => {
            return (
                <RenderPetBtn key={userPet.id} userPet={userPet} handleUserPetIconClick={handleUserPetIconClick} />
            )
        })
    }

    return(
        <div className="sideNav">
            {!!user ?
            <div>
                <div className="greeting" id="greeting1"> 
                    <p className="greeting-text" id="greeting-name">Hi {user.name}!</p>
                </div>
                <div className="greeting">
                    <img id="coin-icon" src="https://c.tenor.com/YFZ-qJQdkKIAAAAj/mario-coin.gif"></img> 
                    <p className="greeting-text" id="greeting-money">{money}</p>
                </div> 
            </div> : null}
            <Button className="buyPet_btn" variant="outline-warning" onClick={isDisabled ? null : goToTamaStore}>Buy a Pet</Button>
            <Button className="minigames_btn" id="miniGames" variant="outline-warning" onClick={isDisabled ? null : startMiniGame}>Mini Games</Button>
            {!!userPets.length ? <h2 id="sideNav_header">Your Tamagotchis</h2> : null}
 
            {renderBtns()}
        </div>
    )
}
export default SideNav