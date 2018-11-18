<template>
    <!--会员卡-->
    <div class="list">
      <h2 style="margin: .6rem 0;">会员卡管理</h2>
      <Button class="hy_btn" @click="Add">添加</Button>
      <br/>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" :mask-closable="false" @on-ok="ok" class="mod">
        <div class='com'>会员级别名称：<Input v-model="addData.membershipName" placeholder="会员级别名称" style="width: 252px"></Input></div>
<!--         <div class='com' style="margin-top:10px;">会员价格：
          <InputNumber
            :min="0"
            v-model="addData.membershipMoney"addData.membershipMoney
            :formatter="value=> `${value}元`"
            :parser="value => value.replace('元', '')" placeholder="会员价格 元" style="width: 275px;ime-mode:disabled"></InputNumber>
        </div> -->
        <div class='com' style="margin-top:20px;"><div class="disLeft">单次折扣：<InputNumber
            :min="-1"
            :max="100"
            v-model="addData.productDiscount" 
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')" size="small" style="width: 50px" placeholder="折扣百分比" ></InputNumber></div>
            <div class="disRight">产品折扣：<InputNumber
            :min="0"
            :max="100"
            v-model="addData.projectDiscount"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')" size="small" style="width: 50px" placeholder="折扣百分比" ></InputNumber></div>
        </div>
        <br/>
        <br/>
        <div class='com'>有效期：<Input v-model="addData.membershipValidity" placeholder="单位月" style="width: 288px;ime-mode:disabled" onpaste="return false;" @on-keyup="addData.membershipValidity=check(addData.membershipValidity)"></Input></div>
        <div class='com' style="margin-top:10px;">升卡原则：
          <Select v-model="addData.liftCardType" :multiple=true style="width:275px" :transfer=true>
            <Option value="累计现金">累计现金</Option>
            <Option value="累计充值">累计充值</Option>
            <!-- <Option value="增量充值">增量充值</Option> -->
            <Option value="单次充值">单次充值</Option>
            <!-- <Option value="充值金额">充值金额</Option> -->
          </Select>
        </div>
        <div style="float:left;margin-left:63px;"><Checkbox v-model="single">是否允许增量充值</Checkbox></div>
        <div style="margin-top:35px;">
          <Input style="margin-left:63px;margin-top:10px;width: 280px;" v-model="value13">
              <Select v-model="select3" slot="prepend" style="width: 180px">
                  <Option value="1">升级到XXX卡</Option>
                  <Option value="2">升级到XXX卡</Option>
                  <Option value="3">升级到XXX卡</Option>
              </Select>
          </Input>
          <Input style="margin-left:63px;margin-top:10px;width: 280px;" v-model="value13">
              <Select v-model="select3" slot="prepend" style="width: 180px">
                  <Option value="1">升级到XXX卡</Option>
                  <Option value="2">升级到XXX卡</Option>
                  <Option value="3">升级到XXX卡</Option>
              </Select>
          </Input>
        </div>
        <div class='group'>
          <h3>会员尊享</h3>
          <div style="margin-left:-280px;"><Button type="primary" size="small"><Icon type="plus-round"></Icon> 添加尊享项目</Button></div>
            <div v-for="item in projectList"> 
              <div style="float:left;margin-left:44px;margin-top:-1px;">
                  <Input class="enjoyInput" placeholder="尊享次数：">
                  <Select v-model="selectedProject" placeholder="请选择尊享项目" slot="prepend" style="width: 200px">
                      <Option v-for="item in projectList" :value="item.itemName" :key="index">{{item.itemName}}</Option>
                  </Select>
                </Input>
              </div>
              <div >
                <Select style="width:90px;margin-right:40px;margin-top:10px;" placeholder="有效期：">
                  <Option v-for="item in monthList" :value="item.value" :key="item.value">{{item.label}}</Option>
              </Select>
              </div>
          </div>
        </div>
        <br/>
        <div class='group'>
          <h3>会员日</h3>
          <div class='com' style="margin-top: 20px;">每月
            <Select size="small" v-model="model1" style="width:70px" placeholder="第几日">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            日，或 第 
            <Select size="small" v-model="model1" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             次到店第 
             <Select size="small" v-model="model1" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，
            <br/>
              <div class='com' style="margin-top:20px;">
                <div class="disLeft">折扣：<InputNumber
                :min="0"
                :max="100"
                v-model="addData.productDiscount" 
                :formatter="value => `${value}%`"
                :parser="value => value.replace('%', '')" size="small" placeholder="折扣百分比"></InputNumber></div>
              </div>
            </div>
        </div>
        <br/>
        <br/>
        <div class='group'>
          <h3>会员返现</h3>
          <div class='com'> 第 
            <Select size="small" v-model="model1" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
           次到店第 
            <Select size="small" v-model="model1" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，返现 
            <InputNumber
            :min="0"
            v-model="addData.moneyBack"
            :formatter="value => `${value}元/次`"
            :parser="value => value.replace('元/次', '')" placeholder="元/次" size="small"></InputNumber>
            元，
            <br/>
            <br/>
            有效期 
            <Select size="small" v-model="model1" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
             个月</div>
        </div>
        <div class='com' style="margin-bottom:100px;">
          <span>注意事项：</span>
          <br/>
          <br/>
          <Select v-model="addData.precautions" placeholder="注意事项" :multiple=true style="width:400px;margin-bottom:50px;" :transfer=true >
          <Option :value="1" style="word-wrap: break-word"> ● 会员尊享必须每月到店护理两次以上（每次最少两个项目），<br>第三次到店方可尊享免费项目。</Option>
          <Option :value="2" > ● 会员尊享是从会员充值之日起连续十二个月内有效。</Option>
          <Option :value="3" > ● 会员充值三个月内可补差额升卡，消费超过三个月升卡需全额。</Option>
          <Option :value="4" > ● 会员充值三个月内可补差额升卡，消费超过三个月升卡需全额。</Option>
          <Option :value="5" > ● 会员尊享本月不做不累计，逾期无效。</Option>
          <Option :value="6" > ● 会员尊享须会员本人使用。</Option>
          <Option :value="7" > ● 会员日项目折扣为单次折扣价。</Option>
          <Option :value="8" > ● 会员日为储值会员服务，项目折扣金额为会员卡扣金额，<br>不接受现金支付。</Option>
          <Option :value="9" > ● 会员日权利时限与会员尊享同步。</Option>
          <Option :value="10" > ● 会员当月第五次到店即享受返现日返现。</Option>
          <Option :value="11" > ● 返现现金可购买项目，如购买产品无折扣。</Option>
          <Option :value="12" > ● 返现现金必须当月使用，不得累计，逾期无效。</Option>
          <Option :value="13" > ● 返现日时限与会员尊享同步。</Option>
        </Select>
        </div>
      </Modal>
    </div>
</template>

<script>
import {findProjectList,findProjectPlanList,findMembership,saveMembership,editMembership,deleteMembership,findAllProject} from '../../interface'
    export default {
      name: "cr_m",
      data() {
        return {
          monthList: [
                    {
                        value: '1个月',
                        label: '1个月'
                    },
                    {
                        value: '2个月',
                        label: '2个月'
                    },
                    {
                        value: '3个月',
                        label: '3个月'
                    },
                    {
                        value: '4个月',
                        label: '4个月'
                    },
                    {
                        value: '5个月',
                        label: '5个月'
                    },
                    {
                        value: '6个月',
                        label: '6个月'
                    },
                    {
                        value: '7个月',
                        label: '7个月'
                    },
                    {
                        value: '8个月',
                        label: '8个月'
                    },
                    {
                        value: '9个月',
                        label: '9个月'
                    },
                    {
                        value: '10个月',
                        label: '10个月'
                    },
                    {
                        value: '11个月',
                        label: '11个月'
                    },
                    {
                        value: '12个月',
                        label: '12个月'
                    },
                ],
          dayList: [],
          columns: [
            {
              title: '会员级别名称',
              key: 'membershipName',
            },
            {
              title: '会员价格(元)',
              key: 'membershipMoney',
            },
            {
              title: '项目单次折扣',
              key: 'projectDiscount',
            },
            {
              title: '产品折扣',
              key: 'productDiscount',
            },
            {
              title: '升卡原则',
              key: 'liftCardType',
            },
            {
              title: '有效期(月)',
              key: 'membershipValidity',
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
                        this.del(params.row, params.index)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
          data: [],
          addF: false,
          addData: {
            enjoy: [
              {
                agingType: "",
                enjoyNumber: '',
                enjoyValidity: "",
                id: '',
                projectId: '',
                projectName: ""
              }
            ],
            moneyBack: '',
            id: '',
            memberDay: "",
            memberDayDiscount: '',
            memberDayNProject: '',
            memberDayNtoStore: '',
            memberReturnNProject: '',
            memberReturnNtoStore: '',
            membershipMoney: "",
            membershipName: "",
            membershipValidity: '',
            precautions: [],
            productDiscount: "0",
            projectDiscount: "0",
            returnAmount: "",
            returnValidity: '',
            storeId: this.$route.params.id,
            storeName: "",
            liftCardType: '',
            settingTime:false,
          },
          type: '',
          projectList:[],
          notice:[],
          selectedProject: ''
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
              url: findProjectList()+'/'+this.$route.params.id,
            }).then((res) => {
              this.projectList = res.data.itemManages;
            }).catch((error) => {
              this.$Message.error('获取失败');
            });
          },
/*        getMeal(){
            this.$ajax({
              method: 'GET',
              dataType: 'JSON',
              contentType: 'application/json;charset=UTF-8',
              headers: {
                "authToken": sessionStorage.getItem('authToken')
              },
              url: findProjectPlanList()+'/'+this.$route.params.id+'?programType=1',
            }).then((res) => {
              for(var i=0;i<res.data.programManage.length;i++){
                this.projectList.push(res.data.programManage[i]);
              }
          }).catch((error) => {
            this.$Message.error('获取失败');
          });
        },*/
        insertDayList(){
          var currentItem = {};
          for(var i = 0; i < 30; i++){
            currentItem = {
                value: i+1,
                label: i+1
            }
            this.dayList.push(currentItem);
          }
        },
        getData(){
          this.$ajax({
            method:'get',
            url: findMembership()+'?storeId='+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data;
          }).catch( (error) =>{
            this.$Message.error('获取失败');
          })
        },
        ok() {
          var Surl;
          if(this.addData.membershipName == ''){
            this.$Message.warning('会员级别名称不能为空');
            return;
          }
          if(this.type == 1){
            Surl = saveMembership();
          }else{
            Surl = editMembership();
          }
          this.addData.projectDiscount = parseFloat('0.'+this.DA+this.DB);
          this.addData.productDiscount = parseFloat('0.'+this.DC+this.DD);
          this.addData.memberDayDiscount = parseFloat('0.'+this.DE+this.DF);
          this.addData.precautions = this.addData.precautions.toString();
          this.$ajax({
            method: 'post',
            url: Surl,
            data: this.addData,
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.getData();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        },
        Add(){
          this.addF = true;
          this.addData={
            enjoy: [
              {
                agingType: "",
                enjoyNumber: '',
                enjoyValidity: "",
                id: '',
                projectId: '',
                projectName: ""
              }
            ],
              moneyBack: '',
              id: '',
              memberDay: "",
              memberDayDiscount: '',
              memberDayNProject: '',
              memberDayNtoStore: '',
              memberReturnNProject: '',
              memberReturnNtoStore: '',
              membershipMoney: "",
              membershipName: "",
              membershipValidity: '',
              precautions: [],
              productDiscount: "100",
              projectDiscount: "100",
              returnAmount: "",
              returnValidity: '',
              storeId: this.$route.params.id,
              storeName: "",
            settingTime:false,
          };
        },
        Addproject(){
          this.addData.enjoy.push({
            agingType: "",
            enjoyNumber: '',
            enjoyValidity: "",
            id: '',
            projectId: '',
            projectName: ""
          });

        },
        mannger(data, i) {
          this.type = 0;
          this.addF =true;
          this.addData = JSON.parse(JSON.stringify(data));
          if (typeof data.precautions == 'string') {
            this.addData.precautions = data.precautions.split(',').map( (it, i) => {return +it});
          }
        },
        del(data, i) {
          var c = confirm('确认删除？');
          if(!c) {
            return false;
          }
          this.$ajax({
            method: 'get',
            url: deleteMembership()+'?id='+data.id,
          }).then( (res) =>{
            this.$Message.success('删除成功');
            this.getData();
          }).catch( (res) =>{
            this.$Message.error('删除失败');
          })
        },
        splitNum(num){
          if(typeof num !='string'){
            num.toString();
          }
          if(num == '0'){
            num = '0.00';
          }
          var arr = num.split('.')[1];
          var arr2 = arr.split('');
          for(var i=0;i<arr2.length;i++){
            arr2[i]=parseInt(arr2[i]);
          }
          if(arr2.length<2){
            arr2[1]=0;
          }
          return arr2;
        }
      },
      created(){
        this.getList();
        this.insertDayList();
        //this.getData();
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
  .disLeft{
    float:left;
    margin-left:22%;
  }
  .disRight{
    float:right;
    margin-right:22%;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }
  .enjoyInput{
    width: 290px;
    margin-top: 10px;           
  }
  .enjoyInputTime{
    width: 75px;
    margin-top: 10px; 
  }
</style>
