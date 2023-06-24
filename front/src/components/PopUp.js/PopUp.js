import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';

function PopUp({ children }) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ubicación en mapa</Modal.Title>
            </Modal.Header>
            <Modal.Body  className='modal-maps'>
                {children}
            </Modal.Body>
        </Modal>
    );
}

export default PopUp;