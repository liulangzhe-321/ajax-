// 加载表单
var form = layui.form;
$(function(){
    // 点击修改的时候获取表单的值
    $('.layui-form').on('submit',function(e){
        // 阻止默认行为
        e.preventDefault()
        // 获取输入框的内容
      var data=  $(this).serialize();
      $.post('/my/userinfo', data,function(res) {
        // 更新用户信息失败
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        // 成功以后 从新获取用户信息 渲染首页
        // window 是当前子页面的的窗口
        // parent 表示父窗口  即  index.html
        window.parent.getUserInfo();
      })
    })
    // 给重置注册事件
    $('button[type=reset]').click(function(e){
      e.preventDefault()
      // 重新为表单赋值
      initUserInfo();
    });
    // 获取用户的基本信息
    initUserInfo();

})
function initUserInfo(){
    // 发送ajaxdex的信息

    $.ajax({
        url:'/my/userinfo',
        success:function(res){
            //  console.log(res)
            form.val('f1',res.data)
           
        }
    })
}