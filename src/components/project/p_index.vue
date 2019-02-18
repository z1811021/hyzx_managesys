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
      <h4 style="float:left;;margin-left: 63px;">项目类别：</h4>
      <br/>
      <br/>
      症状：<Select v-model="pis.symptom" placeholder="症状" style="width:323px" :transfer=true>
        <Option v-for="item in problemData" :value="item.symName" :key="item.symName">{{ item.symName }}</Option>
      </Select>
      <br/>
      <br/>
      <RadioGroup v-model="projectChoose" @on-change="changePro" prop="test">
          <Radio label="1" style="float:left;">
              <span>面部</span>
          </Radio>
          <Select v-show="!showFace" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-model="pis.face" ref="setFaceQuery" v-show="showFace" style="float:right;width:300px;margin-top:-6px;" filterable>
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
            <Option value="14" >其他</Option>
          </Select>
          <br/>
          <br/>
          <Radio label="2" style="float:left;">
              <span>身体</span>
          </Radio>
          <Select v-show="!showBody" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-model="pis.body" ref="setBodyQuery" v-show="showBody" style="float:right;width:300px;margin-top:-6px;" filterable>
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
            <Option value="11" >其他</Option>
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
          <div class="leftRadio">疗程次数：</div><Input placeholder="疗程次数" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">疗程价：</div><Input placeholder="疗程价" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">疗程卡扣价：</div><Input placeholder="疗程卡扣价：" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
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
          <br/>
          <br/>
          <div class="leftRadio">疗程卡扣价：</div><InputNumber
            :min="0"
            v-model="pis.courseCharges"
            :formatter="value => `${value}元`"
            :parser="value => value.replace('元', '')" placeholder="疗程卡扣价：元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;">
          </InputNumber>
          <br/>
          <br/>
          </div>
      <div style="float:left;margin-left: 63px;margin-top:10px;">实操方式：</div>
        <RadioGroup v-show="!(pis.face || pis.body)" style="margin-top:10px;margin-right:40%;">
            <Radio label="实际实操" style="float:left;" disabled>
                <span>实际实操</span>
            </Radio>
            <Radio label="固定实操" style="float:right;" disabled>
                <span>固定实操</span>
            </Radio>
        </RadioGroup>
        <RadioGroup v-show="pis.face || pis.body" v-model="pis.actualOperation" @on-change="changeOperation" style="margin-top:10px;margin-right:40%;">
            <Radio label="实际实操" style="float:left;" >
                <span>实际实操</span>
            </Radio>
            <Radio label="固定实操" style="float:right;" >
                <span>固定实操</span>
            </Radio>
        </RadioGroup>
        <div style="float:right;margin-top:-20px;margin-right:60px;" v-show="showStable" v-model="pis.fixedOperation">固定实操额： <InputNumber :min="0" :transfer=true style="width: 40px;margin-left:-8px;" size="small" v-model="pis.fixedOperation"></InputNumber>元</div>
        <div style="float:left;margin-left: 63px;margin-top:10px;" v-show="!(pis.face || pis.body)">
          项目手工费： <InputNumber :min="0" :transfer=true style="width: 40px;margin-left:-8px;" size="small" v-model="pis.manualCost" disabled></InputNumber> 元
        </div>
        <div style="float:left;margin-left: 63px;margin-top:10px;" v-show="pis.face || pis.body">
          项目手工费： <InputNumber :min="0" :transfer=true style="width: 80px;margin-left:-8px;" size="small" v-model="pis.manualCost"></InputNumber> 元
        </div>
        <br/>
        <br/>
        <br/>
      <h4 style="float: left;margin-left: 12%;margin-top:3%;">项目属性：</h4>
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
      <!-- <br/>
      <br/>
      解决问题：<Input v-model="pis.resolveProblem" type="textarea" :rows="2" placeholder="解决问题" style="width:70%;"/> -->
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
      this.getProblem();
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
        showStable: false,
        projectFilterList: [],
        problemData: [],
        pis: {
              // 门店id，本地测试 24，服务器测试可用 22
              storeId: this.$route.params.id,
              //面部, 1：清洁, 2:补水 ... 也可以传递字符串
              face: '',
              //身体, 1:头部, 2:肩部 ... 也可以传递字符串
              body: '',
              //解决问题
              symptom: '',
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
              //疗程卡扣价
              courseCharges:'',
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
              technicalPoints:'',
              //实操类型
              actualOperation:'',
              //固定实操额
              fixedOperation:'',
              //手工费
              manualCost:''
        },
        columns: [
          {
            title: '项目类别',
            key: 'projectCategory',
            filters: [],
              //filterMultiple: false,
              filterMethod (value, row) {
                  if (value === 1) {
                      return row.projectCategory === '面部 - 清洁';
                  } else if (value === 2) {
                      return row.projectCategory === '面部 - 补水';
                  } else if (value === 3) {
                      return row.projectCategory === '面部 - 美白';
                  } else if (value === 4) {
                      return row.projectCategory === '面部 - 修复';
                  } else if (value === 5) {
                      return row.projectCategory === '面部 - 抗敏';
                  } else if (value === 6) {
                      return row.projectCategory === '面部 - 痘痘';
                  } else if (value === 7) {
                      return row.projectCategory === '面部 - 紧致';
                  } else if (value === 8) {
                      return row.projectCategory === '面部 - 除皱';
                  } else if (value === 9) {
                      return row.projectCategory === '面部 - 祛斑';
                  } else if (value === 10) {
                      return row.projectCategory === '面部 - 毛孔管理';
                  } else if (value === 11) {
                      return row.projectCategory === '面部 - V脸瘦脸';
                  } else if (value === 12) {
                      return row.projectCategory === '面部 - 眼部';
                  } else if (value === 13) {
                      return row.projectCategory === '面部 - 整骨';
                  } else if (value === 14) {
                      return row.projectCategory === '面部 - 其他';
                  } else if (value === 1001) {
                      return row.projectCategory === '身体 - 头部';
                  } else if (value === 1002) {
                      return row.projectCategory === '身体 - 肩颈';
                  } else if (value === 1003) {
                      return row.projectCategory === '身体 - 背部';
                  } else if (value === 1004) {
                      return row.projectCategory === '身体 - 胸部';
                  } else if (value === 1005) {
                      return row.projectCategory === '身体 - 腹部';
                  } else if (value === 1006) {
                      return row.projectCategory === '身体 - 腰部';
                  } else if (value === 1007) {
                      return row.projectCategory === '身体 - 臀部';
                  } else if (value === 1008) {
                      return row.projectCategory === '身体 - 大腿';
                  } else if (value === 1009) {
                      return row.projectCategory === '身体 - 小腿';
                  } else if (value === 1010) {
                      return row.projectCategory === '身体 - 足部';
                  } else if (value === 1011) {
                      return row.projectCategory === '身体 - 其他';
                  }
              },
              width:120
          },
          {
            title: '项目',
            key: 'itemName',
            width:100
          },
          {
            title: '单价',
            key: 'itemPrice',
            sortable: true
          },
          /*{
            title: '是否设计疗程',
            key: 'designCourse'
          },*/
          {
            title: '疗程次数',
            key: 'courseTimes'/*,
            sortable: true*/
          },
          {
            title: '疗程价格',
            key: 'coursePrice'/*,
            sortable: true*/
          },
          {
            title: '疗程卡扣价',
            key: 'courseCharges',
            width: 100
          },
          {
            title: '间隔',
            key: 'courseInterval',
            width:70
          },
          {
            title: '实操类型',
            key: 'actualOperation',
            width: 90
          },
          {
            title: '实操金额',
            key: 'realUseOperation',
            width: 90
          },
          {
            title: '手工费',
            key: 'manualCost'
          },
          {
            title: '操作',
            key: 'action',
            width: 130,
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
        if(this.problemData.length == 0){
          this.$Message.error('请先选择症状管理录入贵店可以解决的症状问题！');

        }else{
          this.storeFlag = true;
          this.store = '新建项目';
          this.showFace = false;
          this.showBody = false;
          this.showAgenda = false;
          this.showTc = false;
          this.showStable = false;
          this.projectChoose = '';
          this.pis = {
                // 门店id，本地测试 24，服务器测试可用 22
                storeId: this.$route.params.id,
                //面部, 1：清洁, 2:补水 ... 也可以传递字符串
                face: '',
                //身体, 1:头部, 2:肩部 ... 也可以传递字符串
                body: '',
                //症状
                d: '',
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
                //疗程卡扣价
                courseCharges:'',
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
                technicalPoints:'',
                //实操类型
                actualOperation:'',
                //固定实操额
                fixedOperation:'',
                //手工费
                manualCost:''
          };
          this.$refs.setFaceQuery.$data.query = '';
          this.$refs.setBodyQuery.$data.query = '';
        }
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
      changeOperation(){
        if(this.pis.actualOperation == "实际实操"){
            this.showStable = false; 
          }else if(this.pis.actualOperation == "固定实操"){
            this.showStable = true; 
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
          if(res.data.itemManage.length == 0){
            this.data = [];
          }else{
            this.data = res.data.itemManage;
            for(var i=0;i<this.data.length;i++){
              if(this.data[i].face != '' && this.data[i].face == 1){
                this.data[i].projectCategory = "面部 - 清洁";
              }else if(this.data[i].face != '' && this.data[i].face == 2){
                    this.data[i].projectCategory = "面部 - 补水";
              }else if(this.data[i].face != '' && this.data[i].face == 3){
                    this.data[i].projectCategory = "面部 - 美白";
              }else if(this.data[i].face != '' && this.data[i].face == 4){
                    this.data[i].projectCategory = "面部 - 修复";
              }else if(this.data[i].face != '' && this.data[i].face == 5){
                    this.data[i].projectCategory = "面部 - 抗敏";
              }else if(this.data[i].face != '' && this.data[i].face == 6){
                    this.data[i].projectCategory = "面部 - 痘痘";
              }else if(this.data[i].face != '' && this.data[i].face == 7){
                    this.data[i].projectCategory = "面部 - 紧致";
              }else if(this.data[i].face != '' && this.data[i].face == 8){
                    this.data[i].projectCategory = "面部 - 除皱";
              }else if(this.data[i].face != '' && this.data[i].face == 9){
                    this.data[i].projectCategory = "面部 - 祛斑";
              }else if(this.data[i].face != '' && this.data[i].face == 10){
                    this.data[i].projectCategory = "面部 - 毛孔管理";
              }else if(this.data[i].face != '' && this.data[i].face == 11){
                    this.data[i].projectCategory = "面部 - V脸瘦脸";
              }else if(this.data[i].face != '' && this.data[i].face == 12){
                    this.data[i].projectCategory = "面部 - 眼部";
              }else if(this.data[i].face != '' && this.data[i].face == 13){
                    this.data[i].projectCategory = "面部 - 整骨";
              }else if(this.data[i].face != '' && this.data[i].face == 14){
                    this.data[i].projectCategory = "面部 - 其他";
              }else if(this.data[i].body != '' && this.data[i].body == 1){
                    this.data[i].projectCategory = "身体 - 头部";
              }else if(this.data[i].body != '' && this.data[i].body == 2){
                    this.data[i].projectCategory = "身体 - 肩颈";
              }else if(this.data[i].body != '' && this.data[i].body == 3){
                    this.data[i].projectCategory = "身体 - 背部";
              }else if(this.data[i].body != '' && this.data[i].body == 4){
                    this.data[i].projectCategory = "身体 - 胸部";
              }else if(this.data[i].body != '' && this.data[i].body == 5){
                    this.data[i].projectCategory = "身体 - 腹部";
              }else if(this.data[i].body != '' && this.data[i].body == 6){
                    this.data[i].projectCategory = "身体 - 腰部";
              }else if(this.data[i].body != '' && this.data[i].body == 7){
                    this.data[i].projectCategory = "身体 - 臀部";
              }else if(this.data[i].body != '' && this.data[i].body == 8){
                    this.data[i].projectCategory = "身体 - 大腿";
              }else if(this.data[i].body != '' && this.data[i].body == 9){
                    this.data[i].projectCategory = "身体 - 小腿";
              }else if(this.data[i].body != '' && this.data[i].body == 10){
                    this.data[i].projectCategory = "身体 - 足部";
              }else if(this.data[i].body != '' && this.data[i].body == 11){
                    this.data[i].projectCategory = "身体 - 其他";
              }
              this.data[i].itemPrice = this.data[i].itemPrice + "元/次";
              this.data[i].courseTimes = this.data[i].courseTimes + "次";
              this.data[i].coursePrice = this.data[i].coursePrice + "元";
              this.data[i].courseCharges = this.data[i].courseCharges + "元";
              this.data[i].courseInterval = this.data[i].courseInterval + "天";
              this.data[i].manualCost = this.data[i].manualCost + "元";
              this.data[i].index = i+1;
              if(this.data[i].actualOperation == '实际实操'){
                this.data[i].realUseOperation = parseInt(this.data[i].courseCharges)/parseInt(this.data[i].courseTimes) + "元"; 
              }else if(this.data[i].actualOperation == '固定实操'){
                this.data[i].realUseOperation = this.data[i].fixedOperation + "元"; 
              }
            }
            //console.log(JSON.parse(JSON.stringify(this.columns)));
            this.projectFilterList = this.uniqueArray(this.data,"projectCategory");
            for(var j=0;j<this.projectFilterList.length;j++){
              var currentFitlerItem = {
                        label: this.projectFilterList[j].projectCategory,
                        value: parseInt((this.projectFilterList[j].face != '')?this.projectFilterList[j].face:"100"+this.projectFilterList[j].body)
                    };
              this.columns[0].filters.push(currentFitlerItem);
            }
            this.columns[0].filters = this.uniqueArray(this.columns[0].filters,"label");
            console.log(JSON.parse(JSON.stringify(this.columns[0].filters)));
          }
        }).catch((error) => {
          this.$Message.error('获取失败');
          console.log(error);
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
        if(this.pis.designCourse != '' && (this.pis.courseTimes == null || this.pis.coursePrice == null || this.pis.courseCharges == null)){
          validateMessage = validateMessage + "请输入疗程价格和次数！<br/>";
        }
        if(this.pis.highFreq == false &&  this.pis.superposition == false && this.pis.strongEfficacy == false && this.pis.generalProps == false && this.pis.presents == false){
          validateMessage = validateMessage + "请选择项目属性！<br/>";
        }
        if(this.pis.symptom == '' ){
          validateMessage = validateMessage + "请选择该项目解决症状！<br/>";
        }
        if(this.pis.actualOperation == '' ){
          validateMessage = validateMessage + "请选择实操类型！<br/>";
        }
        if(this.pis.actualOperation == '固定实操' && this.pis.fixedOperation == ''){
          validateMessage = validateMessage + "请输入固定实操额！<br/>";
        }
        if(this.pis.manualCost == '' ){
          validateMessage = validateMessage + "请输入项目手工费！<br/>";
        }
        if(validateMessage != ''){
          this.$Message.warning(validateMessage);
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
        this.pis.courseCharges = this.pis.courseCharges.replace("元","");
        this.pis.manualCost = this.pis.manualCost.replace("元","");
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
          this.$refs.setBodyQuery.$data.query = '';
        }else{
          this.showFace = false;
          this.showBody = true;
          this.pis.face = '';
          this.$refs.setFaceQuery.$data.query = '';
        }
      },
      changeAgenda(){
        if(this.pis.designCourse == "是"){
          this.showAgenda = true;
        }else{
          this.showAgenda = false;
          this.pis.coursePrice = '';
          this.pis.courseTimes = '';
          this.pis.courseCharges = '';
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
    margin-left:80px;
  }
</style>
