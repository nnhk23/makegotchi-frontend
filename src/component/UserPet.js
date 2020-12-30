import React from 'react';
// import { Link } from 'react-router-dom';
import UserPetBio from './UserPetBio';
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import './UserPet.css';

const UserPet = ({ currentPet }) => {
    if (currentPet) {
        const { name, happiness_score, pet } = currentPet
        return (
            <div className="userPet_obj">
                <Row>
                    <h2 className="userPet_name">{name}</h2>
                </Row>
                <Row>
                    <p className="userPet_happy">Happiness: {happiness_score}</p>
                </Row>
                <Row>
                    <img id="pet-img" src={pet.img_url} alt="Pet_Image" />
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