/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Row from 'react-bootstrap/Row'
import './UserPet.css';
import styled, {keyframes} from 'styled-components';
import { bounce } from 'react-animations';

const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

const UserPet = ({ currentPet, feedIn, sleepIn, cleanIn }) => {
    const { name, happiness_score, last_fed, last_slept, last_cleaned, pet } = currentPet
    return (
        <div className="userPet_obj">
            <Row>
                <h3 className="userPet_name">{name}</h3> <h6 className="userPet_happy">Happiness: {happiness_score}</h6>
            </Row>

            <Row className="bubble">
                {feedIn > 0 ? <p>Feed me in {feedIn} seconds!</p> : <p>I NEED FOOD NOW!!!</p>}
            </Row>

            <Row className="bubble">
                {sleepIn > 0 ? <p>Tuck me in bed in {sleepIn} seconds!</p> : <p>I NEED TO SLEEP NOW!!!</p>}
            </Row>
            <Row className="bubble">
                {cleanIn > 0 ? <p>Clean me in {cleanIn} seconds!</p> : <p>I NEED A BATH NOW!!!</p>}
            </Row>
            <Row id="pet_img_row">
                <Bounce><img id="pet-img" src={pet.img_url} alt="Pet Image" /></Bounce>
            </Row>
        </div>
    )

}

export default UserPet