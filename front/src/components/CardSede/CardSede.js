import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function CardSede({name = '', description = '', address = '', phone = '', schedule = '', img = ''}) {
    return (
        <Card style={{ width: '18rem' }} className='m-2'>
            <Card.Img variant="top" src={img} />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
                <ListGroup.Item>Dirección: {address}</ListGroup.Item>
                <ListGroup.Item>Teléfono: {phone}</ListGroup.Item>
                <ListGroup.Item>Horario: {schedule}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
                <Card.Link href="#">Editar</Card.Link>
                <Card.Link href="#">Eliminar</Card.Link>
            </Card.Body>
        </Card>
    );
}

export default CardSede;