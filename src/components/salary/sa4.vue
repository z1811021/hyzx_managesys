<template>
  <div class="sa4">
    <h3>{{manualFee == true ? '已启用':'未启用'}}</h3>
    <div v-if="manualFee == true">
      <Button class="hy_btn btn" @click="add">新增</Button>
      <Table :columns="columns" :data="data"></Table>
      <Modal  class="modalProjects" v-model="salaryFlag" :mask-closable="false" :title="modifyFlag">
        <h3>设置手工费类型：</h3>
        <RadioGroup style="margin-top:8px;" v-model="manualSetting" @on-change="changeManual">
          <Radio label="项目自带手工费" v-model="projectFee">
              <span>项目自带手工费</span>
          </Radio>
          <Radio v-model="classifyFee" label="分类手工费" style="margin-left:10px;">
              <span>分类手工费</span>
          </Radio>
        </RadioGroup>
        <br/>
        <br/>
        <div v-show="showManualSetting">
        <span class="text">面部手工费：</span>
          <InputNumber :min="0" :max="100000" placeholder="面部手工费" style="width: 100px" v-model="faceFee" />%</InputNumber>
        <br/>
        <br/>
        <span class="text">身体局部手工费：</span>
          <InputNumber :min="0" :max="100000" placeholder="身体局部手工费" style="width: 100px" v-model="bodyPartFee"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">全身手工费：</span>
          <InputNumber :min="0" :max="200" placeholder="全身手工费" style="width: 100px" v-model="bodyWholeFee"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">光电手工费：</span>
          <InputNumber :min="0" :max="200" placeholder="光电手工费" style="width: 100px" v-model="photodiodeFee"/>%</InputNumber>
        <br/>
        <br/>
        <span class="text">纹绣手工费：</span>
          <InputNumber :min="0" :max="200" placeholder="纹绣手工费" style="width: 100px" v-model="embroideryFee"/>%</InputNumber>
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
  import {findSalaryByStore,editPerformanceDrawing,deletePerformanceDrawing,getPerformanceDrawing,editPerformanceDrawingStatus,saveManualFee,editManualFee,deleteManualFee,getManualFee} from '../../interface.js'
  export default{
    name: 'sa4',
    data(){
      return{
        modifyFlag: '',
        manualFee: false,
        salaryFlag: false,
        showManualSetting: false,
        currentId: '',
        manualSetting: '',
        // 项目自带手工费
        projectFee:"",
        // 分类手工费
        classifyFee:"",
        // 面部手工费
        faceFee:0,
        // 身体局部手工费
        bodyPartFee:0,
        // 全身手工费
        bodyWholeFee:0,
        // 光电手工费
        photodiodeFee:0,
        // 纹绣手工费
        embroideryFee:0,
        columns: [
          {
            title: '面部手工费',
            key: 'cashProducts',
            render: (h, params) => {
              return h('span', params.row.faceFee == 0? '使用固定手工费' : params.row.faceFee + '%')
            }
          },
          {
            title: '身体局部手工费',
            key: 'cardTreatment',
            render: (h, params) => {
              return h('span', params.row.bodyPartFee == 0? '使用固定手工费' : params.row.bodyPartFee+'%')
            }
          },
          {
            title: '全身手工费',
            key: 'cardProducts',
            render: (h, params) => {
              return h('span', params.row.bodyWholeFee == 0? '使用固定手工费' : params.row.bodyWholeFee+'%')
            }
          },
          {
            title: '光电手工费',
            key: 'discountProducts',
            render: (h, params) => {
              return h('span', params.row.photodiodeFee == 0? '使用固定手工费' : params.row.photodiodeFee+'%')
            }
          },
          {
            title: '纹绣手工费',
            key: 'highEndProducts',
            render: (h, params) => {
              return h('span', params.row.embroideryFee == 0? '使用固定手工费' : params.row.embroideryFee+'%')
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
      close(){
        this.salaryFlag = false;
      },
      delete(data){
        this.$ajax({
          method: 'get',
          url: deleteManualFee()+'/'+this.$route.params.id+'?id='+data.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getData();
          this.getList();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
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
      update(data){
        this.salaryFlag = true;
        this.modifyFlag = "修改";
        /*this.manualSetting: = ,*/
        // 项目自带手工费
        this.projectFee = this.transferBack(data.projectFee);
        // 分类手工费
        this.classifyFee = this.transferBack(data.classifyFee);
        // 面部手工费
        this.faceFee = data.faceFee;
        // 身体局部手工费
        this.bodyPartFee = data.bodyPartFee;
        // 全身手工费
        this.bodyWholeFee = data.bodyWholeFee;
        // 光电手工费
        this.photodiodeFee = data.photodiodeFee;
        // 纹绣手工费
        this.embroideryFee = data.embroideryFee;
        this.currentId = data.id;
      },
      getList(){
        this.$ajax({
          method: 'get',
            url: getManualFee() + '/'+this.$route.params.id,
          }).then( (res) =>{
            this.data = res.data.manualFeeInfo;
          }).catch( (error) =>{
            console.log(error);
          })
      },
      changeManual(){
        if(this.manualSetting == "分类手工费"){
          this.showManualSetting = true;
        }else{
          this.showManualSetting = false;
        }
      },
      add(){
        this.modifyFlag = "新建";
        this.salaryFlag = true;
        this.showManualSetting = false;
        this.manualSetting = '';
        // 项目自带手工费
        this.projectFee = false;
        // 分类手工费
        this.classifyFee = false;
        // 面部手工费
        this.faceFee = 0;
        // 身体局部手工费
        this.bodyPartFee = 0;
        // 全身手工费
        this.bodyWholeFee = 0;
        // 光电手工费
        this.photodiodeFee = 0;
        // 纹绣手工费
        this.embroideryFee = 0;
      },
      ok(){
          if(this.modifyFlag == "新建"){
              var manualFee = {
                // 门店id
                storeId:this.$route.params.id,
                // 项目自带手工费
                projectFee:this.transfer(this.projectFee),
                // 分类手工费
                classifyFee:this.transfer(this.classifyFee),
                // 面部手工费
                faceFee:this.faceFee,
                // 身体局部手工费
                bodyPartFee:this.bodyPartFee,
                // 全身手工费
                bodyWholeFee:this.bodyWholeFee,
                // 光电手工费
                photodiodeFee:this.photodiodeFee,
                // 纹绣手工费
                embroideryFee:this.embroideryFee
            };
            this.$ajax({
                method: 'POST',
                dataType: 'JSON',
                contentType: 'application/json;charset=UTF-8',
                headers: {
                  "authToken": sessionStorage.getItem('authToken')
                },
                data: manualFee,
                url: saveManualFee(),
              }).then((res) => {
                this.$Message.success('操作成功');
                this.getList();
                this.getData();
                this.salaryFlag = false;
              }).catch((error) => {
                this.$Message.error('操作失败');
              });
          }else if(this.modifyFlag == "修改"){
              var manualFee = {
                // 门店id
                storeId:this.$route.params.id,
                // 项目自带手工费
                projectFee:this.transfer(this.projectFee),
                // 分类手工费
                classifyFee:this.transfer(this.classifyFee),
                // 面部手工费
                faceFee:this.faceFee,
                // 身体局部手工费
                bodyPartFee:this.bodyPartFee,
                // 全身手工费
                bodyWholeFee:this.bodyWholeFee,
                // 光电手工费
                photodiodeFee:this.photodiodeFee,
                // 纹绣手工费
                embroideryFee:this.embroideryFee,
                // 手工费记录的 id
                id: this.currentId
            };
            this.$ajax({
                method: 'POST',
                dataType: 'JSON',
                contentType: 'application/json;charset=UTF-8',
                headers: {
                  "authToken": sessionStorage.getItem('authToken')
                },
                data: manualFee,
                url: editManualFee(),
              }).then((res) => {
                this.$Message.success('操作成功');
                this.getList();
                this.getData();
                this.salaryFlag = false;
              }).catch((error) => {
                this.$Message.error('操作失败');
              });
          }
        },
      getData(){
        this.$ajax({
          method: 'get',
          url: findSalaryByStore() + '/'+this.$route.params.id,
        }).then( (res) =>{
          if(res.data.salaryMangeInfo != null){
            this.manualFee = res.data.salaryMangeInfo.handworkPay;
          }
        }).catch( (error) =>{
          console.log(error);
        })
      },
    },
    created(){
      this.getData();
      this.getList();
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
