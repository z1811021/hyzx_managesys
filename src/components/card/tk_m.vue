<template>
  <div class="list">
    <h2 style="margin: .6rem 0;">拓客卡管理</h2>
    <Button class="hy_btn" @click="Add">添加</Button>
    <br/>
    <br/>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="addF" title="添加" :mask-closable="false">
      <div class='com'>名称：<Input v-model="addData.extensionName" style="width: 300px"></Input></div>
      <div class='com'>卡扣价格：<Input v-model="addData.bucklePrice" style="width: 276px"></Input></div>
      <div class="com">现金价格：<Input v-model="addData.cashPrice" style="width: 276px"></Input></div>
      <div class='com'>有效期：<Input v-model="addData.extensionValidity" placeholder="单位天" style="width: 288px"></Input></div>
      <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算业绩：</div>
        <Input v-model="addData.performancePrice" style="width:252px" >
            <Select v-model="addData.performance" slot="prepend" style="width: 80px">
                <Option value="1"> 是</Option>
                <Option value="2"> 否</Option>
            </Select>
        </Input>
        </div>
        <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算实操：</div>
          <Input v-model="addData.performancePrice" style="width:252px" >
              <Select v-model="addData.performance" slot="prepend" style="width: 80px">
                  <Option value="1"> 是</Option>
                  <Option value="2"> 否</Option>
              </Select>
          </Input>
       </div>
      <div class='com'><div style="float:left;margin-left: 76px;margin-top:8px;">是否计算手工：</div>
          <Input v-model="addData.performancePrice" style="width:252px" >
              <Select v-model="addData.performance" slot="prepend" style="width: 80px">
                  <Option value="1"> 是</Option>
                  <Option value="2"> 否</Option>
              </Select>
          </Input>
       </div>

      <div class="project" style="margin-top:20px;">
        <h3 style="margin-left:-200px;">拓客项目<Button class="hy_btn" size="small" @click="Addproject" style="margin-left:42px;">添加</Button></h3>
        <div v-for="(item,index) in addData.project" class="projectone">
          <div class='com'>项目：
            <Select v-model="item.projectId" style="width:180px" :transfer=true>
              <Option v-for="(item,index) in projectList" :value="index" :key="index">{{ item.itemName }}</Option>

            </Select>
            &nbsp;次数：<Input v-model="item.extensionNumber" style="width: 50px"></Input>
            <Button class="hy_btn" @click="deleteProject(index)">删除</Button>
          </div>
        </div>
      </div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 每周销售 <Input v-model="addData.quantity" size="small" style="width: 30px"/> 张，每张奖励<Input v-model="addData.reward" size="small" style="width: 50px" @on-keyup="addData.reward=check2(addData.reward)"/> 元，超过每张奖励<Input v-model="addData.exceedReward" size="small" style="width: 50px"/> 元</div>
      </div>
      <div class='group'>
        <h3>奖励政策</h3>
        <div class='com'> 首次进店微信预约转账 <Input v-model="addData.quantity" size="small" style="width: 30px"/> 元，体验抵 <Input v-model="addData.reward" size="small" style="width: 50px"/> 元，充值抵 <Input v-model="addData.exceedReward" size="small" style="width: 50px"/> 元，均按照<div style="margin-top:8px;">
          <Select size="small" style="width:80px;" :transfer=true>
              <Option v-for="(project,index) in memberShowData" :value="project.cardName" :key="project.id">{{project.cardName}}</Option>
          </Select>会员最低抵扣体验护理。</div></div>
      </div>
    </Modal>
  </div>
</template>

<script>
import {findMembership,findProjectList,findExtension,saveExtension,editExtension,deleteExtension,findAllProject} from '../../interface'
    export default {
      name: "tk_m",
      data() {
        return {
          columns: [
            { title: '名称', key: 'extensionName',},
            { title: '卡扣价格', key: 'bucklePrice',},
            { title: '现金价格', key: 'cashPrice',},
            { title: '有效期(天)', key: 'extensionValidity',},
            { title: '是否计算业绩', key: 'performance',
              render: (h, params) => {
                return h('div',params.row.performance==1? '是':'否')
              }

            },
            { title: '是否计算实操', key: 'actualOperation',
              render: (h, params) => {
                return h('div',params.row.actualOperation==1? '是':'否')
              }
            },
            { title: '是否计算手工', key: 'manualFee',
              render: (h, params) => {
                return h('div',params.row.manualFee==1? '是':'否')
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
          projectList: [],
          memberData: [],
          memberShowData: [],
          addData:{
            actualOperation: "",
            extensionMoney: "",
            extensionName: '',
            extensionValidity: "",
            id: "",
            manualFee: "",
            performance: "",
            project: [
              {
                extensionNumber: '',
                extensionValidity:'',
                projectId: '',
                projectName: ""
              }
            ],
            quantity: '',
            reward: "",
            storeName: "",
            storeId: this.$route.params.id,
            bucklePrice:"",
            cashPrice:"",
            exceedReward:"",
          },
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
        getMember(){
          this.$ajax({
            method:'get',
            url: findMembership()+'/'+this.$route.params.id,
          }).then( (res) =>{
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
            url: findExtension()+'?storeId='+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data;
          }).catch( (error) =>{

          })
        },
        ok() {
          var Surl;

          if(this.addData.extensionName == ''){
            this.$Message.warning('名称不能为空');
            return;
          }
        if(this.type == 1){
          Surl = saveExtension();
        }else{
          Surl = editExtension();
        }
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
          this.type = 1;
        this.addF = true;
        this.addData={
              actualOperation: "",
              extensionMoney: "",
              extensionName: '',
              extensionValidity: '',
              id: '',
              manualFee: "",
              performance: "",
              project: [
              {
                extensionNumber: '',
                extensionValidity:'',
                projectId: '',
                projectName: ""
              }
            ],
              quantity: '',
              reward: "",
              storeName: "",
              storeId: this.$route.params.id,
              bucklePrice:'',
              cashPrice:''
          };
        },
        Addproject(){
          this.addData.project.push({
            extensionNumber: '',
            extensionValidity:'',
            projectId: '',
            projectName: ""
          });
        },
        deleteProject(index){
          if(this.addData.project.length == 1){
            this.addData.project = [
              {
                extensionNumber: '',
                extensionValidity:'',
                projectId: '',
                projectName: ""
              }
            ];
          }else{
            this.addData.project.splice(index,1);
          }
        },
        mannger(data, i) {
          this.type = 0;
          this.addF =true;
          this.addData = JSON.parse(JSON.stringify(data));
          this.addData.performance=this.addData.performance == 1 ? '1': '2';
          this.addData.actualOperation=this.addData.actualOperation== 1 ? '1': '2';
          this.addData.manualFee=this.addData.manualFee== 1 ? '1': '2';

        },
        del(data, i) {
          this.$ajax({
          method: 'get',
          url: deleteExtension()+'?id='+data.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
        },
        check(value){
          return value.replace(/[^\d]/g,'');
        },
        check2(value){
          return value.replace(/[^\d\.]/g,'');
        }
      },
      created(){
        this.getList();
        //this.getData();
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
