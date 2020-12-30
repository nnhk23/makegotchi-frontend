import React from 'react'
import Square from './Square'

class Board extends React.Component {

    state={
        squares: Array(9).fill(null),
        xIsNext: false
    }
    
    // handle click on each square to decide if it's X/O
    handleClick = (i) => {
        const squares = this.state.squares.slice();

        if (this.calculateWinner(squares) || squares[i]) {
            return;
        }

        if (this.state.xIsNext){
            squares[i] = 'X'
        } else {
            const indx = squares.findIndex(s => s === null)
            squares[indx] = 'O'
        }

        // squares[i] = this.state.xIsNext ? 'X' : 'O'

        this.setState(prevState => {
            return{
                squares: squares,
                xIsNext: !prevState.xIsNext
            }
        });
    }

    calculateWinner = (squares) => {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
          }
        }
        return null;
    }
    
    // render 9 empty squares
    renderSquare = (i) => 
        <Square 
            value={this.state.squares[i]} 
            handleClick={() => this.handleClick(i)}
        />

    render(){
        const winner = this.calculateWinner(this.state.squares)

        let player = this.state.xIsNext ? 'X' : 'O'
        let status = winner ? `Winner is: ${winner}` : `Next Player: ${player}`
        return(
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}
            </div>
            <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
            </div>
            <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
            </div>
        </div>
        )
    }
}

export default Board