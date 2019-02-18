<template>
  <div class="register">
    <div class="layout-logo-left">薪资制度</div>
<div class="ivu-input-wrapper ivu-input-type" style="width: 60%;"><textarea autocomplete="off" spellcheck="false" placeholder="薪资制度" rows="2" class="ivu-input" style="height: 130px;" wrap="soft" v-model="desc"></textarea></div>
    <Form :model="currentSalary" :label-width="100">  
    <div class="layout-logo-left">员工连续十二个月薪资(元)</div>
      <div class="container1">
        <FormItem :label="key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月薪资'" v-for='(value, index) in currentSalary' class="formItemStyle" :key="index">
          <Input v-model="currentSalary[key]" :placeholder="key.split('_')[1]+'年'+key.split('_')[2]+'月'"></Input>
        </FormItem>
      </div>
    </Form>
<div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
     <!-- <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button> -->
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage">下一步</Button>
  </div>
  </div>
</template>

<script>
  import { extendSalaryInfo } from '../../interface';
  export default{
    name: 'register_5',
    data() {
      let currentSalaryObj={}
      const caculateMonth = () => {
        let currentMonth =  new Date().getMonth()+1;
        const currentYear = new Date().getFullYear();
        for (let count = 0; count<12; count++){
          let obj1;
          if (currentMonth <= 12 && currentMonth>0) {
            obj1 = JSON.parse(`{"currentSalary_${currentYear}_${currentMonth}": ""}`);
          }else{
            let currentMonthNew = currentMonth+12;
            let currentYearNew = currentYear-1
            obj1 = JSON.parse(`{"currentSalary_${currentYearNew}_${currentMonthNew}": ""}`);
          }
          currentMonth--; 
          currentSalaryObj = Object.assign(currentSalaryObj, obj1)
        }
        return {
        'currentSalary':currentSalaryObj,
        }
      }
      return {
        currentSalary: caculateMonth().currentSalary,
        desc: ''
      }
    },
    methods:{
    nextPage(){
	  // this.$router.push({name: 'register_6'});
    this.modifyKey()
    let {keys} = Object;
      for (let key of keys(this.currentSalary)) {
        if (key.includes('currentSalary')) {
          delete this.currentSalary[key]
        }
      }
    const params =  {
      storeId: sessionStorage['storeId'],
      salary: Object.assign({desc: this.desc}, this.currentSalary, {storeId: sessionStorage['storeId']}),
    } 
    this.$ajax({
      method: 'post',
      url: extendSalaryInfo(),
      data: params,
      withCredentials: true,
    }).then((res) => {
      console.log(res)
      this.$Message.success({content:'提交成功'});
      this.$router.push({name: 'register_6', params: params});
      this.$emit('changeActivename','register_6')
    }).catch((error) =>{
      this.$Message.error({content: '提交失败'});
    })
	},
	priviousPage(){
	  this.$router.push({name: 'register_4', params: params});
	},
  modifyKey() {
    const currentMonth =  new Date().getMonth()+1;
    const currentYear = new Date().getFullYear();
    const month = ['month_1', 'month_2', 'month_3', 'month_4', 'month_5', 'month_6', 'month_7', 'month_8', 'month_9', 'month_10', 'month_11', 'month_12']
    for (let i =0; i<12; i++) {
      this.currentSalary[month[i]] = Object.values(this.currentSalary)[i];
    }
     this.currentSalary['curMonth'] = `${currentYear}-${currentMonth}`;
  }
    },
    created() {
      console.log(this.currentSalary)
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
  flex-wrap: wrap;
}
.formItemStyle {
  width: 260px;
  margin: 0 auto 20px auto;
}
.formItemStyle2 {
  width: 260px;
  margin: 0 auto 20px auto;
}
</style>
