import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Game from './Game'
import JankenGame from './JankenGame'


class Minigames extends Component {
    
    state = {
        gamble : false,
        screen: "" 
    }

    handleGamble = (e) => {
        this.setState({gamble: e.target.value})
    }

    handleClick = (e) => {
        let name = e.target.id
        this.setState({screen: name})
        // this.props.closeMiniGame()
    }

    render(){
        
        switch (this.state.screen) {
            case 'janKen' :
                return (
                    <JankenGame user={this.props.user} updateMoneyLeft={this.props.updateMoneyLeft} gamble={this.state.gamble} handleClick={this.handleClick}/>
                )
            case 'ticTacToe' :
                return (
                    <Game updateMoneyLeft={this.props.updateMoneyLeft} gamble={this.state.gamble}/>
                )
            default :
                return (
                    <div>
                        <h1>Choose a minigame to play</h1>
                            <Button className="minigames_btn" variant="outline-warning" onClick={(e) => this.handleClick(e)} id="ticTacToe">Tic Tac Toe</Button>
                            <Button className="minigames_btn" variant="outline-warning" onClick={(e) => this.handleClick(e)} id="janKen">Janken</Button>
                        <br/><br/><br/>
                        
                        
                        { this.props.money === 0 ? null : 
                        <div>
                            <h4>Gamble 100 coins for a chance to win twice as much?</h4>
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
