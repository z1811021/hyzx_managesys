<template>
  <div>
    <h2 style="padding: .6rem;">员工管理</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  class="modalEmployee" v-model="storeFlag" :mask-closable="false" :title="store">
      <div class="com">
        职位名称：<Input v-model="job.jobTitle" placeholder="岗位名称" style="width: 300px"/>
      </div>
      <div class="com">
        职责内容：<Input v-model="job.respCont" placeholder="岗位职责" style="width: 300px"/>
      </div>
      <div class="com">
        工作流程：<Input v-model="job.workflow" placeholder="第一步：  ，第二步：  " style="width: 300px"/>
      </div>
      <div class="com">
        <div class="com">工作类型：
          <Select v-model="job.levelType" :transfer=true style="width:300px" @on-change="changeLevelType">
            <Option value="1" >管理</Option>
            <Option value="2" >技师</Option>
          </Select>
        </div>
        <div style="float: left;margin-left: 13%;">是否设置岗位等级：</div>
        <RadioGroup v-model="job.postGrade" @on-change="changeGrade">
          <Radio label="是" style="float:left;">
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:left;">
              <span>否</span>
          </Radio>
        </RadioGroup>
        <div class="com">
        级别数量：<InputNumber :max="20" :min="2" v-model="job.levelNum" v-show="!showNumber" placeholder="级别数量" style="width: 300px" disabled/></InputNumber>
        <InputNumber :max="20" :min="2" v-model="job.levelNum" v-show="showNumber" placeholder="级别数量" style="width: 300px" /></InputNumber>
        </div>
      </div>
      <div class="com">
        员工排名：<Select v-model="job.memRank" :transfer=true style="width:300px">
          <Option value="1" >年</Option>
          <Option value="2" >半年</Option>
          <Option value="3" >季度</Option>
          <Option value="4" >两个月</Option>
          <Option value="5" >单月</Option>
        </Select>
        <br/>
        <Checkbox-group class="employeeCheck">
          <Checkbox v-model="job.memRankCash" label="现金"></Checkbox>
          <Checkbox v-model="job.memRankPflow" label="客流"></Checkbox>
          <Checkbox v-model="job.memRankPexer" label="实操"></Checkbox>
          <Checkbox v-model="job.memRankProd" label="产品"></Checkbox>
          <Checkbox v-model="job.memRankCons" label="消耗"></Checkbox>
        </Checkbox-group>
      </div>
      <div class="com">
        分红管理：<Select v-model="job.dvidendMange" :transfer=true style="width:300px;">
          <Option value="1" >年</Option>
          <Option value="2" >半年</Option>
          <Option value="3" >季度</Option>
          <Option value="4" >月</Option>
        </Select>
      </div>
      <div class="com" style="margin-bottom: 60px;margin-top:5px;">
        <div style="float: left;margin-left: 13%;">股权设置：</div>
        <br/>
        <div style="margin-top:10px;">
            <Checkbox v-model="job.primStock" label="prim" class="checkStock" @on-change="checkPrim">
                <span>原始股</span>
            </Checkbox>
            <Input v-show="!job.primStock" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="job.primStock" v-model="job.primStockMoney" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox v-model="job.realStock" label="real" class="checkStock" @on-change="checkReal">
                <span>实股</span>
            </Checkbox>
            <Input v-show="!job.realStock" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="job.realStock" v-model="job.realStockMoney" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox v-model="job.dryStock" label="dry" class="checkStock" @on-change="checkDry">
                <span>干股</span>
            </Checkbox>
            <Input v-show="!job.dryStock" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="job.dryStock" v-model="job.dryStockMoney" placeholder="每股金额" class="checkInput"/>
            <br/>
            <br/>
            <Checkbox v-model="job.bonStock" label="bon" class="checkStock" @on-change="checkBon">
                <span>分红股</span>
            </Checkbox>
            <Input v-show="!job.bonStock" placeholder="每股金额" class="checkInput" disabled/>
            <Input v-show="job.bonStock" v-model="job.bonStockMoney" placeholder="每股金额" class="checkInput"/>
        </div>
      </div>
      <div slot="footer">
          <Button type="primary" @click="optai">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findPostList, findPostsave, findPostedit,deletePost} from '../../interface';

  export default {
    name: 'e_index',
    created() {
      this.getList();
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
              storeId: this.$route.params.id,
              // 职位名称, 应限定在 32 个字符长度
              jobTitle: '',
              // 职责内容， 应限定在 64 个字符长度
              respCont: '',
              // 工作流程，  应限定在 64 个字符长度
              workflow: '',
              // 是否设置岗位等级, 0 否， 1 是
              postGrade: '',
              // 级别类型， 0 数字， 1 字母
              levelType: '',
              // 级别数量
              levelNum: '',
              // 员工排名， 0 年，1 半年，2 季度，3 两个月， 4 单月
              memRank: '',
              // 现金, 0 未选中， 1 选中
              memRankCash: false,
              // 客流， 0 未选中， 1 选中
              memRankPflow: false,
              // 实操，0 未选中， 1 选中
              memRankPexer: false,
              // 产品，0 未选中， 1 选中 
              memRankProd: false,
              // 消耗，0 未选中， 1 选中 
              memRankCons: false,
              // 分红管理， 0 年，1 半年，2 季度，3 月
              dvidendMange: '',
              // 原始股， 0 未选中， 1 选中 
              primStock: false,
              // 原始股每股金额
              primStockMoney: '',
              // 实股，0 未选中， 1 选中 
              realStock: false,
              // 实股每股金额
              realStockMoney: '',
              // 干股， 0 未选中， 1 选中 
              dryStock: false,
              // 干股每股金额
              dryStockMoney: '',
              // 分红股， 0 未选中， 1 选中 
              bonStock: false,
              bonStockMoney: ''
        },
        columns: [
          {
            title: '岗位名称',
            key: 'jobTitle',
          },
          {
            title: '工作类别',
            key: 'levelTyleLabel',
          },
          {
            title: '职责',
            key: 'respCont',
          },
          {
            title: '工作流程',
            key: 'workflow',
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
      transfer(b){
        if(b == true){
          return 1;
        }else{
          return 0;
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
          url: findPostList()+"/"+this.$route.params.id,
        }).then((res) => {
          this.data = res.data.memMangeInfo;
          for (var i = 0; i < this.data.length; i++) {
            if(this.data[i].levelType == "1"){
              this.data[i].levelTyleLabel = "管理";
            }else if(this.data[i].levelType == "2"){
              this.data[i].levelTyleLabel = "技师";
            }
          }
        }).catch((error) => {
        });
      },
      optai() {
          var validateMessage = '';
          this.job.memRankCash = this.transfer(this.job.memRankCash);
          this.job.memRankPflow = this.transfer(this.job.memRankPflow);
          this.job.memRankPexer = this.transfer(this.job.memRankPexer);
          this.job.memRankProd = this.transfer(this.job.memRankProd);
          this.job.memRankCons = this.transfer(this.job.memRankCons);
          this.job.realStock = this.transfer(this.job.realStock);
          this.job.dryStock = this.transfer(this.job.dryStock);
          this.job.bonStock = this.transfer(this.job.bonStock);
          this.job.primStock = this.transfer(this.job.primStock);
          this.job.postGrade = this.transferGrade(this.job.postGrade);
          if(this.job.levelType == ''){
            validateMessage = validateMessage + "请选择工作类型！<br/>";
          }
          if(this.job.jobTitle == ''){
            validateMessage = validateMessage + "请输入岗位名称！<br/>";
          }
          if(this.job.respCont == ''){
            validateMessage = validateMessage + "请输入岗位流程!<br/>";
          }
          if(this.job.workflow == ''){
            validateMessage = validateMessage + "请输入岗位名称！<br/>";
          }
          if(this.job.memRank == 0 || (this.job.memRankCash == 0 && this.job.memRankPflow == 0 && this.job.memRankPexer == 0 && this.job.memRankProd == 0 && this.job.memRankCons == 0)){
            validateMessage = validateMessage + "请选择该类员工排名时段，方式！<br/>";
          }
          if(this.job.dvidendMange == 0){
            validateMessage = validateMessage + "请选择该类员工分红时段！<br/>";
          }
          if(validateMessage != ''){
            this.$Message.error(validateMessage);
            validateMessage = '';
          }else{
              var params = {
                  storeId: this.$route.params.id,
                  memMange: this.job
              }
              this.$ajax({
              method: 'POST',
              dataType: 'JSON',
              contentType: 'application/json;charset=UTF-8',
              data: params,
              headers: {
                "authToken": sessionStorage.getItem('authToken')
              },
              url: findPostsave(),
            }).then((res) => {
              this.$Message.success('操作成功');
              this.clear();
              this.getList();
              this.storeFlag = false;
            }).catch((error) => {
              this.$Message.error('操作失败');
            });
          }
      },
      changeLevelType(){
        if(this.job.levelType == "1"){
          this.job.postGrade = "否";
          this.showNumber = false;
        }else if(this.job.levelType == "2"){
          this.job.postGrade = "";
        }
      },
      transferBack(c){
        if(c == 1){
          return true;
        }else{
          return false;
        }
      },
      clear(){
          this.job = {
            storeId: this.$route.params.id,
            // 职位名称, 应限定在 32 个字符长度
            jobTitle: '',
            // 职责内容， 应限定在 64 个字符长度
            respCont: '',
            // 工作流程，  应限定在 64 个字符长度
            workflow: '',
            // 是否设置岗位等级, 0 否， 1 是
            postGrade: '',
            // 级别类型， 0 数字， 1 字母
            levelType: '',
            // 级别数量
            levelNum: '',
            // 员工排名， 0 年，1 半年，2 季度，3 两个月， 4 单月
            memRank: '',
            // 现金, 0 未选中， 1 选中
            memRankCash: false,
            // 客流， 0 未选中， 1 选中
            memRankPflow: false,
            // 实操，0 未选中， 1 选中
            memRankPexer: false,
            // 产品，0 未选中， 1 选中 
            memRankProd: false,
            // 消耗，0 未选中， 1 选中 
            memRankCons: false,
            // 分红管理， 0 年，1 半年，2 季度，3 月
            dvidendMange: '',
            // 原始股， 0 未选中， 1 选中 
            primStock: false,
            // 原始股每股金额
            primStockMoney: '',
            // 实股，0 未选中， 1 选中 
            realStock: false,
            // 实股每股金额
            realStockMoney: '',
            // 干股， 0 未选中， 1 选中 
            dryStock: false,
            // 干股每股金额
            dryStockMoney: '',
            // 分红股， 0 未选中， 1 选中 
            bonStock: false,
            bonStockMoney: ''
        };
      },
      newEm() {
        this.storeFlag = true;
        this.store = '新建岗位设置';
        this.clear();
        this.showStyle= false;
        this.showNumber= false;
        this.showBonus = false;
        this.showPerform = false;
        this.showReal = false;
        this.showOriginal = false;
      },
      mannger(data) {
        this.storeFlag = true;
        this.store = '修改';
        this.job = JSON.parse(JSON.stringify(data));
        this.job.memRankCash = this.transferBack(this.job.memRankCash);
        this.job.memRankPflow = this.transferBack(this.job.memRankPflow);
        this.job.memRankPexer = this.transferBack(this.job.memRankPexer);
        this.job.memRankProd = this.transferBack(this.job.memRankProd);
        this.job.memRankCons = this.transferBack(this.job.memRankCons);
        this.job.realStock = this.transferBack(this.job.realStock);
        this.job.dryStock = this.transferBack(this.job.dryStock);
        this.job.bonStock = this.transferBack(this.job.bonStock);
        this.job.primStock = this.transferBack(this.job.primStock);
        this.job.postGrade = this.transferGradeBack(this.job.postGrade);
        if(this.job.postGrade == "是"){this.showStyle= true;this.showNumber= true;}
        if(this.job.bonStock == true){this.showBonus = true;}
        if(this.job.dryStock == true){this.showPerform = true;}
        if(this.job.realStock == true){this.showReal = true;}
        if(this.job.primStock == true){this.showOriginal = true;}
      },
      Delete(data){
        this.$ajax({  
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deletePost()+"/"+this.$route.params.id+"?jobTitle="+data.jobTitle,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      checkPrim(){
        if(this.job.primStock == false){
          this.job.primStockMoney = "";
        }
      },
      checkReal(){
        if(this.job.realStock == false){
          this.job.realStockMoney = "";
        }
      },
      checkDry(){
        if(this.job.dryStock == false){
          this.job.dryStockMoney = "";
        }
      },
      checkBon(){
        if(this.job.bonStock == false){
          this.job.bonStockMoney = "";
        }
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
      transferGrade(d){
        if(d == "是"){
          return 1;
        }else{
          return 0;
        }
      },
      transferGradeBack(e){
        if(e == 1){
          return "是";
        }else{
          return "否";
        }
      },
      close(){
        this.storeFlag=false;
      },
      changeGrade(){
        if(this.job.postGrade == "是"){
            this.showStyle= true;
            this.showNumber= true;
        }else{
            this.showStyle= false;
            this.showNumber= false;
            this.job.levelType= "";
            this.job.levelNum= "";
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
