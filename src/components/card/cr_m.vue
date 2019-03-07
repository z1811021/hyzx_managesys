<template>
    <!--会员卡-->
    <div class="list">
      <h2 style="margin: .6rem 0;">会员卡管理</h2>
      <Button class="hy_btn" v-if="data.length == 0" @click="Add">设计会员</Button>
      <Button class="hy_btn" v-if="data.length > 0" @click="reAdd">重新设计会员</Button>
      <br/>
      <br/>
      <Table class="small-table" :rowClassName="rowClassName" :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" :mask-closable="false" class="mod">
        <div class='com'>会员级别名称：<Input v-model="addData.cardName" placeholder="会员级别名称" style="width: 252px" disabled></Input></div>
        <div class='com' style="margin-top:20px;">
        会员价格：<InputNumber
            :min="0"
            v-model="addData.memPrice" placeholder="元" style="width:270px" disabled></InputNumber>元
        </div>
        <div class='com' style="margin-top:20px;"><div class="disLeft">单次折扣：
            <Select size="small" v-model="addData.singleDiscount" style="width:90px" placeholder="单次折扣" filterable>
                <Option v-for="item in hunList" :value="item.value" :key="item.value">{{item.label}}%</Option>
            </Select> 
          </div>
            <div class="disRight">产品折扣：
            <Select size="small" v-model="addData.productDiscount" style="width:90px" placeholder="产品折扣" filterable>
                <Option v-for="item in hunList" :value="item.value" :key="item.value">{{item.label}}%</Option>
            </Select> 
            </div>
        </div>
        <br/>
        <br/>
        <div class='com'>有效期：
          <Select v-model="addData.expiryDate" style="width:288px" placeholder="单位月" filterable>
              <Option v-for="item in dayList" :value="item.value" :key="item.value">{{item.label}} 个月</Option>
          </Select> 
        </div>
        <div class='com' style="margin-top:20px;">升卡原则：
          <Select v-model="selectedRisCardRule" :multiple=true :transfer=true @on-change="changeStyle" style="width:275px">
            <Option value="累计现金">累计现金</Option>
            <Option value="累计充值">累计充值</Option>
            <Option value="补差充值">补差充值</Option>
            <Option value="单次充值">单次充值</Option>
          </Select>
        </div>
        <div v-show="addData.allowRecharge" style="margin-top:15px;">
          <div class='com' style="float:left;margin-left:75px;">
          补差金额：<InputNumber
            :min="0" :max="20000"
            v-model="addData.risCardMoney" placeholder="元" style="width:80px"></InputNumber> 元
          </div>
          <div class='com' style="float:right;margin-right:65px;">
          补差有效期：<InputNumber
            :min="0" :max="24"
            v-model="addData.risCardExpDate" placeholder="元" style="width:80px"></InputNumber> 个月
          </div>
        </div>
        <br/>
        <div class='group' style="display:inline-block;">
          <h3>会员尊享</h3> 
          <div style="margin-left:-320px;"><Button type="success" size="small" @click="addHonor"><Icon type="plus-round"></Icon>项目</Button></div>
            <div style="display:block;margin-bottom:20px;" v-for="(item,index) in honorList" :key="index"> 
                  <Input v-model="item.itemTimes" class="enjoyInput" placeholder="次数：" style="width:300px;">
                  <Select v-model="item.itemName" placeholder="请选择尊享项目" slot="prepend" style="width: 232px" @on-change="changeHonor(index)">
                  <OptionGroup v-for="item in projectCategoryList" :value="item.projectCategory" :label="item.projectCategory" :key="item.projectCategory">
                   <Option v-for="project in item.curProjectList" :value="project.id" :key="project.id">{{ project.itemName }} {{project.itemPrice}}</Option>
                  </OptionGroup>
                  </Select>
                </Input>
                <div style="float:left;margin-left:5px;margin-top:11px;">
                  <Select v-model="item.itemExpiry" style="width:90px;float:left;" placeholder="有效期：">
                    <Option v-for="item in monthList" :value="item.value" :key="item.value">{{item.label}} 个月</Option>
                  </Select>
                  <Button style="float:right;margin-left:5px;" type="warning" @click="deleteHonor(index)">删除</Button>
                </div>
            </div>
        </div>
        <div class="blank"></div>
        <div class="group" style="margin-top: 30px;">
          <h3>会员日</h3>
          <div class='com' style="margin-top: 20px;">每月
            <Select :multiple=true size="small" v-model="selectedMemDate" style="width:92px" placeholder="第几日" >
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            日，<br/><br/>
            或 第 
            <Select size="small" v-model="addData.memTimes" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             次到店第 
             <Select size="small" v-model="addData.memItems" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，
              <div class='com' style="margin-top:20px;">
                <div >折扣：
                  <Select size="small" v-model="addData.memDiscount" style="width:90px" placeholder="单次折扣" filterable>
                      <Option v-for="item in hunList" :value="item.value" :key="item.value">{{item.label}}%</Option>
                  </Select> 
                </div>
              </div>
            </div>
        </div>
        <br/>
        <div class='group'>
          <h3>会员返现</h3>
          <div class='com' style="margin-top: 20px;"> 第 
            <Select size="small" v-model="addData.rebateTimes" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
           次到店第 
            <Select size="small" v-model="addData.rebateItems" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，<br/><br/>返现 
            <InputNumber
            :min="0"
            v-model="addData.rebateCash"
            placeholder="元" size="small"></InputNumber>
            元，
            <br/>
            <br/>
            有效期 
            <Select size="small" v-model="addData.rebateExpire" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
             个月</div>
        </div>
        <div class='com' style="margin-bottom:100px;">
          <span>注意事项：</span>
          <br/>
          <br/>
          <Select v-model="selectedConsiderations" placeholder="注意事项" :multiple=true style="width:400px;margin-bottom:50px;" :transfer=true >
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
        <div slot="footer">
            <Button type="primary" @click="ok">添加</Button>
            <Button type="ghost" @click="close">取消</Button>
        </div>
      </Modal>
      <Modal v-model="addCards" title="设计会员等级" :mask-closable="false" class="mod">
        选择会员等级总数：<Select size="small" v-model="memberSize" style="width:140px" placeholder="会员等级总数" @on-change="changeMemberSize">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
            <Option value="5">5</Option>
            <Option value="6">6</Option>
            <Option value="7">7</Option>
            <Option value="8">8</Option>
            <Option value="9">9</Option>
            <Option value="10">10</Option>
        </Select> 
        <br/>
        <br/>
        <Table border :columns="gradeColumns" :data="gradeData"></Table>
        <div slot="footer">
            <Button type="primary" @click="setMembers">添加</Button>
            <Button type="ghost" @click="closeMem">取消</Button>
        </div>
      </Modal>
    </div>
</template>

<script>
import {findProjectList,findProjectPlanList,findMembership,saveMembership,editMembership,deleteMembership,findAllProject,findProjectListByGroup} from '../../interface'
    export default {
      name: "cr_m",
      data() {
        let t = this
        return {
          rowClass: '',
          selectedConsiderations: [],
          selectedMemDate: [],
          selectedRisCardRule: [],
          monthList: [],
          dayList: [],
          curData: [],
          memberSize: '',
          memberList: [],
          removeItem: [],
          showMoney: false,
          addCards: false,
          honorList: [
            {
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id, 
              // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
              memCardId: 0,
              // 尊享项目名, 推荐使用数字, 1->超微气泡毛孔清理, 2->DC透肌去黑头管理, 3->毛孔深层净化清洁管理
              itemName: '',
              // 尊享项目次数
              itemTimes: '',
              // 尊享项目过期时间
              itemExpiry: '',
              min: '',
              // 升级最大金额
              max: ''
            }
          ],
          hunList: [],
          columns: [
            {
              title: '会员级别名称',
              key: 'cardName',
              width: 120
            },
            {
              title: '会员价格(元)',
              key: 'memPrice',
              width: 120
            },
            {
              title: '项目单次折扣',
              key: 'singleDiscount',
              width: 120
            },
            {
              title: '产品折扣',
              key: 'productDiscount',
              width: 120
            },
            {
              title: '升卡原则',
              key: 'risCardRule',
            },
            {
              title: '有效期(月)',
              key: 'expiryDate',
              width: 120
            },
            {
              title: '状态',
              key: 'status',
              width: 120
            },
            {
              title: '操作',
              key: 'action',
              render: (h, params) => {
                let status = params.row.cardStatus;
                if (status==="-1"){ 
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
                          this.complete(params.row)
                        }
                      }
                    }, '完成设置'),
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
                };
                if (status==="1"){ 
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
                    }, '修改设置'),
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
                };
              }
            }
          ],
          data: [],
          addF: false,
          showSingleHonor: true,
          addData: {
            // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: '',
              // 会员价格
              memPrice: 0,
              // 单次折扣
              singleDiscount: '',
              // 产品折扣
              productDiscount:'',
              // 有效期
              expiryDate: '',
              // 升卡原则
              risCardRule: '',
              // 是否允许增量充值, 0 未选中, 1 选中
              allowRecharge: '',
              // 会员日, 每月 ? 日
              memDate: '',
              // 会员日, 或第 ? 次到店
              memTimes: '',
              // 会员日, 第 ? 个项目
              memItems: '',
              // 会员日, 折扣
              memDiscount: '',
              // 会员返现, 第 ? 次到店
              rebateTimes: '',
              // 会员返现, 第 ? 个项目
              rebateItems: '',
              // 会员返现, 返现 ? 元/次
              rebateCash: 0,
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: ''
          },
          type: '',
          gradeColumns: [
                    {
                        title: '会员级别',
                        key: 'memberGrade',
                        width: 90,
                        align: 'center',
                    },
                    {
                        title: '会员级别名称',
                        key: 'cardName',
                        width: 130,
                        align: 'center',
                        render:(h,params) => {
                            return h('Input',{
                                props: {
                                    type: 'text',
                                    value: t.gradeData[params.index].cardName,
                                },
                                on: {
                                    'on-blur': (event) => {
                                        t.gradeData[params.index].cardName = event.target.value;
                                    }
                                },
                            })
                        }
                    },
                    {
                        title: '会员价格（元）',
                        key: 'memPrice',
                        width: 130,
                        align: 'center',
                        render:(h,params) => {
                            return h('Input',{
                                props: {
                                    type: 'text',
                                    value: t.gradeData[params.index].memPrice == ''? t.gradeData[params.index].memPrice : t.gradeData[params.index].memPrice+"元",
                                },
                                on: {
                                    'on-blur': (event) => {
                                        if(isNaN(event.target.value)){
                                          event.target.value = '';
                                        }
                                        t.gradeData[params.index].memPrice = event.target.value;
                                    },
                                },
                            })
                        }
                    },
                    {
                        title: '有效期（月）',
                        key: 'expiryDate',
                        width: 136,
                        align: 'center',
                        render:(h,params) => {
                            return h('Input',{
                                props: {
                                    type: 'text',
                                    value: t.gradeData[params.index].expiryDate == ''? t.gradeData[params.index].expiryDate : t.gradeData[params.index].expiryDate+"个月",
                                },
                                on: {
                                    'on-blur': (event) => {
                                        if(isNaN(event.target.value)){
                                          event.target.value = '';
                                        }
                                        t.gradeData[params.index].expiryDate = event.target.value;
                                    }
                                },
                            })
                        }
                    },
                ],
          gradeData:[],
          projectList:[],
          notice:[],
          selectedProject: '',
          projectCategoryList:[],
        }
      },
      methods: {
        rowClassName(row,index){
              if(row.cardStatus === "-1"){
                  return 'complete-table-info-row';
                }else{
                  return 'incomplete-table-info-row';
                }
            },
        setMembers(){
          var memCardManages = [];
          for (var i = 0; i < this.gradeData.length; i++) {
            var memCardManagesItem = {
              // 门店 id
              storeId: this.$route.params.id,
              // 会员价格, ? 元/次
              memPrice: this.gradeData[i].memPrice,
              // 会员级别名称
              cardName: this.gradeData[i].cardName,
              // 单次折扣
              singleDiscount: '',
              // 产品折扣
              productDiscount:'',
              // 有效期
              expiryDate: this.gradeData[i].expiryDate,
              // 补差升卡有效期  ? 个月
              risCardExpDate: '',
              // 升卡原则
              risCardRule: '',
              // 补差金额
              risCardMoney: '',
              // 是否允许增量充值, 0 未选中, 1 选中
              allowRecharge: '',
              // 会员日, 每月 ? 日
              memDate: '',
              // 会员日, 或第 ? 次到店
              memTimes: '',
              // 会员日, 第 ? 个项目
              memItems: '',
              // 会员日, 折扣
              memDiscount: '',
              // 会员返现, 第 ? 次到店
              rebateTimes: '',
              // 会员返现, 第 ? 个项目
              rebateItems: '',
              // 会员返现, 返现 ? 元/次
              rebateCash: 0,
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: '',
              // 卡状态, 默认 -1
              cardStatus: -1,
              // 建卡日期，后台自动生成，传空值即可
              createDate: ''
            }
            memCardManages.push(memCardManagesItem);
          }
          var validateMessage = '';
          for (var j = 0; j < memCardManages.length; j++) {
            if(memCardManages[j].memPrice == '' || memCardManages[j].cardName == '' || memCardManages[j].expiryDate == ''){
              validateMessage = validateMessage + "请完成所有卡项基本信息！<br/>";
            }
          }
          let URL = saveMembership();
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
              data: memCardManages,
              url: URL,
            }).then((res) => {
              this.$Message.success('操作成功');
              this.getData();
              this.addCards=false;
            }).catch((error) => {
              this.$Message.error('操作失败');
            });
          }
        },
        changeMemberSize(){
          this.gradeData = [];
          if(this.memberSize != ''){
            for (var i = 0; i < this.memberSize; i++) {
              var gradeItem = {
                memberGrade: (i+1)+"级",
                cardName: '',
                memPrice: 0,
                expiryDate: ''
              };
              this.gradeData.push(gradeItem);
            }
          }
        },
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
        uniqueArray(array, key){
          var result = [array[0]];
          for(var i = 1; i < array.length; i++){
            var item = array[i];
            var repeat = false;
            for (var j = 0; j < result.length; j++) {
              if (item[key] == result[j][key]) {
                repeat = true;
                break;
              }
            }
            if (!repeat) {
              result.push(item);
            }
          }
          return result;
        },
        insertHunList(){
          var currentItem = {};
          for(var i = 0; i < 100; i++){
            currentItem = {
                value: i+1,
                label: i+1
            }
            this.hunList.push(currentItem);
          }
        },
        insertMonthList(){
          var currentItem = {};
          for(var i = 0; i < 12; i++){
            currentItem = {
                value: i+1,
                label: i+1
            }
            this.monthList.push(currentItem);
          }
        },
        changeHonor(index){
          for(var i = 0; i < index; i++){
            if(this.honorList[i].itemName == this.honorList[index].itemName){
              var errorMessageName = "请不要选择重复的尊享项目！";
              this.honorList.splice(index,1);
              this.$Message.warning(errorMessageName);
            }
          }
        },
        closeMem(){
          this.addCards = false;
        },
        getData(){
          this.$ajax({
            method:'get',
            url: findMembership()+'/'+this.$route.params.id,
          }).then( (res) =>{
            if(res.data.memCardManageInfo == null){
              this.data = [];
            }else{
              this.data = res.data.memCardManageInfo;
              var currentItem = {};
              for(var i=0;i<this.data.length;i++){
                this.data[i].memPrice = this.data[i].memPrice + "元";
                this.data[i].singleDiscount == '' ? this.data[i].singleDiscount = "未完成" : this.data[i].singleDiscount = this.data[i].singleDiscount + "%";
                this.data[i].productDiscount == '' ? this.data[i].productDiscount = "未完成" : this.data[i].productDiscount = this.data[i].productDiscount + "%";
                this.data[i].expiryDate = this.data[i].expiryDate + "个月";
                this.data[i].risCardRule == '' ? this.data[i].risCardRule = "未完成" : this.data[i].risCardRule = this.data[i].risCardRule;
                this.data[i].cardStatus == "-1" ? this.data[i].status = "未完成" : this.data[i].status = "已完成";
                currentItem = {"cardName":this.data[i].cardName, "memPrice":this.data[i].memPrice,"id":''};
                this.curData.push(currentItem);
              }
              this.data.sort(this.compare);
              this.curData.sort(this.compare);
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
        ok() {
          var validateMessage = '';
          var selectedMemDateString = '';
          var selectedConsiderationsDateString = '';
          var selectedRisCardRuleString = '';
          var tempList = [];
          var selectedCardRisings = [];
          for(var i=0;i<this.selectedMemDate.length;i++){
            selectedMemDateString = selectedMemDateString + this.selectedMemDate[i] + ',';
          }
          var selectedConsiderationsDateString = '';
          for(var i=0;i<this.selectedConsiderations.length;i++){
            selectedConsiderationsDateString = selectedConsiderationsDateString + this.selectedConsiderations[i] + ',';
          }
          for(var i=0;i<this.selectedRisCardRule.length;i++){
            selectedRisCardRuleString = selectedRisCardRuleString + this.selectedRisCardRule[i] + ',';
          }
          this.addData.memDate = selectedMemDateString.substring(0,selectedMemDateString.length-1);
          this.addData.considerations = selectedConsiderationsDateString.substring(0,selectedConsiderationsDateString.length-1);
          this.addData.risCardRule = selectedRisCardRuleString.substring(0,selectedRisCardRuleString.length-1);
          this.addData.allowRecharge = this.transfer(this.addData.allowRecharge);
          var memCardManage = this.addData;
          var memCardItems = [];
          //var memCardItems = this.honorList;
          for (var j = 0; j < this.honorList.length; j++) {
            var honorProject = {
              storeId:this.$route.params.id,
              memCardId: this.honorList[j].memCardId,
              itemName: this.honorList[j].itemName,
              itemTimes: this.honorList[j].itemTimes,
              itemExpiry: this.honorList[j].itemExpiry
            };
            memCardItems.push(honorProject);
          }
          var memCardManageParam = {
              memCardManage: memCardManage,
              memCardItems: memCardItems
          }
        let URL = editMembership();
        if(this.addData.cardName == ''){
            validateMessage = validateMessage + "请输入会员级别名称！<br/>";
          }
          if(this.addData.memPrice == ''){
            validateMessage = validateMessage + "请输入会员价格！<br/>";
          }
          if(this.addData.singleDiscount == ''){
            validateMessage = validateMessage + "请选择单次折扣！<br/>";
          }
          if(this.addData.productDiscount == ''){
            validateMessage = validateMessage + "请选择产品折扣！<br/>";
          }
          if(this.addData.expiryDate == ''){
            validateMessage = validateMessage + "请选择有效期！<br/>";
          }
          if(this.addData.risCardRule.length == 0){
            validateMessage = validateMessage + "请选择升卡原则！<br/>";
          }
          if(this.addData.memDate.length == 0){
            validateMessage = validateMessage + "请选择会员日日期！<br/>";
          }
          if(this.addData.memTimes == ''){
            validateMessage = validateMessage + "请选择会员日第几次到店！<br/>";
          }
          if(this.addData.memDiscount == ''){
            validateMessage = validateMessage + "请选择会员日折扣！<br/>";
          }
          if(this.addData.memItems == ''){
            validateMessage = validateMessage + "请选择会员日！<br/>";
          }
          if(this.addData.rebateTimes == ''){
            validateMessage = validateMessage + "请选择返现第几次到店！<br/>";
          }
          if(this.addData.rebateItems == ''){
            validateMessage = validateMessage + "请选择返现第几个项目！<br/>";
          }
          if(this.addData.rebateCash == ''){
            validateMessage = validateMessage + "请选择返现金额！<br/>";
          }
          if(this.addData.rebateExpire == ''){
            validateMessage = validateMessage + "请选择返现有效期！<br/>";
          }
          if(this.addData.considerations.length == 0){
            validateMessage = validateMessage + "请选择注意事项！<br/>";
          }
          for(var m=0;m<this.honorList.length;m++){
            if(this.honorList[m].itemName == '' || this.honorList[m].itemTimes == '' || this.honorList[m].itemExpiry == ''){
              validateMessage = validateMessage + "请先完善尊享项目信息！<br/>";
            }
          }
          if(selectedRisCardRuleString.indexOf("补差充值")>-1){
            if(this.addData.risCardMoney == '' || this.addData.risCardExpDate == ''){
              validateMessage = validateMessage + "请完善补差充值金额或期限！<br/>";
            }
          }
          if(validateMessage != ''){
            this.$Message.warning(validateMessage);
            validateMessage = '';
          }else{
            //console.log(JSON.parse(JSON.stringify(memCardManageParam)));
            this.$ajax({
              method: 'POST',
              dataType: 'JSON',
              contentType: 'application/json;charset=UTF-8',
              headers: {
                "authToken": sessionStorage.getItem('authToken')
              },
              data: memCardManageParam,
              url: URL,
            }).then((res) => {
              this.$Message.success('操作成功');
              this.getData();
              this.addF=false;
            }).catch((error) => {
              this.$Message.error('操作失败');
            });
          }
        },
        reAdd(){
          var c = confirm('确认删除？');
            if(!c) {
              return false;
            }
            this.$ajax({
              method: 'get',
              url: deleteMembership()+'/'+this.$route.params.id,
            }).then( (res) =>{
              this.$Message.success('删除成功');
              this.getData();
              this.Add();
            }).catch( (res) =>{
              this.$Message.error('删除失败');
            })
        },
        Add(){
          this.addData={
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: '',
              // 会员价格
              memPrice: 0,
              // 单次折扣
              singleDiscount: '',
              // 产品折扣
              productDiscount:'',
              // 有效期
              expiryDate: '',
              // 升卡原则
              risCardRule: '',
              // 是否允许增量充值, 0 未选中, 1 选中
              allowRecharge: '',
              // 会员日, 每月 ? 日
              memDate: '',
              // 会员日, 或第 ? 次到店
              memTimes: '',
              // 会员日, 第 ? 个项目
              memItems: '',
              // 会员日, 折扣
              memDiscount: '',
              // 会员返现, 第 ? 次到店
              rebateTimes: '',
              // 会员返现, 第 ? 个项目
              rebateItems: '',
              // 会员返现, 返现 ? 元/次
              rebateCash: 0,
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: '',
              // 补差升卡有效期  ? 个月
              risCardExpDate: '',
              // 补差金额
              risCardMoney: '',
          };
          this.addCards = true;
          this.$refs.setHonorQuery.$data.query = '';
        },
        addHonor(){
          var errorMessage = '';
          var newItem = {
            // 门店 id, 写错也没关系
              storeId: this.$route.params.id, 
              // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
              memCardId: '',
              // 尊享项目名, 推荐使用数字, 1->超微气泡毛孔清理, 2->DC透肌去黑头管理, 3->毛孔深层净化清洁管理
              itemName: '',
              // 尊享项目次数
              itemTimes: '',
              // 尊享项目过期时间
              itemExpiry: ''
          }
            for(var i = 0; i < this.honorList.length ; i++){
              if(this.honorList[i].itemName == '' || this.honorList[i].itemTimes == '' || this.honorList[i].itemExpiry == ''){
                //this.$Message.warning("请先完善已有尊享项目信息！");
                errorMessage = "请先完善已有尊享项目信息！"; 
              }
            }
            if(errorMessage == ''){
              this.honorList.push(newItem);
            }else{
              this.$Message.warning(errorMessage);
            }
        },
        deleteHonor(index){
            if(this.honorList.length > 1){
              this.honorList.splice(index,index+1);
            }
        },
        close(){
          this.addF = false;
          this.showMoney = false;
          this.getData();
        },
        mannger(data) {
           this.addF = true;
           var tempCardRule = '';
            this.addData={
              id: data.id,
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: data.cardName,
              // 会员价格
              memPrice: data.memPrice.replace("元",""),
              // 单次折扣
              singleDiscount: data.singleDiscount == '' ? '' : parseInt(data.singleDiscount.replace("%","")),
              // 产品折扣
              productDiscount: data.productDiscount == '' ? '' : parseInt(data.productDiscount.replace("%","")),
              // 有效期
              expiryDate: parseInt(data.expiryDate.replace("个月","")),
              // 升卡原则
              risCardRule: '',
              // 是否允许增量充值, 0 未选中, 1 选中
              allowRecharge: this.transferBack(data.allowRecharge),
              // 会员日, 每月 ? 日
              memDate: '',
              // 会员日, 或第 ? 次到店
              memTimes: parseInt(data.memTimes),
              // 会员日, 第 ? 个项目
              memItems: parseInt(data.memItems),
              // 会员日, 折扣
              memDiscount: parseInt(data.memDiscount),
              // 会员返现, 第 ? 次到店
              rebateTimes: parseInt(data.rebateTimes),
              // 会员返现, 第 ? 个项目
              rebateItems: parseInt(data.rebateItems),
              // 会员返现, 返现 ? 元/次
              rebateCash: data.rebateCash,
              // 会员返现, 有效期 ? 个月
              rebateExpire: parseInt(data.rebateExpire),
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: '',
              // 补差升卡有效期  ? 个月
              risCardExpDate: data.risCardExpDate,
              // 补差金额
              risCardMoney: data.risCardMoney,
              // 卡状态, 默认 -1
              cardStatus: 1
          };
          if(data.memCardItems.length>0){
            this.honorList = data.memCardItems;
          }else{
            this.honorList = [
              {
                // 门店 id, 写错也没关系
                storeId: this.$route.params.id, 
                // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
                memCardId: data.id,
                // 尊享项目名, 推荐使用数字, 1->超微气泡毛孔清理, 2->DC透肌去黑头管理, 3->毛孔深层净化清洁管理
                itemName: '',
                // 尊享项目次数
                itemTimes: '',
                // 尊享项目过期时间
                itemExpiry: '',
                min: '',
                // 升级最大金额
                max: ''
              }
            ];
          }
          this.selectedConsiderations = data.considerations.split(",");
          this.selectedMemDate = data.memDate.split(",");
          this.selectedRisCardRule = data.risCardRule.split(",");
          for(var i = 0; i < this.selectedConsiderations.length; i++){
            this.selectedConsiderations[i] = parseInt(this.selectedConsiderations[i]);
          }
          for(var j = 0; j < this.selectedMemDate.length; j++){
            this.selectedMemDate[j] = parseInt(this.selectedConsiderations[j]);
          }
          for(var k = 0; k < this.honorList.length; k++){
            this.honorList[k].itemExpiry = parseInt(this.honorList[k].itemExpiry);
            this.honorList[k].itemName = parseInt(this.honorList[k].itemName);
          }
        },
        changeStyle(){
          var index = this.selectedRisCardRule.indexOf("补差充值");
          if(index > -1){
            this.addData.allowRecharge = true;
          }else{
            this.addData.allowRecharge = false;
          }
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
      complete(data){
          this.addF = true;
          this.selectedConsiderations = '';
          this.selectedMemDate = '';
          this.selectedRisCardRule = '';
          this.honorList = [
              {
                // 门店 id, 写错也没关系
                storeId: this.$route.params.id, 
                // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
                memCardId: data.id,
                // 尊享项目名, 推荐使用数字, 1->超微气泡毛孔清理, 2->DC透肌去黑头管理, 3->毛孔深层净化清洁管理
                itemName: '',
                // 尊享项目次数
                itemTimes: '',
                // 尊享项目过期时间
                itemExpiry: '',
                min: '',
                // 升级最大金额
                max: ''
              }
            ]; 
          this.addData = {
              // 记录的 id
              id: data.id,
              // 门店 id
              storeId: this.$route.params.id,
              // 会员价格, ? 元/次
              memPrice: data.memPrice.replace("元",""),
              // 会员级别名称
              cardName: data.cardName,
              // 单次折扣
              singleDiscount: '',
              // 产品折扣
              productDiscount: '',
              // 有效期
              expiryDate: parseInt(data.expiryDate.replace("个月","")),
              // 补差升卡有效期  ? 个月
              risCardExpDate: '',
              // 补差金额
              risCardMoney: '',
              // 升卡原则
              risCardRule: '',
              // 是否允许补差充值, 0 未选中, 1 选中
              allowRecharge: '',
              // 会员日, 每月 ? 日
              memDate: '',
              // 会员日, 或第 ? 次到店
              memTimes: '',
              // 会员日, 第 ? 个项目
              memItems: '',
              // 会员日, 折扣
              memDiscount: '',
              // 会员返现, 第 ? 次到店
              rebateTimes: '',
              // 会员返现, 第 ? 个项目
              rebateItems: '',
              // 会员返现, 返现 ? 元/次
              rebateCash: '',
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: '',
              // 卡状态, 默认 -1
              cardStatus: 1,
              // 建卡日期，传空的话，后台将保存为当前操作时间；不为空的话，日期格式为：2019-02-23 14:39:30
              createDate: ''
          };
      },
      del(data) {
          var c = confirm('确认删除？');
          if(!c) {
            return false;
          }
          this.$ajax({
            method: 'get',
            url: deleteMembership()+'/'+this.$route.params.id+'?cardName='+data.cardName,
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
        this.insertDayList();
        this.insertHunList();
        this.insertMonthList();
      }
    }
</script>

<style>
  .small-table .complete-table-info-row td {
    color: #FF0000;
  }
  .small-table .incomplete-table-info-row td {
    color: #336666;
  }
</style>

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
    margin-left:16%;
  }
  .disRight{
    float:right;
    margin-right:16%;
  }
  .com{
    margin: 10px 0;
  }
  .group{
    padding: 10px;
  }
  .enjoyInput{
    width: 230px;
    margin-top: 10px;  
    float:left;         
  }
  .enjoyInputTime{
    width: 75px;
    margin-top: 10px; 
  }
  .deleteButton{
    float:right;
  }
</style>
