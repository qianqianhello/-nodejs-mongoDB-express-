var user = document.getElementById('name');
var password = document.getElementById('password');
var button_remerber = document.getElementById('remerber');
var submit = document.getElementById('submit');
var form = document.getElementById('form');
var remerber_laber = document.getElementById('remerber_laber');

if(getCookie('user') && getCookie('password')){
    user.value = getCookie('user');
    password.value = getCookie('password');
  }
// console.log(name);
console.log(user);
console.log(password);

var select = 'checked';
 //复选框勾选状态发生改变时，如果未勾选则清除cookie
button_remerber.onclick= function(){
       if (select == 'checked'){
      remerber_laber.classList.remove("radiodelected");
      remerber_laber.classList.add("radiodelect");
      select = 'check';
      console.log(remerber_laber.classList);
    }else{
       remerber_laber.classList.remove("radiodelect");
       remerber_laber.classList.add("radiodelected");
       select = 'checked';
       console.log(remerber_laber.classList);
        }
   console.log(select);
      }
  
  //表单提交事件触发时，如果复选框是勾选状态则保存cookie
  form.onsubmit = function(){
    // 调用cookie
    savecookie()
      // 判断用户名和密码是否为空
      if(user.value == ''||password.value == ''){
        alert("账号或密码不可以为空");
        return false;
      }else{
        
      $.ajax({
					url:'/users?action=login',
					method:'GET',
					data:{
            account:user.value
          },
          success(d){
            console.log(d)
            // console.log(d.item[0].password)
          console.log(password.value)
          if(d.code == "500"){
            alert("账号或密码错误");
          }else{
          if(password.value == d.item[0].password){
            window.location.href="./user";
            // action="./main"
            return true;
            // window.location.href='http://www.baidu.com';
          }else{
            alert("账号或密码错误");
            return false;
          }
        }
      }
      })
      
      return false;
    }
  }
        // .then(function(rs){
        //   console.log(rs)
        //   console.log(password.value)
        //   if(password.value == rs.item.password){
            
        //     window.location.href='http://www.baidu.com';
        //   }else{
        //     alert("账号或密码错误");
        //     return false;
        //   }
        // })
      // }
    // }


     function savecookie(){
       // 验证记住密码状态
     if(select == 'checked'){ 
      setCookie('user',user.value,7); //保存帐号到cookie，有效期7天
      setCookie('password',password.value,7); //保存密码到cookie，有效期7天
    }else{
    // 删除cookie
      setCookie('user','',-1); 
      setCookie('password','',-1);
    }
  }
    
//设置cookie
function setCookie(name,value,day){
  // alert(name,value,day);
    var date = new Date();
    date.setDate(date.getDate() + day);
    document.cookie = name + '=' + value + ';expires='+ date;
  };
  //获取cookie
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

    if (arr = document.cookie.match(reg)) return unescape(arr[2]);
    else return null;
}

