import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class FormRender extends Component  {

    state = {
        name : null,
        username : null
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if (this.props.createUser){
            this.props.createUser(this.state)
        }
    }

    render() {
    return (
    <div>
        <Form>
            <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="name" placeholder="Enter name" onChange={(e) => this.setState({name:e.target.value})} />
            </Form.Group>

            <Form.Group controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" 
                onChange={(e) => this.setState({username:e.target.value})}
                />
            </Form.Group>
        
            <Button variant="primary" type="submit" onClick={this.handleSubmit}>Submit</Button>
        </Form>
    </div>
    );
    }
}

export default FormRender;




