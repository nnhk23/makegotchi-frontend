import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

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

        switch (true) {

            case (this.props.name === "Update" &&
            e.target.textContent === "Delete Account"):
                return this.props.handleDelete(this.state.id)

            case (this.props.name === "Login"):
                return this.props.handleSubmit(this.state)

            case (this.state.password === "" ||
            this.state.password_confirmation === ""):
                return alert("Fields cannot be blank.")
            
            case (this.props.name === "Update" 
            && this.state.username === "" ):
                return alert("Fields cannot be blank.")

            case (this.props.name === "Signup" && 
            this.state.username === ""):
                return alert("Fields cannot be blank.")

            case (this.props.name === "Signup" && 
            this.state.name === ""):
                return alert("Fields cannot be blank.")

            case (this.props.name === "SignUp" &&
            this.state.password === this.state.password_confirmation):
            return this.props.handleSubmit(this.state)

            case (this.props.name === "Update" &&
            this.state.password === this.state.password_confirmation):
                return this.props.handleSubmit(this.state)

            default: {
                alert("Sorry! Passwords do not match. Please try again.")
                this.setState({
                    password : "",
                    password_confirmation : ""
                })}
        }
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value.charAt(0).toUpperCase() + value.slice(1)
    })}

    handleCancelUpdate = () => {
        this.props.history.push('/home')
    }


    render() {
      return (
          <div id="formRender_div">

              {this.props.name === "Update" ? <h4 id="exit_btn" type="submit" onClick={this.handleCancelUpdate}>x</h4> : null}

            <Form>
                <h1>{this.props.name}</h1>
                {this.props.name === "SignUp" ?

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
                  <Button id="update_btn" variant="outline-warning" type="submit" onClick={this.handleSubmit}>Update</Button> :
                  <Button variant="primary" type="submit" onClick={this.handleSubmit}>{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button> }
            </Form>
            <br/>

            {this.props.name === "SignUp" ?
            <h5>I have an account! <Link to="/login" >Log in!</Link></h5> : null }

            {this.props.name === "Login" ?
            <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> : null }

            {this.props.name === "Update" ?
            <Button id="delete_btn" variant="outline-danger" type="submit" onClick={this.handleSubmit}>Delete Account</Button> : null }

    </div>
    );
    }
}

export default FormRender;







