<template>
  <div class="forget">
    <div class="layout-logo-left">忘记密码</div>
      <Form ref="formValidate1" :model="validatePhoneVal" :rules="ruleValidate" :label-width="100" :class='validatePhoneVal.form1'>
      <div class="container1">
        <FormItem label="联系人电话 ：" prop="phoneNumber"  class="formItemStyle" >
          <Input v-model="validatePhoneVal.phoneNumber" placeholder="联系人电话"></Input>
        </FormItem>
        <Button type="ghost" size="small" @click="validatePhone('formValidate1')" :disabled="validatePhoneVal.disabled">{{validatePhoneVal.btntxt}}</Button>
      </div>
      <FormItem label="验证码 ：" prop="validatePhoneNumber"  class="formItemStyle" >
        <Input v-model="validatePhoneVal.validatePhoneNumber" placeholder="验证码" :disabled="validatePhoneVal.disabledValidate"></Input>
      </FormItem>
    </Form>
    <div :class="validatePhoneVal.footer1">
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="submitValidate('formValidate1')" :disabled="validatePhoneVal.disabledBtn">下一步</Button>
    <Button class="hy_return" size="large" @click="returnLogin">返回</Button>
  </div>    
  <Form ref="formValidate2" :model="validatePhoneVal" :rules="ruleValidate" :label-width="100" :class="footer2">
      <div class="container2">
        <FormItem label="新密码 ：" prop="newPassword"  class="formItemStyle" >
          <Input v-model="validatePhoneVal.newPassword" placeholder="请输入新密码" type="password"></Input>
        </FormItem>
      </div>  
    </Form>
<div :class="footer2">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="handleSubmit('formValidate2')">下一步</Button>
    <Button class="hy_return" size="large" @click="returnLogin">返回</Button>
  </div>
  </div>
  </div>
</template>

<script>
  import {checkStorePhone, verifyCode, changePassword, validatePhone} from '../../interface'
  export default{
    name: 'forget',
    data(){
      const validatePhoneNumber = (rule, value, callback) => {
        const myreg=/^[1][3,4,5,7,8][0-9]{9}$/
        if (!value) {
            return callback(new Error('联系人电话不能为空'));
        }
        setTimeout(() => {
            if (!myreg.test(value)) {
                callback(new Error('请输入正确的电话号码格式'));
            } else {
                callback();
            }
        }, 1000);
      };
      return{
        validatePhoneVal: {
          disabled:false,
          disabledValidate: true,
          disabledBtn: true,
          time:0,
          btntxt:"点击获取验证码",
          staffName: '',
          phoneNumber: '',
          validatePhoneNumber: '',
          newPassword: '',
          footer1 : 'footer1Display1',
          form1: 'form1Display1'
        },
        footer2: 'footer2Display1',
        form2: 'form2Display1',
        ruleValidate: {
          phoneNumber: [
            { validator: validatePhoneNumber, trigger: 'blur', required: true }
          ],
          newPassword: [
                { required: true, message: '新密码不能为空', trigger: 'blur' }
          ],
        }
      }
    },
    methods:{
      returnLogin(){
        this.$router.push({name: 'login'});
      },      
      timer() {
        if (this.validatePhoneVal.time > 0) {
             this.validatePhoneVal.time--;
             this.validatePhoneVal.btntxt = this.validatePhoneVal.time+"s后重新获取";
             this.validatePhoneVal.disabledValidate = false;
             this.validatePhoneVal.disabledBtn = false;
             setTimeout(this.timer, 1000);
        } else{
             this.validatePhoneVal.time=0;
             this.validatePhoneVal.btntxt="点击获取验证码";
             this.validatePhoneVal.disabled=false;
        }
      },      
      validatePhone(name){
        this.$refs[name].validate((valid) => {
          if (valid) {
            const f1 = () => {
              return new Promise((resolve, reject)=> {
                this.$ajax({
                  method: 'GET',
                  url: checkStorePhone()+this.validatePhoneVal.phoneNumber,
                  withCredentials: true,
                }).then((res) => {
                  if(res.data.customer){
                    resolve(res.data.customer.id)
                  } else {
                    resolve(null)
                  }
                }).catch((error) =>{
                  reject();
                })
              }); 
            }
            const f2 = (customerId) => {
              return new Promise((resolve, reject)=> {
                if(customerId){
                  this.$ajax({
                     method: 'GET',
                    url: verifyCode()+this.validatePhoneVal.phoneNumber,
                    withCredentials: true,
                  }).then((res) => {
                    if(res.data.msg === 0){
                      this.validatePhoneVal.time=60;
                      this.validatePhoneVal.disabled=true;
                      this.timer();
                      resolve(this.validatePhoneVal.phoneNumber)
                    }
                    if(res.data.msg ===1){
                      this.$Message.error({content: '请勿重复提交', duration: 5});
                    }
                  }).catch((error) =>{
                    this.$Message.error({content: '系统暂时出现错误请刷新', duration: 5});
                  })
                }else {
                  this.$Message.error({content: '联系人电话不存在请注册', duration: 5});
                }
              })
            }
            f1()
            .then((result)=>{
              return f2(result);
            })
          }
        })
      },
      submitValidate(name){
        this.$refs[name].validate((valid) => {
          if(valid){
            this.$ajax({
              method: 'post',
              url: validatePhone(),
              withCredentials: true,
              data: {
                account: this.validatePhoneVal.phoneNumber,
                code: this.validatePhoneVal.validatePhoneNumber,
              }
            }).then((res) => {
              if (res.data.msg === 0) {
              this.validatePhoneVal.footer1 = 'footer1Display2'
              this.validatePhoneVal.form1 = 'form1Display2'
              this.form2 = 'form2Display2'
              this.footer2 = 'form2Display2'
              this.$Message.success({content:'验证码成功', duration: 5});
              } else if (res.data.msg === 1) {
                this.$Message.error({content :'验证码不正确', duration: 5});
                return;
              }
            }).catch((error) =>{
              this.$Message.error({content: '注册失败！', duration: 5});
            })
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          const password  = {account: this.validatePhoneVal.phoneNumber, password: this.validatePhoneVal.newPassword}
            if (valid) {
                this.$ajax({
                  method: 'POST',
                  url: changePassword(),
                  data: password,
                  withCredentials: true,
                }).then((res) =>{
                  if (res.data.msg==0) {
                    this.$Message.success({content:'修改密码成功,请重新登录', duration: 5});
                    this.$router.push({name: 'login'});
                  } else {
                    this.$Message.error({content:'修改密码时失败！ 请重试', duration: 5});
                  }
                }).catch( (error) =>{
                  this.$Message.error({content: '修改密码时失败！', duration: 5});
                })
            } else {
                this.$Message.error({content:'请填完所有信息', duration: 5});
            }
        })
        // this.$emit('changeActivename','register_2')
        // this.$router.push({name: 'register_2', params:{register1Info: this.storeVal}});
      },
    }
  }
</script>

<style>
  .forget{
    position:absolute;
    height:110%;
    width:100%;
    background-image: url(../../static/img/background.png);
    background-repeat:no-repeat; 
    background-size:cover;
    color: white;
    margin: 0 auto;
    text-align: center;
  }
  .formItemStyle {
    width: 350px;
    margin: 0 auto 20px auto;
  }
  .formItemStyle2 {
    width: 350px;
    margin: 0 auto 20px auto;
  }
   .container1 {
    display: flex;
    width: 350px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
  }
  .container1 button{
    margin: 0 -101px 21px auto;
  }
  .layout-logo-left{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #fff;
    /*background-color: #66368C;*/
    text-align: center;
    width: 500px;
    margin: 0 auto;
  }
  .hy_return{
    background-color: #aaa;
    color: #fff;
    margin-left:20px;

  }
  .hy_return:hover {
    border-color: #aaa;
    color: #aaa;
    background-color: #fff;
  }
  .hy_btn{
    background-color: #fff;
    color: #66368c;
  }
  .ivu-btn-small span {
    color: white;
  }
  .ivu-form-item-label {
    color: white !important
  }
  .ivu-btn-ghost[disabled] {
    background:transparent !important
  }
    .container2Display1 {
    display: none
  }
  .container2Display2 {
    display: block;
  }
  .footer2Display1 {
    display: none;
  }
  .footer2Display2 {
    display: block;
  }
  .form1Display1 {
    display: block;
  }
  .form1Display2 {
    display: none;
  }
  .footer1Display1 {
    display: block;
  }
  .footer1Display2 {
    display: none;
  }
</style>
