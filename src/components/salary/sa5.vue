<template>
  <div class="sa5" >
    <br>
    <div class="content" v-if="data1.rewardRule==1">
      <h3>按客流奖励<span class="notice">{{data1.rewardRule == 1?'已启用':'未启用'}}</span></h3>
      <div>
      <br>
        <h4>1.单日客流奖励</h4>
        单日客流：<Input v-model="singleRewardFlow" placeholder="单日客流/人" size="small" class="Input"/>
        奖励金额：<Input v-model="singleRewardMoney" placeholder="奖励金额/元" size="small" class="Input"/>
        <Button class="btn" size="small" type="success" @click="saveSingleComplaint">保存</Button>
        <h4>2.累计客流奖励</h4>
        累计客流：<Input v-model="totalRewardFlow" placeholder="累计客流" size="small" class="Input"/>
        奖励金额：<Input v-model="totalRewardMoney" placeholder="奖励金额" size="small" class="Input"/>
        <Button class="btn" size="small" type="success" @click="saveTotalComplaint">保存</Button>

        <h4>3.累计客流区间
          <Button class="hy_btn btn" style="margin-left: 10px;" size="small" @click="addAccumulative">新增</Button>
        </h4>
        <Table :columns="tablecolumns1" :data="tabledata1"></Table>
      </div>
    </div>
    <Modal class="modalProjects" v-model="accumulativeFlag" :title="accumulativeType">
      <span class="text">低限：</span>
      <Input v-model="accumulativeadd.lowLimit" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="accumulativeadd.highLimit" placeholder="奖金总额" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"/>
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
      <Input v-model="accumulativeadd.lowLimit" placeholder="低限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="accumulativeadd.highLimit" placeholder="高限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"/>
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
      <Input v-model="accumulativeadd.lowLimit" placeholder="低限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">高限：</span>
      <Input v-model="accumulativeadd.highLimit" placeholder="高限" style="width: 300px"/>
      <br>
      <br>
      <span class="text">金额：</span>
      <Input v-model="accumulativeadd.rewardMoney" placeholder="奖金总额" style="width: 300px"/>
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
    <Modal v-model="teamFlag" title="新增" @on-ok="saveTeamBonus">
      <div style="margin-left:20px;">
        <div>
          <span class="text">周期类型：</span>
          <Select v-model="teamadd.periodType" :transfer=true style="width:200px">
            <Option value="单月" >单月</Option>
            <Option value="季度" >季度</Option>
            <Option value="年度" >年度</Option>
          </Select>
        </div>
        <br/>
        <span class="text">开始时间：</span>
        <DatePicker v-model="teamadd.startingTime" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        <span class="text" style="padding-left: 10px;">结束时间：</span>
        <DatePicker v-model="teamadd.endTime" type="date" placeholder="Select date" style="width: 120px"></DatePicker>
        <br>
        <br>
        <span class="text">计算类型：</span>
        <Select v-model="teamadd.calculateTheType" :transfer=true style="width:200px">
          <Option value="现金" >现金</Option>
          <Option value="实操" >实操</Option>
          <Option value="客流" >客流</Option>
        </Select>
        <br>
        <br>
        <span class="text">奖金总额：</span>
        <Input v-model="teamadd.totalBonus" @on-keyup="teamadd.totalBonus=check2(teamadd.totalBonus)" placeholder="奖金总额" style="width: 300px"/>

        <br>
        <br>
        <span class="text">低限：</span>
        <Input v-model="teamadd.lowLimit" @on-keyup="teamadd.lowLimit=check(teamadd.lowLimit)" placeholder="低限" style="width: 300px"/>
        <br>
        <br>
        <span class="text">高限：</span>
        <Input v-model="teamadd.highLimit" @on-keyup="teamadd.highLimit=check(teamadd.highLimit)" placeholder="高限" style="width: 300px"/>
        <br>
        <br>
        <span class="text">分配类型：</span>
        <Select v-model="teamadd.assignmentType" :transfer=true style="width:200px">
          <Option value="平均" >平均</Option>
          <Option value="比例" >比例</Option>
        </Select>
        <br/>
        <br/>
        <div slot="footer">
          <Button type="primary" @click="saveAccumulativePassengerFlow">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
        </div>
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
    <Modal v-model="activityFlag" title="新增" @on-ok="saveActivityBonus">
      <div style="margin-left:20px;">
        <span class="text">开始时间：</span>
        <DatePicker v-model="activityadd.startingTime" type="date"  style="width: 100px"></DatePicker>
        <span class="text" style="padding-left: 10px;">结束时间：</span>
        <DatePicker v-model="activityadd.endTime" type="date"  style="width: 100px"></DatePicker>
        <br>
        <br>
        <span class="text">计算类型：</span>
        <Select v-model="activityadd.calculateTheType" :transfer=true style="width:200px">
          <Option value="现金" >现金</Option>
        </Select>
        <br>
        <br>
        <span class="text">奖金总额：</span>
        <Input v-model="activityadd.totalBonus" placeholder="奖金总额" style="width: 300px"/>
        <br>
        <br>
        <span class="text">低限：</span>
        <Input v-model="activityadd.lowLimit" placeholder="奖金总额" style="width: 300px"/>
        <br>
        <br>
        <span class="text">高限：</span>
        <Input v-model="activityadd.highLimit" placeholder="奖金总额" style="width: 300px"/>
        <br>
        <br>
        <span class="text">分配类型：</span>
        <Select v-model="activityadd.assignmentType" :transfer=true style="width:200px">
          <Option value="平均">平均</Option>
          <Option value="比例">比例</Option>
        </Select>
        <br/>
        <br/>
    </div>
    </Modal>

  </div>
</template>

<script>
  import {editSalarySystem,findBonusesJsonByStore,findSalaryByStore,editCashReward,editTeamBonus,deleteTeamBonus,editActivityBonus,deleteActivityBonus,editPassengerFlowAwardJson,editPracticeReward,deletecomplaint,getcomplaint,savecomplaint,saveAccumulativePassengerFlow,editAccumulativePassengerFlow,deleteAccumulativePassengerFlow,getAccumulativePassengerFlow} from '../../interface'
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
        singleRewardFlow: '',
        singleRewardMoney: '',
        totalRewardFlow: '',
        totalRewardMoney: '',
        accumulativeType: '',
        temComplaint: [],
        teamBonus:[],
        activityBonus:[],
        totalDataTable:[],
        teamadd:{
          assignmentType: "",
          calculateTheType: "",
          endTime: "",
          highLimit: "",
          id: '',
          lowLimit: "",
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
          highLimit: "",
          id: '',
          lowLimit: "",
          startingTime: "",
          storeName: "",
          totalBonus: 0,
          storeId: this.$route.params.id,
        },
        accumulativeadd:{
          // 门店 id            
          storeId: this.$route.params.id,
          // 低限
          lowLimit: "",
          // 高限
          highLimit: "",
          // 奖励金额
          rewardMoney: ""
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
            key: 'periodType'
          },
          {
            title: '开始时间',
            key: 'startingTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '计算类型',
            key: 'calculateTheType'
          },
          {
            title: '奖金总额',
            key: 'totalBonus'
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
            key: 'assignmentType'
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
            key: 'startingTime'
          },
          {
            title: '结束时间',
            key: 'endTime'
          },
          {
            title: '计算类型',
            key: 'calculateTheType'
          },
          {
            title: '奖金总额',
            key: 'totalBonus'
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
            key: 'assignmentType'
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
          lowLimit: "",
          // 高限
          highLimit: "",
          // 奖励金额
          rewardMoney: "",
          rewardRule: ""
        };
      },
      addcashType(){
        this.cashRewarFlag = true;
        this.accumulativeType = "新建";
        this.accumulativeadd = {
          // 门店 id            
          storeId: this.$route.params.id,
          // 低限
          lowLimit: "",
          // 高限
          highLimit: "",
          // 奖励金额
          rewardMoney: "",
          rewardRule: ""
        };
      },
      addpracticeReward(){
        this.practiceRewardFlag = true;
        this.accumulativeType = "新建";
        this.accumulativeadd = {
          // 门店 id            
          storeId: this.$route.params.id,
          // 低限
          lowLimit: "",
          // 高限
          highLimit: "",
          // 奖励金额
          rewardMoney: "",
          rewardRule: ""
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
          this.data1 = res.data.salaryMangeInfo;
          this.data1.rewardEvent = this.transferBack(this.data1.rewardEvent);
          this.data1.rewardTeam = this.transferBack(this.data1.rewardTeam);
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
              this.singleRewardFlow = this.temComplaint[i].passgerFlow;
              this.singleRewardMoney = this.temComplaint[i].rewardMoney;
            }else if(this.temComplaint[i].rewardType == '2'){
              this.totalRewardFlow = this.temComplaint[i].passgerFlow;
              this.totalRewardMoney = this.temComplaint[i].rewardMoney;
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
          lowLimit: data.lowLimit,
          // 高限
          highLimit: data.highLimit,
          // 奖励金额
          rewardMoney: data.rewardMoney,
          rewardRule: data.rewardRule
        };
      },
      Addteam(){
        this.teamFlag=true;
        this.teamadd={
          assignmentType: "",
            calculateTheType: "",
            endTime: "",
            highLimit: "",
            id: '',
            lowLimit: "",
            periodType: "",
            startingTime: "",
            storeName: "",
            totalBonus: 0,
            storeId: this.$route.params.id,
        };
      },
      saveTeamBonus(){
        this.teamadd.startingTime = this.changeDate(this.teamadd.startingTime);
        this.teamadd.endTime = this.changeDate(this.teamadd.endTime);
        this.$ajax({
          method: 'post',
          url: editTeamBonus(),
          data: this.teamadd,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      updateTeamBonus(row){
        this.teamFlag = true;
        this.teamadd = JSON.parse(JSON.stringify(row));
      },
      deleteTeamBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteTeamBonus()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');

        })

      },
      Addactivity(){
        this.activityFlag=true;
        this.activityadd={
          assignmentType: "",
            calculateTheType: "",
            endTime: "",
            highLimit: "",
            id: '',
            lowLimit: "",
            startingTime: "",
            storeName: "",
            totalBonus: 0,
            storeId: this.$route.params.id,
        };
      },
      saveActivityBonus(){
        this.activityadd.startingTime = this.changeDate(this.activityadd.startingTime);
        this.activityadd.endTime = this.changeDate(this.activityadd.endTime);
        this.$ajax({
          method: 'post',
          url: editActivityBonus(),
          data: this.activityadd,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('保存失败');

        })
      },
      updateActivityBonus(row){
        this.activityFlag = true;
        this.activityadd = JSON.parse(JSON.stringify(row));
      },
      deleteActivityBonus(row){
        this.$ajax({
          method: 'get',
          url: deleteActivityBonus()+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');

        })

      }
    },
    created(){
      this.getData();
      this.getComplaint();
      this.getAccumulativePassengerFlow();
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
