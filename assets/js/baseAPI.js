//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    //在发起真正的ajax请求之前统一拼接请求的跟路径 
    options.url='http://ajax.frontend.itheima.net'+options.url;
    
})