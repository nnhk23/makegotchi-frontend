import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import { Link } from 'react-router-dom';
import egg_draft from '../images/makegotchi_egg.png'
import "./Tamagotchi.css"

class FormRender extends Component  {

    state = {
        id: "",
        name: "",
        username : "",
        password : "",
        password_confirmation : ""
    }

    componentDidMount() {
        if (localStorage.getItem('jwt')){
            fetch('http://localhost:3000/getuser',{
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                'Authorization' : `Bearer ${localStorage.getItem('jwt')}`
            }})
            .then(res => res.json())
            .then(data => {
                this.setState({username: data.user.username, id: data.user.id})})
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

        if (this.props.name === "Update"){
            if (e.target.textContent === "Delete Account") {
            this.props.handleDelete(this.state.id)
            } else if (this.state.password === this.state.password_confirmation){this.props.handleSubmit(this.state)} 
        } else if (this.state.password_confirmation && 
            this.state.password === this.state.password_confirmation){this.props.handleSubmit(this.state)
        } else if (!this.state.password_confirmation) {
                this.props.handleSubmit(this.state)
        } else { 
            alert("Sorry! Passwords do not match. Please try again.")
            this.setState({
                password : "",
                password_confirmation : ""
            })
        }

    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value.charAt(0).toUpperCase() + value.slice(1)
    })}
    render() {
        // debugger
      return (
        <div className="home">
          <div className="tamagotchi_container" id='screen_div'>
          <div className="tamagotchi_background">
          <img src={egg_draft} alt='tamagotchi' id='tamagotchi_pic' />
          <div id='screen'>
              <div>
                  <Form>
                      <h1>{this.props.name}</h1>
                      {this.props.name === "SignUp" ? 

                      //sample conditionation for update (input values)
                      // set state on a condition
                      <Form.Group >
                          <Form.Label htmlFor="name">Name</Form.Label>
                          <Form.Control type="text" name="name" 
                          value={this.state.name} 
                          onChange={this.handleChange} />
                      </Form.Group> : null}

                      <Form.Group >
                          <Form.Label htmlFor="username">Username</Form.Label>
                          <Form.Control type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                      </Form.Group>

                      <Form.Group >
                          <Form.Label htmlFor="password">Password</Form.Label>
                          <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                      </Form.Group>

                      {this.props.name !== "Login" ? 
                      <Form.Group >
                          <Form.Label htmlFor="password_confirmation">Password Confirmation</Form.Label>
                          <Form.Control type="password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange} />
                      </Form.Group> : null}

                      {this.props.name === "Update" ? 
                      <Button variant="outline-warning" type="submit" onClick={this.handleSubmit}>Update</Button> :
                      <Button variant="primary" type="submit" onClick={this.handleSubmit}>{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button> }
                  </Form>
                  <br/>

                  {this.props.name === "SignUp" ? 
                  <h5>I have an account! <Link to="/login" >Log in!</Link></h5> :
                  null }

                  {this.props.name === "Login" ? 
                  <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

                  {this.props.name === "Update" ? 
                  <Button variant="outline-danger" type="submit" onClick={this.handleSubmit}>Delete Account</Button> : null }
              </div>
          </div>
        </div>
    </div>
    </div>
    );
    }
}

export default FormRender;




    
                        
                        
