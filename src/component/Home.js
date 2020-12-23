import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom';

export default class Home extends React.Component{

    // side nav appearwhen logged in.
    // fetching Alex's pets.
    // fetching list of all species.
    

    render(){
        return(
            <div>
                <Row>
                    <Col sm={3} id='sideNav'> <SideNav /> </Col>
                    <Col> <Tamagotchi /> </Col>
                </Row>
            </div>
        )
    }
}