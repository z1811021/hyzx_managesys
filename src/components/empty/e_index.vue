<template>
  <div>
    <h2 style="padding: .6rem;">员工管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  class="modalEmployee" v-model="storeFlag" :mask-closable="false" :title="store" @on-ok="optai">
      <div class="com">
        职位名称：<Input v-model="job.postName" placeholder="岗位名称" style="width: 300px"/>
      </div>
      <div class="com">
        职责内容：<Input v-model="job.postDuties" placeholder="岗位职责" style="width: 300px"/>
      </div>
      <div class="com">
        工作流程：<Input v-model="job.workflow" placeholder="第一步：  ，第二步：  " style="width: 300px"/>
      </div>
      <div class="com">
        员工类型：<Select v-model="job.employeeType"  placeholder="员工类型" style="width:300px" :transfer=true>
        <Option value="1" >技师</Option>
        <Option value="2" >顾问</Option>
        <Option value="3" >店长</Option>
      </Select>
      </div>
      <div class="com">
        员工等级：<Select v-model="job.employeeRank"  placeholder="员工等级" style="width:300px" :transfer=true>
        <Option value="1" >一级</Option>
        <Option value="2" >二级</Option>
      </Select>
      </div>
      <div class="com">
        员工排名：<Select v-model="job.checkWorkAttendance" :transfer=true style="width:300px">
          <Option value="1" >年</Option>
          <Option value="2" >半年</Option>
          <Option value="3" >季度</Option>
          <Option value="4" >两个月</Option>
          <Option value="5" >单月</Option>
        </Select>
        <br/>
        <Checkbox-group class="employeeCheck">
          <Checkbox label="现金"></Checkbox>
          <Checkbox label="客流"></Checkbox>
          <Checkbox label="实操"></Checkbox>
          <Checkbox label="产品"></Checkbox>
          <Checkbox label="消耗"></Checkbox>
        </Checkbox-group>
      </div>
      <div class="com">
        分红管理：<Select v-model="job.dataRankings" :transfer=true style="width:300px">
          <Option value="年" >年</Option>
          <Option value="半年" >半年</Option>
          <Option value="季度" >季度</Option>
          <Option value="月" >月</Option>
        </Select>
      </div>
      <div class="com">
        <div style="float: left;margin-left: 64px;">股权设置：</div>
        <br/>
        <RadioGroup v-model="stock" style="margin-top:2%;">
            <Radio label="原始股" style="float:left;">
                <span>原始股</span>
            </Radio>
            <Input v-model="job.workflow" placeholder="每股金额" style="width: 240px;float:right;margin-top: -5px;"/>
            <br/>
            <br/>
            <Radio label="实股" style="float:left;">
                <span>实股</span>
            </Radio>
            <Input v-model="job.workflow" placeholder="每股金额" style="width: 240px;float:right;margin-top: -5px;"/>
            <br/>
            <br/>
            <Radio label="干股" style="float:left;">
                <span>干股</span>
            </Radio>
            <Input v-model="job.workflow" placeholder="每股金额" style="width: 240px;float:right;margin-top: -5px;"/>
            <br/>
            <br/>
            <Radio label="分红股" style="float:left;">
                <span>分红股</span>
            </Radio>
            <Input v-model="job.workflow" placeholder="每股金额" style="width: 240px;float:right;margin-top: -5px;"/>
        </RadioGroup>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findPostList, findPostsave, findPostedit,deletePost} from '../../interface';

  export default {
    name: 'e_index',
    created() {
      this.getList(1);
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        job: {
          id : '',
          storeId: '',
          postName: '',
          postDuties: '',
          workflow: '',
          achievements: '',
          technicalExamination: '',
          checkWorkAttendance: '',
          multiMonthCash: '',
          classes: '',
          shareAmount: '',
          dividendManagement: '',
          natureOfEquity: '',
          dataRankings: '',
          employeeType:'',
          employeeRank:''
        },
        columns: [
          {
            title: '序号',
            key: 'id',
          },
          {
            title: '岗位名称',
            key: 'postName',
          },
          {
            title: '职责',
            key: 'postDuties',
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
      };
    },
    methods: {
      getList(page) {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findPostList()+"?id="+this.$route.params.id+"&page="+page+"&pageSize=30",
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
        });
      },
      optai() {
        /*if(this.job.postName == '' || this.job.postDuties == '' || this.job.workflow == '' || this.job.achievements == '' || this.job.technicalExamination == ''){
          this.$Message.warning('请完整填写内容');
          return false;
        }*/
        this.job.storeId = this.$route.params.id;
        let URL = findPostsave();
        if( this.store == '修改') {
          URL = findPostedit();
        };
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.job,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList(1);
        }).catch((error) => {
          this.$Message.error('操作失败');
        });
      },
      newEm() {
        this.storeFlag = true;
        this.store = '新建岗位设置';
        this.job = {
          id : '',
            postName: '',
            postDuties: '',
            workflow: '',
            achievements: '',
            technicalExamination: '',
            checkWorkAttendance: '',
          employeeType:'',
          employeeRank:''
        };
      },
      mannger(data) {
        this.storeFlag = true;
        this.store = '修改';
        this.job = JSON.parse(JSON.stringify(data));
      },
      Delete(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deletePost()+'?id='+data.id,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList(1);
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      }
    }
  };
</script>

<style scoped>
  .com{
    margin: 10px 0;
  }
  .modalEmployee{
    margin: 0 auto;            
    text-align: center;      
  }
  .ivu-checkbox-group-item{
    margin: 3% 0 1% 2%;
  }
</style>
