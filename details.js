const img = document.querySelector(".img");
const isBrand = document.querySelector(".brand");
const model = document.querySelector(".model");
const isDescription = document.querySelector(".description");
const isPrice = document.querySelector(".price");
const objId = document.querySelector(".obj-id");
const params = new URLSearchParams(location.search);
const id = params.get("id");
let json;

const fetchFnc = async ()=>{
    try{
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {headers:{"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA"}});
        json = await response.json();
    }catch(error){
        console.log(error);
    }
    getDetails(json);
}

const getDetails = ({brand, name, description, price, imageUrl, _id})=>{
    img.src = imageUrl;
    isBrand.innerText = brand;
    model.innerText = name;
    isDescription.innerText = description;
    isPrice.innerText = `$ ${price}`;
    objId.innerText = _id;
}

fetchFnc();