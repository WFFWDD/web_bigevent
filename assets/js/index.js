// 入口函数
$(function () {
    // 调用获取用户基本信息的函数
    getUserInfo()

    // 为退出按钮绑定点击事件
    $("#btnLogout").on("click", function () {
        layui.layer.confirm('确定退出登录？', { icon: 3, title: '提示' },
        function (index) {
  //do something
            
            // 点击确定后需要操作与登录操作成功后的反操作
            // 1：清空本地的token、
            // 调用方法
            localStorage.removeItem("token")
            // 2：转跳页面到登录页面
            location.href="/login.html"
            // location.replace=("/login.html")
            
            // 关闭confirm询问框
          layui.layer.close(index);
});
    })
})

//获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        //Headers：请求头 有权限的接口需要配置请求头
        // headers: {
        //     Authorization:localStorage.getItem("token")||""
        // },
        success: function (res) {
            // 判断是否成功
            if (res.status!== 0) {
                return layui.layer.msg("登录失败哦")
            }
            // 调用渲染基本信息的函数
            console.log(res.data);
            renderAvatar(res.data)
        },

        // 不论成功还是失败，ajax都会调用complete回调函数
        // complete: function (res) {
        //     console.log(res);
        //     // 在complete回调函数中可以通过responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
        //         // 1:强制清空token
        //         localStorage.removeItem("token")
        //         // 2：强制转跳页面到登录页面
        //         location.href="/login.html"

        //     }
        // }
    })
}

//渲染基本信息的函数
function renderAvatar(user) {
    var name = user.nickname ||user.username
    // 获取元素
    $("#welcome").html("欢迎&nbsp&nbsp" + name)
    
    // 按需渲染头像信息
    if (user.user_pic !== null) {
        // 判断响应的信息user里面的头像属性是否为空
        // 不为空则获取到html头像头像元素，修改属性的scr地址。并显示。让字母头像隐藏
        $(".layui-nav-img").attr("src", user.user_pic).show();
        $(".text-avatar").hide()
    }
    else {
        // 如果为空，隐藏头像图片元素，显示字母头像元素
        $(".layui-nav-img").hide()
        // 将name名字第一个字母添加到字母头像
        // 字符串可以当数组一样取得第一个字母转换为大写字母
        var first=name[0].toUpperCase()
        $(".text-avatar").html(first).show()
    }
}