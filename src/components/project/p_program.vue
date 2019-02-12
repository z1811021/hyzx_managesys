<template>
  <div>
    <h2 style="padding: .6rem;">解决方案管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建解决方案</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProgram" v-model="storeFlag" :mask-closable="false" :title="store">
      症状：<Select v-model="selectProblem" placeholder="症状" style="width:323px" :transfer=true>
      <Option v-for="item in problemData" :value="item.symName" :key="item.symName">{{ item.symName }}</Option>
    </Select>
      <br><br>
      方案名称：<Input v-model="solutionName" placeholder="方案名称" style="width: 300px"/>
      <br/>
      <br/>
      基础解决方案：<Select v-model="selectBasePrograms" placeholder="基础解决方案" :multiple=true style="width:275px" :transfer=true>
        <OptionGroup label="项目方案">
            <Option v-for="project in planList" :value="project.programName" :key="project.programName">{{project.programName}} 元</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
        <OptionGroup label="项目套餐">
            <Option v-for="project in mealList" :value="project.programName" :key="project.programName">{{project.programName}} 元</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
        <OptionGroup v-for="item in projectCategoryList" :value="item.projectCategory" :label="item.projectCategory" :key="item.projectCategory">
            <Option v-for="project in item.curProjectList" :value="project.itemName" :key="project.itemName">{{project.itemName}} 元/次</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
    </Select>
      <br/>
      <br/>
      最优解决方案：<Select v-model="selectBestPrograms" placeholder="最优解决方案" :multiple=true style="width:275px" :transfer=true>
        <OptionGroup label="项目方案">
            <Option v-for="project in planList" :value="project.programName" :key="project.programName">{{project.programName}} 元</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
        <OptionGroup label="项目套餐">
            <Option v-for="project in mealList" :value="project.programName" :key="project.programName">{{project.programName}} 元</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
        <OptionGroup v-for="item in projectCategoryList" :value="item.projectCategory" :label="item.projectCategory" key="item.projectCategory">
            <Option v-for="project in item.curProjectList" :value="project.itemName" :key="project.itemName">{{ project.itemName }} 元/次</Option>
            <!-- <Option>abc</Option> -->
        </OptionGroup>
    </Select>
      <br/>
      <br/>
      <div slot="footer">
          <Button type="primary" @click="ok">{{store}}</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {saveSolution,editSolution,findSolutionList,deleteSolution,findproblemList,findAllProject,findProjectPlanList,findProjectList,} from '../../interface';

  export default {
    name: 'p_program',
    created() {
      this.getProject();
      this.getProblem();
      this.getSolutionList();
      //this.getData();
    },
    data(){
      return {
        storeFlag: false,
        selectBasePrograms: [],
        selectBestPrograms: [],
        store: '',
        card: '',
        basicPriceList: [],
        bestPriceList: [],
        solutionName: '',
        selectProblem: '',
        selectBaseProgram: [],
        selectBestProgram: [],
        problemData: [],
        mealList: [],
        planList: [],
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
            title: '症状',
            key: 'symptom'

          },
          {
            title: '解决方案名称',
            key: 'solutionName'
          },
          {
            title: '基础解决方案',
            key: 'basicLabel'
          },
          {
            title: '基础解决方案总价',
            key: 'basicPrice'
          },
          {
            title: '最优解决方案',
            key: 'bestLable'
          },
          {
            title: '最优解决方案总价',
            key: 'bestPrice'
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
        projectList:[],
        prds:[],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.solutionName = '';
        this.selectProblem ='';
        this.selectBasePrograms = [];
        this.selectBestPrograms = [];
      },
      getSolutionList(){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findSolutionList()+'/'+this.$route.params.id,
          }).then((res) => {
            this.data = res.data.solutionInfo;
            for (var i = 0; i < this.data.length; i++) {
              this.data[i].basicPrice = 0;
              this.data[i].bestPrice = 0;
              this.data[i].basicLabel = '';
              this.data[i].bestLable = '';
              var basicPriceList = this.data[i].basicSolution.split(",");
              var bestPriceList = this.data[i].bestSolution.split(","); 
              for (var j = 0; j < basicPriceList.length; j++) {
                this.data[i].basicPrice = this.data[i].basicPrice + parseInt(basicPriceList[j].substring(basicPriceList[j].indexOf("-")+2,basicPriceList[j].length));
                this.data[i].basicLabel = this.data[i].basicLabel + basicPriceList[j].substring(0,basicPriceList[j].indexOf("-"))+',';
              }
              for (var k = 0; k < bestPriceList.length; k++) {
                this.data[i].bestPrice = this.data[i].bestPrice + parseInt(bestPriceList[k].substring(bestPriceList[k].indexOf("-")+2,bestPriceList[k].length));
                this.data[i].bestLable = this.data[i].bestLable + bestPriceList[k].substring(0,bestPriceList[k].indexOf("-"))+',';
              }
              this.data[i].basicPrice = this.data[i].basicPrice + '元';
              this.data[i].bestPrice = this.data[i].bestPrice + '元';
              this.data[i].basicLabel = this.data[i].basicLabel.substring(0,this.data[i].basicLabel.length-1);
            }
        }).catch((error) => {
          this.$Message.error('获取失败');
          console.log(error);
        });
      },
      getProject(){
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
              this.planList = [];
            }else{
              this.planList = res.data.programManage;
              for (var i = 0; i < this.planList.length; i++) {
              this.planList[i].programName = this.planList[i].programName + "【方案】" + '- ' + this.planList[i].programPrice;
            }
              this.getMeal();
            }
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      getMeal(){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: findProjectPlanList()+'/'+this.$route.params.id+'?programType=1',
          }).then((res) => {
            this.mealList = res.data.programManage;
            for (var i = 0; i < this.mealList.length; i++) {
              this.mealList[i].programName = this.mealList[i].programName + "【套餐】"+ '- ' + this.planList[i].programPrice;
            }
            this.getList();
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      getList() {
        this.faceProjectList= [];
        this.bodyProjectList= [];
        this.projectCategoryList= [];
        this.projectListFQJ= [];
        this.projectListFBS= [];
        this.projectListFMB= [];
        this.projectListFXF= [];
        this.projectListFKM= [];
        this.projectListFDD= [];
        this.projectListFJZ= [];
        this.projectListFCZ= [];
        this.projectListFQB= [];
        this.projectListFMKGL= [];
        this.projectListFVLSL= [];
        this.projectListFYB= [];
        this.projectListFZG= [];
        this.projectListFQT= [];
        this.projectListBTB= [];
        this.projectListBJJ= [];
        this.projectListBBB= [];
        this.projectListBXB= [];
        this.projectListBFB= [];
        this.projectListBYB= [];
        this.projectListBTUNB= [];
        this.projectListBDT= [];
        this.projectListBXT= [];
        this.projectListBQT= [];
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
            this.projectList[i].itemName = this.projectList[i].itemName + " - " + this.projectList[i].itemPrice;
            this.projectList[i].itemPrice = this.projectList[i].itemPrice + "元/次";
            this.projectList[i].courseTimes = this.projectList[i].courseTimes + "次";
            this.projectList[i].coursePrice = this.projectList[i].coursePrice + "元";
            this.projectList[i].courseInterval = this.projectList[i].courseInterval + "天";
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
        }).catch((error) => {
          this.$Message.error('获取失败');
          console.log(error);
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
      ok() {
          var selectBaseProgramsString = '';
          var selectBestProgramsString = '';
          for(var i=0;i<this.selectBasePrograms.length;i++){
            selectBaseProgramsString = selectBaseProgramsString + this.selectBasePrograms[i] + ',';
          }
          for(var j=0;j<this.selectBestPrograms.length;j++){
            selectBestProgramsString = selectBestProgramsString + this.selectBestPrograms[j] + ',';
          }
          var solutionManage = {
              storeId: this.$route.params.id,
              // 症状
              symptom: this.selectProblem,
              // 方案名
              solutionName: this.solutionName,
              // 基本方案
              basicSolution: selectBaseProgramsString.substring(0,selectBaseProgramsString.length-1),
              // 最佳方案
              bestSolution: selectBestProgramsString.substring(0,selectBestProgramsString.length-1)
          }
          var params = {
              storeId: this.$route.params.id,
              solutionManage: solutionManage
          }
          var validateMessage = '';
          let URL = saveSolution();
          if(this.selectProblem == ''){
            validateMessage = validateMessage + "请选择症状！<br/>";
          }
          if(this.solutionName == ''){
            validateMessage = validateMessage + "请输入解决方案名称！<br/>";
          }
          if(selectBaseProgramsString == ''){
            validateMessage = validateMessage + "请选择基础解决方案配置！<br/>";
          }
          if(selectBestProgramsString == ''){
            validateMessage = validateMessage + "请选择最优解决方案配置！<br/>";
          }
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
            data: params,
            url: URL,
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getProject();
            this.getSolutionList();
            this.storeFlag=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
        }
      },
      mannger(data) {
        this.selectProblem = data.symptom;
        this.solutionName = data.solutionName;
        this.selectBasePrograms = data.basicSolution.split(",");
        this.selectBestPrograms = data.bestSolution.split(",");
        this.storeFlag = true;
        this.store = '修改';
      },
      close(){
        this.storeFlag = false;
      },
      del(data) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deleteSolution()+'/'+this.$route.params.id+"?symptom="+data.symptom+"&solutionName="+data.solutionName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getProject();
          this.getSolutionList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
    }
  };
</script>

<style scoped>
  .modalProgram {
    margin: 0 auto;            
    text-align: center;    
  }

</style>
