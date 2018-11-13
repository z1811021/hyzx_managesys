<template>
  <div class="register">
    <div class="layout-logo-left">注册门店</div>
    <Form ref="formValidate1" :model="validatePhoneVal" :rules="ruleValidate" :label-width="100" :class='validatePhoneVal.form1'>
      <FormItem label="联系人：" prop="staffName"  class="formItemStyle" >
            <Input v-model="validatePhoneVal.staffName" placeholder="联系人"></Input>
      </FormItem>
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
    <Form ref="formValidate2" :model="storeVal" :rules="ruleValidate" :label-width="100" :class="footer2">
      <div class="container2">
        <FormItem label="门店品牌 ：" prop="storeName"  class="formItemStyle2" >
              <Input v-model="storeVal.storeName" placeholder="门店品牌"></Input>
              <Select v-model="storeVal.franchType" style="width:150px" placeholder="类型">
                <Option value="1">直营</Option>
                <Option value="2">加盟</Option>
                <Option value="3">总部</Option>
              </Select>
        </FormItem>
        <FormItem label="门店省份 ：" prop="provinceId"  class="formItemStyle2" >
          <Select v-model="storeVal.provinceId" style="width:150px" placeholder="门店所在省" @on-change="getCities(storeVal.provinceId)">
            <Option :value="item.id" :key="item.id" v-for="item in provincesData">{{item.provinceName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="门店城市 ：" prop="cityId"  class="formItemStyle2" >
          <Select v-model="storeVal.cityId" style="width:150px" placeholder="门店所在市">
            <Option :value="item.id" :key="item.id" v-for="item in citiesData">{{item.cityName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="门店地址 ：" prop="address"  class="formItemStyle" >
              <Input v-model="storeVal.address" placeholder="门店地址"></Input>
        </FormItem>
        <FormItem label="门店电话 ：" prop="telephone"  class="formItemStyle" >
              <Input v-model="storeVal.telephone" placeholder="xxx-xxxxxxxx"></Input>
        </FormItem>
        <FormItem label="门店类型 ：" prop="storeType"  class="formItemStyle2" >
          <Select v-model="storeVal.storeType" style="width:150px" placeholder="门店类型">
            <Option value="1">美容院</Option>
            <Option value="2">皮肤管理</Option>
            <Option value="3">SPA会所</Option>
            <Option value="4">养发</Option>
            <Option value="5">理疗</Option>
            <Option value="6">产后修复</Option>
            <Option value="7">减肥馆</Option>
            <Option value="8">祛痘馆</Option>
            <Option value="9">整骨小颜</Option>
          </Select>
        </FormItem>
        <FormItem label="经营业态 ：" prop="operationMode"  class="formItemStyle2" >
          <Select v-model="storeVal.operationMode" style="width:150px" placeholder="经营业态">
            <Option value="1">单店</Option>
            <Option value="2">连锁</Option>
          </Select>
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
</template>

<script>
  import { getProvinces,getCities ,userRegister, checkStorePhone, validatePhone, checkRegisterStatus, verifyCode} from '../../interface';
  export default{
    name: 'register_1',
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
    const validateTelephone = (rule, value, callback) => {
        const myreg=/0\d{2}-\d{7,8}/
        const myreg2=/^[1][3,4,5,7,8][0-9]{9}$/
        setTimeout(() => {
            if (!myreg.test(value) && value) {
                callback(new Error('请输入正确的座机号码格式 例如xxx-xxxxxxxx'));
            } else if (!myreg2.test(value) && value) {
               callback(new Error('请输入正确的手机号码格式'));
            }
            else {
                callback();
            }
        }, 1000);
    };
      return{
        storeVal: {
          franchType: '',
          storeName: '',
          telephone: '',
          operationMode: '',
          storeType: '',
          managementCycle: '1',
          address: '',
          storeStatus: '0',
          provinceId:'',
          cityId:'',
          storeDesc: '',
        },
        validatePhoneVal: {
          disabled:false,
          disabledValidate: true,
          disabledBtn: true,
          time:0,
          btntxt:"点击获取验证码",
          staffName: '',
          phoneNumber: '',
          validatePhoneNumber: '',
          footer1 : 'footer1Display1',
          form1: 'form1Display1'
        },
        footer2: 'footer2Display1',
        form2: 'form2Display1',
        provincesData:[],
        citiesData:[],
        successTag:'',
        registerBefore: false,
        registItem: '',
        registStoreid: '',
        ruleValidate: {
            staffName: [
                { required: true, message: '联系人不能为空', trigger: 'blur' }
            ],
            phoneNumber: [
                { validator: validatePhoneNumber, trigger: 'blur', required: true }
            ],
            franchType: [
                { required: true, message: '门店名称不能为空', trigger: 'blur' }
            ],
            provinceId: [
                { required: true, message: '省份不能为空', trigger: 'change', type: "number" }
            ],
            cityId: [
                { required: true, message: '城市不能为空', trigger: 'change', type: "number" }
            ],
            address: [
                { required: true, message: '地址不能为空', trigger: 'blur' }
            ],
            telephone: [
                { validator: validateTelephone, trigger: 'blur' }
            ],
            storeType: [
                { required: true, message: '门店类型不能为空', trigger: 'change' }
            ],
            operationMode: [
                { required: true, message: '经营方式不能为空', trigger: 'change' }
            ],
            storeName: [
             { required: true, message: '类型不能为空', trigger: 'change' }
            ]
          }
        }
      },
    created(){
      this.getProvinces();
      this.$emit('changeActivename','register_1')
    },
    methods:{
      returnLogin(){
        this.$router.push({name: 'login'});
      },
      getProvinces(){
        this.$ajax({
          method: 'GET',
          url: getProvinces(),
          withCredentials: true,
        }).then( (res) =>{
          this.provincesData = res.data.provinces;
        })
      },
      getCities(id){
        console.log(id)
        this.$ajax({
          method: 'GET',
          url: getCities()+id,
        }).then( (res) =>{
          this.citiesData = res.data.cities;
        })
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
                  // if (res.data.msg === 0) {
                  //     this.$Message.success({content: '联系人电话可以注册', duration: 3});
                  // } else if (res.data.msg === 1) {
                  //   this.$Message.error({content: '联系人电话已被注册！', duration: 3});
                  //   return;
                  // } else {
                  //   this.$Message.error({content: '请求验证码失败', duration: 3});
                  //   return;
                  // }
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
                    url: checkRegisterStatus()+customerId,
                    withCredentials: true,
                  }).then((res) => {
                    console.log(res)
                    if(res.data.registItem === 0){
                      this.$Message.error({content: '联系人电话已被注册！', duration: 3});
                    } else {
                      this.$Modal.confirm({
                        title: '注册',
                        content: '<p>我们检测到您有一些信息没有填完，点击下一步我们将发送验证码</p>',
                        okText: '下一步',
                        cancelText: '返回',
                        onOk: () => {
                          this.registItem = res.data.registItem;
                          this.registStoreid = res.data.storeId;
                          sessionStorage['storeId'] = res.data.storeId
                          this.registerBefore = true;
                          this.validatePhoneVal.time=60;
                          this.validatePhoneVal.disabled=true;
                          this.timer();
                          resolve(this.validatePhoneVal.phoneNumber)
                        },
                        onCancel: () => {
                            this.$router.push({name: 'register'});
                        }
                      });
                    }
                  }).catch((error) =>{
                    this.$Message.error({content: '注册失败！', duration: 3});
                  })
                }else {
                  this.$Message.success({content: '联系人电话可以注册', duration: 3});
                  this.validatePhoneVal.time=60;
                  this.validatePhoneVal.disabled=true;
                  this.timer();
                  resolve(this.validatePhoneVal.phoneNumber)
                }
              })
            }
            const f3 = (phone) => {
              return new Promise((resolve, reject)=>{
                this.$ajax({
                  method: 'GET',
                  url: verifyCode()+phone,
                  withCredentials: true,
                }).then((res) => {
                  console.log(res)
                  if(res.data.msg === 0){
                    resolve(this.validatePhoneVal.phoneNumber)
                  } else {
                    this.$Message.error({content: '我们检测到短信发送有问题，我们研发人员正在加速处理，请稍后', duration: 3});
                  }
                }).catch((error) =>{
                  this.$Message.error({content: '注册失败！', duration: 3});
                })
              })
            }
            f1()
            .then((result)=>{
              return f2(result);
            })
            .then((result)=>{
              return f3(result);
            })
          }
        })
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
              if (res.data.msg === 0 && !this.registerBefore) {
              this.validatePhoneVal.footer1 = 'footer1Display2'
              this.validatePhoneVal.form1 = 'form1Display2'
              this.form2 = 'form2Display2'
              this.footer2 = 'form2Display2'
              this.$Message.success({content:'验证码成功', duration: 3});
              } else if (res.data.msg === 1) {
                this.$Message.error({content :'验证码不正确', duration: 3});
                return;
              } else if (this.registerBefore && res.data.msg === 0){
                  this.$Message.info('进行下一步填写');
                  this.$router.push({name: this.registItem, params:{storeid:this.registStoreid}});
                  this.$emit('changeActivename',this.registItem)
                  return;
              }
            }).catch((error) =>{
              this.$Message.error({content: '注册失败！', duration: 3});
            })
          }
        })
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          const customer  = {account: this.validatePhoneVal.phoneNumber, name: this.validatePhoneVal.staffName, role: '1'}
          const store = this.storeVal
            if (valid) {
              console.log(customer, store)
                //this.$Message.success('Success!');
                // this.$ajax({
                //   method:'GET',
                //   url:checkStorePhone()+'?phoneNumber='+this.storeVal.phoneNumber
                // }).then( (res)=>{
                //   console.log(res)
                //   this.successTag = res.success;
                // }).catch( (err)=>{
                // })
                // if(this.successTag){
                //   this.$Message.error('联系人电话已被注册！');
                //   return;
                // }
                this.$ajax({
                  method: 'POST',
                  url: userRegister(),
                  data: {customer: customer, store: store},
                  withCredentials: true,
                }).then((res) =>{
                  sessionStorage['storeId'] = res.data.storeId
                  this.$Modal.confirm({
                    title: '注册',
                    content: '<p>恭喜您注册成功，如果想填写详细信息请点击下一步，退回到登录页面点击返回</p>',
                    okText: '下一步',
                    cancelText: '返回',
                    onOk: () => {
                        this.$Message.info('进行下一步填写');
                        this.$router.push({name: 'register_2', params:{loginInfo: this.storeVal}});
                        this.$emit('changeActivename','register_2')
                    },
                    onCancel: () => {
                        this.$router.push({name: 'login'});
                    }
                  });
                }).catch( (error) =>{
                  this.$Message.error({content: '注册失败！', duration: 3});
                })
            } else {
                this.$Message.error({content:'无法进入下一步', duration: 3});
            }
        })
        // this.$emit('changeActivename','register_2')
        // this.$router.push({name: 'register_2', params:{register1Info: this.storeVal}});
      },
      search(){
        this.$router.push({name: 'registerResult'});
      }
    }
  }  
</script>

<style scoped>
  .register{
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .layout-logo-left{
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #66368C;
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
  .formItemStyle2 div{
    margin: 0 0 10px 0;
  }
  .ivu-select {
    display: block;
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
