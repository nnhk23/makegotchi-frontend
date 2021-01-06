import React from 'react'
import Square from './Square'

class Board extends React.Component {

    state={
        squares: Array(9).fill(null),
        userTurn: true,
        isWinner: false
    }

    // handle click on each square to decide if it's X/O
    handleClick = (i) => {
        const squares = this.state.squares.slice();

        if (this.calculateWinner(squares) || squares[i]){
            return;
        }

        if (this.state.userTurn){
            this.userClick(squares, i)
        }

        // comp move after 1 sec delay
        setTimeout(() => this.computerClick(squares), 1000)
    }

    userClick = (squares, i) => {
        squares[i] = 'X'

        this.setState(prevState => {
            return{
                squares: squares,
                userTurn: !prevState.userTurn
            }
        });
    }

    computerClick = (squares) => {
        const winner = this.calculateWinner(squares)
        let emptySquares = squares.map((s, idx) => s === null ? idx : null).filter(x => x)
        let indx = emptySquares[[Math.floor(Math.random() * emptySquares.length)]]

        squares[indx] = !winner ?  'O' : null

        this.setState(prevState => {
            return{
                squares: squares,
                userTurn: !prevState.userTurn
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
            this.props.updateMoneyLeft(100)
            return squares[a];
          }
        }
        return null;
    }

    // render 9 empty squares
    renderSquare = (i) => <Square value={this.state.squares[i]} handleClick={() => this.handleClick(i) } />

    resetSquares = () => this.setState({ squares: Array(9).fill(null) , isWinner: false})

    changeMoney = () => {
        // this.props.updateMoneyLeft(100)
        console.log('hello?')
        // this.setState({  })
    }

    render(){
        const winner = this.state.isWinner ? null : () => this.calculateWinner(this.state.squares)
        const draw = this.state.squares.filter(s => !s).length !== 0 ? false : true
        let player = this.state.userTurn ? 'X' : 'O'
        let status = winner ? `Winner is: ${winner}` : draw ? `It's a draw` : `Next Player: ${player}`
        return(
        <div>
            {/* { this.state.isWinner ? this.changeMoney() : null } */}
            {winner || draw ? <button className="restart_btn" variant="outline-warning" onClick={this.resetSquares}> Restart Game</button> : null}
            {/* {winner === 'X' ? alert('You won 100 coins!') && this.props.updateMoneyLeft(100) : winner === 'O' ? alert('You lost 100 coins!') : null } */}
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