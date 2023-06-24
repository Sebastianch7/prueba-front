import React, { useEffect, useState } from 'react';
import Menu from "../components/Menu/Menu"
import ContainerCardSede from '../components/ContainerCardSede/ContainerCardSede';
import CardSede from '../components/CardSede/CardSede';
import ItemLoading from '../components/Utils/ItemLoading'
import Axios from "axios";
import MapContainer from '../components/Utils/MapContainer';
import NotFound from '../components/Utils/NotFound';
import { Container, Row, Col, Button } from 'react-bootstrap';
import PopUp from '../components/PopUp.js/PopUp';
import Nav from 'react-bootstrap/Nav';


function Home() {
    const [dataSucursal, setDataSucursal] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isContador, setIsContador] = useState(5)
    const [showModal, setShowModal] = useState(false)
    useEffect(() => {
        setIsLoading(true)
        setIsContador(50)
        Axios.get('https://localhost:7026/api/Sucursales').then((response) => {
            setDataSucursal(response.data);
            setIsContador(100)
            setIsLoading(false);
        })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {(showModal && dataSucursal?.length > 0) && <PopUp>
                <MapContainer items={dataSucursal} />
            </PopUp>}
            <Menu>
            </Menu>
            <Container>
                <Row>
                    <Col xs={12}>
                        {(dataSucursal?.length > 0) && <Nav className="justify-content-end">
                            <Nav.Item>
                                <Button variant='dark'onClick={() => {setShowModal(true)}}>Ver mapa de sedes</Button>
                            </Nav.Item>
                        </Nav>}
                    </Col>
                </Row>
                <Row>
                    {<Col>
                        {isLoading ?
                            <ItemLoading contador={isContador} />
                            :
                            <ContainerCardSede>
                                {dataSucursal?.length > 0 ?
                                    dataSucursal?.map((item, index) => <CardSede key={index} item={item}></CardSede>)
                                    :
                                    <NotFound />}
                            </ContainerCardSede>}
                    </Col>}
                </Row>
            </Container>

        </div>
    );
}

export default Home;