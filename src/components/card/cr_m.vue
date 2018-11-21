<template>
    <!--会员卡-->
    <div class="list">
      <h2 style="margin: .6rem 0;">会员卡管理</h2>
      <Button class="hy_btn" @click="Add">添加</Button>
      <br/>
      <br/>
      <Table :columns="columns" :data="data"></Table>
      <Modal v-model="addF" title="添加" :mask-closable="false" @on-ok="ok" class="mod">
        <div class='com'>会员级别名称：<Input v-model="addData.cardName" placeholder="会员级别名称" style="width: 252px"></Input></div>
        <div class='com' style="margin-top:20px;">
        会员价格：<InputNumber
            :min="0"
            v-model="addData.memPrice"
            :formatter="value => `${value}元`"
            :parser="value => value.replace('元', '')" placeholder="元" style="width:275px" @on-change="changeThisPrice"></InputNumber>
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
        <div class='com' style="margin-top:10px;">升卡原则：
          <Select v-model="selectedRisCardRule" :multiple=true :transfer=true @on-change="changeStyle" style="width:275px">
            <Option value="累计现金">累计现金</Option>
            <Option value="累计充值">累计充值</Option>
            <Option value="增量充值">增量充值</Option>
            <Option value="单次充值">单次充值</Option>
          </Select>
        </div>
        <div v-show="addData.allowRecharge" style="margin-top:15px;">
         <div style="float:left;margin-left: 63px;padding-top:4px;">增量充值细节：</div>
         <div style="margin-right:280px;"><Button type="success" size="small" @click="addUpgrade"><Icon type="plus-round"></Icon>项目</Button></div>
          <Input v-for="item in upgradeList" v-model="item.risingCardMoney" type="number" style="margin-left:63px;margin-top:4px;width: 280px;" placeholder="元">
              <Select v-model="item.risingCardName" slot="prepend" style="width: 180px">
                  <Option v-for="item in curData" :value="item.cardName" :key="item.id">升级到{{item.cardName}}</Option>
              </Select>
          </Input>
        </div>
        <br/>
        <div class='group' style="display:inline-block;">
          <h3>会员尊享</h3> 
          <div style="margin-left:-320px;"><Button type="success" size="small" @click="addHonor"><Icon type="plus-round"></Icon>项目</Button></div>
            <div style="display:block;margin-bottom:20px;" v-for="(item,index) in honorList" > 
                  <Input type="number" v-model="item.itemTimes" class="enjoyInput" placeholder="尊享次数：">
                  <Select v-model="item.itemName" ref="setHouseQuery" clearable placeholder="请选择尊享项目" slot="prepend" style="width: 160px" @on-change="changeHonor(index)">
                      <Option v-for="item in projectList" :value="item.itemName" :key="item.id">{{item.itemName}}</Option>
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
        <div class="group" >
          <h3>会员日</h3>
          <div class='com' style="margin-top: 20px;">每月
            <Select :multiple=true size="small" v-model="selectedMemDate" style="width:92px" placeholder="第几日" >
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            日，或 第 
            <Select size="small" v-model="addData.memTimes" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
             次到店第 
             <Select size="small" v-model="addData.memItems" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，
            <br/>
              <div class='com' style="margin-top:20px;">
                <div class="disLeft">折扣：
                  <Select size="small" v-model="addData.memDiscount" style="width:90px" placeholder="单次折扣" filterable>
                      <Option v-for="item in hunList" :value="item.value" :key="item.value">{{item.label}}%</Option>
                  </Select> 
                </div>
              </div>
            </div>
        </div>
        <br/>
        <br/>
        <div class='group'>
          <h3>会员返现</h3>
          <div class='com'> 第 
            <Select size="small" v-model="addData.rebateTimes" style="width:70px" placeholder="第几次">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
           次到店第 
            <Select size="small" v-model="addData.rebateItems" style="width:70px" placeholder="第几个">
                <Option v-for="item in dayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select> 
            个项目，返现 
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
    </div>
</template>

<script>
import {findProjectList,findProjectPlanList,findMembership,saveMembership,editMembership,deleteMembership,findAllProject} from '../../interface'
    export default {
      name: "cr_m",
      data() {
        return {
          upgradeList: [
            {
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id, 
              // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
              memCardId: 0,
              // 升级到 xxx 卡, 传递数字(推荐),假如 1 -> 钻石卡, 2-> 白金卡, 3->白银卡 ...
              risingCardName: '',
              // 客户为升级卡花费金额
              risingCardMoney: ''
            }
          ],
          selectedConsiderations: [],
          selectedMemDate: [],
          selectedRisCardRule: [],
          monthList: [],
          dayList: [],
          curData: [],
          memberList: [],
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
              itemExpiry: ''
            }
          ],
          hunList: [],
          columns: [
            {
              title: '会员级别名称',
              key: 'cardName',
            },
            {
              title: '会员价格(元)',
              key: 'memPrice',
            },
            {
              title: '项目单次折扣',
              key: 'singleDiscount',
            },
            {
              title: '产品折扣',
              key: 'productDiscount',
            },
            {
              title: '升卡原则',
              key: 'risCardRule',
            },
            {
              title: '有效期(月)',
              key: 'expiryDate',
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
          showSingleHonor: true,
          addData: {
            // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: '',
              // 会员价格
              memPrice: '',
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
              rebateCash: '',
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: ''
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
              this.honorList[index].itemName = '';
              this.$refs.setHouseQuery.$data.query = '';
              this.$Message.warning(errorMessageName);
            }
          }
        },
        getData(){
          this.$ajax({
            method:'get',
            url: findMembership()+'/'+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data.memCardManageInfo;
            var currentItem = {};
            for(var i=0;i<this.data.length;i++){
              this.data[i].memPrice = this.data[i].memPrice + "元";
              this.data[i].singleDiscount = this.data[i].singleDiscount + "%";
              this.data[i].productDiscount = this.data[i].productDiscount + "%";
              this.data[i].expiryDate = this.data[i].expiryDate + "个月";
              currentItem = {"cardName":this.data[i].cardName, "memPrice":this.data[i].memPrice};
              this.curData.push(currentItem);
            }
          }).catch( (error) =>{
            this.$Message.error('获取失败');
          })
        },
        ok() {
          var selectedMemDateString = '';
          var selectedConsiderationsDateString = '';
          var selectedRisCardRuleString = '';
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
          var memCardRisings = this.upgradeList;
          var memCardItems = this.honorList;
          var params = {
            // 门店 id, 此处的 storeId 一定不能错
            storeId: this.$route.params.id,
            memCardManage: memCardManage,
            // 升级卡
            memCardRisings: memCardRisings,
            // 会员尊享项目
            memCardItems: memCardItems
        };
        let URL = saveMembership();
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
              this.getData();
              this.addF=false;
            }).catch((error) => {
              this.$Message.error('操作失败');
            });
        },
        Add(){
          this.addF = true;
          this.addData={
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: '',
              // 会员价格
              memPrice: '',
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
              rebateCash: '',
              // 会员返现, 有效期 ? 个月
              rebateExpire: '',
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: ''
          };
          this.honorList = [
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
              itemExpiry: ''
            }
          ];
          this.selectedConsiderations = [];
          this.selectedMemDate = [];
          this.selectedRisCardRule = [];
        },
        addUpgrade(){
          var errorMessage = '';
          var newItem = {
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id, 
              // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
              memCardId: 0,
              // 升级到 xxx 卡, 传递数字(推荐),假如 1 -> 钻石卡, 2-> 白金卡, 3->白银卡 ...
              risingCardName: '',
              // 客户为升级卡花费金额
              risingCardMoney: ''
          }
            for(var i = 0; i < this.upgradeList.length ; i++){
              if(this.upgradeList[i].risingCardName == '' || this.upgradeList[i].risingCardMoney == ''){
                //this.$Message.warning("请先完善已有尊享项目信息！");
                errorMessage = "请先填写当前已有升级项目金额！"; 
              }
            }
            if(errorMessage == ''){
              this.upgradeList.push(newItem);
            }else{
              this.$Message.warning(errorMessage);
            }
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
        changeThisPrice(){
            for(var i = 0; i < this.curData.length; i++){
              if(((parseInt(this.curData[i].memPrice)-this.addData.memPrice)) < 0){
                this.curData.splice(i,i+1);
              }
            }
        },
        close(){
          this.addF = false;
        },
        mannger(data) {
          this.addF = true;
           var tempCardRule = '';
            this.addData={
              // 门店 id, 写错也没关系
              storeId: this.$route.params.id,
              // 会员级别名称
              cardName: data.cardName,
              // 会员价格
              memPrice: data.memPrice.replace("元",""),
              // 单次折扣
              singleDiscount: parseInt(data.singleDiscount.replace("%","")),
              // 产品折扣
              productDiscount: parseInt(data.productDiscount.replace("%","")),
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
              rebateCash: parseInt(data.rebateCash),
              // 会员返现, 有效期 ? 个月
              rebateExpire: parseInt(data.rebateExpire),
              // 注意事项, 分别从 1 到 6 对应 6 个选项
              considerations: ''
          };
          this.honorList = data.memCardItems;
          if(data.memCardRisings.length == 0){
            this.upgradeList = [
              {storeId: this.$route.params.id, 
              // 关联会员卡记录id, 后台会自动设置, 直接写 0 就好
              memCardId: 0,
              // 升级到 xxx 卡, 传递数字(推荐),假如 1 -> 钻石卡, 2-> 白金卡, 3->白银卡 ...
              risingCardName: '',
              // 客户为升级卡花费金额
              risingCardMoney: ''}
            ];
          }else{
            this.upgradeList = data.memCardRisings;
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
          }
        },
        changeStyle(){
          if(this.selectedRisCardRule.indexOf("增量充值")>-1){
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
