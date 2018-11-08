<template>
  <div>
    <h2 style="padding: .6rem;">项目套餐</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store" >
        <br/>
        套餐名称：<Input v-model="mealName" placeholder="套餐名称" style="width: 300px" />
        <br/>
        <br/>
        套餐价格：<Input v-model="mealPrice" placeholder="套餐价格 元" style="width: 300px" />
        <br/>
        <br/>
        <Select v-model="selectedProject" placeholder="请选择套餐项目" style="width:360px;margin-bottom:5%;margin-top:2%;" :transfer=true @on-change="changeProjects()" filterable>
          <Option v-for="(item,index) in projectList" :value="item.itemName" :key="index">{{ item.itemName }}</Option>
        </Select>
        <br/>
        <div v-show="showDataTable" class="dataTableDiv">
          <li class="specialLiTitle"><div class="liOrderLeft">序列</div><div class="liLeft">项目名称</div><div class="liCenter">项目价格</div><div class="liRightTitle">项目间隔</div><div class="liMostRight">修改间隔</div><br/></li>
          <draggable element="ul" v-model="planData">
            <li v-for="(item,index) in planData" class="specialLi"><div class="liOrderLeft">{{index+1}}</div><div class="liLeft">{{item.itemName}}</div><div class="liCenter">{{item.itemPrice}}</div><Input v-show="!showModify" v-model="item.courseInterval" class="liRight" disabled/><Input v-show="showModify" v-model="item.courseInterval" class="liRight" @on-blur="disableModify(item.courseInterval,index)"/><div class="liMostRight"><Button :size="buttonSize" type="primary" @click="mannger(index)">修改</Button><Button :size="buttonSize" type="warning" @click="Delete(item.itemName)">删除</Button></div><br/></li>
          </draggable>
        </div>
        <br/>
        <br/>
        <div class="timeLineDiv">
          <Timeline v-model="planData">
            <TimelineItem v-for="item in planData" :key="key">
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
          <Modal v-model="inputTimesFlag">
              <p slot="header" style="color:#000;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>{{selectedProject}}</span>
              </p>
              <div style="text-align:center">
              请输入“{{selectedProject}}”次数： <Input v-model="selectedProjectTimes" placeholder="请输入次数" style="width: 150px" />
              </div>
              <div slot="footer">
                  <Button type="success" size="large" long @click="addProject">确定</Button>
              </div>
          </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectsave,findproblemList,findAllProject} from '../../interface';
  import draggable from 'vuedraggable';

  export default {
    name: 'p_meal_index',
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
        projectList: [],
        selectedProject: '',
        selectedProjectTimes: '',
        inputTimesFlag: false,
        planData: [],
        showDataTable: false,
        mealName: '',
        mealPrice: '',
        buttonSize: 'small',
        showModify: false,
        columns: [
          {
            title: '套餐名称',
            key: 'projectName'
          },
          {
            title: '项目数量',
            key: 'projectNumber'
          },
          {
            title: '套餐次数',
            key: 'mealAmount'
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
                      this.Delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        data: [],
        prds:[],
        projectList:[],
      };
    },
    methods: {
        Delete(itemName){
          for(var l = 0; l < this.planData.length; l++){
            if(this.planData[l].itemName == itemName){
              this.planData.splice(l,1);
            }
          }
      },
      newEm(){
        this.storeFlag = true;
        this.selectedProjectTimes = '';
      },
      addProject(){
        if(this.selectedProjectTimes == ''){
          this.$Message.error('请输入该项目次数！');
        }else{
          for(var j = 0; j < this.selectedProjectTimes; j++){
            for(var i = 0; i < this.projectList.length; i++){
              if(this.selectedProject == this.projectList[i].itemName){
                  this.planData.push(this.projectList[i]);
                }
              }
          }
          this.inputTimesFlag = false;
          this.showDataTable = true;
          this.selectedProjectTimes = '';
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
          this.inputTimesFlag = false;
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      changeProjects(){
        this.inputTimesFlag=true;
      },
      close(){
        this.storeFlag = false;
      },
      mannger(index){
        this.showModify = true;
      },
      ok(){
        this.storeFlag = false;
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
    width:82%;
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
    width:37%;
    min-width: 37%
  }
  .liOrderLeft{
    float:left;
    margin-left:2%;
    width:7%;
    min-width: 7%
  }
  .liCenter{
    float:left;
    margin-left:1%;
    width:13%;
  }
  .liRight{
    float:left;
    margin-left:3%;
    width:13%;
    margin-top:9px;
  }
  .specialLi{
    height: 50px;
    line-height: 50px;
    font-size: 12px;
    color: #495060;
    background-color: #fff;
    border-bottom: 1px solid #efefef;
    cursor:pointer;
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
