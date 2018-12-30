<template>
  <div class="sa2">
    <h3>{{practicalExercises==true ? '已启用':'未启用'}}</h3>
    <div v-if="practicalExercises==true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  class="modalProjects" v-model="salaryFlag" :mask-closable="false" :title="title">
        <span class="text">低限：</span><Input v-model="ut.lowLimit"  placeholder="低限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">高限：</span><Input v-model="ut.highLimit" placeholder="高限" style="width: 300px"/>
        <br/>
        <br/>
        <span class="text">面部指定：</span><Input v-model="ut.faceDesignated" placeholder="面部指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">面部非指定：</span><Input v-model="ut.nFaceDesignated" placeholder="面部非指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">身体指定：</span><Input v-model="ut.bodyDesignated" placeholder="身体指定" style="width: 150px"/>%
        <br/>
        <br/>
        <span class="text">身体非指定：</span><Input v-model="ut.nBodyDesignated" placeholder="身体非指定" style="width: 150px"/>%
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
  import {findSalaryByStore,editPracticalExercise,deletePracticalExercise,getPracticalExercise} from '../../interface.js'
  export default{
    name: 'sa2',
    data(){
      return{
        practicalExercises: false,
        columns: [
        {
          title: '低限',
          key: 'lowLimit',
        },
        {
          title: '高限',
          key: 'highLimit',
        },
        {
          title: '面部指定',
          key: 'faceDesignated',
          render: (h, params) => {
            return h('span', params.row.faceDesignated+'%')
          }
        },
        {
          title: '面部非指定',
          key: 'nFaceDesignated',
          render: (h, params) => {
            return h('span', params.row.nFaceDesignated+'%')
          }
        },
        {
          title: '身体指定',
          key: 'bodyDesignated',
          render: (h, params) => {
            return h('span', params.row.bodyDesignated+'%')
          }
        },
        {
          title: '身体非指定',
          key: 'nBodyDesignated',
          render: (h, params) => {
            return h('span', params.row.nBodyDesignated+'%')
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
        data: [],
        title: '',
        ut:{
          // 门店id
              storeId:this.$route.params.id,
              // 低限
              lowLimit:"",
              // 高限
              highLimit:"",
              // 面部指向
              faceDesignated:"",
              // 面部非指向
              nFaceDesignated:"",
              // 身体指向
              bodyDesignated:"",
              // 身体非指向
              nBodyDesignated:""
        },
        salaryFlag: false,
      }
    },
    methods:{
      getPracticalExercise(){
        this.$ajax({
          method: 'get',
          url: getPracticalExercise()+'/'+this.$route.params.id,
        }).then( (res) =>{
          this.data=res.data.practicalCommissionInfo;
        }).catch( (error) =>{
        })
      },
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore()+'/'+this.$route.params.id,
        }).then( (res) =>{
          this.practicalExercises = this.transferBack(res.data.salaryMangeInfo.poCommission);
          this.typeOfBaseSalary = res.data.salaryMangeInfo.baseSalaryRule;
          this.monthlyCashType = res.data.salaryMangeInfo.baseSalaryOption;
        }).catch( (error) =>{
        })
      },
      update(data){
        this.title = '修改';
        this.salaryFlag = true;
        this.ut = data;
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
      close(){
        this.salaryFlag = false;
      },
      add(){
        this.title = '新增';
        this.salaryFlag = true;
        this.ut={
          // 门店id
              storeId:this.$route.params.id,
              // 低限
              lowLimit:"",
              // 高限
              highLimit:"",
              // 面部指向
              faceDesignated:"",
              // 面部非指向
              nFaceDesignated:"",
              // 身体指向
              bodyDesignated:"",
              // 身体非指向
              nBodyDesignated:""
        };
      },
      ok(){
        if(this.ut.lowLimit==""&& this.ut.highLimit=="" && this.ut.facialPracticeAppoint=="" && this.ut.facialPracticeNonSpecifiedt=="" &&this.ut.physicalExerciseAppoint=="" && this.ut.physicalExerciseNonSpecifiedt==""){
          this.$Message.warning('实操提成选项不能全为空！');
          return;
        }
        this.ut.facialPracticeAppoint = this.ut.facialPracticeAppoint/100;
        this.ut.facialPracticeNonSpecifiedt = this.ut.facialPracticeNonSpecifiedt/100;
        this.ut.physicalExerciseAppoint = this.ut.physicalExerciseAppoint/100;
        this.ut.physicalExerciseNonSpecifiedt = this.ut.physicalExerciseNonSpecifiedt/100;
        var practicalCommission = this.ut;
        this.$ajax({
          method: 'post',
          url: editPracticalExercise(),
          data: practicalCommission,
        }).then( (res) =>{
          this.$Message.success('保存成功');
          this.salaryFlag = false;
          this.getData();
          this.getPracticalExercise();
        }).catch( (error) =>{
          this.$Message.error('保存失败');
        })
      },
      delete(row){
        this.$ajax({
          method: 'get',
          url: deletePracticalExercise() + '?id=' + row.id,
        }).then( (res) =>{
          this.$Message.success('删除成功');
          this.getData();
        }).catch( (error) =>{
          this.$Message.error('删除失败');
        })
      }
    },
    created(){
      this.getData();
      this.getPracticalExercise();
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
  .sa2{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
