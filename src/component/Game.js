import React from 'react'
import TicTacToeBoard from './TicTacToeBoard'
import '../css/Game.css'

class Game extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <TicTacToeBoard updateMoneyLeft={this.props.updateMoneyLeft}/>
          </div>
        </div>
      );
    }
  }

export default Game