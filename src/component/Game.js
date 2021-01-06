import React from 'react'
import Board from './Board'
import '../css/Game.css'

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <Board updateMoneyLeft={this.props.updateMoneyLeft} gamble={this.props.gamble}/>
          </div>
        </div>
      );
    }
  }

export default Game