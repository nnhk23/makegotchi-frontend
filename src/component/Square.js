import React from 'react'

class Square extends React.Component {

  state={ xIsNext: false }

  autoClick = (squares) => {
    const arr = Array.prototype.slice.call(squares)
    let indx = arr.findIndex(s => !s.value )
    squares[indx].click()
    this.toggleX()
  }

  toggleX = () => this.setState(prevState => {
    return{ xIsNext: !prevState.xIsNext }
  })

  render(){
      const squares = document.getElementsByClassName('square')
      return(
          <button 
          className='square' 
          onClick={this.props.handleClick}
          >
            {this.props.value}
            {!this.state.xIsNext && squares.length !== 0 ? this.autoClick(squares) : console.log(this.state.xIsNext, squares.length)}
          </button>
      )
  }
}

export default Square