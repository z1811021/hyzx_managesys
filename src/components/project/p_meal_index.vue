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
        <br/>
        症状：<Select v-model="symptom" placeholder="症状" style="width:323px" :transfer=true>
          <Option v-for="item in problemData" :value="item.symName" :key="item.symName">{{ item.symName }}</Option>
        </Select>
        <br/>
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
          <OptionGroup v-for="item in projectCategoryList" :value="item.projectCategory" :label="item.projectCategory" :key="item.projectCategory">
            <Option v-for="project in item.curProjectList" :value="project.id" :key="project.id">{{ project.itemName }} {{project.itemPrice}}</Option>
            <!-- <Option>abc</Option> -->
          </OptionGroup>
        </Select>
        <br/>
        <div v-show="showDataTable" class="dataTableDiv">
          <li class="specialLiTitle"><div class="liOrderLeft">序列</div><div class="liLeft">项目名称</div><div class="liCenter">项目价格</div><div class="liRightTitle">项目间隔</div><div class="liMostRight">修改间隔</div><br/></li>
          <draggable element="ul" v-model="planData">
            <li v-for="(item,index) in planData" class="specialLi" :key="index"><div class="liOrderLeft">{{index+1}}</div><div class="liLeft">{{item.itemName}}</div><div class="liCenter">{{item.itemPrice}}</div><Input v-show="!item.showBlank" v-model="item.itemInterval" class="liRight" disabled/><Input v-show="item.showBlank" v-model="item.itemInterval" class="liRight" @on-blur="disableModify(item,index)"/><div class="liMostRight"><Button :size="buttonSize" type="primary" @click="mannger(item)">修改</Button><Button :size="buttonSize" type="warning" @click="Delete(item.itemOrder)">删除</Button></div><br/></li>
          </draggable>
        </div>
        <br/>
        <br/>
        <div class="timeLineDiv">
          <draggable element="Timeline" v-model="planData">
            <TimelineItem style="cursor:pointer;" v-for="(item,index) in planData" :key="index">
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
  import {findProjectList, projectedit, projectdelete, projectPlansave, findProjectPlanList, projectPlandelete,findproblemList} from '../../interface';
  import draggable from 'vuedraggable';

  export default {
    name: 'p_meal_index',
    components: {
      //调用组件
      draggable,
    },
    created() {
      this.getList();
      this.getProblem();
      this.getMealList();
    },
    data(){
      return {
        storeFlag: false,
        store:'',
        symptom: '',
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
        problemData: [],
        faceProjectList:[],
        bodyProjectList:[],
        projectCategoryList:[],
        projectListFQJ:[],
        projectListFBS:[],
        projectListFMB:[],
        projectListFXF:[],
        projectListFKM:[],
        projectListFDD:[],
        projectListFJZ:[],
        projectListFCZ:[],
        projectListFQB:[],
        projectListFMKGL:[],
        projectListFVLSL:[],
        projectListFYB:[],
        projectListFZG:[],
        projectListFQT:[],
        projectListBTB:[],
        projectListBJJ:[],
        projectListBBB:[],
        projectListBXB:[],
        projectListBFB:[],
        projectListBYB:[],
        projectListBTUNB:[],
        projectListBDT:[],
        projectListBXT:[],
        projectListBQT:[],
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
        this.symptom = '';
        this.mealPrice='';
        this.showDataTable = false;
        this.showModalTitle = '';
        this.inputTimesFlag = false;
        this.selectedProject = '';
        this.$refs.setHouseQuery.$data.query = '';
      },
      getProblem(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findproblemList() + '/'+this.$route.params.id,
        }).then((res) => {
          this.problemData = res.data.symptomManageInfo;
        }).catch((error) => {
        });
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
            for(var j=0;j<this.projectList.length;j++){
              if(this.projectList[j].id == this.selectedProject){
                cIndex = j;
              }
            }
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
          this.projectList = res.data.itemManage;
          for(var i=0;i<this.projectList.length;i++){
            this.projectList[i].itemPrice = this.projectList[i].itemPrice + "元/次";
            this.projectList[i].courseTimes = this.projectList[i].courseTimes + "次";
            this.projectList[i].coursePrice = this.projectList[i].coursePrice + "元";
            this.projectList[i].itemInterval = this.projectList[i].courseInterval + "天";
            if(this.projectList[i].face != '' && this.projectList[i].face == 1){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 清洁";
                this.projectListFQJ.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 清洁","curProjectList":this.projectListFQJ};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 2){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 补水";
                this.projectListFBS.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 补水","curProjectList":this.projectListFBS};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 3){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 美白";
                this.projectListFMB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 美白","curProjectList":this.projectListFMB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 4){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 修复";
                this.projectListFXF.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 修复","curProjectList":this.projectListFXF};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 5){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 抗敏";
                this.projectListFKM.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 抗敏","curProjectList":this.projectListFKM};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 6){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 痘痘";
                this.projectListFDD.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 痘痘","curProjectList":this.projectListFDD};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 7){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 紧致";
                this.projectListFJZ.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 紧致","curProjectList":this.projectListFJZ};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 8){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 除皱";
                this.projectListFCZ.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 除皱","curProjectList":this.projectListFCZ};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 9){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 祛斑";
                this.projectListFQB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 祛斑","curProjectList":this.projectListFQB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 10){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 毛孔管理";
                this.projectListFMKGL.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 毛孔管理","curProjectList":this.projectListFMKGL};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 11){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - V脸瘦脸";
                this.projectListFVLSL.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - V脸瘦脸","curProjectList":this.projectListFVLSL};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 12){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 眼部";
                this.projectListFYB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 眼部","curProjectList":this.projectListFYB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 13){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 整骨";
                this.projectListFZG.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 整骨","curProjectList":this.projectListFZG};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].face != '' && this.projectList[i].face == 14){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "面部 - 其他";
                this.projectListFQT.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"面部 - 其他","curProjectList":this.projectListFQT};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 1){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 头部";
                this.projectListBTB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 头部","curProjectList":this.projectListBTB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 2){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 肩颈";
                this.projectListBJJ.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 肩颈","curProjectList":this.projectListBJJ};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 3){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 背部";
                this.projectListBBB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 背部","curProjectList":this.projectListBBB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 4){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 胸部";
                this.projectListBXB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 胸部","curProjectList":this.projectListBXB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 5){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 腹部";
                this.projectListBFB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 腹部","curProjectList":this.projectListBFB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 6){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 腰部";
                this.projectListBYB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 腰部","curProjectList":this.projectListBYB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 7){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 臀部";
                this.projectListBTUNB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 臀部","curProjectList":this.projectListBTUNB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 8){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 大腿";
                this.projectListBDT.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 大腿","curProjectList":this.projectListBDT};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 9){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 小腿";
                this.projectListBXT.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 小腿","curProjectList":this.projectListBXT};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 10){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 足部";
                this.projectListBZB.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 足部","curProjectList":this.projectListBZB};
                this.projectCategoryList.push(curentProjectCategory);
              }else if(this.projectList[i].body != '' && this.projectList[i].body == 11){
                var curentProjectCategory = {};
                this.projectList[i].projectCategory = "身体 - 其他";
                this.projectListBQT.push(this.projectList[i]);
                curentProjectCategory = {"projectCategory":"身体 - 其他","curProjectList":this.projectListBQT};
                this.projectCategoryList.push(curentProjectCategory);
              }
          }
          this.projectCategoryList = this.uniqueArray(this.projectCategoryList,"projectCategory");
          this.inputTimesFlag = false;
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
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
      changeProjects(){
        if(this.selectedProject == undefined){
          this.inputTimesFlag=false;
        }else{
          this.inputTimesFlag=true;
          for(var i = 0; i < this.projectList.length; i++){
            if(this.projectList[i].id == this.selectedProject){
              this.showModalTitle=this.projectList[i].itemName;
            }
          }
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
        this.selectedProject = [];
        //this.selectedProject = 
        //console.log(JSON.parse(JSON.stringify(this.selectedProject)));
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
            programItems: programItems,
            // 解决方案
            symptom: this.symptom
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
