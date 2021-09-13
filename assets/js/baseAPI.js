// 注意：每次调用$.get(),$.post(),$.ajax()请求之前都会先调用ajaxPrefilte这个函数，在这个函数中我们可以拿到我们给ajax配置的对象
$.ajaxPrefilter(function (options) {
    // 在发起正真的ajax请求之前统一拼接请求的根路径
    options.url = "http://api-breakingnews-web.itheima.net" + options.url
    console.log(options.url);
})