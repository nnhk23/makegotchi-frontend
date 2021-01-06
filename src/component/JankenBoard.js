import React, { Component } from 'react';
import Scissors from '../images/scissors.png'
import Paper from '../images/paper.png'
import Rock from '../images/rock.png'
import ScissorsCpu from '../images/scissors_left.png'
import PaperCpu from '../images/paper_left.png'
import RockCpu from '../images/rock_left.png'
import Button from 'react-bootstrap/Button'

// import Row from 'react-bootstrap/Row';

class JankenBoard extends Component {

    state= {
        userScore: 0,
        cpuScore: 0,
        userScreen: "",
        cpuScreen: "",
        winsNeeded: 3,
        message: "Best out of 3",
        winner: false
    }

    playAgain = () => {
        this.setState({userScore:0, cpuScore:0, winsNeeded:3, message: "Good Luck!", winner:false})
    }

    clearScreens = () => {
        this.setState(prevState => {
            return {userScreen: "", cpuScreen: "", message: `${prevState.winsNeeded} more to win` }})
    }


    handleClick = (e) => {
    
        setTimeout(this.clearScreens, 2000)
        let rand = Math.round(Math.random() * 2)
        let cpu 
        let cpuShow
        switch (rand){
            case 0: 
                cpu = "Rock" 
                cpuShow = RockCpu
                break
            case 1:
                cpu = "Paper"
                cpuShow = PaperCpu
                break
            case 2:
                cpu = "Scissors"
                cpuShow = ScissorsCpu
                break
            default:
                break
        }

        let userChoice = e.target.value
        let userShow
        switch (userChoice){
            case 'Rock': 
                userShow = Rock
                break
            case 'Paper': 
                userShow = Paper
                break
            case 'Scissors': 
                userShow = Scissors
                break
            default:
                break
        }

        this.setState({cpuScreen: cpuShow, userScreen: userShow})

        if (cpu === "Rock" ){
            if (userChoice === "Rock"){
                this.setState({message: "It's a tie!"})

            } else if (userChoice === "Scissors"){
                this.setState(prevState => {
                    return {cpuScore: prevState.cpuScore + 1, message: "You lost"}
                }, ()=>{this.gameover()})

            } else if (userChoice === "Paper"){
                this.setState(prevState => {
                    return {userScore: prevState.userScore + 1, message: "You won!", winsNeeded: prevState.winsNeeded - 1}
                }, ()=>{this.gameover()})
            }
        }
        else if (cpu === "Paper" ){
            if (userChoice === "Paper"){
                this.setState({message: "It's a tie!"})

            } else if (userChoice === "Rock"){
                this.setState(prevState => {
                    return {cpuScore: prevState.cpuScore + 1, message: "You lost"}
                }, ()=>{this.gameover()})

            } else if (userChoice === "Scissors"){
                this.setState(prevState => {
                    return {userScore: prevState.userScore + 1, message: "You won!", winsNeeded: prevState.winsNeeded - 1}}, ()=>{this.gameover()
                })
            }
        }
        if (cpu === "Scissors" ){
            if (userChoice === "Scissorts"){
                this.setState({message: "It's a tie!"})

            } else if (userChoice === "Paper"){
                this.setState(prevState => {
                    return {cpuScore: prevState.cpuScore += 1, message: "You lost"}
                }, ()=>{this.gameover()})

            } else if (userChoice === "Rock"){
                this.setState(prevState => {
                    return {userScore: prevState.userScore += 1, message: "You won!", winsNeeded: prevState.winsNeeded -= 1}
                }, ()=>{this.gameover()})
            }
        }
    }

    gameover = () => {
        if (this.state.userScore === 3){
            setTimeout(this.handleGameover, 1000)
            this.props.gamble ? this.props.updateMoneyLeft(200) : this.props.updateMoneyLeft(100)
        } else if (this.state.cpuScore === 3){
            setTimeout(this.handleGameover, 1000)
            if (this.props.gamble === "true") {
                this.props.updateMoneyLeft(-100)}
        }
    }

    handleGameover = () => {
        this.setState({winner:true})
    }
    

    render() {
        
        return (
            
            <div>
                <h1>JanKen</h1>
                <h3>{this.state.winner ? 
                `You ${this.state.userScore === 3 ? `Won ${this.props.gamble ? "200" : "100"} coins!` : `${this.props.gamble ? "Lost!" : "Lost 100 coins!"}` }`: this.state.message}</h3>
                
                <div className="game">
                    <div className ="janken-square">
                        <h4>Computer - {this.state.cpuScore}</h4>
                        {this.state.winner ?
                        <Button className="minigames_btn" variant="outline-warning" onClick={this.props.startMiniGame} id="miniGames">Minigames</Button> :
                        <img className="janken-pics" src={this.state.cpuScreen} alt=""/> }
                    </div>
                    <div className ="janken-square">
                        <h4>{this.props.user.name} - {this.state.userScore}</h4>
                        {this.state.winner ?
                        <Button className="minigames_btn" variant="outline-warning" onClick={this.playAgain} id="janKen">Play Again</Button>:
                        <img className="janken-pics" src={this.state.userScreen} alt=""/> }
                    </div>
                </div>
                <div onClick={this.props.handleActionBtnClick}>
                    <button 
                        className="controls" 
                        value="Rock" 
                        disabled={this.state.winner ? true : false}
                        onClick={(e) => this.handleClick(e)}>Rock
                    </button>
                    <button 
                        className="controls" 
                        value="Paper" 
                        disabled={this.state.winner ? true : false}
                        onClick={(e) => this.handleClick(e)}>Paper
                    </button>
                    <button 
                        className="controls" 
                        value="Scissors" 
                        disabled={this.state.winner ? true : false}
                        onClick={(e) => this.handleClick(e)}>Scissors
                    </button>
                </div>
            </div> 
            )
        }
    }

export default JankenBoard;
