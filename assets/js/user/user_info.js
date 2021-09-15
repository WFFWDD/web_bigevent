$(function () {
    var form = layui.form
    
    form.verify({
        nackname: function (value) {
            if (value.length > 6) {
                return "昵称不能超六我"
            }
        }
    })
    initUserInfo()

    //重置表单数据
    $("#btnReset").on("click", function (e) {
        //阻止表单的默认重置行为
        e.preventDefault()
        // 再次调用获取用户的函数，会重新发一次请求 会通过form.val()重新给表单赋值
        initUserInfo()
    })
        //更新用户信息
    genxin()



})
//获取用户的基本信息
function initUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        success: function (res) {
            if (res.status != 0) {
                return layer("获取用户失败")
            }
            // console.log(res);
            // layui里面快速给表单赋值的
            layui.form.val("nae",res.data)           
        }
    })
}

//更新用户信息
function genxin() {
    $(".layui-form").on("submit", function (e) {
        //阻止用户默认提交数据
        e.preventDefault()
        // var data=layui.form.val("nae")
        // var data=$(".layui-form").serialize()
        $.ajax({
            method: "POST",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layui.layer.msg("获取用户失败")
                }
                layui.layer.msg("更新成功");
                // 调用父页面中的方法，重新渲染头像和用户的信息
                // 因为我们的这个页面是在<iframe></iframe>标签里面
                // window代表iframe窗口parent父页面就是index 这样就可以调用父页面中的方法了 调用父页面的获取用户信息的函数就可以获得最新的内容 从而渲染
                
               window.parent.getUserInfo()
            }
        })

    })
}