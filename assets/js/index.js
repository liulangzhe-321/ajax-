$(function() {
    // 移除(退出)
    // 退出功能
    $('#logout').on('click',function () {
        // 询问是否退出
        // 询问框
        layer.confirm('您确定退出吗？', {
            btn: ['确定','取消'] //按钮
          }, function(){
        //    点击确认
        // 删除本地存储的token并重新加载页面
            localStorage.removeItem('token');
            location.href='/login.html'
          }, function(){
            // 点击取消
          });
    });
    // 获取用户信息
    getUserInfo();
})

function getUserInfo(){
    // 发送请求 ,获取用户的信息
    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            console.log(res);
            // 判断获取用户信息是不是成功
            if(res.status!==0){
               return layer.msg(res.message)
            }
            // 渲染页面
            renderHtml(res.data)
        },
        // headers配置请求头
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}
// 渲染页面上函数
function renderHtml(data){
    // 获取字体头像
    // 有昵称,用昵称  没有昵称 用账号
    // 定义变量 name  给name赋值 优先只用nickname 
    var name =data.nickname ||  data.username
    // 获取第一个字母或数字   截取 字母 substring ()  
    var firstText=name.substr(0,1).toUpperCase();
    // ''.toUpperCase
    // 判断图片
    if(data.user_pic){
        // 显示图片
        $(".person  img").show().attr('src',data.user_pic)
        // 隐藏字体头像
        $(".text-avatar").hide()

    }else{
        // 隐藏图片
        $('.person  img').hide()

        // 显示字体头像
        $('.test-avatar').css('display','inlinc-block').text(firstText)
    }
        //设置欢迎语
        $('.welcome').html("欢迎你 "+name)
}