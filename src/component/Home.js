import React from 'react';
import SideNav from './SideNav'
import Tamagotchi from './Tamagotchi'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
// import { Link } from 'react-router-dom';

export default class Home extends React.Component{

    // side nav appearwhen logged in.
    // fetching Alex's pets.
    // fetching list of all species.

    render(){
        return(
            <div className="home">
                <SideNav />
                {!!this.props.user? `Hi ${this.props.user.name}!` : null}
                <Tamagotchi />
            </div>
        )
    }
}

// render(){
//     return(
//         <div>
//             <Row>
//                 <Col sm={3} id='sideNav'> <SideNav /> </Col>
//                 {/* <Col id="tamagotchi_col">  */}
//                 <div id= 'tamagotchi_col'>
//                 <Tamagotchi /> 
//                 </div>
//                 {/* </Col> */}
//             </Row>
//         </div>
//     )
// }