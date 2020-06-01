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
})