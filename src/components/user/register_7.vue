<template>
  <div class="register">
    <div class="layout-logo-left">顾客流量</div>
    <div>店内注册顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     两个月至少到店一次的顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     一个月至少到店一次的顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     一个月至少到店两次的顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     一个月至少到店三次的顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     一个月到店三次以上的顾客数量：<Input  placeholder="人数" style="width: 85px"/>
    <br/>
    <br/>
     每个月的月均业绩：<Input  placeholder="业绩/人数" style="width: 85px"/>
    <br/>
    <br/>
     月均新顾客成交业绩：<Input  placeholder="业绩/人数" style="width: 85px"/>
    <br/>
    <br/>
     月均老顾客成交业绩：<Input  placeholder="业绩/人数" style="width: 85px"/>
    <br/>
    <br/>
</div>
<div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
     <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large">提交</Button>
  </div>
  </div>
</template>

<script>
  export default{
    name: 'register_7',
    methods:{
	priviousPage(){
	  this.$router.push({name: 'register_6'});
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
</style>
