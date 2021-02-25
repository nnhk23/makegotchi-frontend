import React from 'react'
import {Route, Switch, withRouter, Redirect} from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/Home'
import TopNav from './components/TopNav'
import FormRender from './components/FormRender'
import './App.css';
import egg_login from './images/makegotchi_login.png'
import ModalDelete from './components/ModalDelete'


class App extends React.Component {

  state = {
    id: "",
    user: "",
    modalDelete: false,
    openDeleteModal: false,

    disabled :false
  }

  disable = (toggle="" ) => {
   if (toggle === ""){
    this.setState({disabled: true})
    } else {
      this.setState({disabled: false})
    }
  }

  // rendering components  --- > 
  renderHome = () => <Home 
    disable={this.disable} 
    isDisabled={this.state.disabled} 
    user={this.state.user} 
    token={localStorage.getItem('jwt')} 
    refresh={this.handleRefresh} />

  renderForm = (routerProps) => {
  
    switch (routerProps.location.pathname){
      case "/signup" :
        return <div className='login_screen'><FormRender name="SignUp" handleSubmit={this.handleSignup} /></div>

      case "/login" :
        return <div className='login_screen'><FormRender name="Login" handleSubmit={this.handleLogin} /></div>

      case "/editprofile" :
        return <div className='login_screen'><FormRender name="Update" handleSubmit={this.handleUpdate} handleDelete={this.openModal} history={this.props.history}/></div>

      default : break
    }
  }

  openModal = (id) => {
    this.setState({ 
      openDeleteModal: true, 
      modalDelete: true,
      id: id})
    }

  closeModal = () => this.setState({ openDeleteModal: false });

  // sign up, log in, auth, update, log out --- > 

  handleSignup = (info) => {
    let data = {
      name: info.name,
      username: info.username,
      password: info.password
    }
    this.handleAuth(data, "https://makegotchi-backend.herokuapp.com/users", "POST")
    
  }

  handleLogin = (info) => {
    let data = {
      username: info.username,
      password: info.password
    }
    this.handleAuth(data, "https://makegotchi-backend.herokuapp.com/login", "POST")
  }

  handleUpdate = (info) => {
    let data = {
      username: info.username, 
      password: info.password
    }
    this.handleAuth(data, `https://makegotchi-backend.herokuapp.com/users/${info.id}`, "PATCH")
  }

  handleAuth = (data, resource, method) => {
    fetch(resource, {
      method:  method,
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(data => { 

      if (data.error) { 
        this.handleError(data) }
      else {
        this.setState({user: data.user} ,() => {
          if (data.token){
            localStorage.setItem('jwt', data.token)
            this.props.history.push('/home')
          }  else  {
            alert("Profile Succesfully Updated!")
            this.props.history.push('/home')}
      })}
    })
  }

  handleError = (data) => {
    alert(`${data.error}`)
    if (data.error === "Username has already been taken. Sorry can't update your profile."){
      this.props.history.push("/editprofile")
    } else {
    this.props.history.push(
      data.error === "Incorrect credentials, please try again." ? '/login' : '/signup')
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

  handleDelete = () => {
    this.closeModal()
    fetch(`https://makegotchi-backend.herokuapp.com/users/${this.state.id}`, {
      method:  "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    .then(res => res.json())
    .then(() => this.handleLogout())
  }

  render(){
    return (
      <div className="App">
        <TopNav loggedIn={!!this.state.user} handleLogout={this.handleLogout} isDisabled={this.state.disabled} />


        <div className="makegotchi_background">
          <img src={egg_login} alt='tamagotchi_login' id='tamagotchi_login' />

          <div className='login_screen_div'>
       
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
        </div>
        { this.state.modalDelete ?
          <ModalDelete
              closeModal={this.closeModal}
              openModal={this.state.openDeleteModal}
              handleDelete={this.handleDelete}
          />
          : null }
      </div>
    )
  }
}

export default withRouter(App)