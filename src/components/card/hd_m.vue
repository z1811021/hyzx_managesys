<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">活动卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal v-model="addF" title="添加" :mask-closable="false" class="mod">
      <div class='com'>活动名称：<Input v-model="actiName" style="width: 300px"></Input></div>
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
        每周完成<InputNumber :max="100" :min="0" v-model="ddAct.ddActNumber" size="small" style="width: 44px;margin-top: -1px;"></InputNumber>个项目（每周五、六、日），<InputNumber :max="100" :min="0" v-model="ddAct.ddDurTime" size="small" style="width: 44px;margin-top: -1px;"></InputNumber>周内全部耗完。</span>
        </div>
        <Select v-model="selectedActivityProjects" placeholder="请选择到店活动项目" :multiple=true style="width:360px;margin-top:5px;" filterable :transfer=true @on-change="changeActivityProjects()">
            <Option v-for="item in projectList" :value="item.itemName" :key="item.itemName">
              <span>{{item.itemName}}</span>
              <span style="float:right;color:#ccc">{{item.itemPrice}}</span>
            </Option>
        </Select>
        <br/>
        <div style="margin-top:10px;">
          <Select v-model="selectedDDRules" placeholder="请选择到店活动项目政策" :multiple=true style="width:360px;margin-top:5px;" :transfer=true @on-change="changeDDRules()">
              <Option value="老客户">老客户：在约定时间内耗完，活动金额全部返卡，不做完不返。</Option>
              <Option value="新客户">新客：同老客户，若不储值只能用余额扣单次，目的刺激储值。</Option>
              <Option value="老带新">老带新，请选择后填写详细优惠。</Option>
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
        <div style="margin-bottom:20px;"><InputNumber :max="100" :min="0" v-model="hkAct.weeks" @on-change="changeFromProjects" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber :max="100" :min="0">周内做完<InputNumber :max="100" :min="0" @on-change="changeFromProjects" v-model="hkAct.projects" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber>个项目，从第<InputNumber :max="100" :min="0" v-model="hkAct.fromProjects" @on-change="changeFromProjects" size="small" style="width: 48px;margin-top: -1px;" ></InputNumber>次开始赠送相应项目或者产品</div>
        <div v-for="project in hkProjects" style="margin-top:10px;">
          <span >第{{project.hkNumber}}次</span>
          <Select v-model="project.hkProject" placeholder="请选择耗卡活动项目" style="width:260px;margin-left:50px;" :transfer=true>
              <Option v-for="(item,index) in projectList" :value="item.itemName" :key="'hkhd'+item.id">
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
              <Option value="充值赠送项目">充值赠送项目</Option>
              <Option value="充值赠送产品">充值赠送产品</Option>
              <Option value="充值摇奖">充值摇奖</Option>
          </Select>
          <div v-show="showGiveProject">
          <div style="margin-top:30px;margin-left:-220px;">充值赠送项目：<Button style="margin-left:50px;" size="small" type="primary" @click="addGiveProject">增加</Button></div>
            <div v-for="(project,index) in czGiveProjectList" style="margin-top:4px;">
              <span >充值 <InputNumber :max="100000" :min="0" v-model="project.presentMoney" size="small" style="width:64px"></InputNumber>元</span>
              <Select v-model="project.presentItem" placeholder="请选择活动充值赠送项目" style="width:240px;margin-left:20px;" :transfer=true>
                  <Option v-for="(item,index) in projectList" :value="item.id" :key="index">
                    <span>{{item.itemName}}</span>
                    <span style="float:right;color:#ccc">{{item.itemPrice}}</span>
                  </Option>
              </Select>
              <Button class="hy_btn" @click="deleteGiveProject(index)">删除</Button>
            </div>
          </div>
          <div v-show="showGiveProduct">
            <div style="margin-top:30px;margin-left:-220px;">充值赠送产品：<Button style="margin-left:50px;" size="small" type="primary" @click="addGiveProduct">增加</Button></div>
              <div v-for="item in czGiveProductList" style="margin-top:4px;">
                <Select v-model="item.presentGift" style="width:200px">
                    <Option value="产品一">产品一</Option>
                    <Option value="产品二">产品二</Option>
                    <Option value="产品三">产品三</Option>
                    <Option value="产品三">产品四</Option>
                </Select>
                <span>价格：XXX元</span>
                <Button class="hy_btn" @click="deleteGiveProduct(index)">删除</Button>
              </div>
          </div>
          <div v-show="showczYj">
            <div style="margin-top:30px;margin-left:-220px;">充值摇奖活动：<Button style="margin-left:50px;" size="small" type="primary" @click="addCZYJ">增加</Button></div>
              <div v-for="(item,index) in yjTimeList" style="margin-top:4px;">充值 <InputNumber :max="100000" :min="0" v-model="item.rechargeMoney" size="small" style="width:64px;"></InputNumber> 元可转盘摇奖{{item.rechargeTimes}}次  <Button class="hy_btn" @click="deleteCZYJ(index)">删除</Button></div>
          </div>
      </div>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
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
          { title: '名称', key: 'actiName',},
          { title: '活动类型', key: 'actiType',},
          { title: '到店活动类型', key: 'actiDescs',},
          { title: '到店活动时长（月）', key: 'expirDate',},
          { title: '耗卡活动时长（月）', key: 'consExpDate',},
          { title: '充值活动类型', key: 'rechItems',},
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
                      this.del(params.row)
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
        actiName: '',
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
        consItems: '',
        czGiveProjectList: [
          { 
            // 写错也没有关系，后台会校验重设              
              storeId:this.$route.params.id,
              // 与活动卡项目关联的id，后台会设置，直接写 0 即可 
              actCardId: 0,
              // 充值 ? 元
              presentMoney: '',
              // 赠送项目选项，推荐使用数字，1：超微气泡 ...
              presentItem: ''
          }
        ],
        czGiveProductList:[
          {
              // 写错也没有关系，后台会校验重设  
              storeId: this.$route.params.id,
              // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
              actCardId: 0,
              // 选择产品，推荐使用数字，1：产品一，2：产品二
              presentGift: "产品一",
              // 价格 ? 元
              presentMoney: '500'
            },
        ],
        yjTimeList: [
          {
              // 写错也没有关系，后台会校验重设              
              storeId: this.$route.params.id,
              // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
              actCardId: 0,
              // 充值 ? 元可以转盘摇奖 1 次
              rechargeMoney: '',
              //摇奖次数
              rechargeTimes: 1
            },
        ]
      }
    },
    methods: {
      ok(){
          var czItems = '';
          var hdItems = '';
          var consItems = '';
          var oldNewItems = '';
          var ddProjectItems = '';
          for(var i = 0; i < this.selectedCZactivites.length; i++){
            czItems = czItems + this.selectedCZactivites[i]+",";
          }
          czItems = czItems.substring(0,czItems.length-1);
          for(var j = 0; j < this.selectedActivities.length; j++){
            hdItems = hdItems + this.selectedActivities[j]+",";
          }
          hdItems = hdItems.substring(0,hdItems.length-1);
          for(var k = 0; k < this.hkProjects.length; k++){
            consItems = consItems + this.hkProjects[k].hkProject+",";
          }
          consItems = consItems.substring(0,consItems.length-1);
          for(var l = 0; l < this.selectedActivityProjects.length; l++){
            ddProjectItems = ddProjectItems + this.selectedActivityProjects[l]+",";
          }
          ddProjectItems = ddProjectItems.substring(0,ddProjectItems.length-1);
          for(var m = 0; m < this.selectedDDRules.length; m++){
            oldNewItems = oldNewItems + this.selectedDDRules[m]+",";
          }
          oldNewItems = oldNewItems.substring(0,oldNewItems.length-1);
          // 充值赠送项目
          if(czItems.indexOf("充值赠送项目")>-1){
            var activityCardRechargeItems = this.czGiveProjectList;
          }else{
            var activityCardRechargeItems = [];
          }

          // 充值赠送产品
          if(czItems.indexOf("充值赠送产品")>-1){
            var activityCardRechargeGifts = this.czGiveProductList;
          }else{
            var activityCardRechargeGifts = [];
          }

          // 充值摇奖活动
          if(czItems.indexOf("充值摇奖")>-1){
          var activityCardRechargeLotteries = this.yjTimeList;
          }else{
            var activityCardRechargeLotteries = [];
          }

        var activityCard = {
              storeId: this.$route.params.id,
              // 活动名称
              actiName: this.actiName,
              // 选择活动类型, 推荐使用数字代替，1:到店，2：充值 ...
              actiType: hdItems,
              // 挑选出 ? 个基础功效类项目
              basicItem: this.ddAct.ddProNumber,
              // 原价 ? 元
              itemPrice: this.ddAct.ddOriPrice,
              // 活动价 ? 元
              actiPrice: this.ddAct.ddActPrice,
              // 每周完成 ? 个项目
              countItem: this.ddAct.ddActNumber,
              // ? 周内全部耗完
              expirDate: this.ddAct.ddDurTime,
              // 推荐使用数字, 1：超微气泡 ...
              actiItems: ddProjectItems,
              // 推荐使用数字, 1：老客户 ...
              actiDescs: oldNewItems,
              // 下面的几个属性，有可能为空，如果为空的话，留空字符串就好
              // 新客户可以以 ? 元购买
              ncusPrice: this.ddAct.special,
              // 并且新顾客首次成交额的 ? %可现金或返卡方式回馈老顾客
              ncusDiscount: this.ddAct.specialNew,
              // 耗卡活动, ? 周内做完
              consExpDate: this.hkAct.weeks,
              // ? 个项目
              consItem: this.hkAct.projects,
              // 从第 ? 次开始赠送相应项目或者产品
              consTime: this.hkAct.fromProjects,
              // 充值活动，推荐使用数字，1：充值赠送项目
              rechItems: czItems,
              consItems: consItems
          };

          var params = {
              storeId: this.$route.params.id,
              activityCard: activityCard,
              activityCardRechargeItems: activityCardRechargeItems,
              activityCardRechargeGifts: activityCardRechargeGifts,
              activityCardRechargeLotteries: activityCardRechargeLotteries
          };
          //console.log(JSON.parse(JSON.stringify(params)));
          let URL = saveactivity();
                this.$ajax({
                  method: 'POST',
                  dataType: 'JSON',
                  contentType: 'application/json;charset=UTF-8',
                  headers: {
                    "authToken": sessionStorage.getItem('authToken')
                  },
                  data: params,
                  url: URL,
                }).then((res) => {
                  this.$Message.success('操作成功');
                  this.addF=false;
                  this.getData();
                }).catch((error) => {
                  this.$Message.error('操作失败');
                });
      },
      close(){
        this.addF = false;
      },
      mannger(data){
        this.actiName = data.actiName;
        this.ddAct = {
          ddProNumber: data.basicItem,
          ddOriPrice: data.itemPrice,
          ddActPrice: data.actiPrice,
          ddActNumber: data.countItem,
          ddDurTime: data.expirDate,
          special: data.ncusPrice,
          specialNew: data.ncusDiscount
        };
        this.hkAct = {
          weeks: data.consExpDate,
          projects: data.consItem,
          fromProjects: data.consTime
        };
        this.addF = true;
        if(data.actiType.indexOf("耗卡")>-1){
          this.showHK = true;
          //this.selectedActivities.push("耗卡");
        }else{
          this.showHK = false;
        }
        if(data.actiType.indexOf("到店")>-1){
          this.showDD = true;
          //this.selectedActivities.push("到店");
        }else{
          this.showDD = false;
        }
        if(data.actiType.indexOf("充值")>-1){
          this.showCZ = true;
          //this.selectedActivities.push("充值");
        }else{
          this.showCZ = false;
        }
        if(data.rechItems.indexOf("充值赠送项目")>-1){
          this.showGiveProject = true;
        }else{
          this.showGiveProject = false;
        }
        if(data.rechItems.indexOf("充值赠送产品")>-1){
          this.showGiveProductP = true;
        }else{
          this.showGiveProductP = true;
        }
        if(data.rechItems.indexOf("充值摇奖")>-1){
          this.showczYj = true;
        }else{
          this.showczYj = false;
        }
        this.hkProjects = [];
        var consItems = '';
        consItems = data.consItems.split(',');
        for(var i = 0; i < consItems.length; i++){
          var currentHKprojects = {hkNumber: (parseInt(this.hkAct.fromProjects)+i),hkProject: consItems[i]};
            this.hkProjects.push(currentHKprojects);
        }
        console.log(JSON.parse(JSON.stringify(this.hkProjects)));
        this.selectedActivityProjects = data.actiItems.split(',');
        this.selectedCZactivites = data.rechItems.split(',');
        this.selectedActivities = data.actiType.split(',');
        this.selectedDDRules = data.actiDescs.split(',');
        this.czGiveProjectList = data.activityCardRechargeItems;
        this.czGiveProductList = data.activityCardRechargeGifts;
        this.yjTimeList = data.activityCardRechargeLotteries;
      },
      Add(){
        this.addF = true;
        this.showDD = false;
        this.showHK = false;
        this.showCZ = false;
        this.actiName = '';
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
        this.consItems = '';
        this.czGiveProjectList = [
          {
              // 写错也没有关系，后台会校验重设              
              storeId: this.$route.params.id,
              // 与活动卡项目关联的id，后台会设置，直接写 0 即可 
              actCardId: 0,
              // 充值 ? 元
              presentMoney: '',
              // 赠送项目选项，推荐使用数字，1：超微气泡 ...
              presentItem: ''
            }
        ];
        this.czGiveProductList = [
          {
              // 写错也没有关系，后台会校验重设  
              storeId: this.$route.params.id,
              // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
              actCardId: 0,
              // 选择产品，推荐使用数字，1：产品一，2：产品二
              presentGift: '',
              // 价格 ? 元
              presentMoney: ''
            }
        ];
        this.yjTimeList = [
          {
              // 写错也没有关系，后台会校验重设              
              storeId: this.$route.params.id,
              // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
              actCardId: 0,
              // 充值 ? 元可以转盘摇奖 1 次
              rechargeMoney: '',
              //摇奖次数
              rechargeTimes: 1
            }
        ];
      },
      getData() {
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findactivity()+'/'+this.$route.params.id,
          }).then((res) => {
            this.data = res.data.activityCardInfo;
            for(var i=0;i<this.data.length;i++){
              this.data[i].rechItems = this.data[i].rechItems.replace("czGiveProject","充值赠送项目");
              this.data[i].rechItems = this.data[i].rechItems.replace("czGiveProduct","充值赠送产品");
              this.data[i].rechItems = this.data[i].rechItems.replace("czYJ","充值摇奖");
            }
          }).catch((error) => {
            this.$Message.error('获取失败');
          });
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
          if(checkRuleString.indexOf("老带新")>-1){
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
          if(checkCZString.indexOf("充值赠送项目")>-1){
            this.showGiveProject = true;
          }else{
            this.showGiveProject = false;
          }
          if(checkCZString.indexOf("充值赠送产品")>-1){
            this.showGiveProduct = true;
          }else{
            this.showGiveProduct = false;
          }
          if(checkCZString.indexOf("充值摇奖")>-1){
            this.showczYj = true;
          }else{
            this.showczYj = false;
          }
        },
        deleteGiveProject(index){
          if(this.czGiveProjectList.length == 1){
            this.czGiveProjectList = [
                {
                  // 写错也没有关系，后台会校验重设              
                  storeId: this.$route.params.id,
                  // 与活动卡项目关联的id，后台会设置，直接写 0 即可 
                  actCardId: 0,
                  // 充值 ? 元
                  presentMoney: '',
                  // 赠送项目选项，推荐使用数字，1：超微气泡 ...
                  presentItem: ''
                }
            ];
          }else{
            this.czGiveProjectList.splice(index,1);
          }
        },
        deleteGiveProduct(index){
          if(this.czGiveProductList.length == 1){
            this.czGiveProductList = [
                {
                  // 写错也没有关系，后台会校验重设              
                  storeId: this.$route.params.id,
                  // 与活动卡项目关联的id，后台会设置，直接写 0 即可 
                  actCardId: 0,
                  // 充值 ? 元
                  presentMoney: '',
                  // 赠送项目选项，推荐使用数字，1：超微气泡 ...
                  presentItem: ''
                }
            ];
          }else{
            this.czGiveProductList.splice(index,1);
          }
        },
        deleteCZYJ(index){
          if(this.yjTimeList.length == 1){
            this.yjTimeList = [
                {
                  // 写错也没有关系，后台会校验重设              
                  storeId: this.$route.params.id,
                  // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
                  actCardId: 0,
                  // 充值 ? 元可以转盘摇奖 1 次
                  rechargeMoney: '',
                  //摇奖次数
                  rechargeTimes: 1
                }
            ];
          }else{
            this.yjTimeList.splice(index,1);
          }
        },
        del(data) {
          var c = confirm('确认删除？');
            if(!c) {
              return false;
            }
            this.$ajax({
              method: 'get',
              url: deleteactivity()+'/'+this.$route.params.id+'?actiName='+data.actiName,
            }).then( (res) =>{
              this.$Message.success('删除成功');
              this.getData();
            }).catch( (res) =>{
              this.$Message.error('删除失败');
            })
          },
        addGiveProject(){
          var curretGiveProject = {
              // 写错也没有关系，后台会校验重设              
              storeId:this.$route.params.id,
              // 与活动卡项目关联的id，后台会设置，直接写 0 即可 
              actCardId: 0,
              // 充值 ? 元
              presentMoney: '',
              // 赠送项目选项，推荐使用数字，1：超微气泡 ...
              presentItem: ''
            };
          this.czGiveProjectList.push(curretGiveProject);
        },
        addGiveProduct(){
          var currentGiveProduct = {
              // 写错也没有关系，后台会校验重设  
              storeId: this.$route.params.id,
              // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
              actCardId: 0,
              // 选择产品，推荐使用数字，1：产品一，2：产品二
              presentGift: '',
              // 价格 ? 元
              presentMoney: ''
            }
          this.czGiveProductList.push(currentGiveProduct);
        },
        addCZYJ(){
          var currentYjTime = {
            // 写错也没有关系，后台会校验重设              
            storeId: this.$route.params.id,
            // 与活动卡项目关联的 id，后台会设置，直接写 0 即可
            actCardId: 0,
            // 充值 ? 元可以转盘摇奖 1 次
            rechargeMoney: '',
            //摇奖次数
            rechargeTimes: this.yjTimeList.length+1
          };
          this.yjTimeList.push(currentYjTime);
        }
    },
    created(){
      this.getList();
      this.getData();
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
