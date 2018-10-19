<template>
  <div>
    <h2 style="padding: .6rem;">项目方案</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">新建</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>

    <Modal  class="modalProjects" v-model="storeFlag" :mask-closable="false"  :title="store" @on-ok="ok">
      <div style="float:left;;margin-left: 63px;">项目类别：</div>
      <br/>
      <br/>
      <RadioGroup v-model="projectChoose" @on-change="changePro">
          <Radio label="面部" style="float:left;">
              <span>面部</span>
          </Radio>
          <Select v-show="!showFace" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-show="showFace" style="float:right;width:300px;margin-top:-6px;">
            <Option value="清洁" >清洁</Option>
            <Option value="补水" >补水</Option>
            <Option value="美白" >美白</Option>
            <Option value="修复" >修复</Option>
            <Option value="抗敏" >抗敏</Option>
            <Option value="痘痘" >痘痘</Option>
            <Option value="紧致" >紧致</Option>
            <Option value="除皱" >除皱</Option>
            <Option value="祛斑" >祛斑</Option>
            <Option value="毛孔管理" >毛孔管理</Option>
            <Option value="V脸瘦脸" >V脸瘦脸</Option>
            <Option value="眼部" >眼部</Option>
            <Option value="整骨" >整骨</Option>
          </Select>
          <br/>
          <br/>
          <Radio label="身体" style="float:left;">
              <span>身体</span>
          </Radio>
          <Select v-show="!showBody" style="float:right;width:300px;margin-top:-6px;" disabled>
          </Select>
          <Select v-show="showBody" style="float:right;width:300px;margin-top:-6px;">
            <Option value="头部" >头部</Option>
            <Option value="肩颈" >肩颈</Option>
            <Option value="背部" >背部</Option>
            <Option value="胸部" >胸部</Option>
            <Option value="腹部" >腹部</Option>
            <Option value="腰部" >腰部</Option>
            <Option value="臀部" >臀部</Option>
            <Option value="大腿" >大腿</Option>
            <Option value="小腿" >小腿</Option>
            <Option value="足部" >足部</Option>
          </Select>
      </RadioGroup>
      <br/>
      <br/>
      项目名称：<Input v-model="pis.projectName" placeholder="名称" style="width: 300px"/>
      <br/>
      <br/>
      项目单价：<Input v-model="pis.courseMoney" @on-keyup="pis.courseMoney=check2(pis.courseMoney)" placeholder="项目单价 次/元" style="width: 300px"/>
      <br/>
      <br/>
      <div style="float:left;margin-left: 63px;">是否设计疗程：</div>
      <RadioGroup v-model="healAgenda" @on-change="changeAgenda" style="margin-right:40%;">
          <Radio label="是" style="float:left;">
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:right;">
              <span>否</span>
          </Radio>
      </RadioGroup>
          <div v-show="!showAgenda">
          <br/>
            <div class="leftRadio">疗程次数：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">疗程价：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">间隔：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          </div>
          <div v-show="showAgenda">
          <br/>
            <div class="leftRadio">疗程次数：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          <br/>
          <br/>
          <div class="leftRadio">疗程价：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          <br/>
          <br/>
          <div class="leftRadio">间隔：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          </div>
      <br/>
      <br/>
      <div style="float:left;margin-left: 63px;">是否设计套餐：</div>
      <RadioGroup v-model="taoCan" @on-change="changeTaocan" style="margin-right:40%;">
          <Radio label="是" style="float:left;">
              <span>是</span>
          </Radio>
          <Radio label="否" style="float:right;">
              <span>否</span>
          </Radio>
      </RadioGroup>
          <div v-show="!showTc">
          <br/>
          <div class="leftRadio">项目名称：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">次数：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          <br/>
          <br/>
          <div class="leftRadio">组合：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;" disabled/>
          </div>
          <div v-show="showTc">
          <br/>
          <div class="leftRadio">项目名称：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          <br/>
          <br/>
          <div class="leftRadio">次数：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          <br/>
          <br/>
          <div class="leftRadio">组合：</div><Input placeholder="项目单价 次/元" style="width: 270px;float:right;margin-top:-6px;margin-right:64px;"/>
          </div>
      <br/>
      <br/>
      <br/>
      项目属性：<Select v-model="pis.projectAttributes" style="width:300px" :transfer=true>
                <Option value="到店率">到店率</Option>
                <Option value="功效类">功效类</Option>
                <Option value="保养类">保养类</Option>
              </Select>
      <br/>
      <br/>
      解决问题：<Input v-model="pis.technicalPoints" type="textarea" :rows="2" placeholder="解决问题" style="width:70%;"/>
      <br/>
      <br/>
      专业说明：<Input v-model="pis.projectDescription" type="textarea" :rows="2" placeholder="专业说明" style="width:70%;"/>
      <br/>
      <br/>
      技术要点：<Input v-model="pis.technicalPoints" type="textarea" :rows="2" placeholder="技术要点" style="width:70%;"/>
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
        store: '',
        showFace: false,
        showBody: false,
        showAgenda: false,
        showTc: false,
        pis: {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          experienceMoney: '',
          effect:[],
          projectDescription: '',
          technicalPoints: '',
          collocationItems: '',
          type: '',
          projectAttributes: '',
          isCalculate: '1',
          storeId: this.$route.params.id,
        },
        columns: [
          {
            title: '项目',
            key: 'projectName'
          },
          {
            title: '疗程次数',
            key: 'frequency'
          },
          {
            title: '间隔',
            key: 'intervalTime'
          },
          {
            title: '单价',
            key: 'courseMoney'
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
            title: '体验价格',
            key: 'experienceMoney'
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
        this.store = '新建';
        this.pis = {
          projectName : '',
          courseMoney: '',
          intervalTime : '',
          frequency : '',
          cashMoney : '',
          buckleMoney : '',
          experienceMoney: '',
          effect:[],
          projectDescription: '',
          technicalPoints: '',
          collocationItems: '',
          type: '',
          projectAttributes: '',
          storeId: this.$route.params.id,
          isCalculate: false,
        };
        if(this.pis.isCalculate == true){
          this.$refs.exs.disabled= true;
        }else{
          this.$refs.exs.disabled= false;

        }

      },
      getList() {
        // 73d04ca9-8fa9-419f-a2d2-cc19da374dc6-s
        console.log(sessionStorage.getItem('authToken'))
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectList()+'?id='+this.$route.params.id,
        }).then((res) => {
          this.data = res.data.results;
        }).catch((error) => {
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
            url: findproblemList()+'?id='+this.$route.params.id,
          }).then((res) => {
            this.prds = res.data;
          }).catch((error) => {
          });
      },
      getProject(){
        this.$ajax({
          method:'get',
          url: findAllProject()+'?id='+this.$route.params.id,
        }).then( (res) =>{
          this.projectList = res.data;
        }).catch( (error) =>{

        });
      },
      ok() {
        let URL = projectsave();
        if( this.store == '修改') {
          URL = projectedit();
        };
        if(this.pis.projectName == ''){
          this.$Message.warning('名称不能为空');
          return;
        }
        this.pis.isCalculate = this.pis.isCalculate == true ? '0' :'1';
        this.pis.effect = this.pis.effect.toString();
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.pis,
          url: URL,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
          this.getProject();
        }).catch((error) => {
          this.$Message.error('操作失败');

        });
      },
      mannger(data) {
        this.pis = JSON.parse(JSON.stringify(data));
        if (typeof data.effect == 'string') {
          this.pis.effect = data.effect.split(',').map( (it, i) => {return +it});
        }
        this.pis.isCalculate = data.isCalculate == '0' ? true:false;
        if(this.pis.isCalculate == true){
          this.$refs.exs.disabled= true;
        }else{
          this.$refs.exs.disabled= false;
        }
        this.storeFlag = true;
        this.store = '修改';
      },
      Delete(data){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: projectdelete()+'?id='+data.id,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getList();
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
      changePro(){
        if(this.projectChoose == "面部"){
          this.showFace = true;
          this.showBody = false;
        }else{
          this.showFace = false;
          this.showBody = true;
        }
      },
      changeAgenda(){
        if(this.healAgenda == "是"){
          this.showAgenda = true;
        }else{
          this.showAgenda = false;
        }
      },
      changeTaocan(){
        if(this.taoCan == "是"){
          this.showTc = true;
        }else{
          this.showTc = false;
        }
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
