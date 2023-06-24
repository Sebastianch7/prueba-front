import React from 'react';
import { useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import MessageToast from '../Utils/MessageToast';
function CardSede({ item }) {
    const { nombre, codigo, descripcion, direccion, identificacion, fechaCreacion, horario, telefono, image = 'https://www.quala.com.co/wp-content/uploads/2022/09/quala-colombia-escritorio2-2-e1669909043408.jpg' } = item;
    const [isAccion, setIsAccion] = useState(false)

    const [titleToast, setTitleToast] = useState(null)
    const [messageToast, setMessageToast] = useState(null)

    const handleDelete = (id) => {
        Axios.delete(`https://localhost:7026/api/Sucursales/${id}`)
            .then(response => {
                if (response.status === 204) {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Col xs={12} md={6} lg={4} >
            < Card className='mb-2'>
                <Card.Img variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{nombre} - {identificacion}</Card.Title>
                    <Card.Text>
                        {descripcion}
                    </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                    {telefono > 0 && <ListGroup.Item>Teléfono: {telefono}</ListGroup.Item>}
                    <ListGroup.Item>Horario: {horario}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Link to={`/edit/${codigo}`} className='btn btn-primary'>Editar</Link>
                    <Button variant='danger' className='mx-3' onClick={() => { handleDelete(codigo) }}>Eliminar</Button>
                </Card.Body>
                <Card.Footer className="text-muted">Registrada en {new Date(fechaCreacion).toLocaleDateString('en-us', { year:"numeric", month:"short"})}</Card.Footer>
            </Card>
        </Col >



    );
}

export default CardSede;