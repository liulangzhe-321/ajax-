$(function(){
    // 切换登录和注册的盒子
    $('#quzhuce').on('click',function(){
        $('.login').hide();
        $('.reg').show();
    })
    $('#qudenglu').on('click',function(){
        $('.login').show();
        $('.reg').hide();
    });
    // 加载layui表单验证
    var form = layui.form
    // 使用layUI进行表单验证
    form.verify({
        // 验证规则有两种
        // 一 直接验证
        // 二用函数进行验证
    //    自定义名称['验证规则代码','错误提示']
    //    验证名称:function(){}
    pass:[/^[\S]{6,12}$/,'密码长度是6到12位'],
    // 验证两次码是否相同
    repwd:function(value){
        // value表示当前该验证规则输入的值
        // 先找到密码框的值
        // trim(去掉两边的空白)
        var pwd =$('.password').val().trim();
        if(pwd!=value){
            // return'提示;
            return'两次密码不一致'
        }
    }
});
// 完成注册模块
$('#reg-form').on('submit',function(e){
    // z阻止默认行为
    e.preventDefault();
    // 收集表单信息
    // 两种方法
    // new FromData
    // serialize
    var data =$(this).serialize();
    // console.log(data)
    $.ajax({
        type:'post',
        url:'http://www.liulongbin.top:3007/api/reguser',
        data:data,
        success:function(res){
            // console.log(res);
            if(res.status === 1){
                // 失败返回对应得数据
                // 是否重置表单  reset()DoM 中重置表单数据的方法
                // $('#res_from')[0].reset()
                return layer.msg(res.message);
            }
            // 成功
            layer.msg('注册成功');
            // 执行单击事件
            // $("#qudenglu').click();
            $('#qudenglu').click();
           
            }
    })
})
// 登录功能模块
$('#login-from').on('submit',function(e){
    // z阻止默认行为
    e.preventDefault();
    // 收集表单数据
    var data =$(this).serialize();

    $.ajax({
        type:'post',
        url:'http://www.liulongbin.top:3007/api/login',
        data:data,
        success:function(res){
            if(res.status===1){
                return layer.message(
                    res.message
                )
            }
            // 登陆成功保存token
            localStorage.setItem('token',res.token)

            layer.msg('登陆成功')
            
        }
    })
})
})
