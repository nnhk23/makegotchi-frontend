import React from 'react'

class Square extends React.Component {

  state={ xIsNext: false }

  autoClick = (squares) => {   
    const arr = Array.prototype.slice.call(squares)
    // debugger
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
            {!this.state.xIsNext && squares.length === 9 ? this.autoClick(squares) : null}
          </button>
      )
  }
}

export default Square