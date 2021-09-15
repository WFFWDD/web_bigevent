$(function () {
    layui.form.verify({
        pas: [/^[\S]{6,12}$/, "密码必须是6-12，且不能包含空格"],
        
        // 自定义检测两次密码一致的规则
        repwd: function (value) {
            // 通过形参拿到的是确认密码框中的内容
            // pas拿到的是密码框中的内容
            // 然后进行一次等于的判断
            // 结果不一样就返回字符串
            var psd = $("#newpsa").val()
            if (psd!==value) {
                return "两次密码不一致"
            }
        },

        //校验新密码和旧密码不嫩一致
        samePwd: function (value) {
            if (value == $("#oldpwd").val()) {
                return "不能与原密码相同"
            }
        }
    })


     $(".layui-form").on("submit", function (e) {

        // 阻止表单默认提交
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/my/updatepwd",
            // data: $(this).serialize(),
            data:{oldPwd:$("#oldpwd").val(),newPwd:$("#newpsa").val()},
            success: function (res) {
                if (res.status!==0) {
                    return layui.layer.msg("修改失败")
                }
                layui.layer.msg("修改成功")
                // 将jquery元素转为原生dom元素 然后利用reset方法清空表单
                $(".layui-form")[0].reset()
              
            }
        })
    })
})



// 重置密码
// function dd() {
//     $(".layui-form").on("submit", function (e) {

//         // 阻止表单默认提交
//         e.preventDefault()
//         $.ajax({
//             method: "POST",
//             url: "/my/updatepwd",
//             data: { oldPwd: $("#oldpwd").val(), newPwd: $("#newpas").val() },
//             success: function (res) {
//                 if (res.status !== 0) {
//                     return layui.layer.msg("获取失败")
//                 }
//                 layui.layer.msg("修改成功")
//             }
//         })
//         // console.log(sun);
//     })
// }