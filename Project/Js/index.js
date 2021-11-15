

let productName = document.getElementById("ProductName");

let productPrice = document.getElementById("ProductPrice");

let productCategory = document.getElementById("ProductCategory");

let productDescription = document.getElementById("ProductDescription");

let mainButton = document.getElementById("mainButton");

let productConatiner;

let currentIndex;

if (localStorage.getItem("productList") == null) {
    productConatiner = [];

}
else {
    productConatiner = JSON.parse(localStorage.getItem("productList"));
    displayData();
}



function addProduct() {
    if (checkInputs() == true) {
        let product =
        {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value
        };

        if (validateProductName()== true)
        {
            //console.log(product);
            productConatiner.push(product);
            localStorage.setItem("productList", JSON.stringify(productConatiner));
            displayData();
            clearForm();
        }
        else
        {
            window.alert('Enter Valid Data In Inputs  , ProductName must At least 3 character , ProductPrice must start by Number and count 6 Number , productCategory Start by character');
           
        }

    }
    else {
        window.alert("All fields are Required");
    }
}

function displayData() {
    let data = ` `;

    for (let i = 0; i < productConatiner.length; i++) {
        data += `
        <tr>

        <td>${i + 1}</td>
        <td>${productConatiner[i].name}</td>
        <td>${productConatiner[i].price}</td>
        <td>${productConatiner[i].category}</td>
        <td>${productConatiner[i].description}</td>
        <td><button onclick="getProduct(${i})" class="btn btn-outline-warning">Update</button></td>
        <td><button onclick ="deleteProduct(${i})"  class="btn btn-outline-danger prompt-for-delete">Delete</button></td>

        </tr> `
    }
    document.getElementById("tbBody").innerHTML = data;
}
function clearForm() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";
}


function checkInputs() {
    if (productName.value != "" && productPrice.value != "" && productCategory.value != "" && productDescription.value != "") {
        return true;
    }
    else {
        return false;
    }
}

function deleteProduct(index) {
    productConatiner.splice(index, 1);
    localStorage.setItem("productList", JSON.stringify(productConatiner));
    displayData();
}

function searchProduct(productTerm) {
    let data = ``;

    for (let i = 0; i < productConatiner.length; i++) {
        if (productConatiner[i].name.toLowerCase().includes(productTerm.toLowerCase()) == true

            || productConatiner[i].category.toLowerCase().includes(productTerm.toLowerCase()) == true
            || productConatiner[i].price.toLowerCase().includes(productTerm.toLowerCase()) == true) {
            data += `
            <tr>

         <td>${i + 1}</td>
         <td>${productConatiner[i].name}</td>
         <td>${productConatiner[i].price}</td>
         <td>${productConatiner[i].category}</td>
         <td>${productConatiner[i].description}</td>
         <td><button class="btn btn-outline-warning">Update</button></td>
         <td><button onclick ="deleteProduct(${i})" class="btn btn-outline-danger">Delete</button></td>
         </tr> `
        }
        else {

        }

        document.getElementById("tbBody").innerHTML = data;
    }
}



function getProduct(productIndex) {

    productName.value = productConatiner[productIndex].name;
    productPrice.value = productConatiner[productIndex].price;
    productCategory.value = productConatiner[productIndex].category;
    productDescription.value = productConatiner[productIndex].description;



    mainButton.innerHTML = "Update Product";
    mainButton.setAttribute("class", " btn btn-outline-warning form-control ");

    currentIndex = productIndex; // that mean than Now currentIndex carry all Data about That Index.





}

function updateProduct() {

    let product =
    {
        name: productName.value,
        price: productPrice.value,
        category: productCategory.value,
        description: productDescription.value
    };

    productConatiner[currentIndex] = product;
    localStorage.setItem("productList", JSON.stringify(productConatiner));
    clearForm();
}

mainButton.onclick = function () {

    if (mainButton.innerHTML == "Add Product") {
        addProduct();
    }
    else {

        updateProduct();

    }
    displayData();
}



function validateProductName() {
    let regaxName = /^[A-Z][a-z]{3,8}$/;

    let regaxPrice = /^\d{4,6}(\.\d{1,4})?$/;
    
    let regaxCategory = /^\D[a-zA-Z]{1,9}$/;
    if (regaxName.test(productName.value)== true &&
       (regaxPrice.test(productPrice.value )== true && 
      (regaxCategory.test(productCategory.value)==true))
      )
     {
        return true;
    }
    else {
        return false;
    }
}

