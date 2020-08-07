//注意：每次调用$.get()或$.post()或$.ajax()的时候
//会先调用ajaxPrefilter这个函数
//在这个函数中，可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function (options) {
    console.log(options.url);
    //在发起真正的ajax请求之前统一拼接请求的跟路径 
    options.url='http://ajax.frontend.itheima.net'+options.url;
    // 统一为有权限的接口，设置headers 请求头 
  if(options.url.indexOf('/my/') != -1){
    options.headers={
        Authorization:localStorage.getItem('token')||''
    }
  }
  //全局统一挂在complete回掉函数
  options.complete=function(res){
      if(res.responseJSON.status ===1 && res.responseJSON.message==="身份认证失败！"){
          // 1.强制清空token
          localStorage.removeItem('token');
          // 2.强制跳转到登陆页
          location.href='/login.html';
      }
      
  
  }
    
})