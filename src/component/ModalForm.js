import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/button'
import React, { Component } from 'react';
import Form from 'react-bootstrap/Form'

class ModalForm extends Component {

  state={name: ''}

  handleChange = (e) => this.setState({name: e.target.value})
  
  render(){

  const {closeModal, isOpen, handleSubmit} = this.props

  return (
      <>
        <div
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100vh" }}
        >
        </div>
        <Modal 
          show={isOpen} 
          onHide={closeModal} 
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title>Name Your Tama</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Form.Group >
                  <Form.Label htmlFor="username">Name: </Form.Label>
                  <Form.Control type="text" name="tama-name" onChange={this.handleChange} value={this.state.name} placeholder="Tamagotchi Name"/>           
              </Form.Group>
          </Modal.Body>
          <Modal.Footer>
              <Button variant="primary" type="submit" onClick={() => handleSubmit(this.state.name)}>
                  Submit
              </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

export default ModalForm