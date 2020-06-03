$(function () {
    var form = layui.form;
    // 使用表单验证
    form.verify({
        // key:value
        // 验证规则:数组  或函数
        len: [/^[\S]{6,12}$/, '密码长度必须是6~12位'],
        diff: function (value) {
            // value 表示我们填写的新密码
            // 获取原始密码
            var old = $('input[name="oldPwd"]').val();
            if (old === value) {
                return '新密码不能与旧密码一致'
            }
        },
        // ;两次密码必须一致
        same: function (value) {
            // 获取新密码
            var newPwd = $('input[name="newPwd"]').val();
            if (newPwd !== value) {
                return '确认密码不同'
            }
        }

    });
    // 点击修改密码的时候完成ajax请求
    $('.layui-form').on('submit', function (e) {
        // 阻止默认行为
        e.preventDefault()
        // 获取输入框的内容
        // var data =
        $.post('/my/updatepwd',  $(this).serialize(), function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            layer.msg('更新密码成功');
            // 重置表单
            $('.layui-form')[0].reset()
        })
    })
})