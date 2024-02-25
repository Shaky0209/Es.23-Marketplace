const node = document.querySelector(".manageContain");
const msg = document.querySelector(".msg");
const msgDisp = document.querySelector(".error-message");
const params = new URLSearchParams(location.search);
const id = params.get("id");
const act = params.get("act");
const send = "send%product";
const edit = "edit%product";

const autClose = () => {
    msgDisp.classList.remove("d-none");
    setTimeout(() => {
        msgDisp.classList.add("d-none");
    }, 6000);
    backgroundRed();
}

const backgroundRed = () => {
    msgDisp.style.backgroundColor = "lightcoral";
    msgDisp.style.border = "3px solid red";
    msg.style.color = "red";
}

const applyObj = () => {

    let closeBtn = document.querySelector(".closeBtn");
    closeBtn.addEventListener("click", () => { msgDisp.classList.add("d-none"); });

    if (!(brand.value.length > 1)) {
        msg.innerText = 'Fill in the "brand" field with at least 2 characters';
        autClose();
    } else if (!(description.value.length > 5)) {
        msg.innerText = 'Fill in the "description" field with at least 6 characters';

        autClose();
    } else if (!(image.value.includes("https://") && image.value.includes("."))) {
        msg.innerText = 'The "image URL" field must respect the URL format';
        autClose()
    } else if (!(nameObj.value.length > 1)) {
        msg.innerText = 'Fill in the "Object Name" field with at least 2 characters';
        autClose();

    } else if (!(!(price.value == 0) && !((price.value / 2) === NaN) && !(price.value === ""))) {
        msg.innerText = 'The "price" field must respect the valid numeric format ';
        msgDisp.classList.remove("d-none");
        autClose();
    } else {
        let newObj = {
            brand: `${brand.value}`,
            description: `${description.value}`,
            imageUrl: `${image.value}`,
            name: `${nameObj.value}`,
            price: `${price.value}`,
        }

        if (act === send) {
            brand.value = "";
            description.value = "";
            image.value = "";
            nameObj.value = "";
            price.value = "";
            sendFetch(newObj);
        } else if (act === edit) {
            editFetch(newObj);
        }
    }
}

const correctlyFnc = () => {
    msgDisp.style.backgroundColor = "lightgreen";
    msgDisp.style.border = "3px solid green";
    msg.style.color = "green";
    if (act === send) {
        msg.innerText = "Your Object has been correctly added"
    }

    if (act === edit) {
        msg.innerText = "Your Object has been correctly edited";
    }
    msgDisp.classList.remove("d-none");
    setTimeout(() => {
        msgDisp.classList.add("d-none");
    }, 6000);
}

const sendFetch = async (obj) => {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/",
            {
                method: "POST", body: JSON.stringify(obj),
                headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA", "Content-type": "application/json;charset=UTF-8" }
            });
        if (response.status === 200) {
            correctlyFnc();
        } else {
            alert("The edit operation does'nt succesfull! Read code's error on console.");
        }
    } catch (error) {
        console.log(error);
    }
}

const editFetch = async (obj) => {
    try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            {
                method: "PUT", body: JSON.stringify(obj),
                headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA", "Content-type": "application/json;charset=UTF-8" }
            });
        if (response.status === 200) {
            correctlyFnc();
        } else {
            alert("The edit operation does'nt succesfull! Read code's error on console.");
        }
    } catch (error) {
        console.log(error);
    }
}

const formBuild = () => {
    let formContent = document.createElement("div");
    formContent.classList.add("col-8", "d-flex", "flex-column", "align-items-center", "pb-5");
    formContent.style.boxShadow = "5px 5px 10px #333333";
    if (act === send) {
        formContent.style.backgroundColor = "lightblue";
    } else if (act === edit) {
        formContent.style.backgroundColor = "lightcoral";
    }
    formContent.style.border = "1px solid black";
    formContent.style.borderRadius = "10px"
    node.appendChild(formContent);

    let titlePage = document.createElement("h3");
    titlePage.classList.add("py-5");
    if (act === send) {
        titlePage.innerText = "Dashboard for Objects Adding";
    } else if (act === edit) {
        titlePage.innerText = "Dashboard for Objects Editing";
    }
    formContent.appendChild(titlePage);

    let inBrand = document.createElement("input");
    inBrand.classList.add("brand", "text-center", "my-2");
    inBrand.style.width = "90%";
    inBrand.placeholder = "Insert Brand";
    inBrand.type = "text";
    formContent.appendChild(inBrand);

    let inDescription = document.createElement("input");
    inDescription.classList.add("description", "text-center", "my-2");
    inDescription.style.width = "90%";
    inDescription.placeholder = "Insert Description";
    formContent.appendChild(inDescription);

    let inImage = document.createElement("input");
    inImage.classList.add("img", "text-center", "my-2");
    inImage.style.width = "90%";
    inImage.placeholder = "Insert Image URL";
    formContent.appendChild(inImage);

    let inName = document.createElement("input");
    inName.classList.add("name", "text-center", "my-2");
    inName.style.width = "90%";
    inName.placeholder = "Insert Object Name";
    formContent.appendChild(inName);

    let inPrice = document.createElement("input");
    inPrice.classList.add("price", "text-center", "my-2");
    inPrice.style.width = "90%";
    inPrice.placeholder = "Insert Price";
    formContent.appendChild(inPrice);

    let actBtn = document.createElement("button");
    actBtn.classList.add("px-2", "py-1", "mt-3");
    actBtn.style.border = "none";
    actBtn.style.borderRadius = "10px";
    actBtn.style.backgroundColor = "black";
    actBtn.style.color = "white";
    actBtn.style.boxShadow = "3px 3px 2px #555555"
    actBtn.addEventListener("click", (event) => { applyObj(event) });
    if (act === send) {
        actBtn.innerText = "Send";
    } else if (act === edit) {
        actBtn.innerText = "Edit";
    }
    formContent.appendChild(actBtn);
};

const inputValue = async (id) => {
    try {
        let json;
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`,
            {
                method: "GET",
                headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA" }
            });
        json = await response.json();

        brand.value = json.brand;
        description.value = json.description;
        image.value = json.imageUrl;
        nameObj.value = json.name;
        price.value = json.price;
    } catch (error) {
        console.log(error);
    }
}

if (act === "edit%product") {
    inputValue(id);
}

formBuild();
const brand = document.querySelector(".brand");
const description = document.querySelector(".description");
const image = document.querySelector(".img");
const nameObj = document.querySelector(".name");
const price = document.querySelector(".price");