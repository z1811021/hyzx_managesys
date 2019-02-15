<template>
  <div class="login-body">
    <div class="login" @keyup.enter="checkLogin()">
      <div class="layout-logo-left"><div style="margin-top:10%;margin-left:20%;color:#8668b7;"><div style="float:left">华杨汇美</div><br/><div style="float:left">门店管理系统</div></div><img src="../../static/img/bigone.png" class="bigOne" alt="smile" /></div>
      <div style="padding:50px 20px 0 20px;float:right;width:60%;" >
        <span class="loginTitle">登陆</span><span class="loginEnglish">THE LOGIN</span>
        <br/><br/>
        <span class="txt">欢迎！</span>
        <br/><br/>
        <span class="txt">用户名：</span><Input v-model="userName" placeholder="用户名" style="width: 70%;" />
        <br><br>
        <span class="txt">密码：</span><Input v-model="password" type="password" placeholder="密码"  style="width: 70%;" />
        <br><br>
        <div v-if="showValid">
        <span class="txt">验证码 ：</span><Input v-model="validCode"  placeholder="请输入验证码"  style="width: 70%;" />
        </div>
        <br>
        <div class="notice"><span style="float: left;"><!-- <a href="#/register">注册门店</a> --></span><span style="float: right;"><a href="#/forget">忘记密码</a></span></div>
        <div style="margin: 0 auto;text-align: center;"><Button class="hy_btn" size="large" @click="checkLogin">登录</Button></div>
      </div>
    </div>
    <Modal v-model="userEditPassword" title="临时用户修改密码" :mask-closable="false">
    <div style="padding-left: 20px;">
    <Form ref="formValidate1" :model="editPassword" :rules="ruleValidate" :label-width="100">
      <FormItem label="手机号 :" class="formItemStyle" >
            <Input v-model="userName" disabled ></Input>
      </FormItem>
      <FormItem label="用户名：" prop="userName"  class="formItemStyle" >
            <Input v-model="editPassword.userName" placeholder="用户名"></Input>
      </FormItem>
      <FormItem label="密码：" prop="password"  class="formItemStyle" >
            <Input type="password" v-model="editPassword.password" placeholder="密码"></Input>
      </FormItem>
      <FormItem label="重复密码 ：" prop="passwordRepeat"  class="formItemStyle" >
            <Input type="password" v-model="editPassword.passwordRepeat" placeholder="再输入密码"></Input>
      </FormItem>
    </Form>
    </div>
    <div slot="footer">
      <Button size="large"  @click="userEditPassword=false">取消</Button>
      <Button type="primary" style="margin-left:20px;" size="large" @click="submitEditPassword('formValidate1')" >确认</Button>
    </div>
    </Modal> 
  </div>
</template>

<script>
  import {userLogin, checkRegisterStatus, checkStoreUserName, edit, verifyCode, validatePhone, changeIp} from '../../interface'
  export default{
    name: 'login',
    data(){
      const validateUserName = (rule, value, callback) => {
        // check the user name validation first
        const f1 = () => {
          return new Promise((resolve, reject)=> {
            for(i=0;i<value.length;i++){
              let c = value.substr(i,1);
              let ts = escape(c);
              if(ts.substring(0,2) == "%u"){
                callback(new Error('不能输入中文/全角字符'));
              }
            }
            if (value.length < 6 ){
              callback(new Error('用户名长度必须大于6'));
            }
            resolve('pass')
            }); 
        }
        //check the user name unique or not second
        const f2 = () =>{
          return new Promise((resolve, reject)=> {
            this.$ajax({
              method: 'GET',
              url: checkStoreUserName()+this.editPassword.userName,
              withCredentials: true,
            }).then((res) => {
              // if don't have the will pass
              if(res.data.customer){
                callback(new Error('当前用户名已经存在'));
              } else {
                resolve(null)
              }
            }).catch((error) =>{
              reject();
            })
          });   
        }
        f1()
        .then((result)=>{
          return f2();
        }).then((result)=>{
          callback();
        })
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请输入密码'));
        } else if (value.length < 6 ){
          callback(new Error('密码长度必须大于6'));
        }else {
            if (this.editPassword.passwordRepeat !== '') {
                // 对第二个密码框单独验证
                this.$refs.formValidate1.validateField('passwordRepeat');
            }
            callback();
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('请再次输入密码'));
        } else if (value !== this.editPassword.password) {
            callback(new Error('两次输入的密码不一致'));
        } else {
            callback();
        }
      };
      return{
        userName:'',
        password:'',
        userEditPassword: false,
        editPassword: {
          userName: '',
          password: '',
          passwordRepeat: ''
        },
        showValid: false,
        validCode: '',
        phoneNum: '',
        customerId: '',
        ruleValidate: {
          userName: [
             { validator: validateUserName, trigger: 'blur', required: true }
          ],
          password: [
            { validator: validatePass, trigger: 'blur', required: true }
          ],
          passwordRepeat: [
            { validator: validatePassCheck, trigger: 'blur', required: true }
          ],
        }
      }
    },
    created(){},
    methods:{
      checkLogin(){
        // if no need input valid code
        if (!this.showValid){
          this.validateUser()
          .then(([result1, result2])=>{
            if (result2 === 'pass'){
              return this.validateRegistered(result1);
            } else if (result2 === 4) {
              return this.casualUserEdit(this.userName)
            }
          }) 
        } else {
          this.verifyCode()
          .then(([msg, id])=>{
            console.log(msg, id)
            return this.changeIp(msg, id)
          })
        }
      },
      // validate username and password
      validateUser(){
        return new Promise((resolve, reject) => {
          if(this.userName ==''||this.password==''){
            this.$Message.warning('请填写用户名，密码');
            return;
          }
          var data = {
            userName: this.userName,
            password: this.password
          };
          this.$ajax({
            method: 'POST',
            url: userLogin(),
            data: data
          }).then( (res) =>{
            if(res.data.msg == '1'){
              this.$Message.error('该用户不存在!');
            }else if(res.data.msg == '2'){
              this.$Message.error('密码不正确!');
            }else if(res.data.msg == '3'){
              this.$Message.error('登录权限被锁');
            }else if(res.data.msg == '4'){
              resolve([null, 4])
            }else if(res.data.msg == '5'){
              this.showValid = true;
              this.$Message.info('检测到跟上次登陆的ip地址不同需要进行安全验证');
              this.$Message.info('已发送验证码到您手机请查看, 并再次登录');
              this.validateCode(res.data.customer.account, res.data.customer.id)
            }else{
              resolve([res.data.customer.id, 'pass'])
            }
          }).catch( (err) =>{
            console.log(err)
            this.$Message.error('登陆失败，请检查用户名，密码');
          })
        })  
      },
      // check the user registered done or not
      validateRegistered(id){
        // if id equals 0 means registered done then push to main page
        this.$ajax({
          method: 'GET',
          url: checkRegisterStatus()+id,
          withCredentials: true,
        }).then((res)=>{
          if(res.data.registItem === 0) {
            this.$Message.success('登陆成功');
            sessionStorage.setItem('authToken',res.data.authToken);
            sessionStorage.setItem('isLogin','1');
            sessionStorage.setItem('isSystem',true);
            sessionStorage.setItem('storeId','');
            sessionStorage.setItem('reData',JSON.stringify(res.data));
            this.$router.push({name: 'main'});
          } else {
            // if don't equals 0 will push to the latest registered page
            this.$Modal.confirm({
              title: '注册',
              content: '<p>我们检测到您有一些信息没有填完，点击下一步我们将继续填写</p>',
              okText: '下一步',
              cancelText: '返回',
              onOk: () => {
                this.$router.push({name: res.data.registItem});
              },
              onCancel: () => {
                this.$router.push({name: 'login'});
              }
            });
          }
        })
      },
      // casual user need re-input their password
      casualUserEdit(userName){
        this.$Message.info('检测到你为临时用户需要修改密码');
        this.userEditPassword = true;
      },
      submitEditPassword(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$ajax({
              method: 'POST',
              url: edit(),
              data: {
                account: this.userName,
                userName: this.editPassword.userName,
                password: this.editPassword.password
              }
            }).then((res)=>{
              console.log(res.data)
              if (res.data.msg == '0') {
                this.userEditPassword = false;
                this.$Notice.success({
                    title: '修改成功',
                    desc: '您已经修改临时密码成功，请重新登录'
                });
                this.editPassword.userName ='';
                this.editPassword.password ='';
                this.editPassword.passwordRepeat ='';
                this.userName = '';
                this.password = '';
              } else {
                this.$Notice.error({
                    title: '修改失败',
                    desc: '请稍后再次尝试'
                });
                his.userEditPassword = false;
                this.editPassword.userName ='';
                this.editPassword.password ='';
                this.editPassword.passwordRepeat ='';
                this.userName = '';
                this.password = '';
              }
            })
          }
        })
      },
      // get validate code number
      validateCode(phone, id){
        this.$ajax({
          method: 'GET',
          url: verifyCode()+phone,
          withCredentials: true,
        }).then((res) => {
          console.log(res)
          if(res.data.msg === 0){
            this.phoneNum = phone,
            this.customerId = id;
          } else {
            this.$Message.error({content: '我们检测到短信发送有问题，我们研发人员正在加速处理，请稍后', duration: 3});
          }
        }).catch((error) =>{
          this.$Message.error({content: '注册失败！', duration: 3});
        })
      },
      // verify validate code
      verifyCode(){
        return new Promise((resolve, reject) => {
          this.$ajax({
            method: 'post',
            url: validatePhone(),
            withCredentials: true,
            data: {
              account: this.phoneNum,
              code: this.validCode,
            }
          }).then((res)=>{
            console.log(res)
            if(res.data.msg === 0){
              console.log(1)
              resolve(['pass', this.customerId])
            }
            else if (res.data.msg === 1) {
              this.$Message.error({content :'验证码不正确', duration: 3});
              return;
            }
          })
        })    
      },
      // change ip
      changeIp(msg, id){
        return new Promise((resolve, reject) => {
          if(msg === 'pass'){
            this.$ajax({
              method: 'post',
              url: changeIp(),
              withCredentials: true,
              data: {
                customerId: id,
                validResult: 0,
              }
            }).then((res)=>{
              if(res.data.msg === 0){
                this.$Notice.success({
                  title: '验证成功',
                  desc: '您已经验证成功，请重新登录'
                });
                this.editPassword.userName ='';
                this.editPassword.password ='';
                this.editPassword.passwordRepeat ='';
                this.userName = '';
                this.password = '';
                this.userEditPassword = true;
                this.validCode = '';
                resolve('suc')
              } else {
                this.$Notice.error({
                  title: '验证失败',
                  desc: '请稍后再次尝试'
                });
                this.editPassword.userName ='';
                this.editPassword.password ='';
                this.editPassword.passwordRepeat ='';
                this.userName = '';
                this.password = '';
                this.userEditPassword = true;
                this.validCode = '';
              }
            })
          }
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
    /*background-color: #66368C;*/
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
  .formItemStyle {
    width: 350px;
    margin: 0 auto 20px auto;
  }
  .ivu-modal-footer {
    display: none
  }
  a:link {color: #999999}		/* 未访问的链接 */
  a:visited {color: #999999}	/* 已访问的链接 */
  a:hover {color: #999999}	/* 鼠标移动到链接上 */
  a:active {color: #999999}
</style>
