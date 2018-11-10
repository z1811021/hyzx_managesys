<template>
  <div>
    <h2 style="padding: .6rem;">症状管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
      <Button class="hy_btn" @click="newEm">新建症状</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store">
        <br/>
        症状名称：<Input v-model="pis.symName" placeholder="症状名称" style="width: 300px" />
        <br/>
        <br/>
        <div style="float:left;margin-left: 63px;">症状类型：</div>    
          <Select v-model="pis.symType" placeholder="请选择症状类型" style="width:300px;margin-top:-6px;margin-left:-63px;">
            <Option value="1" >面部问题</Option>
            <Option value="2" >身体问题</Option>
          </Select>
        <br/>
        <br/>
        <div style="float:left;margin-left: 63px;">症状描述：</div>
        <br/>
        <br/>
          <div class="ivu-input-wrapper ivu-input-type" style="width: 70%;"><textarea autocomplete="off" spellcheck="false" placeholder="症状描述" rows="2" class="ivu-input" style="height: 90px;margin-bottom:30px;" wrap="soft" v-model="pis.symDesc"></textarea></div>
      <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findproblemList, findProjectList, saveproblem, deleteproblem} from '../../interface';

  export default {
    name: 'p_symptom',
    created() {
      this.getList();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        card: '',
        pis: {
          id: '',
          storeId:this.$route.params.id,
          symName: '',
          symType: '',
          symDesc: ''
        },
        columns: [
          {
            title: '症状名称',
            key: 'symName'
          },
          {
            title: '症状类型',
            key: 'symptomType',
            render: (h, params) => {
              return h('span', params.row.symType == '1' ? '面护类': '身体类')
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
                      this.Delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        prds: [],
        data: [],
      };
    },
    methods: {
      newEm() {
        this.storeFlag = true;
        this.store = '新建';
        this.pis = {
          id: '',
          storeId: this.$route.params.id,
          symName: '',
          symType: '',
          symDesc: ''
        };

      },
      Delete(data) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deleteproblem()+'/'+this.$route.params.id+"?symName="+data.symName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      getList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findproblemList() + '/'+this.$route.params.id,
        }).then((res) => {
          this.data = res.data.symptomManageInfo;
        }).catch((error) => {
        });
      },
      findProjectList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList()+'?id='+this.$route.params.id,
        }).then((res) => {
          this.prds = res.data.results;
        }).catch((error) => {
        });
      },
      ok() {
        let URL = saveproblem();
        if(this.pis.symName == ''||this.pis.symType=='' ||this.pis.symDesc == ''){
          this.$Message.warning('请填写完整信息');
          return;
        }
        var symptomManage = {
              storeId: this.$route.params.id,
              symName: this.pis.symName,
              // 1：身体类, 2：面部类
              symType: this.pis.symType,
              // 字数应限制在 512 个字符
              symDesc: this.pis.symDesc
          }
          
          var params = {
              storeId:this.$route.params.id,
              symptomManage: symptomManage
          }
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
          this.getList();
          this.storeFlag=false;
        }).catch((error) => {
          this.$Message.error('操作失败');
        });
      },
      close(){
        this.storeFlag = false;
      },
      mannger(data) {
        this.pis = JSON.parse(JSON.stringify(data));
        this.storeFlag = true;
        this.store = '修改';
      },
    }
  };
</script>

<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
</style>
