var kp = function(txt)
{
    txt = document.getElementById("username");
    var ino = txt.previousElementSibling;
    if(txt.value.length==0)
    {
        txt.style.borderBottom = "1px solid red";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='red'>用户名不能为空</font>";
    }
    else{
        if(isNaN(txt.value))
        {
            txt.style.borderColor = "green";
            ino.style.backgroundColor = "transparent";
            ino.innerHTML = "<font color='green'>用户名输入格式正确</font>";
        }
        else{
            txt.style.borderBottom = "1px solid red";
            ino.style.backgroundColor = "transparent";
            ino.innerHTML = "<font color='red'>用户名格式不正确</font>";
        }
    }
}
var kp1 = function(txt){
    var ino = txt.previousElementSibling;
    txt = document.getElementById("userphone");
    if(txt.value.length==0)
    {
        txt.style.borderBottom = "1px solid red";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='red'>手机号码不能为空</font>";
    }
    else
    {
        if(txt.value.length!=11){ 
        txt.style.borderBottom = "1px solid red";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='red'>手机号码应该为11位</font>";
        }
        else{
        txt.style.borderColor = "green";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='green'>手机号码输入格式正确</font>";
        }
    }
}
var kp2 = function(txt){
    var ino = txt.previousElementSibling;
    txt = document.getElementById("password");
    if(txt.value.length==0)
    {
        txt.style.borderBottom = "1px solid red";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='red'>密码不能为空</font>";
    }
    else
    {
        if(txt.value.length<8){ 
        txt.style.borderBottom = "1px solid red";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='red'>密码范围应在8~20个字符之间</font>";
        }
        else if(txt.value.length>20)
        {
            txt.style.borderBottom = "1px solid red";
            ino.style.backgroundColor = "transparent";
            ino.innerHTML = "<font color='red'>密码范围应在8~20个字符之间</font>";
        }
        else{
        txt.style.borderColor = "green";
        ino.style.backgroundColor = "transparent";
        ino.innerHTML = "<font color='green'>密码输入格式正确</font>";
        }
    }
}