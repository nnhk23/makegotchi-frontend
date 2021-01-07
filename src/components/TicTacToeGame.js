import React from 'react'
import TicTacToeBoard from './TicTacToeBoard'
import '../css/Game.css'

class TicTacToeGame extends React.Component {
    render() {
      return (
        <div className="game">
          <div className="game-board">
            <TicTacToeBoard 
              disable={this.props.disable}
              gamble={this.props.gamble} 
              handleClick={this.props.handleClick}
              updateMoneyLeft={this.props.updateMoneyLeft} />
          </div>
        </div>
      );
    }
  }

export default TicTacToeGame