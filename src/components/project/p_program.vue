<template>
  <div>
    <h2 style="padding: .6rem;">解决方案管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建解决方案</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  v-model="storeFlag" :mask-closable="false" :title="store" @on-ok="ok">
      症状：<Select v-model="selectProblem" placeholder="症状" style="width:323px" :transfer=true>
      <Option v-for="item in problemData" :value="item.symName" :key="index">{{ item.symName }}</Option>
    </Select>
      <br><br>
      方案名称：<Input placeholder="方案名称" style="width: 300px"/>
      <br/>
      <br/>
      基础解决方案：<Select v-model="selectBaseProgram" placeholder="基础解决方案" :multiple=true style="width:275px" :transfer=true>
      <Option v-for="item in projectList" :value="item.programName" :key="index">{{ item.programName }}</Option>
    </Select>
      <br/>
      <br/>
      最优解决方案：<Select v-model="selectBestProgram" placeholder="最优解决方案" :multiple=true style="width:275px" :transfer=true>
      <Option v-for="item in projectList" :value="item.programName" :key="index">{{ item.programName }}</Option>
    </Select>
      <br/>
      <br/>
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
      //this.getData();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        selectProblem: '',
        selectBaseProgram: '',
        selectBestProgram: '',
        problemData: [],
        columns: [
          {
            title: '症状',
            key: 'problemName'

          },
          {
            title: '方案名称',
            key: 'schemeName'
          },
          {
            title: '基础解决方案',
            key: 'basicProgramme'
          },
          {
            title: '最优解决方案',
            key: 'optimalScheme'
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
        projectList:[],
        prds:[],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          storeId: this.$route.params.id,
          basicProgramme: "",
          basicProgrammeIds: [],
          enable: true,
          handlingDetails: "",
          id: "",
          optimalScheme: "",
          optimalSchemeIds: [],
          problemId:'' ,
          problemName: "",
          schemeName: "",
          storeName: "",
          symptomType: ""

        };
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
/*      getData(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findSolutionList()+'?id='+this.$route.params.id,
        }).then((res) => {
          this.data = res.data;
        }).catch((error) => {
        });
      },*/
      ok() {
      },
      mannger(data) {
        this.pis = JSON.parse(JSON.stringify(data));
        if (typeof data.basicProgramme == 'string') {
          this.pis.basicProgrammeIds = data.basicProgrammeIds.split(',').map( (it, i) => {return +it});
        }
        if (typeof data.optimalScheme == 'string') {
          this.pis.optimalSchemeIds = data.optimalSchemeIds.split(',').map( (it, i) => {return +it});
        }
        this.storeFlag = true;
        this.store = '修改';
      },
      del(data, i) {
        let mess = confirm('确认删除？');
        if (mess) {
          this.$ajax({
            method: 'GET',
            url:deleteSolution()+"?id=" + data.id,
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
          }).then((res) => {
            this.data.splice(i, 1);
            this.$Message.success('删除成功');
          }).catch((error) => {
            this.$Message.error('删除失败');
          });
        }
      },
    }
  };
</script>

<style scoped>

</style>
