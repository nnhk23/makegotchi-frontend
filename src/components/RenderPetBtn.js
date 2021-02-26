import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import '../css/RenderPetBtn.css'

const RenderPetBtn = ({ userPet, handleUserPetIconClick, isDisabled }) => {
    const { name, pet } = userPet
    const { species, img_icon } = pet
    
    return (
        <Row className="icon-row" onClick={isDisabled ? null : () => handleUserPetIconClick(userPet)}>
            <Col sm={6}>
                <img className="icon-img" src={img_icon} alt="pet img"></img>
            </Col>
            <Col className="icon-info">
                <Row>
                    <h5 id="icon_name">{ name }</h5>
                </Row>
                <Row>
                    <p id="icon_species">{ species }</p>
                </Row>
            </Col>
        </Row>
    )
}

export default RenderPetBtn