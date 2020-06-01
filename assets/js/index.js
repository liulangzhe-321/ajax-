$(function() {
    // 移除(退出)
    $('#logout').on('click',function () {
        // 询问是否退出
        // 询问框
        layer.confirm('您确定退出吗？', {
            btn: ['确定','取消'] //按钮
          }, function(){
        //    点击确认
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
    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            console.log(res);
            // 渲染页面
        },
        headers:{
            Authorization:localStorage.getItem('token')
        }
    })
}