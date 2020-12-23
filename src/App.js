import React from 'react';
import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Home from './component/Home'
import TopNav from './component/TopNav'
import './App.css';

class App extends React.Component {

  // fetch user
  state={
    user: {
      id: 1, 
      username: "alex", 
      name: "Alex G", 
      buys_left: 1
    }
  }

  render(){
    return (
      <div>

        <TopNav /> 
          
        <Container style={{marginLeft: 0}}>
          <Home user={this.state.user} />
        </Container>
        
        {/* <UserInfo user={this.state.user} /> */}       
        {/* SignIn component */}
      </div>
      // <Router>
      //   <div className="App">
      //     <Route exact path="/" render={() => <Home />} />
      //   </div>
      // </Router>
    );
  }
}

export default App;
