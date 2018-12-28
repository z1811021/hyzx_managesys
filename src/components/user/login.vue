<template>
  <div class="login-body">
    <div class="login" @keyup.enter="checkLogin()">
      <div class="layout-logo-left"><div style="margin-top:10%;margin-left:20%;color:#8668b7;"><div style="float:left">华杨汇美</div><br/><div style="float:left">后台管理系统</div></div><img src="../../static/img/bigone.png" class="bigOne" alt="smile" /></div>
      <div style="padding:50px 20px 0 20px;float:right;width:60%;" >
        <span class="loginTitle">登陆</span><span class="loginEnglish">THE LOGIN</span>
        <br/><br/>
        <span class="txt">欢迎！</span>
        <br/><br/>
        <span class="txt">用户名：</span><Input v-model="data.account" placeholder="用户名" style="width: 70%;" />
        <br><br>
        <span class="txt">密码：</span><Input v-model="data.password" type="password" placeholder="密码"  style="width: 70%;" />
        <br>
        <div class="notice"><span style="float: left;"><!-- <a href="#/register">注册门店</a> --></span><span style="float: right;"><a href="#/forget">忘记密码</a></span></div>
        <div style="margin: 0 auto;text-align: center;"><Button class="hy_btn" size="large" @click="checkLogin">登录</Button></div>
      </div>
    </div>
  </div>
</template>

<script>
  import {userLogin} from '../../interface'
  export default{
    name: 'login',
    data(){
      return{
        data:{
          account:this.account,
          password:this.password
        }
      }
    },
    created(){},
    methods:{
      checkLogin(){
        if(this.data.account ==''||this.data.password==''){
          this.$Message.warning('请填写用户名，密码');
          return;
        }
        this.$ajax({
          method: 'POST',
          url: userLogin(),
          data: this.data
        }).then( (res) =>{
          if(res.data.msg == '1'){
            this.$Message.error('该用户不存在!');
          }else if(res.data.msg == '2'){
            this.$Message.error('密码不正确!');
          }else{
            this.$Message.success('登陆成功');
            sessionStorage.setItem('authToken',res.data.authToken);
            sessionStorage.setItem('isLogin','1');
            sessionStorage.setItem('isSystem',true);
            sessionStorage.setItem('storeId','');
            sessionStorage.setItem('reData',JSON.stringify(res.data));
            this.$router.push({name: 'main'});
          }
        }).catch( (err) =>{
          console.log(err)
          this.$Message.error('登陆失败，请检查用户名，密码');
        })

      },

    }
  }

</script>

<style scoped>
  .login-body{
    position:absolute;
    height:110%;
    width:100%;
    background-image: url(../../static/img/background.png);
    background-repeat:no-repeat; 
    background-size:cover;
  }
  .login{
    width:50%;
    height:60%;
    /*height: 350px;*/
    margin: 10% auto;
    padding-bottom: 30px;
    /*border: 1px solid  #66368C;*/
    border-radius:6px;
    background-image: url(../../static/img/center.png);
  }
  .bigOne{
    width:100%;
  }
  .loginTitle{
    color:#fff;
    font-size: 20px;
  }
  .loginEnglish{
    color:#fff;
    margin-left:6px;
  }
  .txt{
    display: inline-block;
    width: 25%;
    font-size: 12px;
    line-height: 30px;
    color: #fff;
  }
  .hy_btn{
    background-color: white;
    width:30%;
    float:left;
    margin-left:10px;
    color:#66368c;
  }
  .layout-logo-left{
    float:left;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    height:60%;
    width:40%;
    font-size: 20px;
    padding: 22px 0;
    color: #fff;
    //background-color: #66368C;
    text-align: center;
  }
  .notice{
    font-size: 13px;
    color: #999999;
    padding: 0 40px 0 20px;
    box-sizing: border-box;
    line-height: 30px;
    height: 30px;
    margin: 10px 0;
  }
  a:link {color: #999999}		/* 未访问的链接 */
  a:visited {color: #999999}	/* 已访问的链接 */
  a:hover {color: #999999}	/* 鼠标移动到链接上 */
  a:active {color: #999999}
</style>
