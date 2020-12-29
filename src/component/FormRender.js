import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom';

class FormRender extends Component  {

    state = {
        name: "",
        username : "",
        password : ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
    }

    handleChange = (e) => {
        let {name, value} = e.target
        this.setState({
            [name]: value
    })}


    render() {
    return (
    <div>
        <Form>
            <h1>{this.props.name}</h1>
            {this.props.name === "SignUp" ? 

            //sample conditionation for update (input values)
            // set state on a condition
            <Form.Group >
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control type="text" name="name" 
                value={this.props.name ==="Update" ? {/*currentuser data*/} : this.state.name} 
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

            {/* {this.props.name === "SignUp" ? 
            <Form.Group >
                <Form.Label htmlFor="password">Password Confirmation</Form.Label>
                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleChange} />
            </Form.Group> : null}
         */}
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>{this.props.name === "SignUp" ? "Sign up" : "Log in"}</Button>
        </Form>
        <br/>
        {this.props.name === "SignUp" ? 
        <h5>I have an account! <Link to="/login" >Log in!</Link></h5> :
        <h5>Don't have an account? <Link to="/signup" >Sign up!</Link></h5> }
    </div>
    );
    }
}

export default FormRender;




