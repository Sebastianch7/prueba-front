import React, { useEffect, useState } from 'react';
import Menu from "../components/Menu/Menu"
import ContainerCardSede from '../components/ContainerCardSede/ContainerCardSede';
import CardSede from '../components/CardSede/CardSede';
import MessageToast from '../components/Utils/MessageToast';
import ApiCall from '../components/Utils/ApiCall';
import ItemLoading from '../components/Utils/ItemLoading'
import Axios from "axios";


function Home({ }) {
    const [dataLocation, setDataLocation] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)

        Axios({
            url: 'https://rickandmortyapi.com/api/character',
        })
            .then((response) => {
                setDataLocation(response.data.results);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }, []);
        
        console.log(dataLocation)

    return (
        <div>
            <Menu></Menu>

            {isLoading ? <ItemLoading /> : 
            <ContainerCardSede>
                {
                    dataLocation.map((item, index)=><CardSede key={index} name={item.name} address={item.location.name} img={item.image}></CardSede>)
                }
            </ContainerCardSede>}
            <MessageToast title={"Hola sebas"} alert="success" message={`Acción realizada con exito.`} />
        </div>
    );
}

export default Home;