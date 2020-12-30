import React from 'react';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserPet = ({ currentPet, feedIn, sleepIn, cleanIn }) => {
    const { name, happiness_score, last_fed, last_slept, last_cleaned, pet } = currentPet
    return (
        <div>
            <Row>
                <h2>{name}</h2>
            </Row>
            <Row>
                <p>Happiness: {happiness_score}</p> 
            </Row>
            <Row>
                {feedIn > 0 ? <p>Feed me in {feedIn} seconds!</p> : <p>I NEED FOOD NOW!!!</p>}
            </Row>
            <Row>
                {sleepIn > 0 ? <p>Tuck me in bed in {sleepIn} seconds!</p> : <p>I NEED TO SLEEP NOW!!!</p>}
            </Row>
            <Row>
                {cleanIn > 0 ? <p>Clean me in {cleanIn} seconds!</p> : <p>I NEED A BATH NOW!!!</p>}
            </Row>
            <Row>
                <img id="pet-img" src={pet.img_url} alt="Pet Image" />
            </Row>
        </div>
    )
}
export default UserPet