<template>
  <div style="padding: 1rem">
    <h2 style="padding: .6rem;">顾客管理</h2>
    <Button class="hy_btn" @click="save">保存规则</Button>
    <div class="content">
      <Row>
        <h3 class="title">指定顾客管理</h3>
          <Col span="12">
            <h4 class="titleB">指定条件</h4>
             <Checkbox label="1" v-model="data.clientManage.exclusiveness">排他性点单</Checkbox>
             <Checkbox label="2" v-model="data.clientManage.technicianServe" @on-change="changeTechnicianServe">某技师连续服务<InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientManage.technicianServeTimes" v-show="!data.clientManage.technicianServe" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" v-show="data.clientManage.technicianServe" size="small" class="inputext" placeholder="填写" v-model.number="data.clientManage.technicianServeTimes"/> 次</Checkbox>
             <Checkbox label="3" v-model="data.clientManage.designatedCliIntro">有指定的顾客介绍</Checkbox>
             <Checkbox label="4" v-model="data.clientManage.technicianDirExten">技师直接拓客</Checkbox>
          </Col>
          <Col span="12">
            <h4 class="titleB">非指定条件</h4>
             <Checkbox label="5" v-model="data.clientManage.clientComplaint">顾客投诉</Checkbox>
             <Checkbox label="6" v-model="data.clientManage.continuousServe" @on-change="changeContinuousServe">连续被他人服务<InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientManage.continuousServeTimes" v-show="!data.clientManage.continuousServe" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientManage.continuousServe" type="number" class="inputext" placeholder="填写" v-model.number="data.clientManage.continuousServeTimes"/> 次</Checkbox>
             <Checkbox label="7" v-model="data.clientManage.clientConNostore" @on-change="changeClientConNostore">顾客连续 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientManage.clientConNostoreMoth" v-show="!data.clientManage.clientConNostore" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientManage.clientConNostore" type="number" class="inputext" placeholder="填写" v-model.number="data.clientManage.clientConNostoreMoth"/> 个月不到店</Checkbox>
             <Checkbox label="8" v-model="data.clientManage.clientConNocash" @on-change="changeClientConNocash">顾客连续 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientManage.clientConNocashMoth" v-show="!data.clientManage.clientConNocash" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientManage.clientConNocash" type="number" class="inputext" placeholder="填写" v-model.number="data.clientManage.clientConNocashMoth"/> 个月无现金</Checkbox>
          </Col>
      </Row>
    </div>
  <div class="content">
      <Row>
        <h3 class="title">直接到店顾客员工护理顺序</h3>
        <Col span="24">
          <span>第一规则：</span>
          <Select style="width:100px" v-model="RA" @on-change="selectFirst">
              <Option v-for="item in firstRule" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <span style="margin-left:2%">第二规则：</span>
          <Select v-show="!enableSec" style="width:100px;" disabled>
          </Select>
          <Select v-show="enableSec" style="width:100px" v-model="RB" @on-change="selectSecond">
              <Option v-for="item in secondRule" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <span style="margin-left:2%">第三规则：</span>
          <Select v-show="!enableThi" style="width:100px" disabled>
          </Select>
          <Select v-show="enableThi" style="width:100px" v-model="RC" @on-change="selectThird">
              <Option v-for="item in thirdRule" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
          <span style="margin-left:2%">第四规则：</span>
          <Select v-show="!enableFou" style="width:100px" disabled>
          </Select>
          <Select v-show="enableFou" style="width:100px" v-model="RD" @on-change="selectFourth">
              <Option v-for="item in fourthRule" :value="item.value" :key="item.value">{{item.label}}</Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">顾客分类
           <Checkbox label="9" v-model="data.clientClassify.active">激活</Checkbox>
        </h3>
        <Col span="8">
          <h4 class="titleB">客户分级 <Checkbox v-show="!data.clientClassify.active" label="12" disabled>启用</Checkbox><Checkbox v-show="data.clientClassify.active" label="12" v-model="data.clientClassify.clientLevel">启用</Checkbox></h4>
          <div>A类</div>
          <div>B类</div>
          <div>C类</div>
        </Col>
        <Col span="8">
          <h4 class="titleB">消费实力</h4>
           <Checkbox label="13" v-show="!data.clientClassify.active" disabled>大客户（连续<input  type="text" class="inputext" placeholder="填写" disabled/>个月，消费达 <InputNumber :max="1000" :min="0" size="small" type="text" class="inputext" placeholder="填写" disabled/> 元）</Checkbox>
           <Checkbox label="13" v-show="data.clientClassify.active" v-model="data.clientClassify.clientBig"@on-change="changeClientBig">大客户（连续<InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientBigMoth" v-show="!data.clientClassify.clientBig" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data. clientClassify.clientBig" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientBigMoth"/>个月，消费达 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientBigConsume" v-show="!data. clientClassify.clientBig" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data. clientClassify.clientBig" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientBigConsume"/> 元）</Checkbox>
           <!--<Checkbox label="14" v-model="data.ordinaryCustomer">普通客户（消费不足 <input type="text" class="inputext" placeholder="填写" v-model="data.ordinaryCustomerN"/> 元）</Checkbox>-->
        </Col>
        <Col span="8">
          <h4 class="titleB">客户活跃度</h4>
           <Checkbox v-show="!data.clientClassify.active" label="15" v-model="data.clientClassify.clientFrequent" disabled>常到店客户 （连续 <InputNumber :max="1000" :min="0" size="small" type="text" class="inputext" placeholder="填写" disabled/> 月至少到店<InputNumber :max="1000" :min="0" size="small" type="text" class="inputext" placeholder="填写" disabled/>次）</Checkbox>
           <Checkbox v-show="data.clientClassify.active" label="15" v-model="data.clientClassify.clientFrequent" @on-change="changeClientFrequent">常到店客户 （连续 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientFrequentMoth" v-show="!data.clientClassify.clientFrequent" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientClassify.clientFrequent" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientFrequentMoth"/> 月至少到店<InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientFrequentTimes" v-show="!data.clientClassify.clientFrequent" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientClassify.clientFrequent" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientFrequentTimes"/>次）</Checkbox>
           <Checkbox style="margin-top:1%;" v-show="!data.clientClassify.active" label="15" disabled>睡眠客户 （连续 <InputNumber :max="1000" :min="0" size="small" type="text" class="inputext" placeholder="填写" disabled/> 月以上未到店）</Checkbox>
           <Checkbox style="margin-top:1%;" v-show="data.clientClassify.active" label="15" v-model="data.clientClassify.clientDormancy" @on-change="changeClientDormancy">睡眠客户 （连续 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientDormancyMoth" v-show="!data.clientClassify.clientDormancy" type="text" class="inputext" placeholder="填写" disabled/>
           <InputNumber :max="1000" :min="0" size="small" v-show="data.clientClassify.clientDormancy" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientDormancyMoth"/> 月以上未到店）</Checkbox><br/>
           <Checkbox style="margin-top:1%;" v-show="!data.clientClassify.active" label="15" disabled>冻结客户 （连续 <InputNumber :max="1000" :min="0" size="small" type="text" class="inputext" placeholder="填写" disabled/> 月以上未到店）</Checkbox>
           <Checkbox style="margin-top:1%;" v-show="data.clientClassify.active" label="15" v-model="data.clientClassify.clientFrozen" @on-change="changeClientFrozen">冻结客户 （连续 <InputNumber :max="1000" :min="0" size="small" v-model.number="data.clientClassify.clientFrozenTimes" v-show="!data.clientClassify.clientFrozen" type="text" class="inputext" placeholder="填写" disabled/><InputNumber :max="1000" :min="0" size="small" v-show="data.clientClassify.clientFrozen" type="number" class="inputext" placeholder="填写" v-model.number="data.clientClassify.clientFrozenTimes"/> 月以上未到店）</Checkbox>
        </Col>
      </Row>
    </div>
    <div class="content">
      <Row>
        <h3 class="title">客户分析
           <Checkbox label="16" v-model="data.active" disabled>激活</Checkbox>
        </h3>
        <Col span="4">
          <h4 class="titleB">性格分析</h4>
           <Checkbox v-show="!data.active" label="17" disabled>血型</Checkbox>
           <Checkbox v-show="data.active" label="17" v-model="data.bloodType">血型</Checkbox>
           <Checkbox v-show="!data.active" label="18" disabled>星座</Checkbox>
           <Checkbox v-show="data.active" label="18" v-model="data.constellation">星座</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">客户分析</h4>
           <Checkbox v-show="!data.active" label="19" disabled>收入方式</Checkbox>
           <Checkbox v-show="data.active" label="19" v-model="data.incomeMode">收入方式</Checkbox>
           <Checkbox v-show="!data.active" label="20" disabled>年收入</Checkbox>
           <Checkbox v-show="data.active" label="20" v-model="data.annualIncome">年收入</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">愿景目的</h4>
           <Checkbox v-show="!data.active" label="21" disabled>到美容院的目的</Checkbox>
           <Checkbox v-show="data.active" label="21" v-model="data.objective">到美容院的目的</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">症状问题</h4>
           <Checkbox v-show="!data.active" label="22" disabled>面部</Checkbox>
           <Checkbox v-show="data.active" label="22" v-model="data.face">面部</Checkbox>
           <Checkbox v-show="!data.active" label="23" disabled>身体</Checkbox>
           <Checkbox v-show="data.active" label="23" v-model="data.body">身体</Checkbox>
        </Col>
        <Col span="4">
          <h4 class="titleB">原因</h4>
           <Checkbox v-show="!data.active" label="24" disabled>内因</Checkbox>
           <Checkbox v-show="data.active" label="24" v-model="data.internalCause">内因</Checkbox>
           <Checkbox v-show="!data.active" label="25" disabled>外因</Checkbox>
           <Checkbox v-show="data.active" label="25" v-model="data.externalcause">外因</Checkbox>
        </Col>
      </Row>
    </div>

    <Button class="hy_btn" @click="save">保存规则</Button>

  </div>
</template>

<script type="text/ecmascript-6">

  import { findStoreById, editStoreCustomer } from '../../interface';
  import m_index_info_gl from '../store/m_index_info_gl';

  export default {
    name: 'c_index',
    components: {m_index_info_gl},
    data(){
      return {
        firstRule: [
            {
                value: '1',
                label: '指定技师',
            },
            {
                value: '2',
                label: '上次服务者',
            },
            {
                value: '3',
                label: '服务最多者',
            },
            {
                value: '4',
                label: '店长指定',
            }
        ],
        secondRule:[
            {
                value: '1',
                label: '指定技师',
            },
            {
                value: '2',
                label: '上次服务者',
            },
            {
                value: '3',
                label: '服务最多者',
            },
            {
                value: '4',
                label: '店长指定',
            }
            ],
        thirdRule:[
            {
                value: '1',
                label: '指定技师',
            },
            {
                value: '2',
                label: '上次服务者',
            },
            {
                value: '3',
                label: '服务最多者',
            },
            {
                value: '4',
                label: '店长指定',
            }
            ],
        fourthRule:[
            {
                value: '1',
                label: '指定技师',
            },
            {
                value: '2',
                label: '上次服务者',
            },
            {
                value: '3',
                label: '服务最多者',
            },
            {
                value: '4',
                label: '店长指定',
            }],
        RA: '',
        RB: '',
        RC: '',
        RD: '',
        currentFirst : '',
        currentSecond : '',
        currentThird : '',
        currentFourth : '',
        enableSec : false,
        enableThi : false,
        enableFou : false,
        data: {
          clientManage: {
              // 门店 id, 本地测试可以使用 24, 服务器可使用 22
              storeId: this.$route.params.id,
              // 排他性点单, 1 为选中, 0 为不选中
              exclusiveness: 0,
              // 某技师连续服务, 1 为选中, 0 为不选中
              technicianServe: 0,
              // 某技师连续服务次数
              technicianServeTimes: '',
              // 有指定的顾客介绍, 1 为选中, 0 为不选中
              designatedCliIntro: 0,
              // 技师直接拓客, 1 为选中, 0 为不选中
              technicianDirExten: 0,
              // 顾客投诉, 1 为选中, 0 为不选中
              clientComplaint: 0,
              // 连续被他人服务, 1 为选中, 0 为不选中
              continuousServe: 0,
              // 连续被他人服务次数
              continuousServeTimes: '',
              // 顾客连续不到店, 1 为选中, 0 为不选中
              clientConNostore: 0,
              // 顾客连续几个月不到店
              clientConNostoreMoth: '',
              // 顾客连续无现金, 1 为选中, 0 为不选中
              clientConNocash: 0,
              // 顾客连续几个月无现金
              clientConNocashMoth: ''
          },
          clientRule: {
              // 门店 id, 本地测试可以使用 24, 服务器可使用 22
              storeId: this.$route.params.id, 
              ruleOne: '',
              ruleTwo: '',
              ruleThree: '',
              ruleFour: ''
          },
          clientClassify: { 
              // 门店 id, 本地测试可以使用 24, 服务器可使用 22
              storeId: this.$route.params.id, 
              // 激活顾客分类, 1 为选中, 0 为不选中
              active: 0,
              // 客户分级, 1 为选中, 0 为不选中
              clientLevel: 0,
              // 消费实力 大客户, 1 为选中, 0 为不选中
              clientBig: 0,
              // 大客户连续几个月消费
              clientBigMoth: '',
              // 大客户连续几个月消费金额
              clientBigConsume: '',
              // 常到客户, 1 为选中, 0 为不选中
              clientFrequent: 0,
              // 常到客户连续几个月到店
              clientFrequentMoth: '',
              // 常到客户连续几个月至少到店次数
              clientFrequentTimes: '',
              // 睡眠客户, 1 为选中, 0 为不选中
              clientDormancy: 0,
              // 睡眠客户连续几个月以上未到店
              clientDormancyMoth: '',
              // 冻结客户, 1 为选中, 0 为不选中
              clientFrozen: 0,
              // 冻结客户连续几个月以上未到店
              clientFrozenTimes: ''
          }
        }
      };
    },
    created() {
      this.findStore();
    },
    methods: {
      selectFirst(item){
          if(item == this.RB){
            this.RB = this.currentFirst;
            this.currentSecond = this.currentFirst;
            this.currentFirst = item;
          }else if(item == this.RC){
            this.RC = this.currentFirst;
            this.currentThird = this.currentFirst;
            this.currentFirst = item;
          }else if(item == this.RD){
            this.RD = this.currentFirst;
            this.currentFourth = this.currentFirst;
            this.currentFirst = item;
          }else{
            this.currentFirst = item;
          }
          this.enableSec = true;
      },
      selectSecond(item){
          if(item == this.RA){
            this.RA = this.currentSecond;
            this.currentFirst = this.currentSecond;
            this.currentSecond = item;
          }else if(item == this.RC){
            this.RC = this.currentSecond;
            this.currentThird = this.currentSecond;
            this.currentSecond = item;
          }else if(item == this.RD){
            this.RD = this.currentSecond;
            this.currentFourth = this.currentSecond;
            this.currentSecond = item;
          }else{
            this.currentSecond = item;
          }
          this.enableThi = true;
      },
      selectThird(item){
          if(item == this.RA){
            this.RA = this.currentThird;
            this.currentSecond = this.currentThird;
            this.currentThird = item;
          }else if(item == this.RB){
            this.RB = this.currentThird;
            this.currentSecond = this.currentThird;
            this.currentThird = item;
          }else if(item == this.RD){
            this.RD = this.currentThird;
            this.currentFourth = this.currentThird;
            this.currentThird = item;
          }else{
            this.currentThird = item;
          }
          this.enableFou = true;
      },
      selectFourth(item){
          if(item == this.RA){
            this.RA = this.currentFourth;
            this.currentFirst = this.currentFourth;
            this.currentFourth = item;
          }else if(item == this.RB){
            this.RB = this.currentFourth;
            this.currentSecond = this.currentFourth;
            this.currentFourth = item;
          }else if(item == this.RC){
            this.RC = this.currentFourth;
            this.currentThird = this.currentFourth;
            this.currentFourth = item;
          }else{
            this.currentFourth = item;
          }
      },
      findStore() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findStoreById()+"/"+this.$route.params.id,
        }).then((res) => {
          if(res.data.clientManageInfo.clientRule != null && res.data.clientManageInfo.clientManage != null && res.data.clientManageInfo.clientClassify != null){
            this.data.clientManage = res.data.clientManageInfo.clientManage;
            this.data.clientManage.exclusiveness = this.transferBack(this.data.clientManage.exclusiveness);
            this.data.clientManage.technicianServe = this.transferBack(this.data.clientManage.technicianServe);
            this.data.clientManage.designatedCliIntro = this.transferBack(this.data.clientManage.designatedCliIntro);
            this.data.clientManage.technicianDirExten = this.transferBack(this.data.clientManage.technicianDirExten);
            this.data.clientManage.clientComplaint = this.transferBack(this.data.clientManage.clientComplaint);
            this.data.clientManage.continuousServe = this.transferBack(this.data.clientManage.continuousServe);
            this.data.clientManage.clientConNostore = this.transferBack(this.data.clientManage.clientConNostore);
            this.data.clientManage.clientConNocash = this.transferBack(this.data.clientManage.clientConNocash);
            this.RA = res.data.clientManageInfo.clientRule.ruleOne;
            this.RB = res.data.clientManageInfo.clientRule.ruleTwo;
            this.RC = res.data.clientManageInfo.clientRule.ruleThree;
            this.RD = res.data.clientManageInfo.clientRule.ruleFour;
            this.data.clientClassify = res.data.clientManageInfo.clientClassify;
            this.data.clientClassify.active = this.transferBack(this.data.clientClassify.active);
            this.data.clientClassify.clientLevel = this.transferBack(this.data.clientClassify.clientLevel);
            this.data.clientClassify.clientBig = this.transferBack(this.data.clientClassify.clientBig);
            this.data.clientClassify.clientFrequent = this.transferBack(this.data.clientClassify.clientFrequent);
            this.data.clientClassify.clientDormancy = this.transferBack(this.data.clientClassify.clientDormancy);
            this.data.clientClassify.clientFrozen = this.transferBack(this.data.clientClassify.clientFrozen);
            this.enableSec = true;
            this.enableThi = true;
            this.enableFou = true;
            }
          }).catch((error) => {
        });
      },
      transfer(b){
        if(b == true){
          return 1;
        }else{
          return 0;
        }
      },
      changeTechnicianServe(){
        if(this.data.clientManage.technicianServe == false){
          this.data.clientManage.technicianServeTimes = '';
        }
      },
      changeContinuousServe(){
        if(this.data.clientManage.continuousServe == false){
          this.data.clientManage.continuousServeTimes = '';
        }
      },
      changeClientConNostore(){
        if(this.data.clientManage.clientConNostore == false){
          this.data.clientManage.clientConNostoreMoth = '';
        }
      },
      changeClientConNocash(){
        if(this.data.clientManage.clientConNocash == false){
          this.data.clientManage.clientConNocashMoth = '';
        }
      },
      changeClientBig(){
        if(this.data.clientClassify.clientBig == false){
          this.data.clientClassify.clientBigMoth = '';
          this.data.clientClassify.clientBigConsume = '';
        }
      },
      changeClientFrequent(){
        if(this.data.clientClassify.clientFrequent == false){
          this.data.clientClassify.clientFrequentMoth = '';
          this.data.clientClassify.clientFrequentTimes = '';
        }
      },
      changeClientDormancy(){
        if(this.data.clientClassify.clientDormancy == false){
          this.data.clientClassify.clientDormancyMoth = '';
        }
      },
      changeClientFrozen(){
        if(this.data.clientClassify.clientFrozen == false){
          this.data.clientClassify.clientFrozenTimes = '';
        }
      },
      transferBack(c){
        if(c == 1){
          return true;
        }else{
          return false;
        }
      },
      save() {
        var validateMessage = '';
        this.data.clientRule.ruleOne = this.RA;
        this.data.clientRule.ruleTwo = this.RB;
        this.data.clientRule.ruleThree = this.RC;
        this.data.clientRule.ruleFour = this.RD;
        this.data.clientManage.exclusiveness = this.transfer(this.data.clientManage.exclusiveness);
        this.data.clientManage.technicianServe = this.transfer(this.data.clientManage.technicianServe);
        this.data.clientManage.designatedCliIntro = this.transfer(this.data.clientManage.designatedCliIntro);
        this.data.clientManage.technicianDirExten = this.transfer(this.data.clientManage.technicianDirExten);
        this.data.clientManage.clientComplaint = this.transfer(this.data.clientManage.clientComplaint);
        this.data.clientManage.continuousServe = this.transfer(this.data.clientManage.continuousServe);
        this.data.clientManage.clientConNostore = this.transfer(this.data.clientManage.clientConNostore);
        this.data.clientManage.clientConNocash = this.transfer(this.data.clientManage.clientConNocash);
        this.data.clientClassify.active = this.transfer(this.data.clientClassify.active);
        this.data.clientClassify.clientLevel = this.transfer(this.data.clientClassify.clientLevel);
        this.data.clientClassify.clientBig = this.transfer(this.data.clientClassify.clientBig);
        this.data.clientClassify.clientFrequent = this.transfer(this.data.clientClassify.clientFrequent);
        this.data.clientClassify.clientDormancy = this.transfer(this.data.clientClassify.clientDormancy);
        this.data.clientClassify.clientFrozen = this.transfer(this.data.clientClassify.clientFrozen);
        var params = {
              // 门店 id, 本地测试可以使用 24, 服务器可使用 22
              storeId: this.$route.params.id,
              clientManage: this.data.clientManage,
              clientRule: this.data.clientRule,
              clientClassify: this.data.clientClassify
          };
        if(this.data.clientManage.technicianServe == 1 && this.data.clientManage.technicianServeTimes == '') { 
          validateMessage = validateMessage + "请输入指定条件：某技师连续服务次数。<br/>";
        }
        if(this.data.clientManage.continuousServe == 1 && this.data.clientManage.continuousServeTimes == '') { 
          validateMessage = validateMessage + "请输入非指定条件：连续被他人服务次数。<br/>";
        }
        if(this.data.clientManage.clientConNostore == 1 && this.data.clientManage.clientConNostoreMoth == '') { 
          validateMessage = validateMessage + "请输入非指定条件：顾客连续不到店次数。<br/>";
        }
        if(this.data.clientManage.clientConNocash == 1 && this.data.clientManage.clientConNocashMoth == '') { 
          validateMessage = validateMessage + "请输入非指定条件：顾客连续无现金月数。<br/>";
        }
        if(this.data.clientClassify.clientBig == 1) { 
          if(this.data.clientClassify.clientBigMoth == '' || this.data.clientClassify.clientBigConsume == ''){
            validateMessage = validateMessage + "请输入大客户消费实力连续消费月份，金额。<br/>";
          }
        }
        if(this.data.clientClassify.clientFrequent == 1) { 
          if(this.data.clientClassify.clientFrequentMoth == '' || this.data.clientClassify.clientFrequentTimes == ''){
            validateMessage = validateMessage + "请输入客户活跃度常到店月份次数。<br/>";
          }
        }
        if(this.data.clientClassify.clientDormancy == 1 && this.data.clientClassify.clientDormancyMoth == '') { 
          validateMessage = validateMessage + "请输入睡眠客户月数。<br/>";
        }
        if(this.data.clientClassify.clientFrozen == 1 && this.data.clientClassify.clientFrozenTimes == '') { 
          validateMessage = validateMessage + "请输入冻结客户月数。<br/>";
        }
        if(this.data.clientClassify.clientFrozen == 1 && this.data.clientClassify.clientFrozenTimes == '') { 
          validateMessage = validateMessage + "请输入常到店客户连续到店月份次数<br/>";
        }
        if(validateMessage != ''){
          this.$Message.error(validateMessage);
          validateMessage = '';
        }else{
          this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          data: params,
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: editStoreCustomer(),
          }).then((res) => {
            this.$Message.success('保存成功');
          }).catch((error) => {
            this.$Message.error('保存失败');
          });
        }
      }
    }
  };
</script>

<style scoped>
  .askText{
    widht:100%;
    word-wrap: break-word;
  }
  .title{
    border-bottom: 1px solid #eee;
    margin: 0 0 10px 0;
    padding-bottom: 10px;
  }
  .titleB{
    padding-bottom: 10px;
  }
  .content{
    border: 1px solid #e3e3e3;
    padding: 1rem;
    margin: 10px 0;
  }
  .inputext{
    width: 80px;
    margin: 0 3px;
    border: 1px solid #ccc;
  }
</style>
