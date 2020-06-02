$.ajaxPrefilter(
    function(option){
        // option就是每次ajax请求的配置对象
        // option={
        //     type:post/get
        //     url:http://..
        //     data:data
        //     success:function(res){

        //     }
        // }
        // 配置url加上统一的路
        option.url='http://www.liulongbin.top:3007'+option.url
        // 请求url,如果是以/my/开头 则需要进行下面两项配置
        if(option.url.indexOf('/my')!==-1){
            option.complete=function(xhr){
                // 判断,如果获取用户信息失败,说明该用户没有登录, 那么跳转到login.html
                // console.log(xhr)
                if(xhr.responseJSON.status=== 1 && xhr.responseJSON.message==="身份认证失败！"){
                    location.href="/login.html"
                }
            },
            // headers配置请求头
            option.headers={
                Authorization:localStorage.getItem('token')
            }
        }
})