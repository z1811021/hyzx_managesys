<template>
  <div class="sa_index">
    <h2 style="margin: .6rem 0;">薪资管理</h2>
    <h2> <Button class="hy_btn btn"  @click="save">保存规则</Button><Button class="hy_btn btn"  @click="more" :disabled="disableDetailButton">具体规则</Button></h2>
    <br>
    <h3>底薪
      <Checkbox v-model="s1">启用</Checkbox>
    </h3>
    底薪方式：
    <Select v-model="data.typeOfBaseSalary" size="small" style="width:150px;margin-right: 10px;">
      <Option v-for="item in cityList2" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-model="data.monthlyCashType" size="small" style="width:150px;margin-right: 10px;" v-if="data.typeOfBaseSalary==1||data.typeOfBaseSalary ==2">
      <Option  value="个人">个人</Option>
      <Option  value="小组">小组</Option>
      <Option  value="全店">全店</Option>
    </Select>
    <br>
    <br>

    <Row>
      <Col span="6">
      <h3>实操提成
        <Checkbox v-model="data.practicalExercises">启用</Checkbox>
      </h3>
      </Col>
      <Col span="6">
      <h3>业绩提成
        <Checkbox v-model="data.performanceDrawinges">启用</Checkbox>
      </h3>
      </Col>
      <Col span="6">
      <h3>手工费
        <Checkbox v-model="data.manualFee">启用</Checkbox>
      </h3>
      </Col>
      <Col span="6">
      <h3>绩效
        <Checkbox v-model="data.achEnable">启用</Checkbox>
      </h3>
      </Col>
    </Row>
    <br>

    <Row>
      <Col span="8">
      <h4>赠送项目实操/手工费规则：</h4>
        <RadioGroup v-model="data.giveSC" style="margin-top:8px;" @on-change="changeSC">
          <Radio label="实操">
              <span>实操</span>
          </Radio>
          <Radio label="手工费" style="margin-left:10px;">
              <span>手工费</span>
          </Radio>
        </RadioGroup>
        <div style="float:right;margin-top:5px;margin-right:40px;" v-show="showSC">赠送项目实操比例： <InputNumber :max="100" :min="0" :transfer=true style="width: 40px;margin-left:-8px;" size="small" v-model="data.giveSCpercent"></InputNumber> %</div>
      </Col>
    </Row>
    <br>

    <h3>奖金</h3>
    奖励方式：
    <Select v-model="data.typeOfBonus" size="small" style="width:150px;margin-right: 10px;">
      <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <Select v-if="data.typeOfBonus==2" v-model="data.cashType" size="small" style="width:150px;margin-right: 10px;">
      <Option  value="个人">个人</Option>
      <Option  value="小组">小组</Option>
      <Option  value="全店">全店</Option>
    </Select>
    <Checkbox v-model="data.teamBonuses">团队奖金</Checkbox>
    <Checkbox v-model="data.activityBonuses">活动奖金</Checkbox>
    <br>
    <br>

    <h3>罚金</h3>
    <Checkbox v-model="data.enableFpleave">事假罚金:</Checkbox>
    <Select v-if="data.enableFpleave==1" v-model="data.typeOfLeave" size="small" style="width:150px;margin-right: 10px;">
      <Option value="1" >固定罚金</Option>
      <Option value="2" >按计算规则</Option>
    </Select>
    <Checkbox v-model="data.complaintFines">投诉罚金</Checkbox>
    <Checkbox v-model="data.leaveEarlyFines">迟到早退罚金</Checkbox>
    <Checkbox v-model="data.absenteeismFine">旷工罚金</Checkbox>
    <Checkbox v-model="data.cashPerformancePpenalty">现金业绩罚金</Checkbox>
    <Checkbox v-model="data.passengerFines">客流罚金</Checkbox>
    <Checkbox v-model="data.consumptionPenalty">消耗罚金</Checkbox>
    <Checkbox v-model="data.otherFines">其他</Checkbox>

  </div>
</template>


<script>
  import {findBonusesJsonByStore,editSalarySystem,findSalaryByStore} from '../../interface'
  import sa_index2 from './sa_index2'

  export default {
    name: "sa_index",
    data(){
      return{
        s1: true,
        disableDetailButton: true,
        data:{
          practicalExercises: false,
          performanceDrawinges: false,
          manualFee: false,
          teamBonuses: false,
          activityBonuses: false,
          complaintFines: false,
          leaveEarlyFines: false,
          leaveAfine: false,
          absenteeismFine: false,
          cashPerformancePpenalty: false,
          passengerFines: false,
          consumptionPenalty: false,
          otherFines: false,
          typeOfBaseSalary: '',
          typeOfBonus: '',
          storeId: this.$route.params.id,
          storeName: '',
          id: '',
          absenteeismFineAmount:'',
          accumulativePassengerFlow:'',
          accumulativePassengerFlowAward: '',
          baseSalary: 1,
          complaintFinesAmount: '',
          oneDayPassengerFlowAward: '',
          singleDayPassengerFlow: '',
          monthlyCashType: '',
          cashType: '',
          typeOfLeave: '',
          leaveThePenaltyRules:'',
          giveSC: '',
          giveSCpercent: '',
          achEnable: '',
          enableFpleave: ''
        },
        data1:{},
        showSC:false,
        cityList:[
          {
            value: '1',
            label: '按客流奖励'
          },
          {
            value: '2',
            label: '按现金业绩奖励'
          },
          {
            value: '3',
            label: '按实操奖励'
          }

        ],
        cityList2:[
          {
            value: '1',
            label: '按月现金总量'
          },
          {
            value: '2',
            label: '按月客流总量'
          },
          {
            value: '3',
            label: '按月实操总量'
          },
          {
            value: '4',
            label: '按月项目总数'
          },
          {
            value: '5',
            label: '按固定底薪'
          },
          {
            value: '6',
            label: '按员工级别底薪'
          }
        ],
        practicalExercises:'',
        data2:{},
        num: 0,
      }
    },
    methods:{
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
      getData(){
        /*this.$ajax({
          method: 'get',
          url:findBonusesJsonByStore()+'?id='+this.$route.params.id
        }).then( (res) =>{
          this.data1 = res.data;
        }).catch( (error) =>{
        });*/
        this.$ajax({
          method: 'get',
          url:findSalaryByStore()+'/'+this.$route.params.id
        }).then( (res) =>{
          if(res.data.salaryMangeInfo != null){
              this.data={
              practicalExercises: this.transferBack(res.data.salaryMangeInfo.poCommission),
              performanceDrawinges: this.transferBack(res.data.salaryMangeInfo.acCommission),
              manualFee: this.transferBack(res.data.salaryMangeInfo.handworkPay),
              teamBonuses: this.transferBack(res.data.salaryMangeInfo.rewardTeam),
              activityBonuses: this.transferBack(res.data.salaryMangeInfo.rewardEvent),
              complaintFines: this.transferBack(res.data.salaryMangeInfo.forfeitComplaint),
              leaveEarlyFines: this.transferBack(res.data.salaryMangeInfo.forfeitLate),
              leaveAfine: '',
              absenteeismFine: this.transferBack(res.data.salaryMangeInfo.forfeitAbsent),
              cashPerformancePpenalty: this.transferBack(res.data.salaryMangeInfo.forfeitAchievement),
              passengerFines: this.transferBack(res.data.salaryMangeInfo.forfeitPagerFlow),
              consumptionPenalty: this.transferBack(res.data.salaryMangeInfo.forfeitConsume),
              otherFines: this.transferBack(res.data.salaryMangeInfo.forfeitOther),
              typeOfBaseSalary: res.data.salaryMangeInfo.baseSalaryRule,
              typeOfBonus: res.data.salaryMangeInfo.rewardRule,
              storeId: this.$route.params.id,
              storeName: '',
              id: '',
              absenteeismFineAmount:'',
              accumulativePassengerFlow:'',
              accumulativePassengerFlowAward: '',
              baseSalary:'',
              complaintFinesAmount: '',
              oneDayPassengerFlowAward: '',
              singleDayPassengerFlow: '',
              monthlyCashType: res.data.salaryMangeInfo.baseSalaryOption,
              cashType: res.data.salaryMangeInfo.rewardOption,
              typeOfLeave: res.data.salaryMangeInfo.forfeitPleave,
              leaveThePenaltyRules:'',
              giveSC: res.data.salaryMangeInfo.praOperation,
              giveSCpercent: res.data.salaryMangeInfo.manualCost,
              achEnable: this.transferBack(res.data.salaryMangeInfo.achEnable),
              enableFpleave: this.transferBack(res.data.salaryMangeInfo.enableFpleave)
            }
            this.disableDetailButton = false;
          }else{
            this.disableDetailButton = true;
          }
          if(this.data.giveSC == '实操'){
            this.showSC = true;
          }else{
            this.showSC = false;
          }
        }).catch( (error) =>{
          console.log(error);
        });

      },
      changeSC(){
            //console.log(this.giveSC);
            if(this.data.giveSC == '实操'){
              this.showSC = true;
            }else{
              this.showSC = false;
            }
            this.data.giveSCpercent = '';
      },
      save(){
        var salaryManage = {
            storeId: this.$route.params.id,
            // 底薪是否启用，1 启用，0 不启用
            baseSalary: '1',
            // 底薪方式，推荐使用数字，1 按月现金总量 ...
            baseSalaryRule: this.data.typeOfBaseSalary,
            // 底薪方式后的单选框，可为空，推荐使用数字，1 个人，2 全店
            baseSalaryOption: this.data.monthlyCashType,
            // 实操提成，1 启用，0 不启用
            poCommission: this.transfer(this.data.practicalExercises),
            // 业绩提成，1 启用，0 不启用
            acCommission: this.transfer(this.data.performanceDrawinges),
            //手工费，1 启用，0 不启用
            handworkPay: this.transfer(this.data.manualFee),
            // 奖金 奖励方式，推荐使用数字，1 按客流奖励 ...
            rewardRule: this.data.typeOfBonus,
            // 奖金 奖励方式 后的单选框，可为空，推荐使用数字，1 个人，2 全店
            rewardOption: this.data.cashType,            
            // 团队奖金，1 选中， 0 不选中
            rewardTeam: this.transfer(this.data.teamBonuses),
            // 活动奖金， 1 选中， 0 不选中
            rewardEvent: this.transfer(this.data.activityBonuses),
            // 事假罚金，推荐使用数字，1 固定罚金，2 按计算规则
            forfeitPleave: this.data.typeOfLeave,
            // 投诉罚金，1 选中， 0 不选中 
            forfeitComplaint: this.transfer(this.data.complaintFines),
            // 迟到早退罚金，1 选中， 0 不选中 
            forfeitLate: this.transfer(this.data.leaveEarlyFines),
            // 旷工罚金，1 选中， 0 不选中  
            forfeitAbsent: this.transfer(this.data.absenteeismFine),
            // 现金业绩罚金，1 选中， 0 不选中
            forfeitAchievement: this.transfer(this.data.cashPerformancePpenalty),
            // 客流罚金，1 选中， 0 不选中
            forfeitPagerFlow: this.transfer(this.data.passengerFines),
            // 消耗罚金，1 选中， 0 不选中
            forfeitConsume: this.transfer(this.data.consumptionPenalty),
            // 其它，1 选中， 0 不选中
            forfeitOther: this.transfer(this.data.otherFines),
            // 赠送项目提成形式
            praOperation: this.data.giveSC,
            // 赠送项目实操百分比
            manualCost: this.data.giveSCpercent,
            // 启用绩效规则
            achEnable: this.transfer(this.data.achEnable),
            // 启用事假
            enableFpleave: this.transfer(this.data.enableFpleave)
        }
        var validateMessage = '';
        if(this.data.giveSC == '实操'){
            if(this.data.giveSCpercent == ''){
              validateMessage = validateMessage + "请输赠送项目实操比例！<br/>";
            }
          }
            let URL = editSalarySystem();
            if(validateMessage != ''){
                this.$Message.warning(validateMessage);
                validateMessage = '';
              }else{
              this.$ajax({
                method: 'POST',
                dataType: 'JSON',
                contentType: 'application/json;charset=UTF-8',
                headers: {
                  "authToken": sessionStorage.getItem('authToken')
                },
                data: salaryManage,
                url: URL,
              }).then((res) => {
                this.$Message.success('操作成功');
                this.getData();
              }).catch((error) => {
                this.$Message.error('操作失败');
              });
          }
      },
      more(){
        this.$router.push({name: 'sa_index2'})
      }
    },
    created(){
      this.getData();
    },
    components: {sa_index2 },
  }
</script>

<style scoped>
  .btn{
    margin: 0px 10px 0 0;
  }
  .sa_index{
    padding-left: 10px;
    padding-bottom: 50px;
  }
  .btnspan{
    display: inline-block;
    width: 80px;
    height: 30px;
    line-height:30px;
    border-radius: 3px;
    text-align: center;
    background-color: #66368C;
    color: #fff;
  }
</style>
