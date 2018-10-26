<template>
  <div class="register">
    <Form ref="formValidate1" :model="currentAccountCash" :rules="ruleValidate" :label-width="100">
    <div class="layout-logo-left">连续十二个月店内现金流水(元)</div>
      <div class="container1">
        <FormItem :label="key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月流水'" v-for='(value, key, index) in currentAccountCash' :prop="'currentAccountCash'+Number(index+1)" class="formItemStyle" :key="key">
          <Input v-model="currentAccountCash[key]" :placeholder="key.split('_')[1]+'年'+key.split('_')[2]+'月'"></Input>
        </FormItem>
      </div>
    </Form>
    <Form ref="formValidate2" :model="currentOperation" :rules="ruleValidate" :label-width="100">  
    <div class="layout-logo-left">连续十二个月店内店内实操(元)</div>
      <div class="container1">
        <FormItem :label="key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月实操'" v-for='(value, key, index) in currentOperation' :prop="'currentOperation'+Number(index+1)" class="formItemStyle" :key="key">
          <Input v-model="currentOperation[key]" :placeholder="key.split('_')[1]+'年'+key.split('_')[2]+'月'"></Input>
        </FormItem>
      </div>
    </Form>
    <Form ref="formValidate3" :model="currentFlow" :rules="ruleValidate" :label-width="100">  
    <div class="layout-logo-left">连续十二个月店内店内客流(人)</div>
      <div class="container1">
        <FormItem :label="key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月客流'" v-for='(value, key, index) in currentFlow' :prop="'currentFlow'+Number(index+1)" class="formItemStyle" :key="key">
          <Input v-model="currentFlow[key]" :placeholder="key.split('_')[1]+'年'+key.split('_')[2]+'月'"></Input>
        </FormItem>
      </div>
    </Form>
      <Form ref="formValidate4" :model="currentProductPerform" :rules="ruleValidate" :label-width="100">  
    <div class="layout-logo-left">连续十二个月店内店内产品业绩(元)</div>
      <div class="container1">
        <FormItem :label="key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月业绩'" v-for='(value, key, index) in currentProductPerform' :prop="'currentProductPerform'+Number(index+1)" class="formItemStyle" :key="key">
          <Input v-model="currentProductPerform[key]" :placeholder="key.split('_')[1]+'年'+key.split('_')[2]+'月'"></Input>
        </FormItem>
      </div>
    </Form>    
<div class="footer">
     <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage('formValidate1', 'formValidate2', 'formValidate3', 'formValidate4')">下一步</Button>
  </div>
  </div>
</template>

<script>
import { extendWaterInfo } from '../../interface';
export default{
  name: 'register_3',
  data(){
    const currentAccountCashRule = (rule, value, callback) => {
      const valueInt = Number(value)
      console.log(!Number.isInteger(valueInt))
      if (!valueInt && value.length === 0) {
        callback(new Error('每个月现金流水不能为空'));
      } else if (!Number.isInteger(valueInt) && value.length !== 0) {
        callback(new Error('现金流水必须为数字'));
       } else {
        callback();
       }
    };

    const currentOperationRule = (rule, value, callback) => {
      const valueInt = Number(value)
      console.log(!Number.isInteger(valueInt))
      if (!valueInt && value.length === 0) {
        callback(new Error('每个月店内实操不能为空'));
      } else if (!Number.isInteger(valueInt) && value.length !== 0) {
        callback(new Error('店内实操必须为数字'));
       } else {
        callback();
       }
    };

    const currentFlowRule = (rule, value, callback) => {
      const valueInt = Number(value)
      console.log(!Number.isInteger(valueInt))
      if (!valueInt && value.length === 0) {
        callback(new Error('每个月店内客流不能为空'));
      } else if (!Number.isInteger(valueInt) && value.length !== 0) {
        callback(new Error('店内客流必须为数字'));
       } else {
        callback();
       }
    };

    const currentProductPerformRule = (rule, value, callback) => {
      const valueInt = Number(value)
      console.log(!Number.isInteger(valueInt))
      if (!valueInt && value.length === 0) {
        callback(new Error('每个月店内产品业绩不能为空'));
      } else if (!Number.isInteger(valueInt) && value.length !== 0) {
        callback(new Error('店内产品业绩必须为数字'));
       } else {
        callback();
       }
    };


    let currentAccountCashObj={}
    let currentOperationObj={}
    let currentFlowObj={}
    let currentProductPerformObj={}
    const caculateMonth = () => {
      let currentMonth =  new Date().getMonth();
      const currentYear = new Date().getFullYear();
      for (let count = 0; count<12; count++){
        let obj1, obj2, obj3, obj4;
        if (currentMonth <= 12 && currentMonth>0) {
          obj1 = JSON.parse(`{"currentAccountCash_${currentYear}_${currentMonth}": ""}`);
          obj2 = JSON.parse(`{"currentOperation_${currentYear}_${currentMonth}": ""}`);
          obj3 = JSON.parse(`{"currentFlow_${currentYear}_${currentMonth}": ""}`);
          obj4 = JSON.parse(`{"currentProductPerform_${currentYear}_${currentMonth}": ""}`);
        }else{
          let currentMonthNew = currentMonth+12;
          let currentYearNew = currentYear-1
          obj1 = JSON.parse(`{"currentAccountCash_${currentYearNew}_${currentMonthNew}": ""}`);
          obj2 = JSON.parse(`{"currentOperation_${currentYearNew}_${currentMonthNew}": ""}`);
          obj3 = JSON.parse(`{"currentFlow_${currentYearNew}_${currentMonthNew}": ""}`);
          obj4 = JSON.parse(`{"currentProductPerform_${currentYearNew}_${currentMonthNew}": ""}`);
        }
        currentMonth--; 
        currentAccountCashObj = Object.assign(currentAccountCashObj, obj1)
        currentOperationObj = Object.assign(currentOperationObj, obj2)
        currentFlowObj = Object.assign(currentFlowObj, obj3)
        currentProductPerformObj = Object.assign(currentProductPerformObj, obj4)
      }
      return {
      'currentAccountCash':currentAccountCashObj,
      'currentOperation': currentOperationObj,
      'currentFlow': currentFlowObj,
      'currentProductPerform': currentProductPerformObj
      }
    }

    //console.log(currentAccountCashObj)
    // let currentAccountCashObj={}
    // let currentAccountCashObj2={}
    // for (let i =new Date().getMonth()+1; i<=new Date().getMonth()+13; i++) {
    //   let obj = JSON.parse(`{"currentAccountCash${i}": ""}`);
    //   let obj2 = JSON.parse(`{"currentAccountCash${i}": ""}`);
    //   obj2[`currentAccountCash${i}`] = [{ "validator": currentAccountCashRule, "trigger": "blur" }]
    //   currentAccountCashObj = Object.assign(currentAccountCashObj, obj)
    //   currentAccountCashObj2 = Object.assign(currentAccountCashObj2, obj2)
    // }

    // let currentOperationObj={}
    // let currentOperationObj2={}
    // for (let i =1; i<=12; i++) {
    //   let obj = JSON.parse(`{"currentOperation${i}": ""}`);
    //   let obj2 = JSON.parse(`{"currentOperation${i}": ""}`);
    //   obj2[`currentOperation${i}`] = [{ "validator": currentOperationRule, "trigger": "blur" }]
    //   currentOperationObj = Object.assign(currentOperationObj, obj)
    //   currentOperationObj2 = Object.assign(currentOperationObj2, obj2)
    // }

    // let currentFlowObj={}
    // let currentFlowObj2={}
    // for (let i =1; i<=12; i++) {
    //   let obj = JSON.parse(`{"currentFlow${i}": ""}`);
    //   let obj2 = JSON.parse(`{"currentFlow${i}": ""}`);
    //   obj2[`currentFlow${i}`] = [{ "validator": currentFlowRule, "trigger": "blur" }]
    //   currentFlowObj = Object.assign(currentFlowObj, obj)
    //   currentFlowObj2 = Object.assign(currentFlowObj2, obj2)
    // }

    // let currentProductPerformObj={}
    // let currentProductPerformObj2={}
    // for (let i =1; i<=12; i++) {
    //   let obj = JSON.parse(`{"currentProductPerform${i}": ""}`);
    //   let obj2 = JSON.parse(`{"currentProductPerform${i}": ""}`);
    //   obj2[`currentProductPerform${i}`] = [{ "validator": currentProductPerformRule, "trigger": "blur" }]
    //   currentProductPerformObj = Object.assign(currentProductPerformObj, obj)
    //   currentProductPerformObj2 = Object.assign(currentProductPerformObj2, obj2)
    // }


    return {
      currentAccountCash: caculateMonth().currentAccountCash,
      currentOperation: caculateMonth().currentOperation,
      currentFlow: caculateMonth().currentFlow,
      currentProductPerform: caculateMonth().currentProductPerform,
      // ruleValidate: Object.assign(currentAccountCashObj2, currentOperationObj2, currentFlowObj2, currentProductPerformObj2 )
    }
  },
  methods:{
    nextPage(name){
    this.modifyKey();
    //   this.$refs[name].validate((valid) => {
    //     if (valid) {
    //         this.$Message.success('Success!');
    //         this.$router.push({name: 'register_4'});
    //         this.$emit('changeActivename','register_4')
    //     } else {
    //         this.$Message.error('无法进入下一步');
    //     }
    // })
    let {keys} = Object;
    const arrObj = [this.currentAccountCash, this.currentOperation, this.currentFlow, this.currentProductPerform]
    const arrObjStr = ['currentAccountCash', 'currentOperation', 'currentFlow', 'currentProductPerform']
    for (let val of arrObj.entries()){
      for (let key of keys(val[1])) {
        if (key.includes(arrObjStr[val[0]])) {
          delete val[1][key]
        }
      }  
    }
    const waterInfos = [Object.assign({type:1},this.currentAccountCash,{storeId:sessionStorage['storeId']}), Object.assign({type:2}, this.currentOperation, {storeId:sessionStorage['storeId']}),  Object.assign({type:3}, this.currentFlow, {storeId:sessionStorage['storeId']}), Object.assign({type:4}, this.currentProductPerform, {storeId:sessionStorage['storeId']})];
    const params = {
      storeId: sessionStorage['storeId'],
      waterInfos: waterInfos
    }
    this.$ajax({
      method: 'POST',
      url: extendWaterInfo(),
      data: {
        storeId: sessionStorage['storeId'],
        waterInfos: waterInfos
      },
      withCredentials: true,
    }).then((res) => {
      console.log(res)
      this.$Message.success('Success!');
      sessionStorage.register_3_info = JSON.stringify(params);
      this.$router.push({name: 'register_4', params: params});
      this.$emit('changeActivename','register_4')
    }).catch((error) =>{
      this.$Message.error({content: '提交失败'});
    })
    },
    priviousPage(){
      this.$router.push({name: 'register_2'});
      this.$emit('changeActivename','register_2')
    },
    modifyKey() {
      const month = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december']
      for (let i =0; i<12; i++) {
        this.currentAccountCash[month[i]] = Object.values(this.currentAccountCash)[i];
        this.currentOperation[month[i]] = Object.values(this.currentOperation)[i];
        this.currentFlow[month[i]] = Object.values(this.currentFlow)[i];
        this.currentProductPerform[month[i]] = Object.values(this.currentProductPerform)[i];
      }
    }
  },
  created() {
    this.$emit('changeActivename','register_3')
  },
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
.footer {
  margin: 30px 0;
}
</style>
