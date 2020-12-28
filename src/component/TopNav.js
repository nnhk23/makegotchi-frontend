import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import { Link } from 'react-router-dom';

const TopNav = ({ loggedIn, handleLogout }) => {



    return(
        <Navbar
        className='ml-auto'
        bg="dark"
        variant="dark"
        activeKey="/home"
        // onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
        ><h4 id="logo_topNav">MAKEGOTCHI</h4>
        { loggedIn ?
            <Navbar.Collapse className='justify-content-end'>
                <Nav.Item >
                    <Nav.Link href="/home">Profile</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                    <Nav.Link eventKey="link-1" onClick={() => handleLogout()}>Logout</Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
            :
            <Navbar.Collapse className='justify-content-end'>
                <Nav.Item >
                    <Nav.Link href=""></Nav.Link>
                </Nav.Item>
            </Navbar.Collapse>
        }
        </Navbar>
    )
    // logo and app name left side.
    // when logged in: logout and profile button would appear.
}
export default TopNav