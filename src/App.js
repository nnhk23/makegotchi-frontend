import React from 'react';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './component/Home'
import TopNav from './component/TopNav'
import FormRender from './component/FormRender'
import './App.css';



class App extends React.Component {

  state = {
    user: ""
  }

  // rendering components  --- > 
  renderHome = () => <Home user={this.state.user} token={localStorage.getItem('jwt')} refresh={this.handleRefresh} />
  
  renderForm = (routerProps) => {
    
    if (routerProps.location.pathname === "/signup"){
      return <FormRender name="SignUp" handleSubmit={this.handleSignup} />
    } else if (routerProps.location.pathname === "/login"){
      return <FormRender name="Login" handleSubmit={this.handleLogin} />
    } else if (routerProps.location.pathname === "/editprofile"){
      return <FormRender name="Update" handleSubmit={this.handleUpdate} handleDelete={this.handleDelete}/>
    }
  }

 
  // sign up, log in, auth, log out --- > 
  handleSignup = (info) => {
    let data = {
      name: info.name, 
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/users", "POST")
    
  }

  handleLogin = (info) => {
    let data = {
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, "http://localhost:3000/login", "POST")
  }

  handleUpdate = (info) => {
    let data = {
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, `http://localhost:3000/users/${info.id}`, "PATCH")
  }

  handleAuth = (data, resource, method) => {
    fetch(resource, {
      method:  method,
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => { 
  
        data.error ? this.handleError(data) :
        this.setState({user: data.user} ,() => {
          if (data.token){
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/home')
          } else {
          alert("Profile Succesfully Updated!")
          this.props.history.push('/home')}
      })
    })
  }

  handleError = (data) => {
    if (data.error === "Username has already been taken. Please try again."){
      alert(`${data.error}`)
      this.props.history.push('/signup')
    } else {
      alert(`${data.error}`)
      this.props.history.push('/login')
    } 
  }

 
  handleLogout = () => {
    localStorage.clear()
    this.setState({user: ""}, ()=>{
      this.props.history.push('/login')
    })
  }

  handleRefresh = (data) => {
    this.setState({user: data.user})
  }

  handleDelete = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(() => this.handleLogout())
  }

  render(){
    return (
      <div className="App">
        <TopNav loggedIn={!!this.state.user} handleLogout={this.handleLogout} />

        <Switch>
            <Route exact path="/home" >
              {!!localStorage.getItem('jwt') ?  this.renderHome(): <Redirect to="/login" />}
            </Route>

            <Route exact path="/login" >
              {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
              <Route path="/login" exact component={this.renderForm} />}
            </Route> 

            <Route exact path="/signup" >
            {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
            <Route path="/signup" exact component={this.renderForm} />}
          </Route>

          <Route exact path="/" >
            {!!localStorage.getItem('jwt') ? <Redirect to="/home" /> : 
            <Redirect to="/login" exact component={this.renderForm} />}
          </Route>

          <Route exact path="/editprofile" >
            {!!localStorage.getItem('jwt') ? <Route path="/editprofile" exact component={this.renderForm} /> : 
            <Redirect to="/login" exact component={this.renderForm} />}
          </Route>
          
            
        </Switch>
      </div>

    )
  }
}

export default withRouter(App)