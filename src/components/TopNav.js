import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

const TopNav = ({ loggedIn, handleLogout}) => {

    return(
        <Navbar
        className='ml-auto'
        bg="dark"
        variant="dark"
        activeKey="/home"
        ><Nav.Link href="/home"><h4 id="logo_topNav">MAKEGOTCHI</h4></Nav.Link>
        { loggedIn ?
            <Navbar.Collapse className='justify-content-end'>
                <Nav.Item >
                    <Nav.Link href="/editprofile">Profile</Nav.Link>
                </Nav.Item>
                
                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
            :
            <Navbar.Collapse className='justify-content-end'>
                <Nav.Item >
                    <Nav.Link href="/home"></Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
        }
        </Navbar>
    )

}
export default TopNav