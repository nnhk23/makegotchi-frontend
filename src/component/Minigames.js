// import React from 'react';
import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

class Minigames extends Component {
    
    state = {
        gamble : false
    }

    handleGamble = (e) => {
        let {name, value} = e.target
        this.setState({[name]:value})
    }

    handleClick = (e) => {
        let info = {gamble:this.state.gamble, id: e.target.id}
        this.props.startMiniGame(info)
    }

    render(){
        return (
            <div>
                <h1>Choose a minigame to play</h1>
                <Button className="minigames_btn" variant="outline-warning" onClick={(e) => this.handleClick(e)} id="ticTacToe">Tic Tac Toe</Button>
                <Button className="minigames_btn" variant="outline-warning" onClick={(e) => this.handleClick(e)} id="janKen">Janken</Button>
                <br/><br/><br/>
                <h4>Gamble 100 coins for a chance to win twice as much?</h4>
                <div>
                
                
                
                <Form onChange={(e) => this.handleGamble(e)}>
                    <div key={`inline-radio`} className="mb-3">
                        <h4>
                            <Form.Check value={true} inline label="Take my money!" type="radio"  name="gamble"/>
                            <Form.Check value={false} inline label="Nah, I'm broke" type="radio"  name="gamble"/>
                        </h4>
                    </div>
                </Form>



                </div>
            </div>
        );
    }
}

export default Minigames;
