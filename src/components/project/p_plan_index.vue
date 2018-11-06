<template>
  <div>
    <h2 style="padding: .6rem;">项目方案</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store">
        <br/>
        方案名称：<Input v-model="planName" placeholder="方案名称" style="width: 300px" />
        <br/>
        <br/>
        方案价格：<Input v-model="planPrice" placeholder="方案价格 元" style="width: 300px" />
        <br/>
        <br/>
        <div style="float:left;margin-left: 63px;">选择项目：</div>
        <br/>
        <Select v-model="selectedProjects" placeholder="请选择方案包含项目" :multiple=true style="width:360px;margin-bottom:5%;margin-top:2%;" :transfer=true @on-change="changeProjects()" filterable draggable=true>
          <Option v-for="(item,index) in projectList" :value="index" :key="index">{{ item.itemName }}</Option>
        </Select>
        <br/>
        <div style="float:left;margin-left: 63px;">套餐设计：</div>
        <br/>
        <div class="dataTableDiv">
          <li class="specialLiTitle"><div class="liLeft">项目名称</div><div class="liCenter">项目价格</div><div class="liRightTitle">项目间隔</div><div class="liMostRight">修改间隔</div><br/></li>
          <draggable element="ul" v-model="planData">
            <li v-for="(item,index) in planData" class="specialLi"><div class="liLeft">{{item.itemName}}</div><div class="liCenter">{{item.itemPrice}}</div><Input v-show="!showModify" v-model="item.courseInterval" class="liRight" disabled/><Input v-show="showModify" v-model="item.courseInterval" class="liRight" @on-blur="disableModify(item.courseInterval,index)"/><div class="liMostRight"><Button :size="buttonSize" type="primary" @click="mannger">修改</Button><Button :size="buttonSize" type="warning" @click="Delete(item.itemName)">删除</Button></div><br/></li>
          </draggable>
          <li v-show="showBlank" class="specialLi"></li>
        </div> 
        <br/>
        <div class="timeLineDiv">
          <Timeline v-model="planData">
            <TimelineItem v-for="item in planData">
                <p class="time">{{item.itemName}}</p>
                <br/>
                <p class="content">{{item.courseInterval}}</p>
            </TimelineItem>
          </Timeline>
        </div>
      <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectsave,findproblemList,findAllProject} from '../../interface';
  import draggable from 'vuedraggable';

  export default {
    name: 'p_index',
    components: {
      //调用组件
      draggable,
    },
    created() {
      this.getList();
    },
    data(){
      return {
        storeFlag: false,
        store:'',
        selectedProjects:[],
        buttonSize: 'small',
        showBlank: false,
        showModify: false,
        plan: {
          projects: [],
          price: ''
        },
        columns: [
          {
            title: '方案名称',
            key: 'projectName'
          },
          {
            title: '项目数量',
            key: 'projectNumber'
          },
          {
            title: '单价',
            key: 'courseMoney'
          },
          {
            title: '现金价格',
            key: 'cashMoney'
          },
          {
            title: '卡扣价格',
            key: 'buckleMoney'
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
              ]);
            }
          }
        ],
        data: [],
        planData: [],
        prds:[],
        projectList:[]
      };
    },
    methods: {
      newEm(){
        this.storeFlag = true;
        this.planData = [];
        this.selectedProjects = [];
      },
      pushSelectProjects(value, index, ar){
        this.projectList[value].index = value;
        this.projectList[value].showBlank = true;
        this.planData.push(this.projectList[value]);
        this.showBlank = false;
      },
      distinct(arr){
          var result = [],
          len = arr.length;
         for(var i = 0; i < len; i++){
          for(var j = i + 1; j < len; j++){
           if(arr[i] === arr[j]){
            j = ++i;
           }
          }
          result.push(arr[i]);
         }
         return result;
      },
      mannger(){
        this.showModify = true;
      },
      disableModify(value,index){
        if(!(/^\d+$/.test(value))){
          this.$Message.error('请输入新的间隔天数！');
          this.planData[index].courseInterval = '';
        }else{
          if(value !='' && value.indexOf("天")<0){
          this.planData[index].courseInterval = this.planData[index].courseInterval + "天";
          }
          this.showModify = false;
        }
      },
      Delete(itemName){
        for(var l = 0; l < this.planData.length; l++){
          if(this.planData[l].itemName == itemName){
            this.planData.splice(l,1);
          }
        }
        this.selectedProjects = [];
        for(var k = 0; k < this.planData.length; k++){
          this.selectedProjects.push(this.planData[k].index);
        }
        if(this.selectedProjects.length == 0){
          this.showBlank = true;
        }
      },
      close(){
        this.storeFlag = false;
      },
      ok(){
        this.storeFlag = false;
      },
      changeProjects(){
        this.planData = [];
        this.selectedProjects.forEach(this.pushSelectProjects);
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
      }
    }
  };
</script>

<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .leftRadio{
    float:left;
    margin-left:94px;
  }
  .dataTableDiv{
    margin: 0 auto;
    margin-top:2%;            
    text-align: center;    
    width:80%;
    background-color: #F8F8F8;
    border: 1px solid #dddee1;
  }
  #ul{
    margin-left:100px;
    list-style:none;
    width:150px;
    border:1px solid #000;
    display:none;
  }
  #ipt{
    margin:10px 0 0 100px;
  }
  li{
    list-style:none;
  }
  li a{
    display:inline-block;
    width:100%;
    height:100%;
    text-decoration:none;
    color:#000;
  }
  li a:hover{
    background-color:blue;
  }
  .liLeft{
    float:left;
    width:40%;
    min-width: 40%
  }
  .liCenter{
    float:left;
    margin-left:1%;
    width:15%;
  }
  .liRight{
    float:left;
    margin-left:3%;
    width:15%;
    margin-top:9px;
  }
  .specialLi{
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #495060;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
  }
  .specialLiTitle{
    height: 30px;
    line-height: 30px;
    border-bottom: 1px solid #efefef;
  }
  .liMostRight{
    width:80px;
    float:right;
    margin-right:1%;
  }
  .liRightTitle{
    float:left;
    margin-left:3%;
    width:15%;
  }
  .time{
      font-size: 14px;
      font-weight: bold;
  }
  .content{
      padding-left: 5px;
  }
  .timeLineDiv{
    margin: 0 auto;
    margin-top:2%;            
    text-align: center;    
    width:40%;
  }
</style>
