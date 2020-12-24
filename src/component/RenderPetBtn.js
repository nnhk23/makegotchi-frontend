import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const RenderPetBtn = ({ userPet, handleIconClick }) => {
    const { name, pet } = userPet
    // console.log(pet)
    const { species, img_icon } = pet
    return (
        <Row className="icon-row" onClick={() => handleIconClick(userPet)}>
            <Col sm={6}>
                <img className="icon-img" src={img_icon} alt="pet img"></img>
            </Col>
            <Col className="icon-info">
                <Row>
                    <h5>{ name }</h5>
                </Row>
                <Row>
                    <p>{ species }</p>
                </Row>
            </Col>
        </Row>
    )
}

export default RenderPetBtn