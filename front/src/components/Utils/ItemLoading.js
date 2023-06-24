import React from 'react';
import { Row, Col, Spinner } from 'react-bootstrap';
import ProgressBar from 'react-bootstrap/ProgressBar';


function ItemLoading({contador}) {
    return (
        <Row>
            <Col xs={12} className='text-center my-5'>
            <ProgressBar animated  now={contador} label={`${contador}%`} />
            </Col>
        </Row>
    );
}

export default ItemLoading;