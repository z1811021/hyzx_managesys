<template>
  <div class="register">
    <div class="layout-logo-left">目前经营最大问题</div>
    <div class="ivu-input-wrapper ivu-input-type" style="width: 70%;"><textarea autocomplete="off" spellcheck="false" placeholder="目前自己认为经营的最大问题是什么？" rows="2" class="ivu-input" style="height: 230px;" wrap="soft" v-model="problem"></textarea></div>
    <div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
     <!-- <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button> -->
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage">下一步</Button>
  </div>
  </div>
</template>

<script>
  import { extendProblemInfo } from '../../interface';
  export default{
    name: 'register_8',
    data() {
      return {
        problem: ''
      }
    },
    methods:{
      nextPage(){
        // this.$router.push({name: 'register_6'});
        const params = {
          storeId: sessionStorage['storeId'],
          problem: Object.assign({desc: this.problem}, {storeId: sessionStorage['storeId']}),
        }
        this.$ajax({
          method: 'post',
          url: extendProblemInfo(),
          data: params,
          withCredentials: true,
        }).then((res) => {
          this.$Message.success({content:'提交成功'});
          this.$router.push({name: 'registerInfo', params: params});
        }).catch((error) =>{
          this.$Message.error({content: '提交失败'});
        })
      },
      priviousPage(){
        this.$router.push({name: 'register_7'});
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
