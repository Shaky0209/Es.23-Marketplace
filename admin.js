const node = document.querySelector(".tab-node");
const searchBar = document.querySelector(".search");
const searchParam = document.querySelector("#search-param");
const loginPage = document.querySelector(".login-page");
const nameLog = document.querySelector(".login-name");
const pass = document.querySelector(".login-password");
const submitBtn = document.querySelector(".submitBtn");
const logErrDisp = document.querySelector(".login-err");
const logErrMsg = document.querySelector(".logErr-msg");
let json;

const errDispFnc = () => {
    logErrDisp.classList.remove("d-none");
    nameLog.value = "";
    pass.value = "";
    setTimeout(() => {
        logErrDisp.classList.add("d-none");
    }, 4000);
}

const logFnc = () => {
    if (nameLog.value === "Master" && pass.value == "5678") {
        loginPage.classList.add("d-none");
        nameLog.value = "";
        pass.value = "";
    } else if (!(nameLog.value === "Master")) {
        logErrMsg.innerText = "The User Name you entered is incorrect";
        errDispFnc();
    } else if (!(pass.value == "5678")) {
        logErrMsg.innerText = "The Password you entered is incorrect";
        errDispFnc();
    }
}

const addProduct = () => {
    window.location.href = "objManagement.html?act=send%product";
};

const fetchFnc = async () => {
    let json;
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`,
            { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA" } });
        json = await response.json();
    } catch (error) {
        console.log(error);
    }
    getOnPage(json);
}

const editFnc = (_id) => {
    let url = "objManagement.html"
    let act = "edit%product";
    window.location.href = `${url}?id=${_id}&act=${act}`;
};

const deleteFnc = async (_id) => {
    try {
        await fetch(`https://striveschool-api.herokuapp.com/api/product/${_id}`,
            { method: "DELETE", headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA" } });
    } catch (error) {
        console.log(error);
    }
    fetchFnc();
}

const popUpDelete = (_id) => {
    let popUp = document.querySelector(".popUp-delete");
    popUp.classList.remove("d-none");

    let yesBtn = document.querySelector(".yesBtn");
    yesBtn.addEventListener("click", () => {
        deleteFnc(_id)
        popUp.classList.add("d-none");
    });

    let noBtn = document.querySelector(".noBtn");
    noBtn.addEventListener("click", () => { popUp.classList.add("d-none") });
}

const getOnPage = (obj) => {
    node.innerHTML = "";

    let firstRow = document.createElement("tr");
    firstRow.style.textAlign = "center";
    firstRow.classList.add("bg-primary");
    node.appendChild(firstRow);

    let tab1 = document.createElement("td");
    tab1.style.border = "1px solid white";
    tab1.classList.add("text-white");
    tab1.innerText = "Brand";
    firstRow.appendChild(tab1);

    let tab2 = document.createElement("td");
    tab2.style.border = "1px solid white";
    tab2.classList.add("text-white");
    tab2.innerText = "Description";
    firstRow.appendChild(tab2);

    let tab3 = document.createElement("td");
    tab3.style.border = "1px solid white";
    tab3.classList.add("text-white");
    tab3.innerText = "Image";
    firstRow.appendChild(tab3);

    let tab4 = document.createElement("td");
    tab4.style.border = "1px solid white";
    tab4.classList.add("text-white");
    tab4.innerText = "Name";
    firstRow.appendChild(tab4);

    let tab5 = document.createElement("td");
    tab5.style.border = "1px solid white";
    tab5.classList.add("text-white");
    tab5.innerText = "Price";
    firstRow.appendChild(tab5);

    let tab6 = document.createElement("td");
    tab6.style.border = "1px solid white";
    tab6.classList.add("text-white");
    tab6.innerText = "Id";
    firstRow.appendChild(tab6);

    let tab7 = document.createElement("td");
    tab7.style.border = "1px solid white";
    tab7.style.minWidth = "90px";
    firstRow.appendChild(tab7);

    let count = 1;
    obj.forEach(({ brand, description, imageUrl, name, price, _id }) => {

        let row = document.createElement("tr");
        row.classList.add(`${_id}`);
        if (count % 2 === 1) {
            row.style.backgroundColor = "rgb(190, 226, 255)";
        } else {
            row.style.backgroundColor = "rgb(149, 206, 254)";
        }
        node.appendChild(row);

        let cell1 = document.createElement("td");
        cell1.innerText = brand;
        row.appendChild(cell1);

        let cell2 = document.createElement("td");
        cell2.style.borderLeft = "1px solid black";
        cell2.style.borderRight = "1px solid black";
        cell2.innerText = description;
        row.appendChild(cell2);

        let cell3 = document.createElement("td");
        cell3.classList.add("d-flex", "justify-content-center", "align-items-center");
        row.appendChild(cell3);

        let img = document.createElement("img");
        img.style.height = "50px";
        img.src = imageUrl;
        cell3.appendChild(img);

        let cell4 = document.createElement("td");
        cell4.style.borderLeft = "1px solid black";
        cell4.innerText = name;
        row.appendChild(cell4);

        let cell5 = document.createElement("td");
        cell5.style.borderLeft = "1px solid black";
        cell5.innerText = price;
        row.appendChild(cell5);

        let cell6 = document.createElement("td");
        cell6.style.borderLeft = "1px solid black";
        cell6.style.borderRight = "1px solid black";
        cell6.innerText = _id;
        row.appendChild(cell6);

        let cell7 = document.createElement("td");
        cell7.classList.add("d-flex", "justify-content-center");
        cell7.style.position = "relative";
        cell7.style.minWidth = "90px";
        row.appendChild(cell7);

        let editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.classList.add("d-flex", "justify-content-center", "align-items-center");
        editBtn.style.width = "30px";
        editBtn.style.height = "30px";
        editBtn.style.backgroundColor = "#C8A000";
        editBtn.style.color = "black";
        editBtn.style.textDecoration = "none";
        editBtn.style.borderRadius = "7px";
        editBtn.style.position = "absolute";
        editBtn.style.bottom = "10px";
        editBtn.style.left = "10px";
        editBtn.addEventListener("click", () => { editFnc(_id) });
        cell7.appendChild(editBtn);

        let editIcon = document.createElement("i");
        editIcon.classList.add("fa-solid", "fa-pencil");
        editBtn.appendChild(editIcon);

        let deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.classList.add("d-flex", "justify-content-center", "align-items-center");
        deleteBtn.style.width = "30px";
        deleteBtn.style.height = "30px";
        deleteBtn.style.backgroundColor = "#FF4C4C";
        deleteBtn.style.color = "black";
        deleteBtn.style.textDecoration = "none";
        deleteBtn.style.marginLeft = "4px";
        deleteBtn.style.borderRadius = "7px";
        deleteBtn.style.position = "absolute";
        deleteBtn.style.bottom = "10px";
        deleteBtn.style.left = "45px";
        deleteBtn.addEventListener("click", () => { popUpDelete(_id) });
        cell7.appendChild(deleteBtn);

        let deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fa-solid", "fa-rectangle-xmark");
        deleteBtn.appendChild(deleteIcon);

        count++
    });
}

const searchFnc = async (event) => {
    let typeSearch = searchParam.value;
    let inputSearch = event.target.value.toLowerCase();
    let json;
    let array;

    try {
        let response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`,
            { headers: { "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA" } });
        json = await response.json();
    } catch {
        console.log(error);
    }

    switch (typeSearch) {
        case typeSearch = "brand":
            array = json.filter((element) => {
                return element.brand.toLowerCase().includes(inputSearch);
            });
            node.innerHTML = "";
            getOnPage(array);
            break

        case typeSearch = "description":
            array = json.filter((element) => {
                return element.description.toLowerCase().includes(inputSearch);
            });
            node.innerHTML = "";
            getOnPage(array)
            break
        case typeSearch = "name":
            array = json.filter((element) => {
                return element.name.toLowerCase().includes(inputSearch);
            });
            node.innerHTML = "";
            getOnPage(array)
            break
    }
};


searchBar.addEventListener("keyup", searchFnc);
submitBtn.addEventListener("click", logFnc);

fetchFnc();