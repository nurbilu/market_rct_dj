import axios from 'axios'
const MY_SERVER = "http://127.0.0.1:8000/products";


export function getProds() {
    console.log("hello");
    return axios.get(MY_SERVER)
}

export function addProd(prod) {
    return axios.post(MY_SERVER, prod, 
    );
}

export function updateProd(prod, prodId) {
    return axios.put(`${MY_SERVER}/${prodId}`,prod)
}

export async function deleteProd(prodId) {
    return axios.delete(`${MY_SERVER}/${prodId}`);
}



