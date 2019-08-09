var prodlist = [];
var updatebtnlist = [];
var product=[];
var xhrR = new XMLHttpRequest();
xhrR.addEventListener("readystatechange", ajaxReadHandler);

var xhrupR = new XMLHttpRequest();
xhrupR.addEventListener("readystatechange", ajaxupdateReadHandler);

var xhrC = new XMLHttpRequest();
xhrC.addEventListener("readystatechange", ajaxCreateHandler);

function ajaxupdateReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        alert(xhrupR.responseText);
        productclickHandler();
    }
};

function ajaxReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        prodlist = JSON.parse(xhrR.responseText);
        displayProducts();
    }
};

function ajaxCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        if (JSON.parse(xhrC.responseText)<1) {
            alert("Item Not Found");
        } else {
            prodlist = JSON.parse(xhrC.responseText);
            displayProducts();
        }
    }
};

window.onload = function () {
    productclickHandler();
    document.getElementById("searchproductbtn").addEventListener("click", searchclickHandler);
    document.getElementsByClassName("closeupdate")[0].addEventListener("click", closeupdate);
    document.getElementById("addstockbtn").addEventListener("click", addstockbtnclickHandler);
    document.getElementById("removestockbtn").addEventListener("click", removestockbtnclickHandler);
}

function addstockbtnclickHandler() {
    var newvalue = document.getElementById("inputupdateproduct").value;
    var oldvalue = product.instock;
    product.instock = oldvalue + newvalue;
    alert(product.instock);
    updateProduct();
}

function removestockbtnclickHandler() {
    var instock = product.instock;      
    var newvalue = document.getElementById("inputupdateproduct").value;
    if((instock-newvalue)<0)
    {
        alert("Invalid Operation");
    }
    else
    {
        var oldvalue=product.instock;
        product.instock = oldvalue - newvalue;
        alert(product.instock);
        updateProduct();
    }
}

function updateProduct() {
    xhrupR.open("post", "http://localhost:64067/api/UpdateInventory/updateProduct", true);
    xhrupR.setRequestHeader("Content-Type", "application/json");
    xhrupR.send(JSON.stringify(product));
}

function productclickHandler() {
    xhrR.open("get", "http://localhost:64067/api/ProductInventory/getProducts", true);
    xhrR.send();
}


function searchclickHandler() {
    var productname = document.getElementById("productsearch").value;
    xhrC.open("get", "http://localhost:64067/api/Search/findSingleProduct?productname=" + productname, true);
    xhrC.send();
}

function addUpdateListener() {
    for (var i = 0 ; i < updatebtnlist.length; i++) {
        updatebtnlist[i].addEventListener("click", updatebtnClickHandler);
    }
}

function updatebtnClickHandler(evt) {
    document.getElementById("updatesection").style.display = "block";
    document.getElementById("productnamelabel").innerHTML = "Product Name:  "+prodlist[evt.target.getAttribute("data-sku")].productname;;
    document.getElementById("instocklabel").innerHTML = "Item-in-Stock:    "+prodlist[evt.target.getAttribute("data-sku")].instock;
    product = {
        "productid": prodlist[evt.target.getAttribute("data-sku")].productid,
        "productname":prodlist[evt.target.getAttribute("data-sku")].productname,
        "instock": prodlist[evt.target.getAttribute("data-sku")].instock
    }
}

function closeupdate() {
    document.getElementById("updatesection").style.display = "none";
}

function displayProducts() {
    document.getElementById("productdisptable").innerHTML = "";
    if (prodlist.length > 0) {
        for (var i = 0; i < prodlist.length; i++) {

            document.getElementById("productdisptable").innerHTML += `
                <tr>
                    <td>${prodlist[i].productid}</td>
                    <td>${prodlist[i].productname}</td>
                    <td>${prodlist[i].brand}</td>
                    <td>${prodlist[i].instock}</td>
                    <td>${prodlist[i].price}</td>
                    <td>${prodlist[i].unitofmeasure}</td>
                    <td>${prodlist[i].description}</td>
                    <td><a href="#" class ="updateBtn"  data-sku="${i}">Update Stock</a></td>
                </tr>
              `
        }
        updatebtnlist = document.getElementsByClassName("updateBtn");
        addUpdateListener();
    }
    else {
        alert("Product Not Found");
    }
    
}