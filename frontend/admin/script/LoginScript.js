var xhrR = new XMLHttpRequest();
xhrR.addEventListener("readystatechange", ajaxReadHandler);

var xhrC = new XMLHttpRequest();
xhrC.addEventListener("readystatechange", ajaxCreateHandler);

window.onload = function ()
{
    document.getElementsByClassName("loginbtn")[0].addEventListener("click", loginclickHandler);
};
function ajaxReadHandler(evt) {
    if (evt.target.readyState === 4 && evt.target.status === 200) {
        alert(xhrR.responseText);
    }
};

function ajaxCreateHandler(evt)
{
    if (evt.target.readyState === 4 && evt.target.status === 200)
    {
        //var res = JSON.parse(req.responseText);
        var res = xhrC.responseText.replace(/\"/g, "");
        if (res == "SuccessAdmin")
            window.location = "admin-home.html";
        else if(res=="SuccessUser")
            window.location = "userhome.html";
        else
            alert("Invalid Username/Password...");
    }
       
    };


function loginclickHandler()
{
    var user = {
        "username": document.getElementById("username_id").value,
        "password": document.getElementById("password_id").value,
        "typeofuser": document.getElementById("seladminid").value
    }
    xhrC.open("post", "http://localhost:64067/api/Login/VerifyLogin", true);
    xhrC.setRequestHeader("Content-Type","application/json");
    xhrC.send(JSON.stringify(user));
}