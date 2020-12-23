import React from 'react';
import { Link } from 'react-router-dom';
import RenderPetBtn from './RenderPetBtn';
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'

const SideNav = ({ userPets, handleIconClick }) => {
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
        <div>
            <Button>BUY PETS</Button> {/* temp */}
            <br /><br />
            {renderBtns()}
        </div>
    )
}
export default SideNav