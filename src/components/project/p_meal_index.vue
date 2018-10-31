<template>
  <div>
    <h2 style="padding: .6rem;">项目套餐</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store" @on-ok="ok">
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectsave,findproblemList,findAllProject} from '../../interface';

  export default {
    name: 'p_index',
    created() {
      this.getList();
      this.getProblem();
      this.getProject();
    },
    data(){
      return {
        storeFlag: false,
        store:'',
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
</style>
