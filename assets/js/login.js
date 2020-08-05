$(function(){
    //点击去注册账号的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide();
        $('.reg-box').show();

    })
        //点击去登陆的链接
        $('#link_login').on('click',function(){
            $('.reg-box').hide();
            $('.login-box').show();
        })

        //从layui中获取form对象
        var form=layui.form;
        var layer=layui.layer;
        //通过form.verify（）函数自定义校验规则
        form.verify({
            //自定义一个叫做pwd校验规则
            pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
            //校验两次密码是否一致
            repwd:function(value){
              var pwd=$('.reg-box [name=password]').val();
            if(pwd != value){
                return '两次密码不一致!';
            }
            }
        })

        //监听注册表单的提交事件
        $('#form_reg').on('submit',function(e){
            //阻止表单的默认提交行为
            e.preventDefault();
            var data={username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()};
            $.post('/api/reguser',data,function(res){
                if(res.status!=0){
                    return layer.msg(res.message);
                    
                }
                layer.msg('注册成功,请登录');
                //模拟人的点击事件
                 $('#link_login').click();
                
            })
        })
        //监听登录表单的提交事件
        $('#form_login').submit(function(e){
            e.preventDefault();
            $.ajax({
  
                url:'/api/login',
                //快速获取表单中的数据
                method:'POST',
                data:$(this).serialize(),
                success:function (res) {
                    if(res.status!==0){
                        return layer.msg('登录失败');
                    }
                    layer.msg('登录成功');
                    //将登录成功的token值保存到localStorage中 
                    localStorage.setItem('token',res.token);
                    console.log(res.token);
                    //跳转到后台主页
                    location.href='/index.html';
                }
            })
        })
})