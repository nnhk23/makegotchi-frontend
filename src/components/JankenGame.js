import React from 'react'
import JankenBoard from './JankenBoard'


const JankenGame = ({user, startMiniGame, updateMoneyLeft, gamble, handleClick, decrementPlaysLeft, playsLeft}) => {
   return (
        <div className="janken-game">
           <JankenBoard user={user} startMiniGame={startMiniGame} updateMoneyLeft={updateMoneyLeft} gamble={gamble} handleClick={handleClick} decrementPlaysLeft={decrementPlaysLeft} playsLeft={playsLeft}/>
        </div>
      );
        
}

export default JankenGame;
