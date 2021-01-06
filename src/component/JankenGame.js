import React from 'react'
import JankenBoard from './JankenBoard'


const JankenGame = ({user, startMiniGame, updateMoneyLeft, gamble}) => {
   return (
        <div className="janken-game">
           <JankenBoard user={user} startMiniGame={startMiniGame} updateMoneyLeft={updateMoneyLeft} gamble={gamble} />
        </div>
      );
        
}

export default JankenGame;
