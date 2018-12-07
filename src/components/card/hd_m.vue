<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">活动卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" :mask-closable="false" class="mod">
      <div class='com'>活动名称：<Input style="width: 300px"></Input></div>
      <div style="float:left;margin-left: 63px;">选择活动类型：</div>
        <br/>
      <Select v-model="selectedActivities" placeholder="请选择活动类型" :multiple=true style="width:360px;margin-top:5px;" :transfer=true @on-change="changeActivity()">
          <Option value="到店">到店</Option>
          <Option value="耗卡">耗卡</Option>
          <Option value="充值">充值</Option>
      </Select>
      <br/>
      <div class='group' v-show="showDD" style="display:inline-block;margin-top:20px;">
        <h3>到店活动</h3>
        <div style="float:left;margin-left:30px;margin-top:10px;margin-right:30px;">
        <span>挑选出<InputNumber :max="100" :min="0" v-model="ddAct.ddProNumber" size="small" style="width: 24px;margin-top: -1px;" :readonly=true></InputNumber>个基础功效类项目，原价<InputNumber :max="100000" :min="0" v-model="ddAct.ddOriPrice" size="small" style="width: 60px;margin-top: -1px;" :readonly=true></InputNumber>元，活动价<InputNumber :max="100000" :min="0" v-model="ddAct.ddActPrice" size="small" style="width: 60px;margin-top: -1px;"></InputNumber>元，
        每周完成<InputNumber :max="100" :min="0" v-model="ddAct.ddActNumber" size="small" style="width: 24px;margin-top: -1px;"></InputNumber>个项目（每周五、六、日），<InputNumber :max="100" :min="0" v-model="ddAct.ddDurTime" size="small" style="width: 24px;margin-top: -1px;"></InputNumber>周内全部耗完。</span>
        </div>
        <Select v-model="selectedActivityProjects" placeholder="请选择到店活动项目" :multiple=true style="width:360px;margin-top:5px;" :transfer=true @on-change="changeActivityProjects()">
            <Option v-for="(item,index) in projectList" :value="index" :key="index">
              <span>{{item.itemName}}</span>
              <span style="float:right;color:#ccc">{{item.itemPrice}}</span>
            </Option>
        </Select>
        <br/>
        <div style="margin-top:10px;">
          <Select v-model="selectedDDRules" placeholder="请选择到店活动项目政策" :multiple=true style="width:360px;margin-top:5px;" :transfer=true @on-change="changeDDRules()">
              <Option value="old">老客户：在约定时间内耗完，活动金额全部返卡，不做完不返。</Option>
              <Option value="new">新客：同老客户，若不储值只能用余额扣单次，目的刺激储值。</Option>
              <Option value="oledNew">老带新，请选择后填写详细优惠。</Option>
          </Select>
          <div v-show="showOldNew" style="margin-top:10px;">
            新顾客可以以<InputNumber :max="100000" :min="0" v-model="ddAct.special" size="small" style="width:50px"></InputNumber>元购买，该款项全部返还老顾客作为答谢，并且新顾客首次成交额的<InputNumber :max="100000" :min="0" v-model="ddAct.specialNew" size="small" style="width:50px"></InputNumber>%可现金或返卡方式回馈老顾客。
          </div>
        </div>
      </div>
      <br/>
      <div class='group' v-show="showHK" style="display:inline-block;margin-top:20px;">
        <h3>耗卡活动</h3>
        <br/>
        <div style="margin-bottom:20px;"><InputNumber :max="100" :min="0" v-model="hkAct.weeks" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber :max="100" :min="0">周内做完<InputNumber :max="100" :min="0" v-model="hkAct.projects" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber>个项目，从第<InputNumber :max="100" :min="0" v-model="hkAct.fromProjects" @on-change="changeFromProjects" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber>次开始赠送相应项目或者产品</div>
        <div v-for="(item,index) in hkProjects" style="margin-top:10px;">
          <span >第{{item.hkNumber}}次</span>
          <Select v-model="item.hkProject" placeholder="请选择耗卡活动项目" style="width:260px;margin-left:50px;" :transfer=true @on-change="changeHKProjects()">
              <Option v-for="(item,index) in projectList" :value="index" :key="index">
                <span>{{ item.itemName }}</span>
                <span style="float:right;color:#ccc">{{item.itemPrice}}</span>
              </Option>
          </Select>
        </div>
      </div>
      <br/>
      <div class='group' v-show="showCZ" style="display:inline-block;margin-top:20px;">
        <h3>充值活动</h3>
        <br/>
          <Select v-model="selectedCZactivites" @on-change="changeCZprojects" placeholder="请选择充值活动" :multiple=true style="width:360px;" :transfer=true>
              <Option value="czGiveProject">充值赠送项目</Option>
              <Option value="czGiveProduct">充值赠送产品</Option>
              <Option value="czYJ">充值摇奖</Option>
          </Select>
          <div v-show="showGiveProject">
          <div style="margin-top:20px;margin-left:-220px;">充值赠送项目：<Button style="margin-left:50px;" size="small" type="primary" @click="addGiveProject">增加</Button></div>
            <div v-for="(item,index) in czGiveProjectList" style="margin-top:4px;">
              <span >充值<Input v-model="item.czMoney" type="number" min="0" size="small" style="width:80px"></Input>元</span>
              <Select v-model="item.czProject" :multiple=true placeholder="请选择活动充值赠送项目" style="width:240px;margin-left:20px;" :transfer=true>
                  <Option v-for="(item,index) in projectList" :value="index" :key="index">
                    <span>{{item.itemName}}</span>
                    <span style="float:right;color:#ccc">{{item.itemPrice}}</span>
                  </Option>
              </Select>
            </div>
          </div>
          <div v-show="showGiveProduct">
            <div style="margin-top:20px;margin-left:-220px;">充值赠送产品：<Button style="margin-left:50px;" size="small" type="primary" @click="addGivePro">增加</Button></div>
              <div style="margin-top:10px;">
                <Select v-model="选择产品" style="width:200px">
                    <Option value="产品一">产品一</Option>
                    <Option value="产品二">产品二</Option>
                    <Option value="产品三">产品三</Option>
                </Select>
                <span>价格：XXX元</span>
              </div>
              <div style="margin-top:10px;">
                <Select v-model="选择产品" style="width:200px">
                    <Option value="产品一">产品一</Option>
                    <Option value="产品二">产品二</Option>
                    <Option value="产品三">产品三</Option>
                </Select>
                <span>价格：XXX元</span>
              </div>
          </div>
          <div v-show="showczYj">
            <div style="margin-top:20px;margin-left:-220px;">充值摇奖活动：<Button style="margin-left:50px;" size="small" type="primary" @click="addCZYJ">增加</Button></div>
              <div v-for="(item,index) in yjTimeList" style="margin-top:10px;">充值<Input v-model="item.yjMoney" type="number" min="0" size="small" style="width:80px;"></Input>元可转盘摇奖{{item.yjTimes}}次</div>
          </div>
      </div>
      <br/>
    </Modal>
  </div>
</template>

<script>
import {findProjectList,findactivity,saveactivity,editactivity,deleteactivity,findAllProject,findTreatment} from '../../interface'
  export default {
    name: "hd_m",
    data() {
      return {
        columns: [
          { title: '名称', key: 'activityName',},
          { title: '卡扣价格', key: 'activityBucklePrice',},
          { title: '现金价格', key: 'activityCashPrice',},
          { title: '活动开始时间', key: 'beginTime',},
          { title: '活动结束时间', key: 'endTime',},
          { title: '卡有效期(月)', key: 'activityValidity',},
          {
            title: '操作',
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
                      this.mannger(params.row)
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
                      this.del(params.row, params.index)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        data: [],
        projectList: [],
        checkString: '',
        addF: false,
        showDD: false,
        showHK: false,
        showCZ: false,
        showOldNew: false,
        showczYj: false,
        showGiveProject: false,
        showGiveProduct: false,
        selectedDDRules: [],
        selectedActivities: [],
        selectedActivityProjects: [],
        selectedCZactivites: [],
        ddAct: {
          ddProNumber: '',
          ddOriPrice: '',
          ddActPrice: '',
          ddActNumber: '',
          ddDurTime: '',
          special: 0,
          specialNew: 0
        },
        hkAct:{
          weeks: '',
          projects: '',
          fromProjects: ''
        },
        hkProjects:[],
        czGiveProjectList: [
          { 
            czMoney: '',
            czProject: ''
          }
        ],
        yjTimeList: [
          {
            yjMoney: '',
            yjTimes: 1
          }
        ]
      }
    },
    methods: {
      Add(){
        this.addF = true;
        this.showDD = false;
        this.showHK = false;
        this.showCZ = false;
        this.selectedDDRules = [];
        this.selectedActivities = [];
        this.selectedActivityProjects = [];
        this.showOldNew = '';
        this.hkProjects = [];
        this.selectedCZactivites = [];
        this.ddAct = {
          ddProNumber: '',
          ddOriPrice: '',
          ddActPrice: '',
          ddActNumber: '',
          ddDurTime: '',
          special: 0,
          specialNew: 0
        };
        this.hkAct = {
          weeks: '',
          projects: '',
          fromProjects: ''
        };
        this.hkProjects = [];
        this.czGiveProjectList = [
          { 
            czMoney: '',
            czProject: ''
          }
        ];
        this.yjTimeList = [
          {
            yjMoney: '',
            yjTimes: 1
          }
        ];
      },
      getList() {
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findProjectList()+'/'+this.$route.params.id,
          }).then((res) => {
            this.projectList = res.data.itemManages;
            for(var i=0;i<this.projectList.length;i++){
              if(this.projectList[i].face != ''){
                this.projectList[i].projectCategory = "面部";
              }else{
                this.projectList[i].projectCategory = "身体";
              }
              this.projectList[i].itemPrice = this.projectList[i].itemPrice + "元/次";
              this.projectList[i].courseTimes = this.projectList[i].courseTimes + "次";
              this.projectList[i].coursePrice = this.projectList[i].coursePrice + "元";
              this.projectList[i].courseInterval = this.projectList[i].courseInterval + "天";
            }
          }).catch((error) => {
            this.$Message.error('获取失败');
          });
        },
        changeActivity(){
          var checkString = '';
          for(var i = 0; i < this.selectedActivities.length; i++){
            checkString = checkString + "," + this.selectedActivities[i];
          }
          if(checkString.indexOf("到店")>-1){
            this.showDD = true;
          }else{
            this.showDD = false;
          }
          if(checkString.indexOf("耗卡")>-1){
            this.showHK = true;
          }else{
            this.showHK = false;
          }
          if(checkString.indexOf("充值")>-1){
            this.showCZ = true;
          }else{
            this.showCZ = false;
          }
        },
        changeActivityProjects(){
          var currentPrice = 0;
          this.ddAct.ddProNumber = this.selectedActivityProjects.length;
          for(var i = 0; i < this.selectedActivityProjects.length; i++){
            currentPrice = currentPrice + parseInt(this.projectList[i].itemPrice.replace("元/次",""));
          }
          this.ddAct.ddOriPrice = currentPrice;
        },
        changeDDRules(){
          var checkRuleString = '';
          for(var i = 0; i < this.selectedDDRules.length; i++){
            checkRuleString = checkRuleString + "," + this.selectedDDRules[i];
          }
          if(checkRuleString.indexOf("oledNew")>-1){
            this.showOldNew = true;
          }else{
            this.showOldNew = false;
          }
        },
        changeFromProjects(){
          var timesHK = '';
          this.hkAct.weeks = this.hkAct.fromProjects;
          timesHK = parseInt(this.hkAct.projects) - parseInt(this.hkAct.fromProjects);
          this.hkProjects = [];
          for(var i = 0; i < timesHK; i++){
            var currentHKprojects = {hkNumber: (parseInt(this.hkAct.fromProjects)+i),hkProject: ''};
            this.hkProjects.push(currentHKprojects);
          }
        },
        changeCZprojects(){
          var checkCZString = '';
          for(var i = 0; i < this.selectedCZactivites.length; i++){
            checkCZString = checkCZString + "," + this.selectedCZactivites[i];
          }
          if(checkCZString.indexOf("czGiveProject")>-1){
            this.showGiveProject = true;
          }else{
            this.showGiveProject = false;
          }
          if(checkCZString.indexOf("czGiveProduct")>-1){
            this.showGiveProduct = true;
          }else{
            this.showGiveProduct = false;
          }
          if(checkCZString.indexOf("czYJ")>-1){
            this.showczYj = true;
          }else{
            this.showczYj = false;
          }
        },
        addGiveProject(){
          var curretGiveProject = {
            czMoney: '',
            czProject: ''
          };
          this.czGiveProjectList.push(curretGiveProject);
        },
        addCZYJ(){
          var currentYjTime = {
            yjMoney: '',
            yjTimes: this.yjTimeList.length+1
          };
          this.yjTimeList.push(currentYjTime);
        }
    },
    created(){
      this.getList();
    }
  }
</script>

<style scoped>
  .list{
    padding: 10px;
  }
  .mod{
    line-height: 60px;
    margin: 0 auto;            
    text-align: center; 
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }

</style>
