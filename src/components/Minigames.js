import React, { Component } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import TicTacToeGame from './TicTacToeGame'
import JankenGame from './JankenGame'

class Minigames extends Component {

    state = {
        gamble : null,
        screen: "" 
    }

    handleGamble = (e) => {
        this.setState({gamble: e.target.value})
    }

    handleClick = (e) => {
        let name = e.target.id
        if (name === "miniGames"){
            this.setState({screen: name, gamble: null})
        } else {
            if (this.state.gamble !== null){  
                this.setState({screen: name},
                ()=> {
                  this.props.disable()
                  this.props.decrementPlaysLeft()
                })
            } else if (this.state.gamble === null && this.props.money === 0){
                this.setState({screen: name},
                    ()=> {
                      this.props.disable()
                      this.props.decrementPlaysLeft()
                    })
            } else {
                alert("You gambling or nah?")
            }
        }
    }

    render(){
        
        switch (this.state.screen) {
            case 'janKen' :
                return (
                    <JankenGame 
                        name={this.props.name} 
                        gamble={this.state.gamble} 
                        handleClick={this.handleClick}
                        disable={this.props.disable} 
                        updateMoneyLeft={this.props.updateMoneyLeft} 
                        decrementPlaysLeft={this.props.decrementPlaysLeft}
                        playsLeft={this.props.playsLeft}/>
                      )
            case 'ticTacToe' :
                return (
                    <TicTacToeGame 
                        disable={this.props.disable} 
                        gamble={this.state.gamble} 
                        handleClick={this.handleClick}
                        updateMoneyLeft={this.props.updateMoneyLeft} 
                        decrementPlaysLeft={this.props.decrementPlaysLeft}
                        playsLeft={this.props.playsLeft}/>
                      )
            default :
                return (
                     <div className="choose_game">
                        {this.props.playsLeft > 0 ? 
                        <h1 className='header_txt'>Choose a minigame to play</h1> :
                        <h1 className='header_txt'>You don't have any plays left!</h1> }

                        {this.props.playsLeft > 0 ? 
                        <h4 className="mb-3">You have {this.props.playsLeft} {this.props.playsLeft === 1 ? "play" : "plays"} left!</h4> :
                        <h4 className="mb-3">Plays get reset to 5 every 10 minutes!</h4>}

                        <Button className="minigames_btn" variant="outline-warning" disabled={this.props.playsLeft <= 0} onClick={(e) => this.handleClick(e)} id="ticTacToe">Tic Tac Toe</Button>
                        <Button className="minigames_btn" variant="outline-warning" disabled={this.props.playsLeft <= 0} onClick={(e) => this.handleClick(e)} id="janKen">Janken</Button>
                        <br/><br/><br/>
                        
                        
                        { this.props.money === 0 ? null : 
                        <div>
                            <h4 className='gamble_txt'>Gamble 100 coins for a chance to win twice as much?</h4>
                            
                            <Form onChange={(e) => this.handleGamble(e)}>
                            <div key={`inline-radio`} className="mb-3">
                            <h4>
                                <Form.Check value={true} inline label="Take my money!" type="radio"  name="gamble"/>
                                <Form.Check value={false} inline label="Nah, I'm broke" type="radio"  name="gamble"/>
                            </h4>
                            </div>
                            </Form>
                        </div>}

                    </div>
                );
            }
        }
    }

export default Minigames;
