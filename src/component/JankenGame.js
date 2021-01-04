import React from 'react'
import JankenBoard from './JankenBoard'


const JankenGame = ({user, startMiniGame}) => {
   return (
        <div className="janken-game">
           <JankenBoard user={user} startMiniGame={startMiniGame} />
        </div>
      );
        
}

export default JankenGame;
