
//本地存储的所有对象
var USERS;//存储用户
var MESSAGES;//存储帖子
var COMMENTS;//存储评论
var USERS_ID;//存储用户手机索引

var USERS_NUM;//用户总数
var COMMENT_NUM;//评论总数
var MESSAGE_NUM;//帖子总数

var curNumber = -1;//当前登陆的用户
var curComment_id;//当前评论的id
var curMessage = -1;//当前问题详情页的问题id
var USERS_NAME;
var USERS_pwd;
var num;


//这里面的对象只会被创建一次
window.onload = function () {
    //如果本地储存里没有users总对象
    if (localStorage.getItem("users") == null) {
        var users = new Object(); //创建对象
        var str = JSON.stringify(users);//将对象转换为字符串
        localStorage.setItem("users", str) //键：users  值：str
        USERS_NUM = 0;
    }

    if (localStorage.getItem("comments") == null) {
        var comments = new Object();
        var str = JSON.stringify(comments);
        localStorage.setItem("comments", str)
        COMMENT_NUM = 0;
    }

    if (localStorage.getItem("messages") == null) {
        var messages = new Object();
        var str = JSON.stringify(messages);
        localStorage.setItem("messages", str)
        MESSAGE_NUM = 0;
    }

    if (localStorage.getItem("users_index") == null) {
        var users_index = new Object();
        var str = JSON.stringify(users_index);
        localStorage.setItem("users_index", str);
    }
    if (localStorage.getItem("users_num") == null) {
        localStorage.setItem("users_num", 0);
    }
    if (localStorage.getItem("num") == null) {
        localStorage.setItem("num", 0);
    }
    if (localStorage.getItem("comments_num") == null) {
        localStorage.setItem("comments_num", 0);
    }
    if (localStorage.getItem("messages_num") == null) {
        localStorage.setItem("messages_num", 0);
    }
    // 记录上一个登陆的人，防止有人关掉页面后提问，没有在线用户
    if (localStorage.getItem("rememberMe")) {
        curNumber = localStorage.getItem("rememberMe")
    }
    // 记录详情页的帖子id
    if (localStorage.getItem("rememberMessage")) {
        curComment_id = localStorage.getItem("rememberMessage")
    }

    //删除数据库中的数据
    
    /*delete localStorage.users;
    delete localStorage.users_index;
    delete localStorage.users_num;
    delete localStorage.users;
    delete localStorage.comments_num;
    delete localStorage.messages_num;
    */
    
    // 将字符串转换为JSON格式
    USERS = JSON.parse(localStorage.getItem("users"));
    MESSAGES = JSON.parse(localStorage.getItem("messages"));
    COMMENTS = JSON.parse(localStorage.getItem("comments"));

    USERS_ID = JSON.parse(localStorage.getItem("users_index"));
    USERS_NUM = localStorage.getItem("users_num");

    COMMENT_NUM = localStorage.getItem("comments_num");
    MESSAGE_NUM = localStorage.getItem("messages_num");

    // 解析当前页面的链接，判断是首页还是详情页
    GetUrlPara();
}



//解析当前页面的链接
function GetUrlPara() {
    var url = document.location.toString();

    //详情页
    if (url.match("detail")) {

        var arrUrl = url.split("?");
        var para = arrUrl[1];
        arrUrl = para.split("=")[1];
        // alert(para);
        curMessage = arrUrl; //获取当前详情页对应的帖子id
        showCurrentMessage(arrUrl); //显示对应帖子id的内容
        showComments();//显示帖子的评论
    }
    else if (url.match("relate")) {
        findAllAboutUser();
    }
    else if (url.match("shou_cang")) {
        findAllShouCang();
    }

    else {
        update();//显示首页中的帖子
    }
}


//显示帖子的评论
function showComments() {
    var i = curMessage;
    var length = MESSAGES[i].comm_num;

    var comm = "";
    var comm_arr = JSON.parse(MESSAGES[i].comm_arr);
    for (var j = 0; j < length; j++) {

        var div = document.getElementById("comment_list");
        var div2 = document.createElement("div");

        div2.className = "content_inner";
        div.appendChild(div2);

        var div4 = document.createElement("div");
        div4.className = "item_header clearfix";
        div2.appendChild(div4);

        var div3 = document.createElement("div");
        div3.className = "detail_item_header_user";
        div4.appendChild(div3);

        var span1 = document.createElement("span");
        span1.className = "user_name";
        span1.innerHTML = USERS[COMMENTS[comm_arr[j].comm_id].user_id].username;
        div3.appendChild(span1);


        var div5 = document.createElement("div");
        div5.className = "item_main_content";
        div5.innerHTML = comm_arr[j].comment;
        div2.appendChild(div5);
    }
}


//显示新增的评论
function showAddComment() {
    var i = curMessage;
    var length = MESSAGES[i].comm_num;
    var comm = "";
    var comm_arr = JSON.parse(MESSAGES[i].comm_arr);
    var j = length - 1;
    var div = document.getElementById("comment_list");
    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);

    var div4 = document.createElement("div");

    div4.className = "item_header clearfix";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "detail_item_header_user";
    div4.appendChild(div3);

    var span1 = document.createElement("span");
    span1.className = "user_name";
    span1.innerHTML = USERS[COMMENTS[comm_arr[j].comm_id].user_id].username;
    div3.appendChild(span1);
    var div5 = document.createElement("div");
    div5.className = "item_main_content text_indent_two";
    div5.innerHTML = comm_arr[j].comment;
    div2.appendChild(div5);
}

//显示当前详情页的帖子
function showCurrentMessage(i) {
    var div = document.getElementById("cur_question");
    var mess_id = MESSAGES[i].mess_id;
    var message = MESSAGES[i].message;
    var message_info = MESSAGES[i].message_info;
    var comm_num = MESSAGES[i].comm_num;

    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);
    var div3 = document.createElement("div");
    div3.className = "item_header it1";
    div2.appendChild(div3);

    var h2 = document.createElement("h2");
    // h2.className="kun";
    h2.innerText = message;
    div3.appendChild(h2);

    // var div3 = document.createElement("div");
    // div3.className="item_header_info";
    // div4.appendChild(div3);

    // var span1 = document.createElement("span");
    // div3.appendChild(span1);



    // var a1 = document.createElement("a");
    // a1.setAttribute('href', "view/detail.html?question="+mess_id);
    // a1.innerHTML=message;
    // h2.appendChild(a1);


    // var div5 = document.createElement("div");
    // div5.className="item_header_user";
    // div4.appendChild(div5);
    //
    // var span2 = document.createElement("span");
    // span2.className="user_name";
    // span2.innerHTML= USERS[MESSAGES[i].user_id].username;
    // div5.appendChild(span2);
    var div10 = document.createElement("div");
    div10.className = "content_item ct1";
    div2.appendChild(div10);

    var img1 = document.createElement("img");
    img1.setAttribute("src", "../img/知乎.jpg");
    img1.setAttribute("style", "    float: right;\n" +
        "    text-align: center;\n" +
        "    position: relative;\n" +
        "    top: 28px;\n" +
        "    left: 0px;\n" +
        "width:100px;height:100px;");
    div10.appendChild(img1);



    var div6 = document.createElement("div");
    div6.className = "item_main_content it2";
    div6.innerHTML = message_info;
    div2.appendChild(div6);


    var div7 = document.createElement("div");
    div7.className = "item_footer";
    div2.appendChild(div7);
    //
    var div8 = document.createElement("div");
    div8.className = "left";
    div7.appendChild(div8);
    //
    var span_huida = document.createElement("span");
    span_huida.innerHTML = comm_num + " 评论";
    div8.appendChild(span_huida);
}



function search() {
    var div = document.getElementById("question_list");
    div.innerHTML = "";
    var flag = 1;
    var text = $("search_text").value;
    for (var i = 0; i < MESSAGE_NUM; i++) {
        if (MESSAGES[i].message.match(text) || MESSAGES[i].message_info.match(text)) {
            flag = 0;
            showSearchMessage(i);
        }
    }
    for (var i = 0; i < COMMENT_NUM; i++) {
        if (COMMENTS[i].comment.match(text)) {
            flag = 0;
            showSearchComment(i);
        }
    }
    if (flag == 1) {

        div.setAttribute("style", "font-size:20px;color:gray;width:100px;height:30px;margin:0 auto;margin-top:10px;")
        div.innerHTML = "无搜索结果";
    }
}

//显示首页的帖子
function update() {
    if (MESSAGE_NUM > 0) {
        var div = document.getElementById("question_list");
        div.innerHTML = "";
        for (var i = 0; i < MESSAGE_NUM; i++) {
            var mess_id = MESSAGES[i].mess_id;
            var message = MESSAGES[i].message;
            var message_info = MESSAGES[i].message_info;
            var comm_num = MESSAGES[i].comm_num;
            var zan_num = MESSAGES[i].zan_num;
            var cang_num = MESSAGES[i].cang_num;
            var div2 = document.createElement("div");

            div2.className = "content_inner";
            div.appendChild(div2);

            var div4 = document.createElement("div");

            div4.className = "item_header";
            div2.appendChild(div4);

            var div3 = document.createElement("div");
            div3.className = "item_header_info";
            div4.appendChild(div3);

            var span1 = document.createElement("span");
            div3.appendChild(span1);

            var h2 = document.createElement("h2");
            div3.appendChild(h2);

            var a1 = document.createElement("a");
            a1.setAttribute('href', "view/detail.html?question=" + mess_id);
            a1.innerHTML = message;
            h2.appendChild(a1);


            var div5 = document.createElement("div");
            div5.className = "item_header_user";
            div4.appendChild(div5);

            var span2 = document.createElement("span");
            span2.className = "user_name";
            span2.innerHTML = USERS[MESSAGES[i].user_id].username;
            div5.appendChild(span2);

            var div6 = document.createElement("div");
            div6.className = "item_main_content";
            div6.innerHTML = message_info;
            div2.appendChild(div6);


            var div7 = document.createElement("div");
            div7.className = "item_footer";
            div2.appendChild(div7);



            var div8 = document.createElement("div");
            div8.className = "left";
            div7.appendChild(div8);

            var span_huida = document.createElement("span");
            span_huida.innerHTML = comm_num + " 评论";
            div8.appendChild(span_huida);




            var span_zan = document.createElement("span");
            span_zan.id = "span_zan_id" + mess_id;
            div8.appendChild(span_zan);

            var zan_num = document.createElement("span");
            zan_num.id = "zan_num" + mess_id;
            span_zan.appendChild(zan_num);
            var space = document.createElement("span");
            space.innerHTML = " ";
            span_zan.appendChild(space);




            var span_cang = document.createElement("span");

            div8.appendChild(span_cang);

            var cang_num = document.createElement("span");
            cang_num.id = "cang_num" + mess_id;
            cang_num.innerText = MESSAGES[i].cang_num;
            span_cang.appendChild(cang_num);

            span_cang.appendChild(space);


            var img_cang = document.createElement("img");
            img_cang.setAttribute("src", "取消收藏.png");
            img_cang.setAttribute("alt", "1");
            img_cang.setAttribute("id", "cang" + mess_id);
            img_cang.setAttribute("onclick", "shoucang('cang" + mess_id + "');");
            span_cang.appendChild(img_cang);

            var hr = document.createElement("hr");

            div.appendChild(hr);
        }

    }

}

//显示新增的帖子
function showAddMessage() {
    var div = document.getElementById("question_list");
    var i = MESSAGE_NUM - 1;
    var mess_id = MESSAGES[i].mess_id;
    var message = MESSAGES[i].message;
    var message_info = MESSAGES[i].message_info;
    var comm_num = MESSAGES[i].comm_num;
    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);

    var div4 = document.createElement("div");

    div4.className = "item_header";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "item_header_info";
    div4.appendChild(div3);

    var span1 = document.createElement("span");
    div3.appendChild(span1);

    var h2 = document.createElement("h2");
    div3.appendChild(h2);

    var a1 = document.createElement("a");
    a1.setAttribute('href', "view/detail.html?question=" + mess_id);
    a1.innerHTML = message;
    h2.appendChild(a1);


    var div5 = document.createElement("div");
    div5.className = "item_header_user";
    div4.appendChild(div5);

    var span2 = document.createElement("span");
    span2.className = "user_name";
    span2.innerHTML = USERS[MESSAGES[i].user_id].username;
    div5.appendChild(span2);

    var div6 = document.createElement("div");
    div6.className = "item_main_content";
    div6.innerHTML = message_info;
    div2.appendChild(div6);


    var div7 = document.createElement("div");
    div7.className = "item_footer";
    div2.appendChild(div7);



    var div8 = document.createElement("div");
    div8.className = "left";
    div7.appendChild(div8);

    var span_huida = document.createElement("span");
    span_huida.innerHTML = comm_num + " 评论";
    div8.appendChild(span_huida);


    var space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;";





    div8.appendChild(space);

    var span_cang = document.createElement("span");

    div8.appendChild(span_cang);

    var cang_num = document.createElement("span");
    cang_num.id = "cang_num" + mess_id;
    cang_num.innerText = MESSAGES[i].cang_num;
    span_cang.appendChild(cang_num);

    span_cang.appendChild(space);



    var img_cang = document.createElement("img");
    img_cang.setAttribute("src", "取消收藏.png");
    img_cang.setAttribute("alt", "1");
    img_cang.setAttribute("id", "cang" + mess_id);
    img_cang.setAttribute("onclick", "shoucang('cang" + mess_id + "');");
    span_cang.appendChild(img_cang);

    var hr = document.createElement("hr");

    div.appendChild(hr);

}

function showIndexComment(j) {

    var div = document.getElementById("relate_list");

    var div1 = document.createElement("div");

    div1.className = "content_item";
    div.appendChild(div1);

    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div1.appendChild(div2);

    var div4 = document.createElement("div");
    div4.className = "item_header clearfix";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "detail_item_header_user";
    div4.appendChild(div3);

    var div6 = document.createElement("div");
    div6.innerHTML = "<h6 style='color:lightskyblue'># 你评论了这个帖子</h6>";
    div3.appendChild(div6);

    var span1 = document.createElement("span");
    span1.className = "user_name";
    span1.innerHTML = USERS[COMMENTS[j].user_id].username;
    div3.appendChild(span1);


    var div5 = document.createElement("div");
    div5.className = "item_main_content";
    div5.innerHTML = COMMENTS[j].comm;
    div2.appendChild(div5);
}
function showSearchMessage(i) {
    var div = document.getElementById("question_list");
    var mess_id = MESSAGES[i].mess_id;
    var message = MESSAGES[i].message;
    var message_info = MESSAGES[i].message_info;
    var comm_num = MESSAGES[i].comm_num;

    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);

    var div4 = document.createElement("div");

    div4.className = "item_header";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "item_header_info";
    div4.appendChild(div3);

    var span1 = document.createElement("span");
    div3.appendChild(span1);


    var h2 = document.createElement("h2");
    div3.appendChild(h2);



    var a1 = document.createElement("a");
    a1.setAttribute('href', "view/detail.html?question=" + mess_id);
    a1.innerHTML = message;
    h2.appendChild(a1);


    var div5 = document.createElement("div");
    div5.className = "item_header_user";
    div4.appendChild(div5);

    var span2 = document.createElement("span");
    span2.className = "user_name";
    span2.innerHTML = USERS[MESSAGES[i].user_id].username;
    div5.appendChild(span2);

    var div6 = document.createElement("div");
    div6.className = "item_main_content";
    div6.innerHTML = message_info;
    div2.appendChild(div6);


    var div7 = document.createElement("div");
    div7.className = "item_footer";
    div2.appendChild(div7);



    var div8 = document.createElement("div");
    div8.className = "left";
    div7.appendChild(div8);

    var span_huida = document.createElement("span");
    span_huida.innerHTML = comm_num + " 评论";
    div8.appendChild(span_huida);


    var space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;";



    div8.appendChild(space);

    var span_cang = document.createElement("span");

    div8.appendChild(span_cang);

    var cang_num = document.createElement("span");
    cang_num.id = "cang_num" + mess_id;
    cang_num.innerText = MESSAGES[i].cang_num;
    span_cang.appendChild(cang_num);

    span_cang.appendChild(space);



    var img_cang = document.createElement("img");
    img_cang.setAttribute("src", "取消收藏.png");
    img_cang.setAttribute("alt", "1");
    img_cang.setAttribute("id", "cang" + mess_id);
    img_cang.setAttribute("onclick", "shoucang('cang" + mess_id + "');");
    span_cang.appendChild(img_cang);

    var hr = document.createElement("hr");

    div.appendChild(hr);

}
function showSearchComment(j) {

    var div = document.getElementById("question_list");

    var div1 = document.createElement("div");

    div1.className = "content_item";
    div.appendChild(div1);

    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div1.appendChild(div2);

    var div4 = document.createElement("div");
    div4.className = "item_header clearfix";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "detail_item_header_user";
    div4.appendChild(div3);


    var span1 = document.createElement("span");
    span1.className = "user_name";
    span1.innerHTML = USERS[COMMENTS[j].user_id].username;
    div3.appendChild(span1);


    var div5 = document.createElement("div");
    div5.className = "item_main_content";
    div5.innerHTML = COMMENTS[j].comment;
    div2.appendChild(div5);
}
function showIndexMessage(i) {
    var div = document.getElementById("relate_list");
    var mess_id = MESSAGES[i].mess_id;
    var message = MESSAGES[i].message;
    var message_info = MESSAGES[i].message_info;
    var comm_num = MESSAGES[i].comm_num;

    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);

    var div4 = document.createElement("div");

    div4.className = "item_header";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "item_header_info";
    div4.appendChild(div3);

    var span1 = document.createElement("span");
    div3.appendChild(span1);

    var div6 = document.createElement("div");
    div6.innerHTML = "<h6 style='color:lightskyblue'># 你发表了这个帖子</h6>";
    div3.appendChild(div6);

    var h2 = document.createElement("h2");
    div3.appendChild(h2);



    var a1 = document.createElement("a");
    a1.setAttribute('href', "view/detail.html?question=" + mess_id);
    a1.innerHTML = message;
    h2.appendChild(a1);


    var div5 = document.createElement("div");
    div5.className = "item_header_user";
    div4.appendChild(div5);

    var span2 = document.createElement("span");
    span2.className = "user_name";
    span2.innerHTML = USERS[MESSAGES[i].user_id].username;
    div5.appendChild(span2);

    var div6 = document.createElement("div");
    div6.className = "item_main_content";
    div6.innerHTML = message_info;
    div2.appendChild(div6);


    var div7 = document.createElement("div");
    div7.className = "item_footer";
    div2.appendChild(div7);



    var div8 = document.createElement("div");
    div8.className = "left";
    div7.appendChild(div8);

    var span_huida = document.createElement("span");
    span_huida.innerHTML = comm_num + " 评论";
    div8.appendChild(span_huida);


    var space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;";





    div8.appendChild(space);

    var span_cang = document.createElement("span");

    div8.appendChild(span_cang);

    var cang_num = document.createElement("span");
    cang_num.id = "cang_num" + mess_id;
    cang_num.innerText = MESSAGES[i].cang_num;
    span_cang.appendChild(cang_num);

    span_cang.appendChild(space);



    var img_cang = document.createElement("img");
    img_cang.setAttribute("src", "取消收藏.png");
    img_cang.setAttribute("alt", "1");
    img_cang.setAttribute("id", "cang" + mess_id);
    img_cang.setAttribute("onclick", "shoucang('cang" + mess_id + "');");
    span_cang.appendChild(img_cang);

    var hr = document.createElement("hr");

    div.appendChild(hr);

}

function showIndexMessage_shou_cang(i) {
    var mess_id = MESSAGES[i].mess_id;
    var message = MESSAGES[i].message;
    var message_info = MESSAGES[i].message_info;
    var comm_num = MESSAGES[i].comm_num;
    var div = document.getElementById("shou_cang_list");
    var div2 = document.createElement("div");

    div2.className = "content_inner";
    div.appendChild(div2);

    var div4 = document.createElement("div");

    div4.className = "item_header";
    div2.appendChild(div4);

    var div3 = document.createElement("div");
    div3.className = "item_header_info";
    div4.appendChild(div3);

    var span1 = document.createElement("span");
    div3.appendChild(span1);

    var div6 = document.createElement("div");
    div6.innerHTML = "<h6 style='color:lightskyblue'># 你收藏了这个帖子</h6>";
    div3.appendChild(div6);

    var h2 = document.createElement("h2");
    div3.appendChild(h2);



    var a1 = document.createElement("a");
    a1.setAttribute('href', "view/detail.html?question=" + mess_id);
    a1.innerHTML = message;
    h2.appendChild(a1);


    var div5 = document.createElement("div");
    div5.className = "item_header_user";
    div4.appendChild(div5);

    var span2 = document.createElement("span");
    span2.className = "user_name";
    span2.innerHTML = USERS[MESSAGES[i].user_id].username;
    div5.appendChild(span2);

    var div6 = document.createElement("div");
    div6.className = "item_main_content";
    div6.innerHTML = message_info;
    div2.appendChild(div6);


    var div7 = document.createElement("div");
    div7.className = "item_footer";
    div2.appendChild(div7);



    var div8 = document.createElement("div");
    div8.className = "left";
    div7.appendChild(div8);

    var span_huida = document.createElement("span");
    span_huida.innerHTML = comm_num + " 评论";
    div8.appendChild(span_huida);


    var space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;";




    div8.appendChild(space);

    var span_cang = document.createElement("span");

    div8.appendChild(span_cang);

    var cang_num = document.createElement("span");
    cang_num.id = "cang_num" + mess_id;
    cang_num.innerText = MESSAGES[i].cang_num;
    span_cang.appendChild(cang_num);

    span_cang.appendChild(space);



    var img_cang = document.createElement("img");
    img_cang.setAttribute("src", "取消收藏.png");
    img_cang.setAttribute("alt", "1");
    img_cang.setAttribute("id", "cang" + mess_id);
    img_cang.setAttribute("onclick", "shoucang('cang" + mess_id + "');");
    span_cang.appendChild(img_cang);

    var hr = document.createElement("hr");

    div.appendChild(hr);

}

//创建一个用户
function createUser(number, name, word, zan_mess1, shou_cang_mess1) {
    var user = {
        phonenumber: number,
        username: name,
        password: word,
        zan_num: 0,
        shou_cang_num: 0,
        zan_mess: zan_mess1,
        shou_cang_mess: shou_cang_mess1,
    };
    return user
}

//创建一个帖子
function createMessage(number, m, m_info, u_id, comm_arr1) {
    var message = {
        mess_id: number,
        message: m,
        message_info: m_info,
        user_id: u_id,
        comm_arr: comm_arr1,
        comm_num: 0,
        zan_num: 0,
        cang_num: 0,
    };
    return message
}

//创建一个评论
function createComment(number, comm_, u_id, m_id) {
    var comment = {
        comm_id: number,
        comm: comm_,
        user_id: u_id,
        mess_id: m_id


    };
    return comment
}

//创建所有用户索引数组
function createUser_index(phone) {
    var user_index = {
        phonenumber: phone,
    };
    return user_index
}

function createComment_index(c_id, comm) {
    var comment_index = {
        comm_id: c_id,
        comment: comm,
    };
    return comment_index
}

function createMessage_index(m_id) {
    var message_index = {
        mess_id: m_id
    };
    return message_index
}

//检测注册
function RegExpRegister() {

    var name1 = $("username").value;
    var phone1 = $("userphone").value;
    var password1 = $("password").value;


    if (name1 == "") {
        alert("请输入用户名！");
        $("username").focus();
    }
    else if (name1.indexOf('<') != -1 ||
        name1.indexOf('>') != -1 ||
        name1.indexOf('《') != -1 ||
        name1.indexOf('》') != -1 ||
        name1.indexOf('‘') != -1 ||
        name1.indexOf('“') != -1 ||
        name1.indexOf('"') != -1 ||
        name1.indexOf("'") != -1 ||
        name1.indexOf("\"") != -1 ||
        name1.indexOf("/") != -1 ||
        name1.indexOf(" ") != -1) {
        alert('姓名请不要包含特殊字符!');
        $("username").focus();
    }
    else if (phone1 == "") {
        alert("请输入手机号码！");
        $("userphone").focus();
    }
    else if (!isNumber(phone1)) {
        alert("手机号应该为数字");
        $("userphone").focus();
    }
    else if (phone1.length != 11) {
        alert("手机号的长度为11");
        $("userphone").focus();
    }
    else if (USERS[phone1] != null) {
        alert("手机号已经存在");
        $("userphone").focus();
    }
    else if (password1 == "") {
        alert("请输入密码！");
        $("password").focus();
    }
    else if (password1.length < 8) {
        alert("密码需要在8~20个字符范围之内");
        $("password").focus();
    }
    else if (password1.length > 20) {
        alert("密码需要在8~20个字符范围之内");
        $("password").focus();
    }
    else {
        addUser();

        document.getElementById('userLogin').style.display = "none";
        alert("注册成功");
    }
}

//检测登录
function login() {
    var userphone = $("userphone").value;
    var password1 = $("password").value;
    if(userphone.length == 0)
    {
        alert("请输入手机号码");
    }
    else if(userphone.length != 11)
    {
        alert("手机号码的长度是11位");
    }
    else
    {
        if (USERS[userphone] == null) {
            alert("该手机号不存在");
        }
        else if(password1.length == 0)
        {
            alert("请输入密码");
        }
        else if(password1.length <8)
        {
            alert("密码范围在8~20位");
        }
        else if (USERS[userphone].password != password1) {
            alert("密码不正确");
        }
        else {
            curNumber = userphone;
            alert("登录成功");
            $("showLogDialog").src = "2.jpg";
            document.getElementById("userLogin").style.display = "none";
        }
    }
}

//修改密码
function change_password()
{
    if($("pwd").value.length == 0)
    {
        alert("修改的密码不能为空");
        document.getElementById("pwd").value = "";  
    }
    else
    {
        if($("pwd").value.length<8)
        {
            alert("修改的密码范围应该在8~20个字符范围之内");
            document.getElementById("pwd").value = "";
            document.getElementById("pwd").style.borderBottom = "1px solid #03e9f4";
            var ino = document.getElementById("pwd").previousElementSibling;
            ino.innerHTML = "";  
        }
        else if($("pwd").value.length>20)
        {
            alert("修改的密码范围应该在8~20个字符范围之内");
            document.getElementById("pwd").value = "";  
            document.getElementById("pwd").style.borderBottom = "1px solid #03e9f4";
            var ino = document.getElementById("pwd").previousElementSibling;
            ino.innerHTML = "";  
        }
        else
        {
            var users = JSON.parse(localStorage.getItem("users"));
            password = $("pwd").value;
            REMEMBER = localStorage.getItem("rememberMe");
            users[REMEMBER].password = password;
            obj = JSON.stringify(users);
            localStorage.setItem("users",obj);
            alert("修改成功");
            document.getElementById("userinfo").style.display = "none"; 
        } 
    }   
}

//添加用户
function addUser() {
    var name1 = $("username").value;
    var phone1 = $("userphone").value;
    var password1 = $("password").value;
    localAddUser(createUser(phone1, name1, password1, JSON.stringify(new Object()), JSON.stringify(new Object())));
    curNumber = phone1;
    localStorage.rememberMe = curNumber;

    // alert("添加成功");
    $("showLogDialog").src = "2.jpg";
    $("username").value = "";
    $("userphone").value = "";
    $("password").value = "";
}

//添加帖子
function addMessage() {
    if (localStorage.getItem("users_num") == 0) {
        alert("您还未登录，不能进行发布帖子");
    }
    else
    {
        alert("发布成功！");
        var message = $("message").value;
        var message_info = $("message_info").value;

        $("message_id").value = MESSAGE_NUM;
        localStorage.rememberMessage = MESSAGE_NUM;

        //本地存储数据
        localAddMessage(createMessage(MESSAGE_NUM, message, message_info,
            curNumber, JSON.stringify(new Object())));
        MESSAGE_NUM++;
        localStorage.messages_num = MESSAGE_NUM;

        //关闭模态框
        document.getElementById('addQuesModal').style.display = "none";
        $("message").value = "";
        $("message_info").value = "";

        //显示添加后的效果
        showAddMessage();
}

//添加评论
function addComment() {
    var message_id = curMessage;
    var comm = $("comment").value;
    var comment = createComment_index(COMMENT_NUM, comm);
    // alert("message_id:"+message_id);
    var co = JSON.parse(MESSAGES[message_id].comm_arr);
    co[MESSAGES[message_id].comm_num] = comment;
    var str = JSON.stringify(co);
    MESSAGES[message_id].comm_arr = str;
    var number = MESSAGES[message_id].comm_num + 1;
    MESSAGES[message_id].comm_num = number;
    updateMESSAGES();
    localAddComment(createComment(COMMENT_NUM, comm, curNumber, message_id));
    // $("#message_id").attr("value",MESSAGE_NUM);
    COMMENT_NUM++;
    localStorage.messages_num = COMMENT_NUM;

    document.getElementById('addAnsModal').style.display = "none";
    $("comment").value = "";
    showAddComment();

    }
}

//往本地存储添加一个用户
function localAddUser(user) {
    var phonenumber = user.phonenumber
    USERS_ID[USERS_NUM] = createUser_index(phonenumber);
    USERS_NUM++;
    localStorage.users_num = USERS_NUM;

    USERS[phonenumber] = user;
    updateUSERS();
    updateUSERS_ID();
}


//往本地存储添加一个帖子
function localAddMessage(message) {
    var id = message.mess_id;


    MESSAGES[id] = message;
    // alert(USERS[phonenumber].username);
    updateMESSAGES();

}

//往本地存储添加一个评论
function localAddComment(comment) {
    var id = comment.comm_id;


    COMMENTS[id] = comment;
    // alert(USERS[phonenumber].username);
    updateCOMMENTS();

}
//更新本地存储的总用户
function updateUSERS() {
    var str = JSON.stringify(USERS)
    localStorage.users = str
}
//更新本地存储的总帖子
function updateMESSAGES() {
    var str = JSON.stringify(MESSAGES)
    localStorage.messages = str
}

//更新本地存储的总评论
function updateCOMMENTS() {
    var str = JSON.stringify(COMMENTS)
    localStorage.comments = str
}

//更新本地存储的总用户索引数组
function updateUSERS_ID() {
    var str = JSON.stringify(USERS_ID)
    localStorage.users_index = str
}

function findAllAboutUser() {
    var div = document.getElementById("relate_list");
    for (var i = 0; i < MESSAGE_NUM; i++) {
        if (MESSAGES[i].user_id == curNumber) {
            showIndexMessage(i);
        }
    }

    for (var i = 0; i < MESSAGE_NUM; i++) {
        if (COMMENTS[i].user_id == curNumber) {
            showIndexComment(i, div);
        }
    }
}

function findAllShouCang() {
    var co = JSON.parse(USERS[curNumber].shou_cang_mess);
    var shou_cang_num = USERS[curNumber].shou_cang_num;
    for (var i = 0; i < shou_cang_num; i++) {
        showIndexMessage_shou_cang(co[i].mess_id);

    }

}

function $(id) {
    return document.getElementById(id);
}

function isNumber(val) {
    var regPos = /^\d+(\.\d+)?$/; //非负浮点数
    var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
    if (regPos.test(val) || regNeg.test(val)) {
        return true;
    } else {
        return false;
    }
}

function dianzan(id) {

    var img = document.getElementById(id);
    var arrUrl = id.split("n");
    var para = arrUrl[1];
    if (img.alt == 1) {

        img.src = "点赞.png";
        img.alt = 0;
        MESSAGES[para].zan_num++;
        var cur = $("zan_num" + para).innerText;
        $("zan_num" + para).innerHTML = MESSAGES[para].zan_num;

        var mess_id = para;
        var mess = createMessage_index(mess_id);
        var co = JSON.parse(USERS[curNumber].zan_mess);

        co[USERS[curNumber].zan_num] = mess;
        USERS[curNumber].zan_num++;
        var str = JSON.stringify(co);
        USERS[curNumber].zan_mess = str;
        updateUSERS();
    }
    else {
        img.src = "取消点赞.png";
        img.alt = 1;
        MESSAGES[para].zan_num--;
        var cur = $("zan_num" + para).innerText;
        $("zan_num" + para).innerHTML = MESSAGES[para].zan_num;

    }
    updateMESSAGES();
    // update();
    reload();
}

function shoucang(id) {

    var img = document.getElementById(id);
    var arrUrl = id.split("g");
    var para = arrUrl[1];
    if (img.alt == 1) {
        // alert(para);
        img.src = "收藏.png";
        img.alt = 0;
        MESSAGES[para].cang_num++;

        $("cang_num" + para).innerHTML = MESSAGES[para].cang_num;

        //为USERS增加收藏个数
        var mess_id = para;
        var mess = createMessage_index(mess_id);
        var co = JSON.parse(USERS[curNumber].shou_cang_mess);

        co[USERS[curNumber].shou_cang_num] = mess;
        USERS[curNumber].shou_cang_num++;
        var str = JSON.stringify(co);
        USERS[curNumber].shou_cang_mess = str;
        updateUSERS();

    }
    else {
        // alert(para);
        img.src = "取消收藏.png";
        img.alt = 1;
        MESSAGES[para].cang_num--;

        $("cang_num" + para).innerHTML = MESSAGES[para].cang_num;

    }
    updateMESSAGES();
    // update();
    reload();
}

