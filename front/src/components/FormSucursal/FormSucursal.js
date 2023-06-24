import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import ItemLoading from '../Utils/ItemLoading';
import MessageToast from '../Utils/MessageToast';
import { useParams } from 'react-router-dom';
import Axios from "axios";

function FormSucursal(props) {


    const [isValid, setIsValid] = useState(false);
    const [codigo, setCodigo] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [identificacion, setIdentificacion] = useState()
    const [descripcion, setDescripcion] = useState("")
    const [idMoneda, setIdMoneda] = useState(1)
    const [latitud, setLatitud] = useState(4.6117147)
    const [longitud, setLongitud] = useState(-74.1572078)
    const [horario, setHorario] = useState("07:00am a 4:30pm")
    const [direccion, setDireccion] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [isAccion, setIsAccion] = useState(false)
    const [isDateValid, setIsDateValid] = useState(false)

    const [titleToast, setTitleToast] = useState(null)
    const [messageToast, setMessageToast] = useState(null)

    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const [fechaActual] = useState(year + "-" + month + "-" + day)
    const [fechaCreacion, setFechaCreacion] = useState(year + "-" + month + "-" + day)
    const [isLoadingInfo, setIsloadingInfo] = useState(false);
    const { id } = useParams();


    useEffect(() => {
        if (fechaCreacion < fechaActual) {
            setIsDateValid(false)
        } else {
            setIsDateValid(true)
        }
    }, [fechaActual, fechaCreacion])

    const [dataSucursal, setDataSucursal] = useState([])
    
    
    useEffect(() => {

        Axios.get('https://localhost:7026/api/ListMonedasClasses').then((response) => {
            setDataSucursal(response.data);
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        setIsloadingInfo(true)
        if (id != null) {
            Axios.get(`https://localhost:7026/api/Sucursales/${id}`).then((response) => {
                setCodigo(response.data.codigo)
                setNombre(response.data.nombre)
                setIdentificacion(response.data.identificacion)
                setDescripcion(response.data.descripcion)
                setIdMoneda(response.data.idMoneda)
                setLatitud(response.data.latitud)
                setLongitud(response.data.longitud)
                setHorario(response.data.horario)
                setDireccion(response.data.direccion)
                setTelefono(response.data.telefono)
                setFechaCreacion(response.data.fechaCreacion)
                setIsloadingInfo(false)
            })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id])

    const handleSubmit = (event) => {
        setIsAccion(false)
        setIsValid(true)
        event.preventDefault();
        const formData = {
            nombre,
            descripcion,
            identificacion,
            direccion,
            idMoneda,
            latitud,
            longitud,
            horario,
            telefono,
            fechaCreacion
        };

        Axios.post('https://localhost:7026/api/Sucursales', formData)
            .then(response => {
                if (response.status === 201) {
                    setIsAccion(true)
                    setIsValid(false)
                    setIsDateValid(false)
                    setTitleToast("Sucursal creada")
                    setMessageToast("La sucursal fue creada con exito, sted será redirigido al dashboard en 3 segundos.")
                    setTimeout(() => {
                        window.location.assign("/")
                    }, 3000)
                }
            })
            .catch(error => {
                console.error(error);
            });
        setIsValid(false)

    };

    const handleSubmitUpdate = (event) => {
        setIsAccion(false)
        setIsValid(true)
        event.preventDefault();
        const formData = {
            nombre,
            codigo,
            descripcion,
            identificacion,
            direccion,
            idMoneda,
            latitud,
            longitud,
            horario,
            telefono,
            fechaCreacion

        };
        Axios.put(`https://localhost:7026/api/Sucursales/${id}`, formData)
            .then(response => {
                if (response.status === 204) {
                    setIsAccion(true)
                    setIsValid(false)
                    setIsDateValid(false)
                    setTitleToast("Sucursal actualizada")
                    setMessageToast("La sucursal fue actualizada con exito, usted será redirigido al dashboard en 3 segundos.")
                    setTimeout(() => {
                        window.location.assign("/")
                    }, 3000)

                }
            })
            .catch(error => {
                console.error(error);
            });
        setIsValid(false)

    };


    return (
        <>
            <Container>
                <Row>
                    {isLoadingInfo ? <ItemLoading contador={100}/> : <Col xs={6} className='mx-auto'>
                        <Card className='mb-5'>
                            {id != null ? <Card.Header>Editar sucursal</Card.Header> : <Card.Header>Nueva sucursal</Card.Header>}
                            <Card.Body>
                                <Card.Text>
                                    <Form onSubmit={id != null ? handleSubmitUpdate : handleSubmit}>
                                        <Form.Control type="hidden" placeholder="Codigo" value={codigo} onChange={(e) => { setCodigo(e.target.value) }} disabled />
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                            <Form.Label>Nombre*</Form.Label>
                                            <Form.Control type="text" placeholder="Nombre de sucursal" required value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Identificación*</Form.Label>
                                            <Form.Control type="number" placeholder="Identificación" required value={identificacion} onChange={(e) => { setIdentificacion(e.target.value.substring(0, 250)) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>direccion*</Form.Label>
                                            <Form.Control type="text" placeholder="Direccion" required value={direccion} onChange={(e) => { setDireccion(e.target.value.substring(0, 250)) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea3">
                                            <Form.Label>Descripcion*</Form.Label>
                                            <Form.Control as="textarea" rows={3} required value={descripcion} onChange={(e) => { setDescripcion(e.target.value.substring(0, 250)) }} />
                                            <sub>{descripcion.length + "/250"}</sub>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Telefono</Form.Label>
                                            <Form.Control type="text" placeholder="Telefono" value={telefono} onChange={(e) => { setTelefono(e.target.value) }} />
                                        </Form.Group>
                                        {id == null && <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                            <Form.Label>Fecha de Creación</Form.Label>
                                            <Form.Control type="date" placeholder="Fecha de Creación" value={fechaCreacion} onChange={(e) => { setFechaCreacion(e.target.value) }} />
                                        </Form.Group>}
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea4">
                                            <Form.Label>Moneda*</Form.Label>
                                            <Form.Select aria-label="Seleccione..." required value={idMoneda} onChange={(e) => { setIdMoneda(e.target.value) }} >
                                                {dataSucursal?.map((moneda) => {
                                                    return <option key={moneda} value={moneda.id}>{moneda.nombre} </option>
                                                })}
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                            <Form.Label>latitud</Form.Label>
                                            <Form.Control type="text" placeholder="Latitud" value={latitud} onChange={(e) => { setLatitud(e.target.value) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                            <Form.Label>longitud</Form.Label>
                                            <Form.Control type="text" placeholder="Longitud" value={longitud} onChange={(e) => { setLongitud(e.target.value) }} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea7">
                                            <Form.Label>Horario</Form.Label>
                                            <Form.Select aria-label="Seleccione..." value={horario} onChange={(e) => { setHorario(e.target.value) }} >
                                                <option value={"07:00am a 4:30pm"}>07:00am a 4:30pm</option>
                                                <option value={"08:00am a 5:30pm"}>08:00am a 5:30pm</option>
                                                <option value={"08:30am a 5:00pm"}>08:30am a 5:00pm</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Button type="submit" disabled={!isDateValid && true}>{!isValid ? "Guardar información" : "Enviando información..."}</Button>
                                        {isValid && <ItemLoading contador={80}></ItemLoading>}
                                    </Form>
                                    {isAccion && <MessageToast title={titleToast} message={messageToast} alert='success'></MessageToast>}
                                </Card.Text>
                                <Button variant={'dark'} onClick={() => {window.location.assign("/")}}>Volver</Button>
                            </Card.Body>

                        </Card>
                    </Col>}
                </Row>

            </Container>

        </>
    );
}

export default FormSucursal;