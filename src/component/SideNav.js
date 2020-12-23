import React from 'react';
import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom';

const SideNav = ({purchasePets}) => {
    // appear after logged in
    // render Alex's pets from Home
    // buy pet buttons would trigger a callback function onClick.
    // click on specific pet would trigger a callback function onClick.
    // => re-render tamagotchi's screen
    return(
        <div>
            <h2>User's Tamagotchis</h2>
            <Button variant="outline-warning" onClick={purchasePets}>Buy Pet</Button>{' '}
        </div>
    )
}
export default SideNav