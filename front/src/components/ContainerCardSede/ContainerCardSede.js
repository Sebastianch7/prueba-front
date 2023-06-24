import React, { Children } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ContainerCardSede({ children }) {
    return (
        <Container>
            <Row>
                {children}
            </Row>
        </Container>
    );
}

export default ContainerCardSede;