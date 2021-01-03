/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './UserPet.css';
import styled, {keyframes} from 'styled-components';
import { bounce } from 'react-animations';

const Bounce = styled.div`animation: 2s ${keyframes`${bounce}`} infinite`;

const UserPet = ({ currentPet, feedIn, sleepIn, cleanIn }) => {
    const { name, happiness_score, last_fed, last_slept, last_cleaned, pet } = currentPet
    return (
        <div className="userPet_obj">
            <Row>
                <h3 className="userPet_name">{name}</h3> <h5 className="userPet_happy">Happiness: {happiness_score}</h5>
            </Row>
            <div id="bubble_div">
                <Col className="bubble">
                    {feedIn > 0 ? <p>Feed me in {feedIn} seconds!</p> : <p>I NEED FOOD NOW!!!</p>}
                    </Col>

                <Col className="bubble">
                    {sleepIn > 0 ? <p>Tuck me in bed in {sleepIn} seconds!</p> : <p>I NEED TO SLEEP NOW!!!</p>}
                    </Col>
                <Col className="bubble">
                    {cleanIn > 0 ? <p>Clean me in {cleanIn} seconds!</p> : <p>I NEED A BATH NOW!!!</p>}
                </Col>
            </div>
            <Row id="pet_img_row">
                <Bounce><img id="pet-img" src={pet.img_url} alt="Pet Image" /></Bounce>
            </Row>
        </div>
    )

}

export default UserPet