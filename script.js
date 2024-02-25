const node = document.querySelector(".contain");
let json;

const fetchFnc = async () => {
    try {
        const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/`,
        {headers:{"Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWQzZjY1NDI0ZjYwNTAwMTkzN2Q1MTgiLCJpYXQiOjE3MDgzODk5NzIsImV4cCI6MTcwOTU5OTU3Mn0.IsnDE36UsqkUR2qQSlRZWHXIK91CriRuKlIuMmMsqtA"}});
        json = await response.json();
    } catch (error) {
        console.log(error);
    }
    getOnPage(json);
}

const getOnPage = (json) =>{
    elementsMap(json);
    output.forEach(element => {
        node.appendChild(element);
    });
}

const elementsMap = (obj) => {
    return output = obj.map((element) => {
        let side = document.createElement("div");
        side.classList.add("col-sm-6", "col-md-4", "col-lg-3", "wh-100");
        side.style.padding = "10px";
        side.style.backgroundColor = "lightgray";

        let sideContent = document.createElement("div");
        sideContent.classList.add("d-flex", "flex-column", "justify-content-between", "h-100");
        sideContent.style.backgroundColor = "white";
        sideContent.style.border = "1px solid black";
        sideContent.style.boxShadow = "5px 5px 10px #333333";
        sideContent.style.borderRadius = "10px";
        side.appendChild(sideContent)

        let img = document.createElement("img");
        img.src = element.imageUrl;
        img.style.width = "100%";
        img.style.borderRadius = "10px 10px 0px 0px";
        sideContent.appendChild(img);

        let detailsContent = document.createElement("div");
        detailsContent.classList.add("ms-2", "mt-2", "pb-2");
        sideContent.appendChild(detailsContent);

        let brandContent = document.createElement("div");
        detailsContent.appendChild(brandContent);

        let brandLabel = document.createElement("span");
        brandLabel.classList.add("fw-bold");
        brandLabel.innerText = `Brand: `;
        brandContent.appendChild(brandLabel);

        let brand = document.createElement("span");
        brand.innerText = element.brand;
        brandContent.appendChild(brand);

        let nameContent = document.createElement("div");
        detailsContent.appendChild(nameContent);

        let nameLabel = document.createElement("span");
        nameLabel.classList.add("fw-bold");
        nameLabel.innerText = `Model: `;
        nameContent.appendChild(nameLabel);

        let name = document.createElement("span");
        name.innerText = element.name;
        nameContent.appendChild(name);

        let priceContent = document.createElement("div");
        detailsContent.appendChild(priceContent);

        let priceLabel = document.createElement("span");
        priceLabel.classList.add("fw-bold");
        priceLabel.innerText = `Price: `;
        priceContent.appendChild(priceLabel);

        let price = document.createElement("span");
        price.innerText = `$ ${element.price}`;
        priceContent.appendChild(price);

        let btnContainer = document.createElement("div");
        btnContainer.classList.add("p-2");
        sideContent.appendChild(btnContainer);

        let detailsBtn = document.createElement("button");
        detailsBtn.type = "button";
        detailsBtn.classList.add("btn", "btn-secondary");
        detailsBtn.innerText = "Details";
        detailsBtn.addEventListener("click", detailsFnc);
        btnContainer.appendChild(detailsBtn);

        let idDetails = document.createElement("span");
        idDetails.classList.add("id", "d-none");
        idDetails.innerText = element._id;
        detailsBtn.appendChild(idDetails);

        return side;
    });
}

const detailsFnc = (event) => {
    let url = "details.html";
    let objId = event.target.querySelector(".id").innerText;
    window.location.href = `${url}?id=${objId}`;
}

fetchFnc();