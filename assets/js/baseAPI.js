// 注意：每次调用$.get(),$.post(),$.ajax()请求之前都会先调用ajaxPrefilte这个函数，在这个函数中我们可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function (options) {
    // 在发起正真的ajax请求之前统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url


    // 统一为有权限的接口设置headers请求头
    // 判断url地址中有/my/的有权限的接口
    // 不等于-1表示有
    if (options.url.indexOf("/my/") !== -1) {
        options.headers = {
             Authorization:localStorage.getItem("token")||""
        }
    }


    // 统一为全局有权限接口挂载complete回调函数
    options.complete = function (res) {
            // console.log(res);
            // 在complete回调函数中可以通过responseJSON拿到服务器响应回来的数据
            if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
                // 1:强制清空token
                localStorage.removeItem("token")
                // 2：强制转跳页面到登录页面
                location.href="/login.html"

            }
    }
})