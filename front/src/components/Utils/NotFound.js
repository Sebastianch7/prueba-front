import React from 'react';
import Alert from 'react-bootstrap/Alert';

function NotFound(props) {
    return (
        <Alert key={'info'} variant={'info'} className='my-3'>
          No se encontró información de sucursales.
        </Alert>
    );
}

export default NotFound;