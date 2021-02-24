import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ModalDelete = ({closeModal, openModal, handleDelete}) => {
    
    return (
    <>
        <Modal show={openModal} onHide={closeModal} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to permanently delete your account?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}> Close </Button>
                <Button variant="primary" onClick={handleDelete}> Delete</Button>
            </Modal.Footer>
        </Modal>
    </>
        );
}

export default ModalDelete;
