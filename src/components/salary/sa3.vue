<template>
  <div class="sa3">
    <h3>{{performanceDrawinges == true ? '已启用':'未启用'}}</h3>
    <div v-if="performanceDrawinges == true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  class="modalProjects" v-model="salaryFlag" :mask-closable="false" :title="title">
        <Select v-model="ut.perComType" placeholder="请选择业绩提点方式" style="width:360px;">
          <Option value="消耗">根据消耗设计业绩提点</Option>
          <Option value="实操">根据实操设计业绩提点</Option>
          <Option value="业绩">根据业绩来设计提点</Option>
          <Option value="客流">根据客流设计业绩提点</Option>
        </Select>
        <br/>
        <br/>
        <span class="text">低限：</span><InputNumber :min="0" max="100000" v-model="ut.lowLimit" placeholder="低限" style="width: 300px"/></InputNumber>
        <br/>
        <br/>
        <span class="text">高限：</span><InputNumber :min="0" max="100000" v-model="ut.highLimit" placeholder="高限" style="width: 300px"/></InputNumber>
        <br/>
        <br/>
        <span class="text">储值：</span><InputNumber :min="0" max="200" v-model="ut.storedValue" placeholder="储值" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">现金疗程：</span><InputNumber :min="0" max="200" v-model="ut.cashTreatment" placeholder="现金疗程" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">现金产品：</span><InputNumber :min="0" max="200" v-model="ut.cashProducts" placeholder="现金产品" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">卡扣疗程：</span><InputNumber :min="0" max="200" v-model="ut.cardTreatment" placeholder="卡扣疗程" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">卡扣产品：</span><InputNumber :min="0" max="200" v-model="ut.cardProducts" placeholder="卡扣产品" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">超折产品：</span><InputNumber :min="0" max="200" v-model="ut.discountProducts" placeholder="超折产品" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">高端项目：</span><InputNumber :min="0" max="200" v-model="ut.highEndProducts" placeholder="高端项目" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">其他：</span><InputNumber :min="0" max="200" v-model="ut.other" placeholder="其他" style="width: 150px"/>%</InputNumber>
        <br/>
        <br/>
        <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
  import {findSalaryByStore,editPerformanceDrawing,deletePerformanceDrawing,getPerformanceDrawing,editPerformanceDrawingStatus} from '../../interface.js'
  export default{
    name: 'sa3',
    data(){
      return{
        performanceDrawinges: false,
        modifyId: '',
        columns: [
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '储值',
            key: 'storedValue',
            render: (h, params) => {
              return h('span', params.row.storedValue*100+'%')
            }
          },
          {
            title: '现金疗程',
            key: 'cashTreatment',
            render: (h, params) => {
              return h('span', params.row.cashTreatment*100+'%')
            }
          },
          {
            title: '现金产品',
            key: 'cashProducts',
            render: (h, params) => {
              return h('span', params.row.cashProducts*100+'%')
            }
          },
          {
            title: '卡扣疗程',
            key: 'cardTreatment',
            render: (h, params) => {
              return h('span', params.row.cardTreatment*100+'%')
            }
          },
          {
            title: '卡扣产品',
            key: 'cardProducts',
            render: (h, params) => {
              return h('span', params.row.cardProducts*100+'%')
            }
          },
          {
            title: '超折产品',
            key: 'discountProducts',
            render: (h, params) => {
              return h('span', params.row.discountProducts*100+'%')
            }
          },
         /* {
            title: '卡项销售',
            key: 'cardSales'
          },
          {
            title: '卡扣项目',
            key: 'buckleProject'
          },
          {
            title: '卡扣产品',
            key: 'buckleProduct'
          },*/
          {
            title: '高端项目',
            key: 'highEndProducts',
            render: (h, params) => {
              return h('span', params.row.highEndProducts*100+'%')
            }
          },
          {
            title: '其他',
            key: 'other',
            render: (h, params) => {
              return h('span', params.row.other*100+'%')
            }
          },
          {
            title: '操作',
            width: 200,
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
                      this.update(params.row)
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
                      this.delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        data:[],
        ut:{
          // 门店id
          storeId:this.$route.params.id,
          // 低限
          lowLimit:"",
          // 高限
          highLimit:"",
          // 储值
          storedValue:"",
          // 现金疗程
          cashTreatment:"",
          // 现金产品
          cashProducts:"",
          // 卡扣疗程
          cardTreatment:"",
          // 卡扣产品
          cardProducts:"",
          // 折扣产品
          discountProducts:"",
          // 高端产品
          highEndProducts:"",
          // 其他
          other:"",
          //业绩提点方式
          perComType:""
        },
        title: '',
        salaryFlag: false,
      }
    },
    methods:{
      getPerformanceDrawing(){
        this.$ajax({
          method: 'get',
          url: getPerformanceDrawing()+'/'+this.$route.params.id,
        }).then( (res) =>{
          this.data=res.data.performanceCommissionInfo;
        }).catch( (error) =>{
        })
      },
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          //this.practicalExercises = this.transferBack(res.data.salaryMangeInfo.poCommission);
          this.typeOfBaseSalary = res.data.salaryMangeInfo.baseSalaryRule;
          //this.monthlyCashType = res.data.salaryMangeInfo.baseSalaryOption;
          this.performanceDrawinges = this.transferBack(res.data.salaryMangeInfo.acCommission);
        }).catch( (error) =>{
        })
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
      add(){
        this.title = '新增';
        this.salaryFlag = true;
        this.modifyId = '';
        this.ut={
          // 门店id
          storeId:this.$route.params.id,
          // 低限
          lowLimit:"",
          // 高限
          highLimit:"",
          // 储值
          storedValue:"",
          // 现金疗程
          cashTreatment:"",
          // 现金产品
          cashProducts:"",
          // 卡扣疗程
          cardTreatment:"",
          // 卡扣产品
          cardProducts:"",
          // 折扣产品
          discountProducts:"",
          // 高端产品
          highEndProducts:"",
          // 其他
          other:"",
          //业绩提点方式
          perComType:""
        };
        this.ut.type = '1';
      },
      update(row){
        this.title = '修改';
        this.salaryFlag = true;
        this.modifyId = row.id;
        this.ut =JSON.parse(JSON.stringify(row));
        this.ut.storedValue = this.ut.storedValue*100;
        this.ut.cashTreatment = this.ut.cashTreatment*100;
        this.ut.cashProducts = this.ut.cashProducts*100;
        this.ut.cardTreatment = this.ut.cardTreatment*100;
        this.ut.cardProducts = this.ut.cardProducts*100;
        this.ut.discountProducts = this.ut.discountProducts*100;
        this.ut.highEndProducts = this.ut.highEndProducts*100;
        this.ut.other = this.ut.other*100;
        //this.ut.highEndProject = this.ut.highEndProject*100;
      },
      close(){
        this.salaryFlag = false;
      },
      ok(){
        if(this.ut =='' ){
          this.$Message.warning('不能全部为空');
          return;
        }
        this.ut.storedValue = this.ut.storedValue/100;
        this.ut.cashTreatment = this.ut.cashTreatment/100;
        this.ut.cashProduct = this.ut.cashProduct/100;
        this.ut.cashProducts = this.ut.cashProducts/100;
        this.ut.cardTreatment = this.ut.cardTreatment/100;
        this.ut.cardProducts = this.ut.cardProducts/100;
        this.ut.discountProducts = this.ut.discountProducts/100;
        this.ut.highEndProducts = this.ut.highEndProducts/100;
        this.ut.other = this.ut.other/100;
        if(this.title == "新增"){
          var practicalCommission = this.ut;
          this.$ajax({
            method: 'post',
            url: editPerformanceDrawing(),
            data: this.ut,
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.salaryFlag = false;
            this.getData();
            this.getPerformanceDrawing();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        }else if(this.title == "修改"){
          this.ut.id = this.modifyId;
          var practicalCommission = this.ut;
          this.$ajax({
            method: 'post',
            url: editPerformanceDrawingStatus(),
            data: this.ut,
          }).then( (res) =>{
            this.$Message.success('保存成功');
            this.salaryFlag = false;
            this.getData();
            this.getPerformanceDrawing();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        }
        /*this.$ajax({
          method: 'post',
          url: editPerformanceDrawing(),
          data:this.ut,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.getData();
          this.getPerformanceDrawing();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })*/
      },
      delete(row){
        this.$ajax({
          method: 'get',
          url: deletePerformanceDrawing()+'/'+this.$route.params.id+'?id='+row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getPerformanceDrawing();
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      },
      check(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      }
    },
    created(){
      this.getData();
      this.getPerformanceDrawing();
    }
  }

</script>
<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .text{
    display: inline-block;
    width: 75px;
    margin-right: 5px;
  }
  .btn{
    margin: 10px 0 20px 0;
  }
  .sa3{
    padding: 0 .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
