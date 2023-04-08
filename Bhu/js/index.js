
(function() {
    function showAskDialog() {
        document.getElementById('addQuesModal').style.display = "block";
    }

    function closeAskDialog() {
        document.getElementById('addQuesModal').style.display = "none";
    }

    function showLogDialog() {
        document.getElementById('userLogin').style.display = "block";
        document.getElementById("username").value = "";
        document.getElementById("userphone").value = "";
        document.getElementById("password").value = "";
        var  ino =  document.getElementById("username").previousElementSibling;
        var  ino1 =  document.getElementById("userphone").previousElementSibling;
        var  ino2 =  document.getElementById("password").previousElementSibling;
        document.getElementById("username").style.borderBottom = "1px solid #03e9f4";
        document.getElementById("userphone").style.borderBottom = "1px solid #03e9f4";
        document.getElementById("password").style.borderBottom = "1px solid #03e9f4";
        ino.innerHTML = "";
        ino1.innerHTML = "";
        ino2.innerHTML = "";
    }
    function showinfoDialog()
    {
        USERS = JSON.parse(localStorage.getItem("users"));
        REMEMBER = localStorage.getItem("rememberMe");
        if (localStorage.getItem("users_num") == 0)
        {
            document.getElementById('userinfo').style.display = "none";
            alert("您还未登录，没有个人信息");
        }
        else
        {
            document.getElementById('userinfo').style.display = "block";
            document.getElementById("pwd").value = "";
            document.getElementById("pwd").style.borderBottom = "1px solid #03e9f4";
            var  ino =  document.getElementById("pwd").previousElementSibling;
            ino.innerHTML = "";
            USERS = JSON.parse(localStorage.getItem("users"));
            REMEMBER = localStorage.getItem("rememberMe");
            document.getElementById("personal_info_username").innerHTML = USERS[REMEMBER].username;
            document.getElementById("personal_info_phonenumber").innerHTML = USERS[REMEMBER].phonenumber;
            document.getElementById("personal_info_password").innerHTML = USERS[REMEMBER].password;

        }
    }
    
    function closeLogDialog() {
        document.getElementById('userLogin').style.display = "none";
    }

    function showAsk() {
        document.getElementById('showAskDialog').onclick = function() {
                showAskDialog();
            }
        document.getElementById('showLogDialog').onclick = function() {
            showLogDialog();
        }
        document.getElementById('showinfoDialog').onclick = function() {
            showinfoDialog();
        }
    }

    function closeAsk() {
        // document.getElementById('closeAskDialog').onclick=function() {
        //     closeAskDialog();
        // }
        document.getElementById('closeAskDialog').addEventListener("click", function(e) {
                closeAskDialog();
            })
            //   document.getElementById('closeAskDialog2').addEventListener("click",function (e) {
            //       closeAskDialog();
            //   })
        document.getElementById('closeLogDialog').addEventListener("click", function(e) {
                closeLogDialog();
            })
            //   document.getElementById('closeLogDialog2').addEventListener("click",function (e) {
            //       closeLogDialog();
            //   })
    }



    showAsk(); //初始化提示框
    closeAsk();

    function getData(pageNum) {
        console.log(pageNum)
    }
    var pag = new Pagination({
        id: "pagination",
        total: 100, //页数
        showButtons: 10, //每页显示按钮数
        callback: getData

    })

})();
$(document).ready(function(e) {
    $win = $(window);
    $navbar = $('#header');
    $toggle = $('.toggle-button');
    var width = $navbar.width();
    toggle_onclick($win, $navbar, width);

    // resize event
    $win.resize(function() {
        toggle_onclick($win, $navbar, width);
    });

    $toggle.click(function(e) {
        $navbar.toggleClass("toggle-left");
    })

});

function toggle_onclick($win, $navbar, width) {
    if ($win.width() <= 768) {
        $navbar.css({ left: `-${width}px` });
    } else {
        $navbar.css({ left: '0px' });
    }
}

var typed = new Typed('#typed', {
    strings: [
        'My homepage',
        'Nice to meet U',
        'Welcome ! ! !'
    ],
    typeSpeed: 40,
    backSpeed: 40,
    loop: true
});

var typed_2 = new Typed('#typed_2', {
    strings: [
        'My homepage',
        'TS Parts of me',
        'U can Know More'
    ],
    typeSpeed: 40,
    backSpeed: 40,
    loop: true
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});