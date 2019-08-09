//Script file for Admin-home.html

//UserList
var usrlist = [];
//ProductList
var prodlist = [];
//single Product assignment
var product = [];
//single User assignment
var usr = [];
//User Mange button list
var updatedeleteuserbtnlist = [];
//Product Manage button list
var updatedeleteproductbtnlist = [];


var xhruR = new XMLHttpRequest();
xhruR.addEventListener("readystatechange", ajaxUserReadHandler);

var xhruC = new XMLHttpRequest();
xhruC.addEventListener("readystatechange", ajaxUserCreateHandler);

var xhrpR = new XMLHttpRequest();
xhrpR.addEventListener("readystatechange", ajaxProductReadHandler);

var xhrpC = new XMLHttpRequest();
xhrpC.addEventListener("readystatechange", ajaxProductCreateHandler);

var xhrprodup = new XMLHttpRequest();
xhrprodup.addEventListener("readystatechange", ajaxProductUpdateReadHandler);

var xhrpiC = new XMLHttpRequest();
xhrpiC.addEventListener("readystatechange", ajaxProductInsertCreateHandler);

var xhruserup = new XMLHttpRequest();
xhruserup.addEventListener("readystatechange", ajaxUserUpdateReadHandler);

var xhrusrInsertC = new XMLHttpRequest();
xhrusrInsertC.addEventListener("readystatechange", ajaxUserInsertCreateHandler);

function ajaxProductUpdateReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        alert(xhrprodup.responseText);
    }
};

function ajaxProductInsertCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        var res = xhrpiC.responseText;
        alert(res);
    }
};

function ajaxUserUpdateReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        alert(xhruserup.responseText);
    }
};

function ajaxUserInsertCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        var res = xhrusrInsertC.responseText;
        alert(res);
    }
};

function registerclickHandler() {
    var user = {
        "username": document.getElementById("username_id").value,
        "userphone": document.getElementById("userphone_id").value,
        "useremail": document.getElementById("useremail_id").value,
        "password": document.getElementById("password_id").value,
        "typeofuser": document.getElementById("seladminid").value
    }
    xhrusrInsertC.open("post", "http://localhost:64067/api/UserInventory/AddUser", true);
    xhrusrInsertC.setRequestHeader("Content-Type", "application/json");
    xhrusrInsertC.send(JSON.stringify(user));
}

function insertclickHandler() {
    product = {
        "productname": document.getElementById("productname_id").value,
        "brand": document.getElementById("productname_id").value,
        "instock": document.getElementById("quantity_id").value,
        "price": document.getElementById("price_id").value,
        "unitofmeasure": document.getElementById("unitofmeasure_id").value,
        "description": document.getElementById("description_id").value
    }
    console.log(product);
    xhrpiC.open("post", "http://localhost:64067/api/ProductInventory/PostProduct", true);
    xhrpiC.setRequestHeader("Content-Type", "application/json");
    xhrpiC.send(JSON.stringify(product));
}

function ajaxUserReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        usrlist = JSON.parse(xhruR.responseText);
        displayUsers();
    }
};

function ajaxUserCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        console.log(xhruC.responseText);
        alert(xhruC.responseText);
    }
};

function ajaxProductReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        prodlist = JSON.parse(xhrpR.responseText);
        displayProducts();
    }
};

function ajaxProductCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        if (JSON.parse(xhrpC.responseText).length<1) {
            alert("Item Not Found");
        } else {
            prodlist = JSON.parse(xhrpC.responseText);
            displayProducts();
        }
    }
};

function openNav() {
    document.getElementById("mySidenav").style.width = "20%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function closeUpdateDeleteProduct() {
    document.getElementById("updatedeleteproductsection").style.display = "none";
}

function closeUpdateDeleteUser() {
    document.getElementById("updatedeleteusersection").style.display = "none";
}

function userclickHandler() {
    xhruR.open("get", "http://localhost:64067/api/UserInventory/getUsers", true);
    xhruR.send();
}

function productclickHandler() {
    xhrpR.open("get", "http://localhost:64067/api/ProductInventory/getProducts", true);
    xhrpR.send();
}

function searchclickHandler() {
    var productname = document.getElementsByClassName("search")[0].value;
    xhrpC.open("get", "http://localhost:64067/api/Search/findSingleProduct?productname=" + productname, true);
    xhrpC.send();
}

function productbtnclickHandler() {
    document.getElementById("addproduct_id").style.display = "block";
}

function userbtnclickHandler() {
    document.getElementById("adduser_id").style.display = "block";
}

function closeUser() {
    document.getElementById("adduser_id").style.display = "none";
}

function closeProduct() {
    document.getElementById("addproduct_id").style.display = "none";
}


window.onload = function () {
    document.getElementsByClassName("openbtn")[0].addEventListener("click", openNav);
    document.getElementsByClassName("closebtn")[0].addEventListener("click", closeNav);
    document.getElementById("userdispid").addEventListener("click", userclickHandler);
    document.getElementById("productdispid").addEventListener("click", productclickHandler);
    document.getElementById("searchbtn").addEventListener("click", searchclickHandler); 
    document.getElementById("productaddbtnid").addEventListener("click", productbtnclickHandler);
    document.getElementById("useraddbtnid").addEventListener("click", userbtnclickHandler);
    document.getElementsByClassName("closeproduct")[0].addEventListener("click", closeProduct);
    document.getElementsByClassName("closeuser")[0].addEventListener("click", closeUser);
    document.getElementsByClassName("insertbtn")[0].addEventListener("click", insertclickHandler);
    document.getElementsByClassName("closeupdatedeleteuser")[0].addEventListener("click", closeUpdateDeleteUser);
    document.getElementsByClassName("closeupdatedeleteproduct")[0].addEventListener("click", closeUpdateDeleteProduct);
    document.getElementById("upprodbtn").addEventListener("click", updateproductclickHandler);
    document.getElementById("removeprodbtn").addEventListener("click", removeproductclickHandler);
    document.getElementById("upusrbtn").addEventListener("click", updateuserclickHandler);
    document.getElementById("removeusrbtn").addEventListener("click", removeuserclickHandler);
    document.getElementsByClassName("registerbtn")[0].addEventListener("click", registerclickHandler);
}

function updateproductclickHandler() {
    product = {
        "productid":document.getElementById("inputupdatedeleteproductid").value,
        "productname": document.getElementById("inputupdatedeleteproductname").value,
        "brand": document.getElementById("inputupdatedeletebrand").value,
        "instock": document.getElementById("inputupdatedeleteinstock").value,
        "price": document.getElementById("inputupdatedeleteprice").value,
        "unitofmeasure": document.getElementById("inputupdatedeleteunitofmeasure").value,
        "description": document.getElementById("inputupdatedeletedescription").value
    }
    console.log(product);
    xhrpiC.open("post", "http://localhost:64067/api/UpdateInventory/updateProduct", true);
    xhrpiC.setRequestHeader("Content-Type", "application/json");
    xhrpiC.send(JSON.stringify(product));
}

function removeproductclickHandler() {
    var productid = document.getElementById("inputupdatedeleteproductid").value;
    xhrprodup.open("get", "http://localhost:64067/api/DeleteProduct/deleteProduct?productid="+productid, true);
    xhrprodup.setRequestHeader("Content-Type", "application/json");
    xhrprodup.send();
}

function updateuserclickHandler() {
    usr={
        "userid": document.getElementById("inputupdatedeleteuserid").value,
        "username":document.getElementById("inputupdatedeleteusername").value,
        "userphone": document.getElementById("inputupdatedeleteuserphone").value,
        "useremail": document.getElementById("inputupdatedeleteusermail").value,
        "typeofuser": document.getElementById("inputupdatedeleteusertype").value
        }
    console.log(usr);
    xhrusrInsertC.open("post", "http://localhost:64067/api/userUpdate/updateUser", true);
    xhrusrInsertC.setRequestHeader("Content-Type", "application/json");
    xhrusrInsertC.send(JSON.stringify(usr));
}

function removeuserclickHandler() {
    var userid = document.getElementById("inputupdatedeleteuserid").value;
    xhrprodup.open("get", "http://localhost:64067/api/DeleteUser/deleteUser?userid=" + userid, true);
    xhrprodup.setRequestHeader("Content-Type", "application/json");
    xhrprodup.send();
}

function addUpdateDeleteUserListener() {
    for (var i = 0 ; i < updatedeleteuserbtnlist.length; i++) {
        updatedeleteuserbtnlist[i].addEventListener("click", manageuserbtnClickHandler);
    }
}

function addUpdateDeleteProductListener() {
    for (var i = 0 ; i < updatedeleteproductbtnlist.length; i++) {
        updatedeleteproductbtnlist[i].addEventListener("click", manageproductbtnClickHandler);
    }
}

function manageproductbtnClickHandler(evt) {
    document.getElementById("updatedeleteproductsection").style.display = "block";
    document.getElementById("inputupdatedeleteproductid").value = prodlist[evt.target.getAttribute("data-skp")].productid;
    document.getElementById("inputupdatedeleteproductname").value = prodlist[evt.target.getAttribute("data-skp")].productname;
    document.getElementById("inputupdatedeletebrand").value = prodlist[evt.target.getAttribute("data-skp")].brand;
    document.getElementById("inputupdatedeleteinstock").value = prodlist[evt.target.getAttribute("data-skp")].instock;
    document.getElementById("inputupdatedeleteprice").value = prodlist[evt.target.getAttribute("data-skp")].price;
    document.getElementById("inputupdatedeleteunitofmeasure").value = prodlist[evt.target.getAttribute("data-skp")].unitofmeasure;
    document.getElementById("inputupdatedeletedescription").value = prodlist[evt.target.getAttribute("data-skp")].description;
}

function manageuserbtnClickHandler(evt) {
    document.getElementById("updatedeleteusersection").style.display = "block";
    document.getElementById("inputupdatedeleteuserid").value = usrlist[evt.target.getAttribute("data-sku")].userid;
    document.getElementById("inputupdatedeleteusername").value = usrlist[evt.target.getAttribute("data-sku")].username;
    document.getElementById("inputupdatedeleteuserphone").value = usrlist[evt.target.getAttribute("data-sku")].userphone;
    document.getElementById("inputupdatedeleteusermail").value = usrlist[evt.target.getAttribute("data-sku")].useremail;
    document.getElementById("inputupdatedeleteusertype").value = usrlist[evt.target.getAttribute("data-sku")].typeofuser;
}



function displayUsers() {
    document.getElementsByClassName("productdisplaydiv")[0].style.display = "none";
    document.getElementsByClassName("userdisplaydiv")[0].style.display = "block";
    document.getElementById("userdisptable").innerHTML = "";
    if (usrlist != null) {
    for (var i = 0; i < usrlist.length; i++) {
            document.getElementById("userdisptable").innerHTML += `
                <tr>
                    <td>${usrlist[i].userid}</td>
                    <td>${usrlist[i].username}</td>
                    <td>${usrlist[i].userphone}</td>
                    <td>${usrlist[i].useremail}</td>
                    <td>${usrlist[i].typeofuser}</td>
                    <td><button class ="manageuserBtn"  data-sku="${i}">Manage</button></td>
                </tr>
                `
        }
    updatedeleteuserbtnlist = document.getElementsByClassName("manageuserBtn");
    addUpdateDeleteUserListener();
    }
    else {
        alert("Nothing Found");
    }
}

function displayProducts() {
    document.getElementsByClassName("userdisplaydiv")[0].style.display = "none";
    document.getElementsByClassName("productdisplaydiv")[0].style.display = "block";
    document.getElementById("productdisptable").innerHTML = "";
    if (prodlist != null) {
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
                    <td><button class ="manageproductBtn"  data-skp="${i}">Manage</button></td>
                </tr>
                `
        }
        updatedeleteproductbtnlist = document.getElementsByClassName("manageproductBtn");
        addUpdateDeleteProductListener();
    }
    else {
        alert("Nothing Found");
    }
}