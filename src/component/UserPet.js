import React from 'react';
// import { Link } from 'react-router-dom';
import UserPetBio from './UserPetBio';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const UserPet = ({ currentPet }) => {
    if (currentPet) {
        const { name, happiness_score, pet } = currentPet
        return (
            <div>
                <Row>
                    <h2>{name}</h2>
                </Row>
                <Row>
                    <p>Happiness: {happiness_score}</p>
                </Row>
                <Row>
                    <img id="pet-img" src={pet.img_url} alt="Pet Img" />
                </Row>
                <Row>
                    <UserPetBio name={name} pet={pet} />
                </Row>
            </div>
        )

    }
    else {
        return <div></div>
    }
}
export default UserPet