var xhrR = new XMLHttpRequest();
xhrR.addEventListener("readystatechange", ajaxReadHandler);

var xhrC = new XMLHttpRequest();
xhrC.addEventListener("readystatechange", ajaxCreateHandler);

window.onload = function () {
    document.getElementsByClassName("registerbtn")[0].addEventListener("click", registerclickHandler);
};
function ajaxReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        alert(xhrR.responseText);
    }
};

function ajaxCreateHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        var res = xhrC.responseText;
        alert(res);
        console.log(res);

       // window.location = "admin-home.html";

    }

};


function registerclickHandler() {
    var user = {
        "username": document.getElementById("username_id").value,
        "userphone":document.getElementById("userphone_id").value,
        "useremail": document.getElementById("useremail_id").value,
        "password": document.getElementById("password_id").value,
        "typeofuser": document.getElementById("seladminid").value
    }
    xhrC.open("post", "http://localhost:64067/api/UserInventory/AddUser", true);
    xhrC.setRequestHeader("Content-Type", "application/json");
    xhrC.send(JSON.stringify(user));
}