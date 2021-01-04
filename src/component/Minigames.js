import React from 'react';
import Button from 'react-bootstrap/Button'

const Minigames = ({startMiniGame}) => {
    return (
        <div>
            <h1>Choose a minigame to play</h1>
             <Button className="minigames_btn" variant="outline-warning" onClick={startMiniGame} id="ticTacToe">Tic Tac Toe</Button>
             <Button className="minigames_btn" variant="outline-warning" onClick={startMiniGame} id="janKen">Janken</Button>
        </div>
    );
}

export default Minigames;
