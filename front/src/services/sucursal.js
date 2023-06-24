import axios from "axios";

function getListSucursales(url) {
    axios.get('https://localhost:7026/api/Sucursales')
  .then(response => {
    return response.data
  })
}

export default getListSucursales;