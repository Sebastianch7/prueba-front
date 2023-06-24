import { type } from '@testing-library/user-event/dist/type';
import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

function MessageToast({title = 'Aviso de sistema', message = '',  alert = ''}) {
    const [position] = useState('bottom-center');
    const [show, setShow] = useState(true);

    return (
        <ToastContainer  position={position} className='mb-5'>
            <Toast bg={'dark'} varia onClose={() => setShow(false)} show={show} delay={3000} autohide>
                <Toast.Header>
                    <strong className="me-auto">{title}</strong>
                    <small className="text-muted text-white">Ahora mismo</small>
                </Toast.Header>
                <Toast.Body className='text-white'>{message}</Toast.Body>
            </Toast>
        </ToastContainer>
    );
}

export default MessageToast;