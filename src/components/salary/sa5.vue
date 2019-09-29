<template>
  <div class="sa5" >
    <br>
    <div class="content" v-if="data1.rewardRule==1">
      <h3>按客流奖励<span class="notice">{{data1.rewardRule == 1?'已启用':'未启用'}}</span></h3>
      <div>
      <br>
        <h4>1.单日客流奖励</h4>
        单日客流：<InputNumber :min="0" :max="100000" v-model="singleRewardFlow" placeholder="单日客流/人" size="small" class="Input"></InputNumber>
        奖励金额：<InputNumber :min="0" :max="100000" v-model="singleRewardMoney" placeholder="奖励金额/元" size="small" class="Input"></InputNumber>
        <Button class="btn" size="small" type="success" @click="saveSingleComplaint">保存</Button>
        <h4>2.累计客流奖励</h4>
        累计客流：<InputNumber :min="0" :max="100000" v-model="totalRewardFlow" placeholder="累计客流" size="small" class="Input"></InputNumber>
        奖励金额：<InputNumber :min="0" :max="100000" v-model="totalRewardMoney" placeholder="奖励金额" size="small" class="Input"></InputNumber>
        <Button class="btn" size="small" type="success" @click="saveTotalComplaint">保存</Button>

        <h4>3.累计客流区间
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="addAccumulative">新增</Button>
        </h4>
        <Table :columns="tablecolumns1" :data="tabledata1"></Table>
      </div>
    </div>
    <Modal class="modalProjects" v-model="accumulativeFlag" :title="accumulativeType">
      <span class="text">低限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.lowLimit" placeholder="奖金总额" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">高限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.highLimit" placeholder="奖金总额" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">金额：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"></InputNumber>
      <br/>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="saveAccumulativePassengerFlow">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>

    <div class="content" v-if="data1.rewardRule==2">
      <h3>按现金业绩奖励 <span>{{data1.cashType}}</span> <span class="notice">{{data1.rewardRule == 2?'已启用':'未启用'}}</span>
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="addcashType">新增</Button></h3>
        <Table :columns="tablecolumns2" :data="tabledata2"></Table>
    </div>
    <Modal  class="modalProjects" v-model="cashRewarFlag" :title="accumulativeType">
      <span class="text">低限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.lowLimit" placeholder="低限" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">高限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.highLimit" placeholder="高限" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">金额：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"></InputNumber>
      <br/>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="saveAccumulativePassengerFlow">添加</Button>
          <Button type="ghost" @click="close2">取消</Button>
      </div>
    </Modal>
    <div class="content" v-if="data1.rewardRule==3">
      <h3>按实操奖励<span class="notice">{{data1.rewardRule == 3?'已启用':'未启用'}}</span>
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="addpracticeReward">新增</Button>
      </h3>
      <Table :columns="tablecolumns3" :data="tabledata3"></Table>
    </div>
    <Modal  class="modalProjects" v-model="practiceRewardFlag" title="新增">
      <span class="text">低限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.lowLimit" placeholder="低限" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">高限：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.highLimit" placeholder="高限" style="width: 300px"></InputNumber>
      <br>
      <br>
      <span class="text">金额：</span>
      <InputNumber :min="0" :max="100000" v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"></InputNumber>
      <br/>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="saveAccumulativePassengerFlow">添加</Button>
          <Button type="ghost" @click="close3">取消</Button>
      </div>
    </Modal>

    <div class="content">
      <h3>团队奖金<span class="notice">{{data1.rewardTeam==true ? '已启用':'未启用'}}</span>
      <span>
        <Button class="hy_btn btn" style="margin-left: 10px;background-color:#cccccc;color:#666666;" size="small" v-if="data1.rewardTeam!=true">停用</Button>
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Addteam" v-if="data1.rewardTeam==true">新增</Button>
      </span>
      </h3>
      <Table :columns="columnsTeam" :data="teamBonus" v-if="teamBonus!=null" ></Table>
    </div>
    <Modal v-model="teamFlag" :title="teamBonusFlag">
      <div style="margin-left:20px;">
        <div>
          <span class="text">周期类型：</span>
          <Select v-model="teamadd.cycleType" :transfer=true style="width:200px">
            <Option value="单月" >单月</Option>
            <Option value="季度" >季度</Option>
            <Option value="年度" >年度</Option>
          </Select>
        </div>
        <br/>
        <span class="text">开始时间：</span>
        <DatePicker v-model="teamadd.startDate" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        <span class="text" style="padding-left: 10px;">结束时间：</span>
        <DatePicker v-model="teamadd.endDate" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        <br>
        <br>
        <span class="text">计算类型：</span>
        <Select v-model="teamadd.calcuType" :transfer=true style="width:200px">
          <Option value="现金" >现金</Option>
          <Option value="实操" >实操</Option>
          <Option value="客流" >客流</Option>
        </Select>
        <br>
        <br>
        <span class="text">奖金总额：</span>
        <InputNumber :min="0" :max="100000" v-model="teamadd.rewardCount" placeholder="奖金总额" style="width: 300px"></InputNumber>

        <br>
        <br>
        <span class="text">低限：</span>
        <InputNumber :min="0" :max="100000" v-model="teamadd.lowLimit" placeholder="低限" style="width: 300px"></InputNumber>
        <br>
        <br>
        <span class="text">高限：</span>
        <InputNumber :min="0" :max="100000" v-model="teamadd.highLimit" placeholder="高限" style="width: 300px"></InputNumber>
        <br>
        <br>
        <span class="text">分配类型：</span>
        <Select v-model="teamadd.distrType" :transfer=true style="width:200px">
          <Option value="平均" >平均</Option>
          <Option value="比例" >比例</Option>
        </Select>
        <br/>
        <br/>
      </div>
      <div slot="footer">
          <Button type="primary" @click="saveTeamBonus">添加</Button>
          <Button type="ghost" @click="closeTeamBonus">取消</Button>
        </div>
    </Modal>

    <div class="content">
      <h3>活动奖金<span class="notice">{{data1.rewardEvent==true ? '已启用':'未启用'}}</span>
       <span >
        <Button class="hy_btn btn" style="margin-left: 10px;background-color:#cccccc;color:#666666;" size="small" v-if="data1.rewardEvent!=true">停用</Button >
        <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="Addactivity" v-if="data1.rewardEvent==true">新增</Button>
       </span>
      </h3>
      <Table :columns="columnsActivity" :data="activityBonus" v-if="activityBonus!=null" ></Table>
    </div>
    <Modal v-model="activityFlag" :title="activityBonusFlag">
      <div style="margin-left:20px;">
        <span class="text">开始时间：</span>
        <DatePicker v-model="activityadd.startDate" type="date"  style="width: 100px"></DatePicker>
        <span class="text" style="padding-left: 10px;">结束时间：</span>
        <DatePicker v-model="activityadd.endDate" type="date"  style="width: 100px"></DatePicker>
        <br>
        <br>
        <span class="text">计算类型：</span>
        <Select v-model="activityadd.calcuType" :transfer=true style="width:200px">
          <Option value="现金" >现金</Option>
        </Select>
        <br>
        <br>
        <span class="text">奖金总额：</span>
        <InputNumber :min="0" :max="100000" v-model="activityadd.rewardCount" placeholder="奖金总额" style="width: 300px"></InputNumber>
        <br>
        <br>
        <span class="text">低限：</span>
        <InputNumber :min="0" :max="100000" v-model="activityadd.lowLimit" placeholder="奖金总额" style="width: 300px"></InputNumber>
        <br>
        <br>
        <span class="text">高限：</span>
        <InputNumber :min="0" :max="100000" v-model="activityadd.highLimit" placeholder="奖金总额" style="width: 300px"></InputNumber>
        <br>
        <br>
        <span class="text">分配类型：</span>
        <Select v-model="activityadd.distrType" :transfer=true style="width:200px">
          <Option value="平均">平均</Option>
          <Option value="比例">比例</Option>
        </Select>
        <br/>
        <br/>
    </div>
        <div slot="footer">
          <Button type="primary" @click="saveActivityBonus">添加</Button>
          <Button type="ghost" @click="closeActivityBonus">取消</Button>
        </div>
    </Modal>

  </div>
</template>

<script>
  import {editSalarySystem,findBonusesJsonByStore,findSalaryByStore,editCashReward,editTeamBonus,saveTeamBonus,getTeamBonus,deleteTeamBonus,editActivityBonus,deleteActivityBonus,saveActivityBonus,getActivityBonus,editPassengerFlowAwardJson,editPracticeReward,deletecomplaint,getcomplaint,savecomplaint,saveAccumulativePassengerFlow,editAccumulativePassengerFlow,deleteAccumulativePassengerFlow,getAccumulativePassengerFlow} from '../../interface'
  export default{
    name: 'sa5',
    data(){
      return{
        cityList: [
          {
            value: 'type1',
            label: '个人现金'
          },
          {
            value: 'type2',
            label: '全店现金'
          },
        ],
        cityList1:[
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
          },
        ],
        salarydata:[],
        data1:[],
        singleRewardFlow: 0,
        singleRewardMoney: 0,
        totalRewardFlow: 0,
        totalRewardMoney: 0,
        accumulativeType: '',
        temComplaint: [],
        teamBonus:[],
        activityBonus:[],
        totalDataTable:[],
        teamBonusFlag: '',
        activityBonusFlag: '',
        currentTeamBonusId: '',
        currentActivityBonusId: '',
        teamadd:{
          assignmentType: "",
          calculateTheType: "",
          endTime: "",
          highLimit: 0,
          id: '',
          lowLimit: 0,
          periodType: "",
          startingTime: "",
          storeName: "",
          currentAccumulativePassengerId: "",
          totalBonus: 0,
          storeId: this.$route.params.id,
        },
        activityadd:{
          assignmentType: "",
          calculateTheType: "",
          endTime: "",
          highLimit: 0,
          id: '',
          lowLimit: 0,
          startingTime: "",
          storeName: "",
          totalBonus: 0,
          storeId: this.$route.params.id,
        },
        accumulativeadd:{
          // 门店 id
          storeId: this.$route.params.id,
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 奖励金额
          rewardMoney: 0
        },
        cashRewardadd:{
          storeId: this.$route.params.id,
        },
        practiceRewardadd:{
          storeId: this.$route.params.id,
        },
        accumulativeFlag: false,
        teamFlag:false,
        activityFlag: false,
        cashRewarFlag:false,
        practiceRewardFlag:false,
        tabledata1:[],
        tabledata2:[],
        tabledata3:[],
        tablecolumns1:[
            {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '奖励金额',
              key: 'rewardMoney'
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
                        this.updateAccumulativePassengerFlow(params.row)
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
                        this.deleteAccumulativePassengerFlow(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
        tablecolumns2:[
          {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '奖励金额',
              key: 'rewardMoney'
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
                        this.updateAccumulativePassengerFlow(params.row)
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
                        this.deleteAccumulativePassengerFlow(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
        ],
        tablecolumns3:[
          {
              title: '低限',
              key: 'lowLimit'
            },
            {
              title: '高限',
              key: 'highLimit'
            },
            {
              title: '奖励金额',
              key: 'rewardMoney'
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
                        this.updateAccumulativePassengerFlow(params.row)
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
                        this.deleteAccumulativePassengerFlow(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
        ],
        columnsTeam:[
          {
            title: '周期类型',
            key: 'cycleType'
          },
          {
            title: '开始时间',
            key: 'startDate',
            width:120
          },
          {
            title: '结束时间',
            key: 'endDate',
            width:120
          },
          {
            title: '计算类型',
            key: 'calcuType'
          },
          {
            title: '奖金总额',
            key: 'rewardCount'
          },
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '分配类型',
            key: 'distrType'
          },
          {
            title: '操作',
            width: 140,
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
                      this.updateTeamBonus(params.row)
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
                      this.deleteTeamBonus(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        columnsActivity:[
          {
            title: '开始时间',
            key: 'startDate'
          },
          {
            title: '结束时间',
            key: 'endDate',
            width: 140
          },
          {
            title: '计算类型',
            key: 'calcuType',
            width: 140
          },
          {
            title: '奖金总额',
            key: 'rewardCount'
          },
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '分配类型',
            key: 'distrType'
          },
          {
            title: '操作',
            width: 140,
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
                      this.updateActivityBonus(params.row)
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
                      this.deleteActivityBonus(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        test:''
      }
    },
    methods:{
      addAccumulative(){
        this.accumulativeFlag = true;
        this.accumulativeType = "新建";
        this.accumulativeadd = {
          // 门店 id
          storeId: this.$route.params.id,
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 奖励金额
          rewardMoney: 0,
          rewardRule: 0
        };
      },
      addcashType(){
        this.cashRewarFlag = true;
        this.accumulativeType = "新建";
        this.accumulativeadd = {
          // 门店 id
          storeId: this.$route.params.id,
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 奖励金额
          rewardMoney: 0,
          rewardRule: 0
        };
      },
      addpracticeReward(){
        this.practiceRewardFlag = true;
        this.accumulativeType = "新建";
        this.accumulativeadd = {
          // 门店 id
          storeId: this.$route.params.id,
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 奖励金额
          rewardMoney: 0,
          rewardRule: 0
        };
      },
      close(){
        this.accumulativeFlag = false;
      },
      close2(){
        this.cashRewarFlag = false;
      },
      close3(){
        this.practiceRewardFlag = false;
      },
      closeActivityBonus(){
        this.activityFlag = false;
      },
      closeTeamBonus(){
        this.teamFlag = false;
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
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          if(res.data.salaryMangeInfo != null){
            this.data1 = res.data.salaryMangeInfo;
            this.data1.rewardEvent = this.transferBack(this.data1.rewardEvent);
            this.data1.rewardTeam = this.transferBack(this.data1.rewardTeam);
          }
        }).catch( (error) =>{
          console.log(error);
        })
      },
      getComplaint(){
        this.$ajax({
          method: 'get',
          url: getcomplaint() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.temComplaint = res.data.passgerRewardInfo;
          for(var i = 0; i < this.temComplaint.length; i++){
            if(this.temComplaint[i].rewardType == '1'){
              this.singleRewardFlow = parseInt(this.temComplaint[i].passgerFlow)
              this.singleRewardMoney = parseInt(this.temComplaint[i].rewardMoney)
            }else if(this.temComplaint[i].rewardType == '2'){
              this.totalRewardFlow = parseInt(this.temComplaint[i].passgerFlow);
              this.totalRewardMoney = parseInt(this.temComplaint[i].rewardMoney);
            }
          }
        }).catch( (error) =>{
        })
      },
      saveSingleComplaint(){
        var passgerReward = {
              // 门店的 id
              storeId:this.$route.params.id,
              // 客流奖励类型，推荐使用数字区分，1：单日客流奖励，2：累计客流奖励
              rewardType: "1",
              // 单日客流 / 累计客流
              passgerFlow: this.singleRewardFlow,
              // 奖励金额
              rewardMoney: this.singleRewardMoney
          }
        this.$ajax({
          method: 'post',
          url:savecomplaint(),
          data:passgerReward
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getComplaint();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      saveTotalComplaint(){
        var passgerReward = {
              // 门店的 id
              storeId:this.$route.params.id,
              // 客流奖励类型，推荐使用数字区分，1：单日客流奖励，2：累计客流奖励
              rewardType: "2",
              // 单日客流 / 累计客流
              passgerFlow: this.totalRewardFlow,
              // 奖励金额
              rewardMoney: this.totalRewardMoney
          }
        this.$ajax({
          method: 'post',
          url:savecomplaint(),
          data:passgerReward
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getComplaint();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      getAccumulativePassengerFlow(){
        this.totalDataTable = [];
        this.tabledata1 = [];
        this.tabledata2 = [];
        this.tabledata3 = [];
        this.$ajax({
          method: 'get',
          url: getAccumulativePassengerFlow() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.totalDataTable = res.data.cumPassRangeInfo;
          for(var i = 0; i < this.totalDataTable.length; i++){
            if(this.totalDataTable[i].rewardRule == "1"){
              this.tabledata1.push(this.totalDataTable[i]);
            }else if(this.totalDataTable[i].rewardRule == "2"){
              this.tabledata2.push(this.totalDataTable[i]);
            }else if(this.totalDataTable[i].rewardRule == "3"){
              this.tabledata3.push(this.totalDataTable[i]);
            }
          }
        }).catch( (error) =>{
        })
      },
      deleteAccumulativePassengerFlow(data){
        this.$ajax({
          method: 'get',
          url: deleteAccumulativePassengerFlow()+'/'+this.$route.params.id+'?id='+data.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getAccumulativePassengerFlow();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      saveAccumulativePassengerFlow(){
        if(this.accumulativeType == "新建"){
          var cumPassRange = {
            // 门店 id
            storeId: this.$route.params.id,
            // 低限
            lowLimit: this.accumulativeadd.lowLimit,
            // 高限
            highLimit: this.accumulativeadd.highLimit,
            // 奖励金额
            rewardMoney: this.accumulativeadd.rewardMoney,
            rewardRule: this.data1.rewardRule
        };
          this.$ajax({
            method: 'post',
            url:saveAccumulativePassengerFlow(),
            data:cumPassRange
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getAccumulativePassengerFlow();
            this.accumulativeFlag = false;
            this.cashRewarFlag = false;
            this.practiceRewardFlag = false;
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        }else if(this.accumulativeType == "修改"){
          var cumPassRange = {
            id: this.currentAccumulativePassengerId,
            // 门店 id
            storeId: this.$route.params.id,
            // 低限
            lowLimit: this.accumulativeadd.lowLimit,
            // 高限
            highLimit: this.accumulativeadd.highLimit,
            // 奖励金额
            rewardMoney: this.accumulativeadd.rewardMoney,
            rewardRule: this.data1.rewardRule
        };
          this.$ajax({
            method: 'post',
            url:editAccumulativePassengerFlow(),
            data:cumPassRange
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getAccumulativePassengerFlow();
            this.accumulativeFlag = false;
            this.cashRewarFlag = false;
            this.practiceRewardFlag = false;
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        }
      },
      updateAccumulativePassengerFlow(data){
          this.accumulativeFlag = true;
          this.accumulativeType = "修改";
          this.currentAccumulativePassengerId = data.id;
          this.accumulativeadd = {
          // 门店 id
          storeId: this.$route.params.id,
          // 低限
          lowLimit: parseInt(data.lowLimit),
          // 高限
          highLimit: parseInt(data.highLimit),
          // 奖励金额
          rewardMoney: parseInt(data.rewardMoney),
          rewardRule: parseInt(data.rewardRule)
        };
      },
      Addteam(){
        this.teamFlag=true;
        this.teamBonusFlag='新建';
        this.teamadd={
          // 门店 id
          storeId: this.$route.params.id,
          // 周期类型，推荐使用数字，1 单月，2 季度，3 全年
          cycleType: "",
          // 开始时间
          startDate:"",
          // 结束时间
          endDate: "",
          // 计算类型，推荐使用数字，1 现金，2 实操，3 客流
          calcuType: "",
          // 奖金总额
          rewardCount: 0,
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 分配类型，推荐使用数字 1 平均，2 比例
          distrType: ""
        };
      },
      formatDate(date) {
          var d = new Date(date),
              month = '' + (d.getMonth() + 1),
              day = '' + d.getDate(),
              year = d.getFullYear();

          if (month.length < 2) month = '0' + month;
          if (day.length < 2) day = '0' + day;

          return [year, month, day].join('-');
      },
      saveTeamBonus(){
        var validateMessage = '';
        if( this.teamadd.cycleType == ''){
            validateMessage = validateMessage + "请选择团队奖金周期类型！<br/>";
          }
          if( this.teamadd.startDate == ''){
            validateMessage = validateMessage + "请选择团队奖金开始时间！<br/>";
          }
          if( this.teamadd.endDate == ''){
            validateMessage = validateMessage + "请选择团队奖金结束时间！<br/>";
          }
          if( this.teamadd.calcuType == ''){
            validateMessage = validateMessage + "请选择团队奖金计算类型！<br/>";
          }
          if( this.teamadd.rewardCount == ''){
            validateMessage = validateMessage + "请输入团队奖金总额！<br/>";
          }
          if( this.teamadd.lowLimit == ''){
            validateMessage = validateMessage + "请输入团队奖金低限！<br/>";
          }
          if( this.teamadd.highLimit == ''){
            validateMessage = validateMessage + "请输入团队奖金高限！<br/>";
          }
          if( this.teamadd.distrType == ''){
            validateMessage = validateMessage + "请选择团队奖金分配类型！<br/>";
          }
          if( (parseInt(this.teamadd.highLimit) - parseInt(this.teamadd.lowLimit)) < 0){
            validateMessage = validateMessage + "低限不能高于高限！<br/>";
            this.teamadd.highLimit = '';
            this.teamadd.lowLimit = '';
          }
          if( (this.teamadd.startDate - this.teamadd.endDate) > 0 ){
            validateMessage = validateMessage + "结束日期不能早于开始日期！<br/>";
          }
        if(this.teamBonusFlag == '新建'){
          this.teamadd.startDate = this.formatDate(this.teamadd.startDate);
          this.teamadd.endDate = this.formatDate(this.teamadd.endDate);
          var teamReward = this.teamadd;
          if(validateMessage != ''){
            this.$Message.warning(validateMessage);
            validateMessage = '';
          }else{
            this.$ajax({
              method: 'post',
              url: saveTeamBonus(),
              data: teamReward,
            }).then( (res) =>{
              this.$Message.success('保存成功');
              this.getTeamBonus();
              this.teamFlag = false;
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
          }
        }else if(this.teamBonusFlag == '修改'){
          var teamReward = {
            // 记录 id，非常重要
            id:this.currentTeamBonusId,
            // 门店 id
            storeId: this.$route.params.id,
            // 周期类型，推荐使用数字，1 单月，2 季度，3 全年
            cycleType: this.teamadd.cycleType,
            // 开始时间
            startDate:this.formatDate(this.teamadd.startDate),
            // 结束时间
            endDate: this.formatDate(this.teamadd.endDate),
            // 计算类型，推荐使用数字，1 现金，2 实操，3 客流
            calcuType: this.teamadd.calcuType,
            // 奖金总额
            rewardCount: this.teamadd.rewardCount,
            // 低限
            lowLimit: this.teamadd.lowLimit,
            // 高限
            highLimit: this.teamadd.highLimit,
            // 分配类型，推荐使用数字 1 平均，2 比例
            distrType: this.teamadd.distrType
          }
          if(validateMessage != ''){
            this.$Message.warning(validateMessage);
            validateMessage = '';
          }else{
            this.$ajax({
              method: 'post',
              url: editTeamBonus(),
              data: teamReward,
            }).then( (res) =>{
              this.$Message.success('保存成功');
              this.getTeamBonus();
              this.teamFlag = false;
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
          }
        }
      },
      updateTeamBonus(row){
        this.teamFlag = true;
        this.teamBonusFlag = '修改';
        this.teamadd = JSON.parse(JSON.stringify(row));
        this.currentTeamBonusId=row.id;
      },
      deleteTeamBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteTeamBonus()+'/'+this.$route.params.id+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getTeamBonus();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      },
      getTeamBonus(){
        this.$ajax({
          method: 'get',
          url: getTeamBonus() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.teamBonus = res.data.teamRewardInfo;
        }).catch( (error) =>{
          console.log(error);
        })
      },
      getActivityBonus(){
        this.$ajax({
          method: 'get',
          url: getActivityBonus() + '/'+this.$route.params.id,
        }).then( (res) =>{
          this.activityBonus = res.data.activityRewardInfo;
        }).catch( (error) =>{
          console.log(error);
        })
      },
      Addactivity(){
        this.activityFlag=true;
        this.activityBonusFlag='新建',
        this.activityadd={
          // 门店 id
          storeId: this.$route.params.id,
          // 开始时间
          startDate: "",
          // 结束时间
          endDate: "",
          // 计算类型,推荐数字，1 现金
          calcuType: 0,
          // 奖金总额
          rewardCount: "",
          // 低限
          lowLimit: 0,
          // 高限
          highLimit: 0,
          // 分配类型,推荐数字，1 平均 2 比例
          distrType: ""
        };
      },
      saveActivityBonus(){
        var validateMessage = '';
          if( this.activityadd.startDate == ''){
            validateMessage = validateMessage + "请选择活动奖金开始时间！<br/>";
          }
          if( this.activityadd.endDate == ''){
            validateMessage = validateMessage + "请选择活动奖金结束时间！<br/>";
          }
          if( this.activityadd.calcuType == ''){
            validateMessage = validateMessage + "请选择活动奖金计算类型！<br/>";
          }
          if( this.activityadd.rewardCount == ''){
            validateMessage = validateMessage + "请输入活动奖金总额！<br/>";
          }
          if( this.activityadd.lowLimit == ''){
            validateMessage = validateMessage + "请输入活动奖金低限！<br/>";
          }
          if( this.activityadd.highLimit == ''){
            validateMessage = validateMessage + "请输入活动奖金高限！<br/>";
          }
          if( this.activityadd.distrType == ''){
            validateMessage = validateMessage + "请选择活动奖金分配类型！<br/>";
          }
          if( parseInt(this.activityadd.highLimit) - parseInt(this.activityadd.lowLimit)){
            validateMessage = validateMessage + "低限不能高于高限！<br/>";
            this.activityadd.highLimit = '';
            this.activityadd.lowLimit = '';
          }
          if( (this.activityadd.startDate - this.activityadd.endDate) > 0 ){
            validateMessage = validateMessage + "结束日期不能早于开始日期！<br/>";
          }
        if(this.activityBonusFlag == '新建'){
          this.activityadd.startDate = this.formatDate(this.activityadd.startDate);
          this.activityadd.endDate = this.formatDate(this.activityadd.endDate);
          var activityReward = this.activityadd;
            this.$ajax({
              method: 'post',
              url: saveActivityBonus(),
              data: activityReward,
            }).then( (res) =>{
              this.$Message.success('保存成功');
              this.activityFlag = false;
              this.getActivityBonus();
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
        }else if(this.activityBonusFlag == '修改'){
          var activityReward = {
              //id
              id: this.updateActivityBonus,
              // 门店 id
              storeId: this.$route.params.id,
              // 开始时间
              startDate: this.formatDate(this.activityadd.startDate),
              // 结束时间
              endDate: this.formatDate(this.activityadd.endDate),
              // 计算类型,推荐数字，1 现金
              calcuType: this.activityadd.calcuType,
              // 奖金总额
              rewardCount: this.activityadd.rewardCount,
              // 低限
              lowLimit: this.activityadd.lowLimit,
              // 高限
              highLimit: this.activityadd.highLimit,
              // 分配类型,推荐数字，1 平均 2 比例
              distrType: this.activityadd.distrType
          }
        }
      },
      updateActivityBonus(row){
        this.activityFlag = true;
        this.activityBonusFlag = '修改';
        this.activityadd = JSON.parse(JSON.stringify(row));
        this.currentActivityBonusId = row.id;
      },
      deleteActivityBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteActivityBonus()+'/'+this.$route.params.id+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getActivityBonus();
        }).catch( (error) =>{
          this.$Message.error('删除失败');

        })

      }
    },
    created(){
      this.getData();
      this.getComplaint();
      this.getAccumulativePassengerFlow();
      this.getTeamBonus();
      this.getActivityBonus();
    }
  }

</script>

<style scoped>
  .modalProjects {
    margin: 0 auto;
    text-align: center;
  }
 .sa5{
   padding-left: .6rem;
   box-sizing: border-box;
 }
  .btn{
    margin: 20px 0;
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
  .notice{
    font-size:12px;
    font-weight: 300;
    margin-left: 10px;
  }
  .text{
    display: inline-block;
    width: 80px;
  }
  .Input{
    width: 100px;
    margin: 0 20px 0 0;
  }
</style>
