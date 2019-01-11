<template>
  <div class="sa6">
    <div class="content" v-if="achEnable==true">
      <h3>绩效PK <span class="notice">{{achEnable == true?'已启用':'未启用'}}</span><Button @click="ok" size="small" style="background-color: #66368C;color: #fff;margin-left:10px;">保存</Button><Button @click="deletePerformance" size="small" style="background-color: #66368C;color: #fff;margin-left:10px;">清空</Button></h3>
      <br>
      <div>
        员工缴纳 <InputNumber :min="0" v-model="empPay" max="100000" placeholder="元" style="width: 50px" size="small" /></InputNumber> 元作为绩效基金，<br>
        <div style="margin-top:10px;"><Select :transfer=true style="width:100px;" v-model="perOption">
          <Option value="消耗" >消耗</Option>
          <Option value="实操" >实操</Option>
          <Option value="业绩" >业绩</Option>
          <Option value="客流" >客流</Option>
        </Select> 达到 <InputNumber :min="0" max="100000" placeholder="元" style="width: 50px;" size="small" v-model="achMoney"/></InputNumber> 元返还 <InputNumber :min="0" max="100000" placeholder="元" style="width: 50px" size="small" v-model="retMoney"/></InputNumber> 元，达不到 <InputNumber :min="0" max="100000" placeholder="元" style="width: 50px" size="small" v-model="nAchMoney" /></InputNumber> 元扣掉 <InputNumber :min="0" max="100000" placeholder="元" style="width: 50px" size="small" v-model="dedMoney"/></InputNumber> 元</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {findSalaryByStore,savePerformance,editPerformance,deletePerformance,getPerformance} from '../../interface.js'
  export default{
    name: 'sa6',
    data(){
      return{
          achEnable:'',
          // 员工缴纳 ? 元作为绩效基金
          empPay: "",
          // 单选下拉框, 推荐使用数字
          perOption: "",
          // 达到 ? 元
          achMoney: "",
          // 返还 ? 元
          retMoney: "",
          // 达不到 ? 元
          nAchMoney: "",
          // k扣掉 ? 元
          dedMoney: ""
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: getPerformance() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.empPay = res.data.performanceInfo[0].empPay;
          this.perOption = res.data.performanceInfo[0].perOption;
          this.achMoney = res.data.performanceInfo[0].achMoney;
          this.retMoney = res.data.performanceInfo[0].retMoney;
          this.nAchMoney = res.data.performanceInfo[0].nAchMoney;
          this.dedMoney = res.data.performanceInfo[0].dedMoney;
          console.log(this.perOption);
        }).catch( (error) =>{
          console.log(error);
        })
      },
      getList(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.achEnable = this.transferBack(res.data.salaryMangeInfo.achEnable);
        }).catch( (error) =>{
          console.log(error);
        })
      },
      ok(){
        var performance = {
            // 门店的 id             
            storeId: this.$route.params.id,
            // 员工缴纳 ? 元作为绩效基金
            empPay: this.empPay,
            // 单选下拉框, 推荐使用数字
            perOption: this.perOption,
            // 达到 ? 元
            achMoney: this.achMoney,
            // 返还 ? 元
            retMoney: this.retMoney,
            // 达不到 ? 元
            nAchMoney: this.nAchMoney,
            // k扣掉 ? 元
            dedMoney: this.dedMoney
          }
        console.log(JSON.parse(JSON.stringify(this.performance)));
        let URL = savePerformance();
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: performance,
            url: URL,
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getList();
            this.getData();
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
      },
      deletePerformance(){
        this.$ajax({
          method: 'get',
          url: deletePerformance()+'/'+this.$route.params.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getList();
          this.getData();
          this.empPay = "";
          // 单选下拉框, 推荐使用数字
          this.perOption = "";
          // 达到 ? 元
          this.achMoney = "";
          // 返还 ? 元
          this.retMoney = "";
          // 达不到 ? 元
          this.nAchMoney = "";
          // k扣掉 ? 元
          this.dedMoney = "";
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      transfer(b){
        if(b == true){
          return 1;
        }else{
          return 0;
        }
      },
      transferBack(c){
        if(c == 1){
          return true;
        }else{
          return false;
        }
      },
    },
    created(){
      this.getList();
      this.getData();
    }
  }
</script>
<style scoped></style>
