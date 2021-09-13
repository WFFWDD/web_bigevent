$(function () {
    $("#link-reg").on("click", function () {
        // 点击注册的a链接，
        $(".login-box").hide()
        $(".reg-box").show()
    })

    // 点击登录的a链接
    $("#link-login").on("click", function () {
        $(".login-box").show()
        $(".reg-box").hide()
    })

    // var regtle = /^[a-zA-Z]\w{5,17}$/
    // $(".layui-input").on("blur", function () {
    //     if (regtle.test($(this).val())){
    //         console.log("正确的");
    //     } else {
    //         console.log("不正确");
    //     }

    // })




    // 从layui中获取from对象
    // 只要导入了layui就可以使用layui
    var form = layui.form

    // 从layui导出layer内置模块
    var layer=layui.layer
    //通过from.verify()函数自定义校验规则
    form.verify({
        pasd:[/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],
    // 自定义检测两次密码一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // pas拿到的是密码框中的内容
            // 然后进行一次等于的判断
            // 结果不一样就返回字符串
            var psd = $("#psa").val()
            if (psd!==value) {
                return "两次密码不一致"
            }
        }
    })

    // 监听表单提交事件
    // 注册接口
    $("#form-reg").on('submit',function(e) {
        // 阻止表单默认提交行为
        e.preventDefault()
        var data={ username:$("#form-items").val(), password:$("#psa").val() }
        // 发起ajax的post请求
        $.post("http://api-breakingnews-web.itheima.net/api/reguser", data, function (res) {
            if (res.status!== 0) {
                // 此处可以用layui内置的提示框
                return layer.msg(res.message);
            }
            layer.msg('注册成功，请登录');
            // 注册成功后调用登录链接的点击事件
            $("#link-login").click();
        })
    })


    // 监听登录表单的提交事件
    $("#form-login").submit(function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            //快速获取当前表单的内容
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg("登录失败")
                }
                layer.msg("登录成功")
                // console.log(res.token);
                // 登录成功后将token的值保存在localStorage中
                localStorage.setItem("token",res.token)
                // 登陆成功后转跳到后台主页index.html
                location.href="/index.html"
            }
        })
  })
})