import React from 'react';
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/Home'
import TopNav from './component/TopNav'
import './App.css';
import SignUp from './component/SignUp';
// import LogIn from './component/LogIn';
import { Redirect } from "react-router-dom";



class App extends React.Component {

  // fetch user
  state = {
    user: null
  }

  setUser = (currentUser) => {
    console.log(currentUser)
    this.setState({user:currentUser})
  }

  render(){
    console.log(!!this.state.user)
    return (
       <div>
        <Router>
          <div className="App">
            <Route path="/" render={() => <TopNav loggedIn={!!this.state.user} setUser={this.setUser}/>} />
            {/* <Route exact path="/" component={LogIn} /> */}
            <Route exact path="/" >
              {!!this.state.user ? <Redirect to="/home" /> : <SignUp setUser={this.setUser} />}
            </Route>
            <Route exact path="/home" >
              {!!this.state.user ?  <Home user={this.state.user} /> : <Redirect to="/" />}
            </Route>

            {/* {!!this.state.user ?
              <Redirect to="/home" render={() => <Home user={this.state.user}/> } /> : 
              <Redirect to="/" render={() => <SignUp setUser={this.setUser}/> }/>
            } */}
          </div>
        </Router>
      

      </div>
    );
  }
}

export default App;
