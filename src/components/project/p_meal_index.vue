<template>
  <div>
    <h2 style="padding: .6rem;">项目套餐</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建套餐</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store" >
        <br/>
        套餐名称：<Input v-model="mealName" placeholder="套餐名称" style="width: 300px" />
        <br/>
        <br/>
        套餐价格：<Input v-model="mealPrice" placeholder="套餐价格 元" style="width: 300px"  @on-blur="checkPrice"/>
        <br/>
        <br/>
        <div style="float:left;margin-left: 63px;">选择项目：</div>
        <br/>
        <Select v-model="selectedProject" ref="setHouseQuery" clearable placeholder="请选择套餐项目" style="width:360px;margin-bottom:5%;margin-top:2%;" :transfer=true @on-change="changeProjects()" filterable>
          <Option v-for="(item,index) in projectList" :value="index" :key="index">{{ item.itemName }}</Option>
        </Select>
        <br/>
        <div v-show="showDataTable" class="dataTableDiv">
          <li class="specialLiTitle"><div class="liOrderLeft">序列</div><div class="liLeft">项目名称</div><div class="liCenter">项目价格</div><div class="liRightTitle">项目间隔</div><div class="liMostRight">修改间隔</div><br/></li>
          <draggable element="ul" v-model="planData">
            <li v-for="(item,index) in planData" class="specialLi"><div class="liOrderLeft">{{index+1}}</div><div class="liLeft">{{item.itemName}}</div><div class="liCenter">{{item.itemPrice}}</div><Input v-show="!item.showBlank" v-model="item.itemInterval" class="liRight" disabled/><Input v-show="item.showBlank" v-model="item.itemInterval" class="liRight" @on-blur="disableModify(item,index)"/><div class="liMostRight"><Button :size="buttonSize" type="primary" @click="mannger(item)">修改</Button><Button :size="buttonSize" type="warning" @click="Delete(item.itemOrder)">删除</Button></div><br/></li>
          </draggable>
        </div>
        <br/>
        <br/>
        <div class="timeLineDiv">
          <draggable element="Timeline" v-model="planData">
            <TimelineItem style="cursor:pointer;" v-for="item in planData" :key="key">
                <p class="time">{{item.itemName}}</p>
                <br/>
                <p class="content">{{item.itemInterval}}</p>
            </TimelineItem>
          </draggable>
        </div>
        <div slot="footer">
            <Button type="primary" @click="ok">添加</Button>
            <Button type="ghost" @click="close">取消</Button>
        </div>
    </Modal>
          <Modal v-model="inputTimesFlag" :mask-closable="false">
              <p slot="header" style="color:#000;text-align:center">
                  <Icon type="ios-information-circle"></Icon>
                  <span>{{showModalTitle}}</span>
              </p>
              <div style="text-align:center">
              请输入“{{showModalTitle}}”次数： <Input v-model="selectedProjectTimes" placeholder="请输入次数" style="width: 150px" />
              </div>
              <div slot="footer">
                  <Button type="success" size="large" long @click="addProject">确定</Button>
              </div>
          </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectPlansave, findProjectPlanList, projectPlandelete} from '../../interface';
  import draggable from 'vuedraggable';

  export default {
    name: 'p_meal_index',
    components: {
      //调用组件
      draggable,
    },
    created() {
      this.getList();
      this.getMealList();
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
        showModalTitle: '',
        columns: [
          {
            title: '套餐名称',
            key: 'programName'
          },
          {
            title: '项目数量',
            key: 'projectNumber'
          },
          {
            title: '套餐总价',
            key: 'programPrice'
          },
          /*{
            title: '套餐总时长',
            key: 'programDuring'
          },*/
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
                      this.manngerMeal(params.row)
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
                      this.DeleteMeal(params.row)
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
      Delete(itemOrder){
        this.planData.splice(itemOrder-1,1);
        if(this.planData.length == 0){
          this.showDataTable = false;
          this.inputTimesFlag = false;
        }
      },
      newEm(){
        this.storeFlag = true;
        this.planData = [];
        this.mealName='';
        this.mealPrice='';
        this.showDataTable = false;
        this.showModalTitle = '';
        this.inputTimesFlag = false;
        this.selectedProject = '';
        this.$refs.setHouseQuery.$data.query = '';
      },
      getMealList(){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findProjectPlanList()+'/'+this.$route.params.id+'?programType=1',
          }).then((res) => {
            this.data = res.data.programManage;
            for(var i = 0; i < this.data.length; i++){
              this.data[i].projectNumber = this.data[i].programItems.length+"个";
              this.data[i].programPrice = this.data[i].programPrice+"元";
              this.data[i].programItems = this.data[i].programItems.sort(this.compare("itemOrder"));
              this.data[i].courseInterval = this.data[i].programItems.itemInterval;
            }
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      DeleteMeal(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: projectPlandelete()+'/'+this.$route.params.id+"?programType=1&programName="+data.programName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getMealList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      addProject(){
        var cIndex = '';
        var currentItem = {};
        if(this.selectedProjectTimes == ''){
          this.$Message.warning('请输入该项目次数！');
          this.inputTimesFlag = true;
        }else{
            var oriIndex = this.planData.length;
            var indeLen = Number(oriIndex)+Number(this.selectedProjectTimes);
            cIndex = this.selectedProject;
            for(var i=oriIndex;i<indeLen;i++){
          currentItem = {"itemName":this.projectList[cIndex].itemName,"itemPrice":this.projectList[cIndex].itemPrice,"showBlank":false,"itemInterval":this.projectList[cIndex].itemInterval,"sameProjectOrder": this.projectList[cIndex].itemName+(i)+"times","itemOrder":i+1};
              this.planData.push(currentItem);
            }  
            this.inputTimesFlag = false;
            this.showDataTable = true;
            this.selectedProjectTimes = '';
            this.selectedProject = '';
            this.$refs.setHouseQuery.$data.query = '';
          }
      },
      compare(property) {
            return function(a, b) {
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
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
            this.projectList[i].itemInterval = this.projectList[i].courseInterval + "天";
          }
          this.inputTimesFlag = false;
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      changeProjects(){
        console.log(this.selectedProject);
        if(this.selectedProject == undefined){
          this.inputTimesFlag=false;
        }else{
          this.inputTimesFlag=true;
          this.showModalTitle=this.projectList[this.selectedProject].itemName;
        }
      },
      manngerMeal(data){
        this.showDataTable = true;
        this.planData = data.programItems;
        for(var i = 0; i < this.planData.length; i++){
          this.planData[i].itemPrice = this.planData[i].itemPrice + "元/次";
          this.planData[i].itemInterval = this.planData[i].itemInterval + "天";
        }
        this.mealName = data.programName;
        this.mealPrice = data.programPrice;
        this.storeFlag = true;
      },
      close(){
        this.storeFlag = false;
        for(var i = 0; i < this.planData.length; i++){
          this.planData[i].itemPrice = this.planData[i].itemPrice.replace("元/次","");
          this.planData[i].itemInterval = this.planData[i].itemInterval.replace("天","");
        }
      },
      mannger(item){
        item.showBlank = true;
        item.itemInterval = '';
      },
      checkPrice(){
        if(!(/^\d+$/.test(this.mealPrice))){
          this.$Message.error('方案价格只能输入数字！');
        }else{
          this.mealPrice = this.mealPrice+"元";
        }
      },
      ok(){
        var programItems = [];
        for(var i=0;i<this.planData.length;i++){
          var item = {storeId:this.$route.params.id, programId:1, itemOrder:i+1, itemName:this.planData[i].itemName, itemPrice:this.planData[i].itemPrice.replace("元/次",""), itemInterval:this.planData[i].itemInterval.replace("天","")};
          programItems.push(item);
        }
        programItems.sort(this.compare("itemOrder"));
        var programManage = {
            storeId: this.$route.params.id,
            // 方案名称
            programName: this.mealName,
            // 类别： 0,方案，1， 套餐
            programType:1,
            // 方案价格
            programPrice: this.mealPrice.replace("元",""),
            // 与方案关联的项目
            programItems: programItems
        };
        var params = {
            storeId:this.$route.params.id,
            programManage:programManage
        }
        let URL = projectPlansave();
        if(this.mealName == '' || this.mealPrice == ''){
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
            this.getMealList();
            this.storeFlag=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
        }
      },
      disableModify(item,index){
        if(!(/^\d+$/.test(item.itemInterval))){
          this.$Message.error('请输入新的间隔天数！');
          item.itemInterval = '';
        }else{
          if(item.itemInterval !='' && item.itemInterval.indexOf("天")<0){
          item.itemInterval = item.itemInterval + "天";
          }
          item.showBlank = false;
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
    width:90%;
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
