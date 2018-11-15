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
      <Option v-for="item in problemData" :value="item.symName" :key="index">{{ item.symName }}</Option>
    </Select>
      <br><br>
      方案名称：<Input v-model="solutionName" placeholder="方案名称" style="width: 300px"/>
      <br/>
      <br/>
      基础解决方案：<Select v-model="selectBasePrograms" placeholder="基础解决方案" :multiple=true style="width:275px" :transfer=true>
      <Option v-for="item in projectList" :value="item.programName" :key="index">{{ item.programName }}</Option>
    </Select>
      <br/>
      <br/>
      最优解决方案：<Select v-model="selectBestPrograms" placeholder="最优解决方案" :multiple=true style="width:275px" :transfer=true>
      <Option v-for="item in projectList" :value="item.programName" :key="index">{{ item.programName }}</Option>
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
  import {saveSolution,editSolution,findSolutionList,deleteSolution,findproblemList,findAllProject,findProjectPlanList,} from '../../interface';

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
        store: '',
        card: '',
        solutionName: '',
        selectProblem: '',
        selectBaseProgram: [],
        selectBestProgram: [],
        problemData: [],
        columns: [
          {
            title: '症状',
            key: 'symptom'

          },
          {
            title: '方案名称',
            key: 'solutionName'
          },
          {
            title: '基础解决方案',
            key: 'basicSolution'
          },
          {
            title: '最优解决方案',
            key: 'bestSolution'
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
        }).catch((error) => {
          this.$Message.error('获取失败');
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
            this.projectList = res.data.programManage;
            this.getMeal();
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
            for(var i=0;i<res.data.programManage.length;i++){
              this.projectList.push(res.data.programManage[i]);
            }
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
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
