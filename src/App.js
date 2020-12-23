import React from 'react';
// import Container from 'react-bootstrap/Container'
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
    this.setState({user:currentUser})
  }

  render(){
    return (
      
        /* <TopNav />

       <Container style={{marginLeft: 0}}>
         <Home user={this.state.user} />
         </Container>
        
       /* <UserInfo user={this.state.user} /> */      
         /* SignIn component */
       <div> 
        <Router>
          <div className="App">
            <Route path="/" render={() => <TopNav loggedIn={!!this.state.user} setUser={this.setUser}/>} />
            {/* <Route exact path="/" component={LogIn} /> */}
            <Route exact path="/" render={() => <SignUp setUser={this.setUser} />}  />
            <Route exact path="/home" render={() => <Home user={this.state.user} />}  />

            {!!this.state.user ?
              <Redirect to="/home" render={() => <Home user={this.state.user}/> } /> : <Redirect to="/" render={() => <SignUp setUser={this.setUser}/> }/>}
          </div>
        </Router>

          
      </div>
    );
  }
}

export default App;
