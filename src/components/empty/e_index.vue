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
        <div style="float: left;margin-left: 13%;">是否设置岗位等级：</div>
        <RadioGroup v-model="gradeChoose" @on-change="changeGrade">
          <Radio label="是" style="float:left;">
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:left;">
              <span>否</span>
          </Radio>
        </RadioGroup>
        <div class="com">级别类型：<Select v-show="!showStyle" style="width:300px" disabled>
            <Option value="1" >数字</Option>
            <Option value="2" >字母</Option>
          </Select>
          <Select v-show="showStyle" v-model="checkWorkAttendance" :transfer=true style="width:300px">
            <Option value="1" >数字</Option>
            <Option value="2" >字母</Option>
          </Select>
       </div>
        <div class="com">
        级别数量：<Input v-show="!showNumber" placeholder="级别数量" style="width: 300px" disabled/>
        <Input v-show="showNumber" placeholder="级别数量" style="width: 300px" />
        </div>
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
        分红管理：<Select v-model="job.dataRankings" :transfer=true style="width:300px;">
          <Option value="年" >年</Option>
          <Option value="半年" >半年</Option>
          <Option value="季度" >季度</Option>
          <Option value="月" >月</Option>
        </Select>
      </div>
      <div class="com" style="margin-bottom: 60px;margin-top:5px;">
        <div style="float: left;margin-left: 13%;">股权设置：</div>
        <br/>
        <div style="margin-top:10px;">
          <Checkbox-group v-model='stock' @on-change="changeStock">
            <Checkbox label="original" class="checkStock">
                <span>原始股</span>
            </Checkbox>
            <Input v-show="!showOriginal" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="showOriginal" v-model="job.originalStock" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox label="real" class="checkStock">
                <span>实股</span>
            </Checkbox>
            <Input v-show="!showReal" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="showReal" v-model="job.realStock" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox label="perform" class="checkStock">
                <span>干股</span>
            </Checkbox>
            <Input v-show="!showPerform" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="showPerform" v-model="job.performStock" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox label="bonus" class="checkStock">
                <span>分红股</span>
            </Checkbox>
            <Input v-show="!showBonus" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="showBonus" v-model="job.bonusStock" placeholder="每股金额" class="checkInput"/>
          </Checkbox-group>
        </div>
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
        showOriginal: false,
        showBonus: false,
        showPerform: false,
        showReal: false,
        showStyle: false,
        showNumber: false,
        stock:[],
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
      },
      changeStock(){
        if(this.stock.indexOf('original') > -1){
          this.showOriginal = true;
        }else{
          this.showOriginal = false;
          this.job.originalStock = '';
        }
        if(this.stock.indexOf('real') > -1){
          this.showReal = true;
        }else{
          this.showReal = false;
          this.job.realStock = '';
        }
        if(this.stock.indexOf('perform') > -1){
          this.showPerform = true;
        }else{
          this.showPerform = false;
          this.job.performStock = '';
        }
        if(this.stock.indexOf('bonus') > -1){
          this.showBonus = true;
        }else{
          this.showBonus = false;
          this.job.bonusStock = '';
        }
      },
      changeGrade(){
        if(this.gradeChoose == "是"){
            this.showStyle= true;
            this.showNumber= true;
        }else{
            this.showStyle= false;
            this.showNumber= false;
        }
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
  .ivu-radio-group{
    margin-left: -44%;
  }
  .ltClose{
    width:50%;
    height:90%;
  }
  .checkInput{
    width: 180px;
    float:right;margin-right: 164px;
  }
  .checkStock{
    float:left;
    margin-left: 74px;
    margin-top: 6px;
  }
  .employeeCheck{
    margin-left:35px;
  }
</style>
