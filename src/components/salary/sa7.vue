<template>
  <div style="margin-left:5px;">
    <div class="content">
      <br>
      <h3>投诉罚金 <span class="notice">{{data.forfeitComplaint==true ? '已启用':'未启用'}}</span>
      </h3>
      <span v-if="data.forfeitComplaint==true">
        金额：<Input v-model="forfeitComplaintAmount" placeholder="投诉罚金  元" size="small" class="Input"/>
      <Button class="btn" size="small" type="success" @click="saveforfeitComplaint">保存</Button>
      </span>
    </div>

    <div class="content">
      <br>
      <h3>迟到早退罚金<span class="notice">{{data.forfeitLate==true ? '已启用':'未启用'}}</span>
        <span v-if="data.forfeitLate==true"><Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="AddleaveEarlyFines">新增</Button></span>
      </h3>
      <div v-if="data.forfeitLate==true">
        <div v-for="item in leaveEarlyFiness" style="margin: 10px 0;">
          时间(min)：<Input v-model="item.lateTime" placeholder="迟到早退时间 min" size="small"  class="Input"/>
          金额：<Input v-model="item.lateMoney" placeholder="迟到早退罚金" size="small"  class="Input"/>
          <Button class="btn" size="small" type="success" @click="editlateforfeit(item.id,item.lateTime,item.lateMoney)">保存</Button>
          <Button class="btn" size="small" type="warning" @click="deletelateforfeit(item.id)">删除</Button>
        </div>
      </div>
    </div>

    <div class="content">
      <h3 style="margin-top:12px;">事假罚金<span class="notice">{{data.forfeitPleave==true ? '已启用':'未启用'}}</span>
      </h3>
      <div v-if="data.enableFpleave==true">
        <div v-if="data.forfeitPleave=='1'">
          按固定罚金：<Input v-model="leaveThePenaltyAmonut" size="small" class="Input"/>元/天<Button class="btn" size="small" type="success" style="margin-left: 10px;" @click="saveforfeitPleave">保存</Button>
        </div>
        <div v-if="data.forfeitPleave=='2'">
          按计算规则：月收入／实际出勤天数*请假天数
        </div>
      </div>
    </div>

    <div class="content">
      <h3 style="margin-top:12px;">旷工罚金<span class="notice">{{data.forfeitAbsent==true ? '已启用':'未启用'}}</span>
      </h3>
      <span v-if="data.forfeitAbsent==true">
        金额:<Input v-model="absenteeismFineAmount" placeholder="旷工罚金" size="small" class="Input"/>
      <Button class="btn" size="small" type="success" @click="saveAbusent">保存</Button>
      </span>
    </div>

    <div class="content">
     <h3 style="margin-top:12px;">现金业绩罚金<span class="notice">{{data.forfeitAchievement==true ? '已启用':'未启用'}}</span>
       <span v-if="data.forfeitAchievement==true">
         <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="AddforfeitAchievement">新增</Button>
       </span>
     </h3>
      <Table :columns="columns1" :data="forfeitAchievementData" v-if="data.forfeitAchievement==true" ></Table>
    </div>

    <div class="content">
      <h3 style="margin-top:12px;">客流罚金<span class="notice">{{data.forfeitPagerFlow==true ? '已启用':'未启用'}}</span>
        <span v-if="data.forfeitPagerFlow==true">
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="AddforfeitPagerFlow">新增</Button>
        </span>
      </h3>
      <Table :columns="columns2" :data="forfeitPagerFlowData" v-if="data.forfeitPagerFlow==true" ></Table>
    </div>

    <div class="content">
      <h3 style="margin-top:12px;">消耗罚金<span class="notice">{{data.forfeitConsume==true ? '已启用':'未启用'}}</span>
        <span v-if="data.forfeitConsume==true">
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="AddforfeitConsume">新增</Button>
        </span>
      </h3>
      <Table :columns="columns3" :data="forfeitConsumeData" v-if="data.forfeitConsume==true" ></Table>
    </div>

    <div class="content">
      <h3 style="margin-top:12px;">其他<span class="notice">{{data.forfeitOther==true ? '已启用':'未启用'}}</span>
      </h3>
    </div>

    <Modal  v-model="salaryFlag2" title="新增">
      <div style="margin-left:20px;margin-top:10px;">
        <span class="text">迟到早退时间：</span><Input v-model="add2.leaveEarlyTime" placeholder="迟到早退时间 分钟" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">金额：</span><Input v-model="add2.totalBonus" placeholder="金额" style="width: 300px"/>
        <br/>
        <br/>
      </div>
      <div slot="footer">
          <Button type="primary" @click="savelateforfeit">添加</Button>
          <Button type="ghost" @click="close2">取消</Button>
      </div>
    </Modal>
    <Modal  class="modalProjects" v-model="salaryFlag5" :title="editSpecialforfeitFlag">
      <span class="text">低限：</span><Input v-model="add5.lowLimit" placeholder="低限" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">高限：</span><Input v-model="add5.highLimit" placeholder="高限" style="width: 300px"/>
      <br/>
      <br/>
      <span class="text">金额：</span><Input v-model="add5.totalBonus" placeholder="金额" style="width: 300px"/>
      <br/>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="savespecialforfeit">添加</Button>
          <Button type="ghost" @click="close3">取消</Button>
      </div>
    </Modal>

  </div>
</template>
<script>
  import {findSalaryByStore,saveforfeitMoney,getforfeitMoney,deleteforfeitMoney,savelateforfeit,getlateforfeit,deletelateforfeit,editlateforfeit,savespecialforfeit,getspecialforfeit,deletespecialforfeit,editspecialforfeit} from '../../interface.js'
  export default{
    name: 'sa7',
    data(){
      return{
        data:{
          practicalExercises: false,
          performanceDrawinges: false,
          manualFee: false,
          teamBonuses: false,
          activityBonuses: false,
          complaintFines: true,
          leaveEarlyFines: false,
          leaveAfines: false,
          absenteeismFine: false,
          cashPerformancePpenalty: false,
          passengerFines: false,
          consumptionPenalty: false,
          otherFines: false,
          typeOfBaseSalary: '',
          typeOfBonus: '',
          temforfeitComplaint: [],
          storeId: this.$route.params.id,
          storeName: '',
          id: '',
          accumulativePassengerFlow:'',
          accumulativePassengerFlowAward: '',
          baseSalary:'',
          complaintFinesAmount: '',
          oneDayPassengerFlowAward: '',
          singleDayPassengerFlow: '',
          forfeitPleaveType: ''
        },
        data2:{},
        salaryFlag2: false,
        salaryFlag3: false,
        salaryFlag5: false,
        add2:{
          leaveEarlyTime:'',
          totalBonus: '',
          storeId: this.$route.params.id
        },
        add3:{
          personalLeave: '',
          totalBonus: '',
          storeId: this.$route.params.id
        },
        add5:{
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          type: '',
          storeId: this.$route.params.id
        },
        leaveThePenaltyAmonut: '',
        forfeitComplaintAmount: '',
        absenteeismFineAmount: '',
        specialCurrentId: '',
        editSpecialforfeitFlag: '',
        forfeitAchievementData: [],
        forfeitPagerFlowData: [],
        forfeitConsumeData: [],
        leaveEarlyFiness:[],
        leaveAfines:[],
        columns1:[
            {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '罚金金额',
              key: 'forfeitMoney'
            },
            {
              title: '操作',
              width: 200,
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.updateforfeitAchievement(params.row)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.deletespecialforfeit(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
          columns2:[
            {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '罚金金额',
              key: 'forfeitMoney'
            },
            {
              title: '操作',
              width: 200,
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.updateforfeitPagerFlow(params.row)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.deletespecialforfeit(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
          columns3:[
            {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '罚金金额',
              key: 'forfeitMoney'
            },
            {
              title: '操作',
              width: 200,
              key: 'action',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.updateforfeitConsume(params.row)
                      }
                    }
                  }, '修改'),
                  h('Button', {
                    props: {
                      type: 'warning',
                      size: 'small'
                    },
                    style: {
                      marginRight: '5px'
                    },
                    on: {
                      click: () => {
                        this.deletespecialforfeit(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
      }
    },
    methods:{
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.data = res.data.salaryMangeInfo;
          this.data.forfeitLate = this.transferBack(this.data.forfeitLate);
          this.data.forfeitComplaint = this.transferBack(this.data.forfeitComplaint);
          this.data.forfeitAbsent = this.transferBack(this.data.forfeitAbsent);
          this.data.forfeitPagerFlow = this.transferBack(this.data.forfeitPagerFlow);
          this.data.forfeitConsume = this.transferBack(this.data.forfeitConsume);
          this.data.forfeitOther = this.transferBack(this.data.forfeitOther);
          this.data.enableFpleave = this.transferBack(this.data.enableFpleave);
        }).catch( (error) =>{
          console.log(error);
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
      close2(){
        this.salaryFlag2 = false;
      },
      close3(){
        this.salaryFlag5 = false;
      },
      saveforfeitComplaint(){
        var conForfeit = {
              // 门店 id
              storeId:this.$route.params.id,
              // 罚金类型，推荐数字 1 投诉罚金  2 事假罚金 3 旷工罚金
              forfeitType: "1",
              // 罚金金额
              forfeitMoney: this.forfeitComplaintAmount
          }
        this.$ajax({
          method: 'post',
          url:saveforfeitMoney(),
          data:conForfeit
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getforfeitComplaint();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveforfeitPleave(){
        var conForfeit = {
              // 门店 id
              storeId:this.$route.params.id,
              // 罚金类型，推荐数字 1 投诉罚金  2 事假罚金 3 旷工罚金
              forfeitType: "2",
              // 罚金金额
              forfeitMoney: this.leaveThePenaltyAmonut
          }
        this.$ajax({
          method: 'post',
          url:saveforfeitMoney(),
          data:conForfeit
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getforfeitComplaint();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveAbusent(){
        var conForfeit = {
              // 门店 id
              storeId:this.$route.params.id,
              // 罚金类型，推荐数字 1 投诉罚金  2 事假罚金 3 旷工罚金
              forfeitType: "3",
              // 罚金金额
              forfeitMoney: this.absenteeismFineAmount
          }
        this.$ajax({
          method: 'post',
          url:saveforfeitMoney(),
          data:conForfeit
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getforfeitComplaint();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      getforfeitComplaint(){
        this.$ajax({
          method: 'get',
          url: getforfeitMoney()+'/'+this.$route.params.id,
        }).then( (res) =>{
          this.temforfeitComplaint = res.data.conForfeitInfo;
            for(var i = 0; i < this.temforfeitComplaint.length; i++){
              if(this.temforfeitComplaint[i].forfeitType == '1'){
                if(this.data.forfeitComplaint==true){
                  this.forfeitComplaintAmount = this.temforfeitComplaint[i].forfeitMoney;
                }else{
                  this.forfeitComplaintAmount = '';
                }
              }else if(this.temforfeitComplaint[i].forfeitType == '2'){
                this.leaveThePenaltyAmonut = this.temforfeitComplaint[i].forfeitMoney;
              }else if(this.temforfeitComplaint[i].forfeitType == '3'){
                this.absenteeismFineAmount = this.temforfeitComplaint[i].forfeitMoney;
              }
            }
          }).catch( (error) =>{
            console.log(error);
        })
      },
      savelateforfeit(){
          var lateForfeit = {
            // 门店id             
            storeId:this.$route.params.id,
            // 迟到早退时间
            lateTime: this.add2.leaveEarlyTime,
            // 金额
            lateMoney: this.add2.totalBonus
          }
          this.$ajax({
            method: 'post',
            url:savelateforfeit(),
            data:lateForfeit
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getlateforfeit();
            this.salaryFlag2 = false;
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        },
      getlateforfeit(){
        this.$ajax({
          method: 'get',
          url: getlateforfeit()+'/'+this.$route.params.id,
        }).then( (res) =>{
          this.leaveEarlyFiness = res.data.lateForfeitInfo;
          }).catch( (error) =>{
            console.log(error);
        })
      },
      deletelateforfeit(id){
        this.$ajax({
          method: 'get',
          url: deletelateforfeit()+'/'+this.$route.params.id+'?id='+id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getlateforfeit();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      editlateforfeit(id,time,money){
          var lateForfeit = {
            // 记录的id
            id: id,
            // 门店id             
            storeId:this.$route.params.id,
            // 迟到早退时间
            lateTime: time,
            // 金额
            lateMoney: money
          }
          this.$ajax({
            method: 'post',
            url:editlateforfeit(),
            data:lateForfeit
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getlateforfeit();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        },
      AddleaveEarlyFines(){
        this.salaryFlag2 = true;
      },
      AddforfeitAchievement(){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "1";
        this.editSpecialforfeitFlag = "新增";
        this.specialCurrentId = '';
        this.add5={
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          type: '',
          storeId: this.$route.params.id
        };
      },
      updateforfeitAchievement(data){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "1";
        this.editSpecialforfeitFlag = "修改";
        this.specialCurrentId = data.id;
        this.add5={
          lowLimit: data.lowLimit,
          highLimit: data.highLimit,
          totalBonus: data.forfeitMoney,
          type: data.forfeitType,
          storeId: this.$route.params.id
        };
      },
      AddforfeitPagerFlow(){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "2";
        this.editSpecialforfeitFlag = "新增";
        this.specialCurrentId = '';
        this.add5={
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          type: '',
          storeId: this.$route.params.id
        };
      },
      updateforfeitPagerFlow(data){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "2";
        this.editSpecialforfeitFlag = "修改";
        this.specialCurrentId = data.id;
        this.add5={
          lowLimit: data.lowLimit,
          highLimit: data.highLimit,
          totalBonus: data.forfeitMoney,
          type: data.forfeitType,
          storeId: this.$route.params.id
        };
      },
      AddforfeitConsume(){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "3";
        this.editSpecialforfeitFlag = "新增";
        this.specialCurrentId = '';
        this.add5={
          lowLimit: '',
          highLimit: '',
          totalBonus: '',
          type: '',
          storeId: this.$route.params.id
        };
      },
      updateforfeitConsume(data){
        this.salaryFlag5 = true;
        this.specialforfeitFlag = "3";
        this.editSpecialforfeitFlag = "修改";
        this.specialCurrentId = data.id;
        this.add5={
          lowLimit: data.lowLimit,
          highLimit: data.highLimit,
          totalBonus: data.forfeitMoney,
          type: data.forfeitType,
          storeId: this.$route.params.id
        };
      },
      savespecialforfeit(){
          if(this.editSpecialforfeitFlag == "新增"){
            var specialForfeit = {
              // 门店 id              
              storeId: this.$route.params.id,
              // 处罚类型，1 现金业绩罚金  2 客流罚金  3 消耗罚金
              forfeitType: this.specialforfeitFlag,
              // 低限
              lowLimit: this.add5.lowLimit,
              // 高限
              highLimit: this.add5.highLimit,
              // 罚金总额
              forfeitMoney: this.add5.totalBonus
            }
            this.$ajax({
              method: 'post',
              url:savespecialforfeit(),
              data:specialForfeit
            }).then( (res) =>{
              this.$Message.success('保存成功');
              this.getspecialforfeit();
              this.salaryFlag5 = false;
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
          }else if(this.editSpecialforfeitFlag == "修改"){
            var specialForfeit = {
              // 记录 id
              id: this.specialCurrentId,
              // 门店 id              
              storeId: this.$route.params.id,
              // 处罚类型，1 现金业绩罚金  2 客流罚金  3 消耗罚金
              forfeitType: this.specialforfeitFlag,
              // 低限
              lowLimit: this.add5.lowLimit,
              // 高限
              highLimit: this.add5.highLimit,
              // 罚金总额
              forfeitMoney: this.add5.totalBonus
            }
            this.$ajax({
              method: 'post',
              url:editspecialforfeit(),
              data:specialForfeit
            }).then( (res) =>{
              this.$Message.success('保存成功');
              this.getspecialforfeit();
              this.salaryFlag5 = false;
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
          }
        },
      getspecialforfeit(){
        this.forfeitAchievementData = [];
        this.forfeitPagerFlowData = [];
        this.forfeitConsumeData = [];
        this.$ajax({
          method: 'get',
          url: getspecialforfeit()+'/'+this.$route.params.id,
        }).then( (res) =>{
          for(var i = 0; i < res.data.specialForfeitInfo.length; i++){
              if(res.data.specialForfeitInfo[i].forfeitType == '1'){
                if(this.data.forfeitAchievement == true){
                  this.forfeitAchievementData.push(res.data.specialForfeitInfo[i]);
                }
              }else if(res.data.specialForfeitInfo[i].forfeitType == '2'){
                if(this.data.forfeitPagerFlow == true){
                  this.forfeitPagerFlowData.push(res.data.specialForfeitInfo[i]);
                }
              }else if(res.data.specialForfeitInfo[i].forfeitType == '3'){
                if(this.data.forfeitConsume == true){
                  this.forfeitConsumeData.push(res.data.specialForfeitInfo[i]);
                }
              }
            }
          }).catch( (error) =>{
            console.log(error);
        })
      },
      deletespecialforfeit(data){
        this.$ajax({
          method: 'get',
          url: deletespecialforfeit()+'/'+this.$route.params.id+'?id='+data.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getspecialforfeit();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
    },
    created(){
      this.getData();
      this.getforfeitComplaint();
      this.getlateforfeit();
      this.getspecialforfeit();
    },
  }
</script>
<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .btn{
    margin: 0 2px 0 0;
  }
  .notice{
    font-size:12px;
    font-weight: 300;
    margin-left: 10px;
  }
  .Input{
    width: 100px;
    margin: 0 20px 0 0;

  }
  .content{
    width: 95%;
    border: 1px solid #e3e3e3;
    padding: .2rem 1rem 1rem 1rem;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    margin: 10px 0;
  }
  .text{
    display: inline-block;
    width: 100px;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
