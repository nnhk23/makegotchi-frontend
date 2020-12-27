import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home'
import TopNav from './component/TopNav'
import FormRender from './component/FormRender'
import './App.css';
import { Redirect } from "react-router-dom";
// import SignUp from './component/SignUp';



class App extends React.Component {

  state = {
    user: "",
    token: ""
  }

  // rendering components  --- > 
  renderHome = () => <Home user={this.state.user} />
  
  renderForm = (routerProps) => {
    if (routerProps.location.pathname === "/signup"){
      return <FormRender name="SignUp" handleSubmit={this.handleSignup} />
    } else if (routerProps.location.pathname === "/login"){
      return <FormRender name="Login" handleSubmit={this.handleLogin} />
    }
  }

  // sign up, log in, auth, log out --- > 
  handleSignup = (info) => {
    let data = {
      name: info.name, 
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/users")
  }

  handleLogin = (info) => {
    let data = {
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/login")
  }

  handleAuth = (data, resource) => {
    fetch(resource, {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => { 
      // debugger
      this.setState({user: data.user, token: data.token}, () => {
      this.props.history.push('/home')
      })
    })
  }


  handleLogout = () => {
    console.log("")
  }




  render(){
    return (
      <div className="App">
        <TopNav loggedIn={!!this.state.user} handleLogout={this.handleLogout}/>

        <Switch>
            <Route exact path="/home" >
              {!!this.state.user ?  <Home user={this.state.user} token={this.state.token} /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/" >
              {!!this.state.user ? <Redirect to="/home" /> : <Redirect to="/login" />}
            </Route>

            <Route path="/signup" exact component={this.renderForm} />
            <Route path="/login" exact component={this.renderForm} />
        </Switch>

      </div>

    )
  }
}

export default withRouter(App)

