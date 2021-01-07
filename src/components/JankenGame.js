import React from 'react'
import JankenBoard from './JankenBoard'

const JankenGame = ({name, updateMoneyLeft, gamble, handleClick, disable, decrementPlaysLeft, playsLeft}) => {
   return (
        <div className="janken-game">
           <JankenBoard disable={disable} name={name} updateMoneyLeft={updateMoneyLeft} gamble={gamble} handleClick={handleClick} decrementPlaysLeft={decrementPlaysLeft} playsLeft={playsLeft}/>
        </div>
      );
}

export default JankenGame;
