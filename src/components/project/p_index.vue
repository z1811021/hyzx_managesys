<template>
  <div>
    <h2 style="padding: .6rem;">项目列表</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建项目</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store">
      <div style="float:left;;margin-left: 63px;">项目类别：</div>
      <br/>
      <br/>
      <RadioGroup v-model="projectChoose" @on-change="changePro" prop="test">
          <Radio label="1" style="float:left;">
              <span>面部</span>
          </Radio>
          <Select v-show="!showFace" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-model="pis.face" v-show="showFace" style="float:right;width:300px;margin-top:-6px;">
            <Option value="1" >清洁</Option>
            <Option value="2" >补水</Option>
            <Option value="3" >美白</Option>
            <Option value="4" >修复</Option>
            <Option value="5" >抗敏</Option>
            <Option value="6" >痘痘</Option>
            <Option value="7" >紧致</Option>
            <Option value="8" >除皱</Option>
            <Option value="9" >祛斑</Option>
            <Option value="10" >毛孔管理</Option>
            <Option value="11" >V脸瘦脸</Option>
            <Option value="12" >眼部</Option>
            <Option value="13" >整骨</Option>
          </Select>
          <br/>
          <br/>
          <Radio label="2" style="float:left;">
              <span>身体</span>
          </Radio>
          <Select v-show="!showBody" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-model="pis.body" v-show="showBody" style="float:right;width:300px;margin-top:-6px;">
            <Option value="1" >头部</Option>
            <Option value="2" >肩颈</Option>
            <Option value="3" >背部</Option>
            <Option value="4" >胸部</Option>
            <Option value="5" >腹部</Option>
            <Option value="6" >腰部</Option>
            <Option value="7" >臀部</Option>
            <Option value="8" >大腿</Option>
            <Option value="9" >小腿</Option>
            <Option value="10" >足部</Option>
          </Select>
      </RadioGroup>
      <br/>
      <br/>
      <div v-show="!(pis.face || pis.body)">
      项目名称：<Input placeholder="名称" style="width: 300px" disabled/>
      <br/>
      <br/>
      项目单价：<Input placeholder="项目单价 次/元" style="width: 300px" disabled/>
      <br/>
      <br/>
      项目间隔：<Input placeholder="项目间隔 次" style="width: 300px" disabled/>
      </div>
      <div v-show="pis.face || pis.body">
      项目名称：<Input v-model="pis.itemName" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
<!--       项目单价：<InputNumber v-model="pis.itemPrice" placeholder="项目单价 次/元" style="width: 300px" @on-blur="addPriceUnit"/></InputNumber> -->
      项目单价：<InputNumber
            :min="0"
            v-model="pis.itemPrice"
            :formatter="value => `${value}元/次`"
            :parser="value => value.replace('元/次', '')" placeholder="元/次" style="width: 300px"></InputNumber>
      <br/>
      <br/>
 <!--      项目间隔：<Input v-model="pis.courseInterval" placeholder="项目间隔" style="width: 300px" @on-blur="addPeriod"/> -->
      项目间隔：<InputNumber
            :min="0"
            v-model="pis.courseInterval"
            :formatter="value => `${value}天`"
            :parser="value => value.replace('天', '')" placeholder="天" style="width: 300px"></InputNumber>
      </div>
      <br/>
      <div style="float:left;margin-left: 63px;">是否设计疗程：</div>
      <RadioGroup v-show="!(pis.face || pis.body)" style="margin-right:40%;">
          <Radio label="是" style="float:left;" disabled>
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:right;" disabled>
              <span>否</span>
          </Radio>
      </RadioGroup>
      <RadioGroup v-show="pis.face || pis.body" v-model="pis.designCourse" @on-change="changeAgenda" style="margin-right:40%;">
          <Radio label="是" style="float:left;" >
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:right;" >
              <span>否</span>
          </Radio>
      </RadioGroup>
          <div v-show="!showAgenda">
          <br/>
          <div class="leftRadio">疗程次数：</div><Input placeholder="疗程次数" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"disabled/>
          <br/>
          <br/>
          <div class="leftRadio">疗程价：</div><Input placeholder="疗程价" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"disabled/>
          <br/>
          <br/>
          </div>
          <div v-show="showAgenda">
          <br/>
          <!-- <div class="leftRadio">疗程次数：</div><Input v-model="pis.courseTimes" placeholder="疗程次数" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" @on-blur="addTimeUnit"/> -->
          <div class="leftRadio">疗程次数：</div><InputNumber
            :min="0"
            v-model="pis.courseTimes"
            :formatter="value => `${value}次`"
            :parser="value => value.replace('次', '')" placeholder="疗程次数：次" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;">
          </InputNumber>
          <br/>
          <br/>
          <!-- <div class="leftRadio">疗程价：</div><Input v-model="pis.coursePrice" placeholder="疗程价：元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" @on-blur="addCurePriceUnit"/> -->
          <div class="leftRadio">疗程价：</div><InputNumber
            :min="0"
            v-model="pis.coursePrice"
            :formatter="value => `${value}元`"
            :parser="value => value.replace('元', '')" placeholder="疗程价：元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;">
          </InputNumber>
          </div>
      <div style="float: left;margin-left: 12%;margin-top:3%;">项目属性：</div>
          <br/>
          <br/>
          <br/>
      <Checkbox-group>
          <Checkbox v-model="pis.highFreq" label="高频到店"></Checkbox>
          <Checkbox v-model="pis.presents" label="赠送属性"></Checkbox>
          <Checkbox v-model="pis.superposition" label="叠加属性"></Checkbox>
          <Checkbox v-model="pis.strongEfficacy" label="强功效"></Checkbox>
          <Checkbox v-model="pis.generalProps" label="常规属性"></Checkbox>
      </Checkbox-group>
      <br/>
      <br/>
      解决问题：<Input v-model="pis.resolveProblem" type="textarea" :rows="2" placeholder="解决问题" style="width:70%;"/>
      <br/>
      <br/>
      专业说明：<Input v-model="pis.proDescription" type="textarea" :rows="2" placeholder="专业说明" style="width:70%;"/>
      <br/>
      <br/>
      技术要点：<Input v-model="pis.technicalPoints" type="textarea" :rows="2" placeholder="技术要点" style="width:70%;"/>
      <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import {findProjectList, projectedit, projectdelete, projectsave,findproblemList,findAllProject} from '../../interface';

  export default {
    name: 'p_index',
    created() {
      this.getList();
      //this.getProblem();
      //this.getProject();
    },
    data(){
      return {
        storeFlag: false,
        store: '',
        showFace: false,
        showBody: false,
        showAgenda: false,
        showTc: false,
        projectChoose: '',
        pis: {
              // 门店id，本地测试 24，服务器测试可用 22
              storeId: this.$route.params.id,
              //面部, 1：清洁, 2:补水 ... 也可以传递字符串
              face: '',
              //身体, 1:头部, 2:肩部 ... 也可以传递字符串
              body: '',
              //项目名
              itemName: '',
              //项目单价 
              itemPrice:'',
              //是否设计疗程, 0:否, 1:是
              designCourse:'',
              //疗程次数
              courseTimes:'',
              //疗程单价
              coursePrice:'',
              //疗程间隔
              courseInterval:'',
              //高频到店, 0:未选中, 1:选中
              highFreq:'0',
              //赠送属性, 0:未选中, 1:选中
              presents:'0',
              //叠加属性, 0:未选中, 1:选中
              superposition:'0',
              //强功效, 0:未选中, 1:选中
              strongEfficacy:'0',
              //常规属性, 0:未选中, 1:选中
              generalProps:'0',
              //解决问题, 字数应限制在 512 个字符
              resolveProblem:'',
              //专业说明, 字数应限制在 512 个字符
              proDescription:'',
              //技术要点, 字数应限制在 512 个字符
              technicalPoints:''
        },
        columns: [
          {
            title: '项目',
            key: 'itemName'
          },
          {
            title: '单价',
            key: 'itemPrice'
          },
          {
            title: '项目类别',
            key: 'projectCategory'
          },
          {
            title: '是否设计疗程',
            key: 'designCourse'
          },
          {
            title: '疗程次数',
            key: 'courseTimes'
          },
          {
            title: '疗程价格',
            key: 'coursePrice'
          },
          {
            title: '项目间隔',
            key: 'courseInterval'
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
      newEm() {
        this.storeFlag = true;
        this.store = '新建项目';
        this.showFace = false;
        this.showBody = false;
        this.showAgenda = false;
        this.showTc = false;
        this.projectChoose = '';
        this.pis = {
              // 门店id，本地测试 24，服务器测试可用 22
              storeId: this.$route.params.id,
              //面部, 1：清洁, 2:补水 ... 也可以传递字符串
              face: '',
              //身体, 1:头部, 2:肩部 ... 也可以传递字符串
              body: '',
              //项目名
              itemName: '',
              //项目单价 
              itemPrice:'',
              //是否设计疗程, 0:否, 1:是
              designCourse:'',
              //疗程次数
              courseTimes:'',
              //疗程单价
              coursePrice:'',
              //疗程间隔
              courseInterval:'',
              //高频到店, 0:未选中, 1:选中
              highFreq:false,
              //赠送属性, 0:未选中, 1:选中
              presents:false,
              //叠加属性, 0:未选中, 1:选中
              superposition:false,
              //强功效, 0:未选中, 1:选中
              strongEfficacy:false,
              //常规属性, 0:未选中, 1:选中
              generalProps:false,
              //解决问题, 字数应限制在 512 个字符
              resolveProblem:'',
              //专业说明, 字数应限制在 512 个字符
              proDescription:'',
              //技术要点, 字数应限制在 512 个字符
              technicalPoints:''
        };
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
          this.data = res.data.itemManages;
          for(var i=0;i<this.data.length;i++){
            if(this.data[i].face != ''){
              this.data[i].projectCategory = "面部";
            }else{
              this.data[i].projectCategory = "身体";
            }
            this.data[i].itemPrice = this.data[i].itemPrice + "元/次";
            this.data[i].courseTimes = this.data[i].courseTimes + "次";
            this.data[i].coursePrice = this.data[i].coursePrice + "元";
            this.data[i].courseInterval = this.data[i].courseInterval + "天";
          }
        }).catch((error) => {
          this.$Message.error('获取失败');
        });
      },
      transfer(b){
        if(b == true){
          return 1;
        }else{
          return 0;
        }
      },
      transferBack(c){
        if(c == 1){
          return true;
        }else{
          return false;
        }
      },
/*      addPriceUnit(){
        if(!(/^\d+$/.test(this.pis.itemPrice))){
          this.$Message.error('项目单价请输入数字！');
          this.pis.itemPrice = '';
        }else{
          if(this.pis.itemPrice!='' && this.pis.itemPrice.indexOf("元/次")<0){
          this.pis.itemPrice = this.pis.itemPrice + "元/次";
          }
        }
      },
      addTimeUnit(){
        if(!(/^\d+$/.test(this.pis.courseTimes))){
          this.$Message.error('疗程次数请输入数字！');
          this.pis.courseTimes = '';
        }else{
          if(this.pis.courseTimes!='' && this.pis.courseTimes.indexOf("次")<0){
          this.pis.courseTimes = this.pis.courseTimes + "次";
          }
        }
      },    
      addCurePriceUnit(){
        if(!(/^\d+$/.test(this.pis.coursePrice))){
          this.$Message.error('疗程价格请输入数字！');
          this.pis.coursePrice = '';
        }else{
          if(this.pis.coursePrice!='' && this.pis.coursePrice.indexOf("元")<0){
          this.pis.coursePrice = this.pis.coursePrice + "元";
          }
        }
      },*/
/*      addPeriod(){
        if(!(/^\d+$/.test(this.pis.courseInterval))){
          this.$Message.error('请输入项目间隔天数！');
          this.pis.courseInterval = '';
        }else{
          if(this.pis.courseInterval!='' && this.pis.courseInterval.indexOf("天")<0){
          this.pis.courseInterval = this.pis.courseInterval + "天";
          }
        }
      },*/
      ok() {
        var validateMessage = '';
        if(this.projectChoose == ''){
          validateMessage = validateMessage + "请选择项目类型！<br/>";
        }
        if(this.pis.face == '' && this.pis.body == ''){
          validateMessage = validateMessage + "请选择具体项目类别！<br/>";
        }
        if(this.pis.itemName == ''){
          validateMessage = validateMessage + "请输入项目名称！<br/>";
        }
        if(this.pis.itemPrice == null){
          validateMessage = validateMessage + "请输入项目单价！<br/>";
        }
        if(this.pis.designCourse == ''){
          validateMessage = validateMessage + "请选择是否设计疗程！<br/>";
        }
        if(this.pis.designCourse != '' && (this.pis.courseTimes == null || this.pis.coursePrice == null)){
          validateMessage = validateMessage + "请输入疗程价格和次数！<br/>";
        }
        if(this.pis.highFreq == false &&  this.pis.superposition == false && this.pis.strongEfficacy == false && this.pis.generalProps == false && this.pis.presents == false){
          validateMessage = validateMessage + "请选择项目属性！<br/>";
        }
        if(this.pis.resolveProblem == '' ){
          validateMessage = validateMessage + "请输入解决方案！<br/>";
        }
        if(this.pis.courseInterval == null ){
          validateMessage = validateMessage + "请输入项目间隔天数！<br/>";
        }
        if(validateMessage != ''){
          this.$Message.error(validateMessage);
          validateMessage = '';
        }else{
          this.pis.highFreq = this.transfer(this.pis.highFreq);
          this.pis.presents = this.transfer(this.pis.presents);
          this.pis.superposition = this.transfer(this.pis.superposition);
          this.pis.strongEfficacy = this.transfer(this.pis.strongEfficacy);
          this.pis.generalProps = this.transfer(this.pis.generalProps);
          //this.pis.itemPrice = this.pis.itemPrice.replace("元/次","");
          //this.pis.courseTimes = this.pis.courseTimes.replace("次","");
          //this.pis.coursePrice = this.pis.coursePrice.replace("元","");
          //this.pis.courseInterval = this.pis.courseInterval.replace("天","");
          var params = {
              storeId:this.$route.params.id,
              itemManage:this.pis
          }
          let URL = projectsave();
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
        }
      },
      mannger(data) {
        this.storeFlag = true;
        this.store = '修改';
        this.pis = JSON.parse(JSON.stringify(data));
        this.pis.itemPrice = this.pis.itemPrice.replace("元/次","");
        this.pis.courseInterval = this.pis.courseInterval.replace("天","");
        this.pis.courseTimes = this.pis.courseTimes.replace("次","");
        this.pis.coursePrice = this.pis.coursePrice.replace("元","");
        this.pis.highFreq = this.transferBack(this.pis.highFreq);
        this.pis.presents = this.transferBack(this.pis.presents);
        this.pis.superposition = this.transferBack(this.pis.superposition);
        this.pis.strongEfficacy = this.transferBack(this.pis.strongEfficacy);
        this.pis.generalProps = this.transferBack(this.pis.generalProps);
        if(this.pis.designCourse == "是"){
          this.showAgenda = true;
        }else{
          this.showAgenda = false;
        }
        if(this.pis.face != ''){
          this.projectChoose = "1";
          this.showFace = true;
          this.showBody = false;
        }else{
          this.showFace = false;
          this.showBody = true;
          this.projectChoose = "2";
        }
      },
      Delete(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: projectdelete()+'/'+this.$route.params.id+"?itemName="+data.itemName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      changePro(){
        if(this.projectChoose == "1"){
          this.showFace = true;
          this.showBody = false;
          this.pis.body = '';
        }else{
          this.showFace = false;
          this.showBody = true;
          this.pis.face = '';
        }
      },
      changeAgenda(){
        if(this.pis.designCourse == "是"){
          this.showAgenda = true;
        }else{
          this.showAgenda = false;
          this.pis.coursePrice = '';
          this.pis.courseTimes = '';
        }
      },
      close(){
        this.storeFlag=false;
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
</style>
