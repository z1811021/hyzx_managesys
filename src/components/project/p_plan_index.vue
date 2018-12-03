<template>
  <div>
    <h2 style="padding: .6rem;">项目方案</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建方案</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store">
        <br/>
        方案名称：<Input v-model="planName" placeholder="方案名称" style="width: 300px" />
        <br/>
        <br/>
        方案价格：<Input v-model="planPrice" placeholder="方案价格 元" style="width: 300px" @on-blur="checkPrice"/>
        <br/>
        <br/>
        <div style="float:left;margin-left: 63px;">选择项目：</div>
        <br/>
        <Select v-model="selectedProjects" placeholder="请选择方案包含项目" :multiple=true style="width:360px;margin-top:2%;" :transfer=true @on-change="changeProjects()" filterable draggable=true>
          <Option v-for="(item,index) in projectList" :value="index" :key="index">{{ item.itemName }}</Option>
        </Select>
        <br/>
        <br/>
        <div v-show="showDataTable" style="float:left;margin-left: 63px;">方案设计：</div>
        <br/>
        <div v-show="showDataTable" class="dataTableDiv">
          <li class="specialLiTitle"><div class="liOrderLeft">序列</div><div class="liLeft">项目名称</div><div class="liCenter">项目价格</div><div class="liRightTitle">项目间隔</div><div class="liMostRight">修改间隔</div><br/></li>
          <draggable element="ul" v-model="planData">
            <li v-for="(item,index) in planData" class="specialLi"><div class="liOrderLeft">{{index+1}}</div><div class="liLeft">{{item.itemName}}</div><div class="liCenter">{{item.itemPrice}}</div><Input v-show="!item.showBlank" v-model="item.courseInterval" class="liRight" disabled/><Input v-show="item.showBlank" v-model="item.courseInterval" class="liRight" @on-blur="disableModify(item,index)"/><div class="liMostRight"><Button :size="buttonSize" type="primary" @click="mannger(item)">修改</Button><Button :size="buttonSize" type="warning" @click="Delete(item.itemName)">删除</Button></div><br/></li>
          </draggable>
          <li v-show="showBlank" class="specialLi"></li>
        </div> 
        <br/>
        <br/>
        <div class="timeLineDiv">
          <draggable element="Timeline" v-model="planData">
            <TimelineItem style="cursor:pointer;" v-for="item in planData" :key="key">
                <p class="time">{{item.itemName}}</p>
                <br/>
                <p class="content">{{item.courseInterval}}</p>
            </TimelineItem>
          </draggable>
        </div>
      <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectPlansave, findProjectPlanList, projectPlandelete} from '../../interface';
  import draggable from 'vuedraggable';

  export default {
    name: 'p_plan_index',
    components: {
      //调用组件
      draggable,
    },
    created() {
      this.getList();
      this.getPlanList();
    },
    data(){
      return {
        storeFlag: false,
        store:'',
        selectedProjects:[],
        buttonSize: 'small',
        showBlank: false,
        showModify: false,
        showDataTable: false,
        planName:'',
        planPrice: '',
        plan: {
          projects: [],
          price: ''
        },
        columns: [
          {
            title: '方案名称',
            key: 'programName'
          },
          {
            title: '项目数量',
            key: 'projectNumber'
          },
          {
            title: '方案总价',
            key: 'programPrice'
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
                      this.manngerPlan(params.row)
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
                      this.DeletePlan(params.row)
                    }
                  }
                }, '删除'),
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
        this.planName='';
        this.planPrice='';
        this.showDataTable = false;
        this.showBlank = false;
      },
      pushSelectProjects(value, index, ar){
        this.projectList[value].index = value;
        this.projectList[value].showBlank = false;
        this.planData.push(this.projectList[value]);
        this.showBlank = false;
        this.showDataTable = true;
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
      mannger(item){
        this.showModify = true;
        item.courseInterval = '';
        item.showBlank = true;
      },
      disableModify(item,index){
        if(!(/^\d+$/.test(item.courseInterval))){
          this.$Message.error('请输入新的间隔天数！');
          item.courseInterval = '';
        }else{
          if(item.courseInterval !='' && item.courseInterval.indexOf("天")<0){
          item.courseInterval = item.courseInterval + "天";
          }
          item.showBlank = false; 
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
        if(this.planData.length>0){
          this.showDataTable = true;
        }else{
          this.showDataTable = false;
        }
      },
      close(){
        this.storeFlag = false;
      },
      ok(){
        var programItems = [];
        //this.planData = this.planData.sort(this.compare("itemOrder"));
        for(var i=0;i<this.planData.length;i++){
          var item = {storeId:this.$route.params.id, programId:0, itemOrder:i+1, itemName:this.planData[i].itemName, itemPrice:this.planData[i].itemPrice.replace("元/次",""), itemInterval:this.planData[i].courseInterval.replace("天","")};
          programItems.push(item);
        }
        programItems.sort(this.compare("itemOrder"));
        var programManage = {
            storeId: this.$route.params.id,
            // 方案名称
            programName: this.planName,
            // 类别： 0,方案，1， 套餐
            programType:0,
            // 方案价格
            programPrice: this.planPrice.replace("元",""),
            // 与方案关联的项目
            programItems: programItems
        };
        var params = {
            storeId:this.$route.params.id,
            programManage:programManage
        }
        let URL = projectPlansave();
        if(this.planName == '' || this.planPrice == ''){
          this.$Message.warning('请填写方案名称或者价格！');
        }else{
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
            this.getPlanList();
            this.storeFlag=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
        }
      },
      changeProjects(){
        this.planData = [];
        this.selectedProjects.forEach(this.pushSelectProjects);
        },
      getPlanList(){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findProjectPlanList()+'/'+this.$route.params.id+'?programType=0',
          }).then((res) => {
            if(res.data.programManage == null){
              this.data = [];
            }else{
              this.data = res.data.programManage;
                for(var i = 0; i < this.data.length; i++){
                  this.data[i].projectNumber = this.data[i].programItems.length+"个";
                  this.data[i].programPrice = this.data[i].programPrice+"元";
                  this.data[i].programItems = this.data[i].programItems.sort(this.compare("itemOrder"));
                  this.data[i].courseInterval = this.data[i].programItems.itemInterval;
                }
            }
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      DeletePlan(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: projectPlandelete()+'/'+this.$route.params.id+"?programType=0&programName="+data.programName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getPlanList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      checkPrice(){
        if(!(/^\d+$/.test(this.planPrice))){
          this.$Message.error('方案价格只能输入数字！');
        }else{
          this.planPrice = this.planPrice+"元";
        }
      },
      getInterBack(value, index, ar){
        for(var k = 0; k < this.planData.length; k++){
          if(value.itemName == this.planData[k].itemName){
            this.planData[k].courseInterval = value.itemInterval+"天";
          } 
        }
      },
      manngerPlan(data){
        this.selectedProjects = [];
        this.planData = [];
        data.programItems.forEach(this.getProjectsBack);
        //this.planData = data.programItems;
        this.selectedProjects.forEach(this.pushSelectProjects);
        //console.log(JSON.parse(JSON.stringify(data.programItems)));
        data.programItems.forEach(this.getInterBack);
        this.planName = data.programName;
        this.planPrice = data.programPrice;
        this.storeFlag = true;
      },
      compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        },
      getProjectsBack(value, index, ar){
        for(var i = 0; i < this.projectList.length; i++){
          if(value.itemName == this.projectList[i].itemName){
            this.selectedProjects.push(i);
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
    width:88%;
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
    width:12%;
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
