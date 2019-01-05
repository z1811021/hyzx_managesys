<template>
  <div class="sa4">
    <h3>{{manualFee == true ? '已启用':'未启用'}}</h3>
    <div>
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  class="modalProjects" v-model="salaryFlag" :mask-closable="false" :title="title">
        <h3>设置手工费类型：</h3>
        <RadioGroup style="margin-top:8px;" v-model="manualSetting" @on-change="changeManual">
          <Radio label="项目自带手工费">
              <span>项目自带手工费</span>
          </Radio>
          <Radio label="分类手工费" style="margin-left:10px;">
              <span>分类手工费</span>
          </Radio>
        </RadioGroup>
        <br/>
        <br/>
        <div v-show="showManualSetting">
        <span class="text">面部手工费：</span><InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 100px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">身体局部手工费：</span><InputNumber :min="0" max="100000" placeholder="身体局部手工费" style="width: 100px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">全身手工费：</span><InputNumber :min="0" max="200" placeholder="全身手工费" style="width: 100px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">光电手工费：</span><InputNumber :min="0" max="200" placeholder="光电手工费" style="width: 100px"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">纹绣手工费：</span><InputNumber :min="0" max="200" placeholder="纹绣手工费" style="width: 100px"/>%</InputNumber>
        <br/>
        <br/>
        </div>
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
    name: 'sa4',
    data(){
      return{
        manualFee: false,
        salaryFlag: false,
        showManualSetting: false,
        manualSetting: '',
        columns: [
          {
            title: '面部手工费',
            key: 'cashProducts',
            render: (h, params) => {
              return h('span', params.row.cashProducts*100+'%')
            }
          },
          {
            title: '身体局部手工费',
            key: 'cardTreatment',
            render: (h, params) => {
              return h('span', params.row.cardTreatment*100+'%')
            }
          },
          {
            title: '全身手工费',
            key: 'cardProducts',
            render: (h, params) => {
              return h('span', params.row.cardProducts*100+'%')
            }
          },
          {
            title: '光电手工费',
            key: 'discountProducts',
            render: (h, params) => {
              return h('span', params.row.discountProducts*100+'%')
            }
          },
          {
            title: '纹绣手工费',
            key: 'highEndProducts',
            render: (h, params) => {
              return h('span', params.row.highEndProducts*100+'%')
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
        data:[]
      }
    },
    methods:{
      changeManual(){
        if(this.manualSetting == "分类手工费"){
          this.showManualSetting = true;
        }else{
          this.showManualSetting = false;
        }
      },
      add(){
        this.salaryFlag = true;
      },
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          //this.practicalExercises = this.transferBack(res.data.salaryMangeInfo.poCommission);
          this.manualFee = res.data.salaryMangeInfo.handworkPay;
          //this.monthlyCashType = res.data.salaryMangeInfo.baseSalaryOption;
        }).catch( (error) =>{
          console.log(error);
        })
      },
    },
    created(){
      this.getData();
      //this.getPerformanceDrawing();
    }
  }
</script>
<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .btn{
    margin: 10px 0 20px 0;
  }
  .sa3{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
</style>
