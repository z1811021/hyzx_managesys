<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">拓客卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="addF" title="添加" :mask-closable="false">
      <div class='com' style="margin-left:-18px;">名称：<Input v-model="addData.cardName" style="width: 300px"></Input></div>
      <div class='com'>卡扣价格：<InputNumber :max="100000" :min="0" v-model="addData.deductPrice" style="width: 256px"></InputNumber> 元</div>
      <div class="com">现金价格：<InputNumber :max="100000" :min="0" v-model="addData.cashPrice" style="width: 256px"></InputNumber> 元</div>
      <div class='com'>有效期：<InputNumber :max="1000" :min="0" v-model="addData.expiredDay" placeholder="单位天" style="width: 268px"></InputNumber> 天</div>
      <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算业绩：</div>
      <br/>
      <br/>
           <Select v-model="isPerformance" :transfer=true slot="prepend" @on-change="changePerformance()" style="width: 80px" >
                <Option value="是"> 是</Option>
                <Option value="否"> 否</Option>
           </Select>
           <InputNumber :max="100000" :min="0" v-show="!showPerformance" v-model="addData.performanceMoney" style="width:232px" disabled></InputNumber>
           <InputNumber :max="100000" :min="0" v-show="showPerformance" v-model="addData.performanceMoney" style="width:232px" ></InputNumber> 元
        </div>
        <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算实操：</div>
        <br/>
        <br/>
            <Select v-model="isOperation" :transfer=true slot="prepend" style="width: 80px" @on-change="changeOperation()">
                  <Option value="是"> 是</Option>
                  <Option value="否"> 否</Option>
            </Select>
          <InputNumber :max="100000" :min="0" v-show="!showOperation" v-model="addData.operationMoney" style="width:232px" disabled></InputNumber>
          <InputNumber :max="100000" :min="0" v-show="showOperation" v-model="addData.operationMoney" style="width:232px" ></InputNumber> 元
       </div>
      <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算手工：</div>
      <br/>
      <br/>
          <Select v-model="isManual" :transfer=true slot="prepend" style="width: 80px" @on-change="changeManual()">
                  <Option value="是"> 是</Option>
                  <Option value="否"> 否</Option>
          </Select>
          <InputNumber :max="100000" :min="0" v-show="!showManual" v-model="addData.manualMoney" style="width:232px" disabled></InputNumber>
          <InputNumber :max="100000" :min="0" v-show="showManual" v-model="addData.manualMoney" style="width:232px" ></InputNumber> 元
       </div>

      <div class="project" style="margin-top:20px;">
        <h3 style="margin-left:-200px;">拓客项目<Button class="hy_btn" size="small" @click="Addproject" style="margin-left:42px;">添加</Button></h3>
        <div v-for="(item,index) in tkProjectList" class="projectone" :key="index">
          <div class='com'>项目：
            <Select v-model="item.itemType" ref="setTKQuery" clearable style="width:180px" placeholder="请选择拓客赠送项目" :transfer=true @on-change="changeTLproject(index)">
              <OptionGroup v-for="item in projectCategoryList" :value="item.projectCategory" :label="item.projectCategory" :key="item.projectCategory">
                <Option v-for="project in item.curProjectList" :value="project.id" :key="project.id">{{ project.itemName }} {{project.itemPrice}}</Option>
              </OptionGroup>

            </Select>
            &nbsp;次数：<InputNumber :max="100" :min="0" v-model="item.itemTimes" style="width: 50px"></InputNumber>
            <Button class="hy_btn" @click="deleteProject(index)">删除</Button>
          </div>
        </div>
      </div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 每周销售 <InputNumber :max="100" :min="0" v-model="addData.saleCardNum" size="small" style="width: 50px"/> 张，每张奖励<InputNumber :max="100000" :min="0" v-model="addData.rewardMoney" size="small" style="width: 50px"/> 元，超过每张奖励<InputNumber :max="100000" :min="0" v-model="addData.mRewardMoney" size="small" style="width: 70px"/> 元</div>
      </div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 首次进店微信预约转账 <InputNumber :max="100000" :min="0" v-model="addData.checkMoney" size="small" style="width: 50px"/> 元，体验抵 <InputNumber :max="100000" :min="0" v-model="addData.offsetMoney" size="small" style="width: 60px"/> 元，<div style="margin-top:10px;">充值抵 <InputNumber :max="100000" :min="0" v-model="addData.rechargeMoney" size="small" style="width: 60px"/> 元，均按照
          <Select v-model="addData.cardType" size="small" style="width:120px;" :transfer=true>
              <Option v-for="project in memberShowData" :value="project.cardName" :key="project.id">{{project.cardName}}</Option>
          </Select>会员最低抵扣体验护理。</div></div></div>
        <div slot="footer">
            <Button type="primary" @click="ok">添加</Button>
            <Button type="ghost" @click="close">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
import {findMembership,findProjectList,findExtension,saveExtension,editExtension,deleteExtension,findAllProject,findProjectListByGroup} from '../../interface'
    export default {
      name: "tk_m",
      data() {
        return {
          columns: [
            { title: '名称', key: 'cardName',},
            { title: '卡扣价格', key: 'deductPrice',},
            { title: '现金价格', key: 'cashPrice',},
            { title: '有效期(天)', key: 'expiredDay',},
            { title: '是否计算业绩', key: 'performance',
              render: (h, params) => {
                return h('div',params.row.isPerformance==1? '是':'否')
              }

            },
            { title: '是否计算实操', key: 'actualOperation',
              render: (h, params) => {
                return h('div',params.row.isOperation==1? '是':'否')
              }
            },
            { title: '是否计算手工', key: 'manualFee',
              render: (h, params) => {
                return h('div',params.row.isManual==1? '是':'否')
              }
            },
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
          addF: false,
          projectList: [],
          memberData: [],
          memberShowData: [],
          projectCategoryList: [],
          projectCategory: [],
          curProjectList: [],
          isPerformance: '',
          isOperation: '',
          isManual: '',
          showPerformance: false,
          showManual: false,
          showOperation: false,
          addData:{
              storeId: this.$route.params.id,
              // 名称
              cardName: '',
              // 卡扣价格
              deductPrice: '',
              // 现金价格
              cashPrice: '',
              // 有效期
              expiredDay: '',
              // 是否计算业绩, 0 否 1 是
              isPerformance: 0,
              // 业绩金额
              performanceMoney: 0,
              // 是否计算实操, 0 否 1 是
              isOperation: 0,
              // 实操金额
              operationMoney: 0,
              // 是否计算手工, 0 否 1 是
              isManual: 0,
              // 手工金额
              manualMoney: 0,
              // 每周销售 ? 张
              saleCardNum: '',
              // 每张奖励 ? 元
              rewardMoney: '',
              // 超过每张奖励 ? 元
              mRewardMoney: '',
              // 首次进店微信预约转账 ? 元
              checkMoney: '',
              // 体验抵 ? 元
              offsetMoney: '',
              // 充值抵 ? 元
              rechargeMoney: '',
              // 卡片类型, 推荐数字, 字符串也可以, 1 超白金卡, 2 钻石卡  ...
              cardType: '' 
          },
          tkProjectList: [
            {
              // 写错也没有关系, 后台会纠正
              storeId:this.$route.params.id,
              // 关联拓客卡的id, 写 0 就可以了
              extCardId: 0,
              // 项目类型, 推荐数字, 也可以传递字符串, 1 超微气泡 ...
              itemType: '',
              // 次数
              itemTimes: ''
            }],

          type: '',
          projectList:[],
        }
      },
      methods: {
        getList() {
            this.$ajax({
              method: 'GET',
              dataType: 'JSON',
              contentType: 'application/json;charset=UTF-8',
              headers: {
                "authToken": sessionStorage.getItem('authToken')
              },
              url: findProjectListByGroup()+'/'+this.$route.params.id,
            }).then((res) => {
              var wholeData = res.data.itemManage;
                for(var item in wholeData){ 
                    if(wholeData[item].length>0){
                        for (var i = 0; i < wholeData[item].length; i++) {
                          //wholeData[item][i].itemPrice = wholeData[item][i].itemPrice + '元';
                          this.projectList.push(wholeData[item][i]);
                        }
                        var curentProjectCategory = {"projectCategory":item,"curProjectList":wholeData[item]};
                        this.projectCategoryList.push(curentProjectCategory);
                    }
                }
                for(var j=0;j<this.projectList.length;j++){
                  this.projectList[j].itemPrice = this.projectList[j].itemPrice + "元/次";
                  this.projectList[j].courseTimes = this.projectList[j].courseTimes + "次";
                  this.projectList[j].coursePrice = this.projectList[j].coursePrice + "元";
                  this.projectList[j].itemInterval = this.projectList[j].courseInterval + "天";
                }
            }).catch((error) => {
              this.$Message.error('获取失败');
            });
          },
        changeTLproject(index){
          for(var i = 0; i < index; i++){
            if(this.tkProjectList[i].itemType == this.tkProjectList[index].itemType){
              var errorMessageName = "请不要选择重复的拓客赠送项目！";
              this.tkProjectList[index].itemType = '';
              //this.$refs.setTKQuery.$data.query = '';
              this.$Message.warning(errorMessageName);
            }
          }
        },
        getMember(){
          this.$ajax({
            method:'get',
            url: findMembership()+'/'+this.$route.params.id,
          }).then( (res) =>{
            if(res.data.memCardManageInfo == null){
              this.memberData = [];
            }else{
              this.memberData = res.data.memCardManageInfo;
              var currentItem = {};
                for(var i=0;i<this.memberData.length;i++){
                  this.memberData[i].memPrice = this.memberData[i].memPrice + "元";
                  this.memberData[i].singleDiscount = this.memberData[i].singleDiscount + "%";
                  this.memberData[i].productDiscount = this.memberData[i].productDiscount + "%";
                  this.memberData[i].expiryDate = this.memberData[i].expiryDate + "个月";
                  currentItem = {"cardName":this.memberData[i].cardName, "memPrice":this.memberData[i].memPrice,"id":''};
                  this.memberShowData.push(currentItem);
                }
                this.memberData.sort(this.compare);
                this.memberShowData.sort(this.compare);
              }
          }).catch( (error) =>{
            this.$Message.error('获取失败');
          })
        },
        compare(a,b) {
          if (a.memPrice < b.memPrice)
            return 1;
          if (a.memPrice > b.memPrice)
            return -1;
          return 0;
        },
        getData(){
          this.$ajax({
            method:'get',
            url: findExtension()+'/'+this.$route.params.id,
          }).then( (res) =>{
            console.log(res.data.extCardInfo);
            if(res.data.extCardInfo == null){
              this.data = [];
            }else{
              this.data = res.data.extCardInfo;
              for(var i=0;i<this.data.length;i++){
                this.data[i].deductPrice = this.data[i].deductPrice + "元";
                this.data[i].cashPrice = this.data[i].cashPrice + "元";
                this.data[i].expiredDay = this.data[i].expiredDay + "天";
              }
            }
          }).catch( (error) =>{
            this.$Message.error('获取失败');
          })
        },
        changePerformance(){
          if(this.isPerformance == "是"){
            this.showPerformance = true;
          }else if(this.isPerformance == "否"){
            this.showPerformance = false;
          }
        },
        changeOperation(){
          if(this.isOperation == "是"){
            this.showOperation = true;
          }else if(this.isOperation == "否"){
            this.showOperation = false;
          }
        },
        changeManual(){
          if(this.isManual == "是"){
            this.showManual = true;
          }else if(this.isManual == "否"){
            this.showManual = false;
          }
        },
        close(){
          this.addF = false;
        },
        transfer(b){
        if(b == "是"){
            return 1;
          }else{
            return 0;
          }
        },
        transferBack(c){
          if(c == 1){
            return "是";
          }else{
            return "否";
          }
        },
        ok() {
          this.addData.isPerformance = this.transfer(this.isPerformance);
          this.addData.isManual = this.transfer(this.isManual);
          this.addData.isOperation = this.transfer(this.isOperation);
          var params = {
              storeId: this.$route.params.id,
              extCard: this.addData,
              extCardItems: this.tkProjectList
          };
          var validateMessage = '';
            if(this.addData.cardName == '' || this.addData.cardName == null){
              validateMessage = validateMessage + "请输入拓客卡名称！<br/>";
            }
            if(this.addData.deductPrice == '' || this.addData.deductPrice == null){
              validateMessage = validateMessage + "请输入卡扣价格！<br/>";
            }
            if(this.addData.cashPrice == '' || this.addData.cashPrice == null){
              validateMessage = validateMessage + "请输入现金价格！<br/>";
            }
            if(this.addData.expiredDay == '' || this.addData.expiredDay == null){
              validateMessage = validateMessage + "请输入有效期！<br/>";
            }
            if(this.isPerformance == '' || this.isPerformance == null){
              validateMessage = validateMessage + "请选择是否计算业绩！<br/>";
            }
            if(this.addData.isPerformance == 1 && this.addData.isPerformance == '' || this.addData.rechargeMoney == null){
              validateMessage = validateMessage + "请输入业绩金额！<br/>";
            }
            if(this.isOperation == '' || this.isOperation == null){
              validateMessage = validateMessage + "请选择是否计算实操！<br/>";
            }
            if(this.addData.isOperation == 1 && this.addData.operationMoney == '' || this.addData.operationMoney == null){
              validateMessage = validateMessage + "请输入实操金额！<br/>";
            }
            if(this.isManual == '' || this.isManual == null){
              validateMessage = validateMessage + "请选择是否计算手工！<br/>";
            }
            if(this.addData.isManual == 1 && this.addData.manualMoney == '' || this.addData.manualMoney == null){
              validateMessage = validateMessage + "请输入手工金额！<br/>";
            }
            if(this.addData.saleCardNum == '' || this.addData.saleCardNum == null){
              validateMessage = validateMessage + "请输入每周销售多少张！<br/>";
            }
            if(this.addData.rewardMoney == '' || this.addData.rewardMoney == null){
              validateMessage = validateMessage + "请输入每张奖励多少元！<br/>";
            }
            if(this.addData.mRewardMoney == '' || this.addData.mRewardMoney == null){
              validateMessage = validateMessage + "请输入超过每张奖励多少元！<br/>";
            }
            if(this.addData.checkMoney == '' || this.addData.checkMoney == null){
              validateMessage = validateMessage + "请输入首次进店微信预约转账多少元！<br/>";
            }
            if(this.addData.offsetMoney == '' || this.addData.offsetMoney == null){
              validateMessage = validateMessage + "请输入体验抵扣多少元！<br/>";
            }
            if(this.addData.rechargeMoney == '' || this.addData.rechargeMoney == null){
              validateMessage = validateMessage + "请输入充值抵扣多少元！<br/>";
            }
            if(this.addData.cardType == '' || this.addData.cardType == null){
              validateMessage = validateMessage + "请选择卡片类型！<br/>";
            }
            for(var m=0;m<this.tkProjectList.length;m++){
              if(this.tkProjectList[m].itemType == '' || this.tkProjectList[m].itemTimes == '' || this.tkProjectList[m].itemTimes == null){
                validateMessage = validateMessage + "请先完善拓客项目信息！<br/>";
              }
            }
            if(validateMessage != ''){
              this.$Message.warning(validateMessage);
              validateMessage = '';
            }else{
                let URL = saveExtension();
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
              }
            },
        Add(){
          this.addF = true;
          this.showPerformance = false;
          this.showManual = false;
          this.showOperation = false;
          this.isPerformance='';
          this.isOperation='';
          this.isManual='';
          this.addData={
              storeId: this.$route.params.id,
              // 名称
              cardName: '',
              // 卡扣价格
              deductPrice: '',
              // 现金价格
              cashPrice: '',
              // 有效期
              expiredDay: '',
              // 是否计算业绩, 0 否 1 是
              isPerformance: 0,
              // 业绩金额
              performanceMoney: 0,
              // 是否计算实操, 0 否 1 是
              isOperation: 0,
              // 实操金额
              operationMoney: 0,
              // 是否计算手工, 0 否 1 是
              isManual: 0,
              // 手工金额
              manualMoney: 0,
              // 每周销售 ? 张
              saleCardNum: '',
              // 每张奖励 ? 元
              rewardMoney: '',
              // 超过每张奖励 ? 元
              mRewardMoney: '',
              // 首次进店微信预约转账 ? 元
              checkMoney: '',
              // 体验抵 ? 元
              offsetMoney: '',
              // 充值抵 ? 元
              rechargeMoney: '',
              // 卡片类型, 推荐数字, 字符串也可以, 1 超白金卡, 2 钻石卡  ...
              cardType: '' 
          };
          this.tkProjectList = [
            {
              // 写错也没有关系, 后台会纠正
              storeId:this.$route.params.id,
              // 关联拓客卡的id, 写 0 就可以了
              extCardId: 0,
              // 项目类型, 推荐数字, 也可以传递字符串, 1 超微气泡 ...
              itemType: '',
              // 次数
              itemTimes: ''
            }];
        },
        Addproject(){
          var errorMessage = '';
          var newItem = {
                // 写错也没有关系, 后台会纠正
                storeId:this.$route.params.id,
                // 关联拓客卡的id, 写 0 就可以了
                extCardId: 0,
                // 项目类型, 推荐数字, 也可以传递字符串, 1 超微气泡 ...
                itemType: '',
                // 次数
                itemTimes: ''
              }
            for(var i = 0; i < this.tkProjectList.length ; i++){
              if(this.tkProjectList[i].itemType == '' || this.tkProjectList[i].itemTimes == '' || this.tkProjectList[i].itemTimes == null){
                //this.$Message.warning("请先完善已有尊享项目信息！");
                errorMessage = "请先完善已有拓客项目信息！"; 
              }
            }
            if(errorMessage == ''){
              this.tkProjectList.push(newItem);
            }else{
              this.$Message.warning(errorMessage);
            }
        },
        deleteProject(index){
          if(this.tkProjectList.length == 1){
            this.tkProjectList = [
                {
                // 写错也没有关系, 后台会纠正
                storeId:this.$route.params.id,
                // 关联拓客卡的id, 写 0 就可以了
                extCardId: 0,
                // 项目类型, 推荐数字, 也可以传递字符串, 1 超微气泡 ...
                itemType: '',
                // 次数
                itemTimes: ''
              }
            ];
          }else{
            this.tkProjectList.splice(index,1);
          }
        },
        mannger(data) {
          this.type = 0;
          this.addF =true;
          this.addData = JSON.parse(JSON.stringify(data));
          this.addData.deductPrice = this.addData.deductPrice.replace("元","");
          this.addData.cashPrice = this.addData.cashPrice.replace("元","");
          this.addData.expiredDay = this.addData.expiredDay.replace("天","");
          this.showPerformance=this.addData.isPerformance == 1 ? true: false;
          this.showOperation=this.addData.isOperation== 1 ? true: false;
          this.showManual=this.addData.isManual== 1 ? true: false;
          this.isPerformance=this.addData.isPerformance == 1 ? "是": "否";
          this.isOperation=this.addData.isOperation== 1 ? "是": "否";
          this.isManual=this.addData.isManual== 1 ? "是": "否";
          this.tkProjectList=JSON.parse(JSON.stringify(data.extCardItems));
          for(var i=0;i<this.tkProjectList.length;i++){
            this.tkProjectList[i].itemType = parseInt(this.tkProjectList[i].itemType);
          }
        },
        del(data) {
          this.$ajax({
            method: 'get',
            url: deleteExtension()+'/'+this.$route.params.id+'?cardName='+data.cardName,
          }).then( (res) =>{ 
            this.$Message.success('删除成功');
            this.getData();
          }).catch( (res) =>{
            this.$Message.error('删除失败');
          })
        }
      },
      created(){
        this.getList();
        this.getData();
        this.getMember();
      }
    }
</script>

<style scoped>
  .list{
    padding: 10px;
  }
  .mod{
    line-height: 60px;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }

</style>
