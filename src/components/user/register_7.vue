<template>
  <div class="register">
    <div class="layout-logo-left">顾客流量</div>
    <div class="container1">
    <Form ref="formValidate" :model="clientCount" :rules="ruleValidate" :label-width="200">
       <FormItem label="店内注册顾客数量：" prop="rcCount"  class="formItemStyle" >
            <Input v-model="clientCount.rcCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="两个月至少到店一次的顾客数量：" prop="tmoCount"  class="formItemStyle" >
            <Input v-model="clientCount.tmoCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="一个月至少到店一次的顾客数量：" prop="omoCount"  class="formItemStyle" >
            <Input v-model="clientCount.omoCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="一个月至少到店两次的顾客数量：" prop="omtCount"  class="formItemStyle" >
            <Input v-model="clientCount.omtCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="一个月至少到店三次的顾客数量：" prop="omthCount"  class="formItemStyle" >
            <Input v-model="clientCount.omthCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="一个月到店三次以上的顾客数量：" prop="omfCount"  class="formItemStyle" >
            <Input v-model="clientCount.omfCount" placeholder="人数"></Input>
      </FormItem>
      <FormItem label="每个月的月均业绩：" prop="avgMonPerformance"  class="formItemStyle" >
            <Input v-model="clientCount.avgMonPerformance" placeholder="业绩/人数"></Input>
      </FormItem>
      <FormItem label="月均新顾客成交业绩：" prop="monNcliPerformance"  class="formItemStyle" >
            <Input v-model="clientCount.monNcliPerformance" placeholder="业绩/人数"></Input>
      </FormItem>
      <FormItem label="月均老顾客成交业绩：" prop="monOcliPerformance"  class="formItemStyle" >
            <Input v-model="clientCount.monOcliPerformance" placeholder="业绩/人数"></Input>
      </FormItem>
   </Form>
 </div>
<div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
     <!-- <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button> -->
    <Button class="hy_btn" style="margin-left:20px;" size="large"  @click="nextPage('formValidate')">下一步</Button>
  </div>
  </div>
</template>

<script>
  import { extendClientInfo } from '../../interface';
  export default{
    name: 'register_7',
    data(){
      const valueEqualNumber = (rule, value, callback) => {
        const valueInt = Number(value)
        if (!Number.isInteger(valueInt) && value.length !== 0) {
          callback(new Error('所填必须为数字'));
          } else {
            callback();
          }
      };
      return {
        clientCount: {
          rcCount: '',
          tmoCount: '',
          omoCount: '',
          omtCount: '',
          omthCount: '',
          omfCount: '',
          avgMonPerformance: '',
          monNcliPerformance: '',
          monOcliPerformance: '',
          storeId:sessionStorage['storeId']
        },
        ruleValidate: {
          rcCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          tmoCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          omoCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          omtCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          omthCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          omfCount: [{ validator: valueEqualNumber, trigger: 'blur' }],
          avgMonPerformance: [{ validator: valueEqualNumber, trigger: 'blur' }],
          monOcliPerformance: [{ validator: valueEqualNumber, trigger: 'blur' }],
          monNcliPerformance: [{ validator: valueEqualNumber, trigger: 'blur' }],
        }
      }
    },
    methods:{
      nextPage(name){
        const params = {
          storeId: sessionStorage['storeId'],
          client: this.clientCount
        }
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.$ajax({
                method: 'POST',
                url: extendClientInfo(),
                data: params,
                withCredentials: true,
              }).then((res) => {
                console.log(res)
                this.$Message.success('Success!');
                this.$router.push({name: 'register_8', params: params});
                this.$emit('changeActivename','register_8')
              }).catch((error) =>{
                this.$Message.error({content: '提交失败'});
              })
            } else {
                this.$Message.error('无法进入下一步');
            }
        })
      },
	priviousPage(){
	  this.$router.push({name: 'register_6'});
    this.$emit('changeActivename','register_6')
	},
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
.footer{
    margin: 30px 0;
}
 .container1 {
    display: flex;
    width: 350px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
  }
</style>
