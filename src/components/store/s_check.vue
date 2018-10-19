<template>
  <div>
    <div style="width: 300px;margin: 10px 0">
      <Input v-model="serch" placeholder="门店名称" style="margin-top: -1px"><span slot="append" class="serc" @click="serc">查找</span></Input>
    </div>
    <Table :columns="columns1" :data="data1"></Table>
    <Modal  v-model="storeFlag" title="详情"  :mask-closable="false"  @on-ok="ok">
      <div style="padding-left: 20px;">
        联系人：{{storeVal.staffName}}
        <br/>
        <br/>
        联系人电话：{{storeVal.phoneNumber}}
        <br/>
        <br/>
        门店名称：{{storeVal.storeName}}
        <br/>
        <br/>
        门店所在省：{{storeVal.provinceName}}
        <br/>
        <br/>
        门店所在市：{{storeVal.cityName}}
        <br/>
        <br/>
        门店所在区/县：{{storeVal.area}}
        <br/>
        <br/>
        门店地址：{{storeVal.address}}
        <br/>
        <br/>
        门店电话：{{storeVal.telephone}}
        <br/>
        <br/>
        管理周期：{{storeVal.managementCycle}}
        <br/>
        <br/>
        门店类型：{{storeVal.storeType}}
        <br/>
        <br/>
        经营方式：{{storeVal.operationMode}}
        <br>
        <br>
        审核选择：<Select v-model="storeStatus" style="width:300px" placeholder="审核选择" :transfer=true>
        <Option value="1">通过</Option>
        <Option value="2">拒绝</Option>
        </Select>
        <div v-if="storeStatus=='3'" style="margin-top: 10px;">
          拒绝通过原因：<Input v-model="causeOfFailure" type="textarea" :autosize="true" placeholder="拒绝通过原因" style="width: 275px"/>
        </div>
        <!--<div v-show="isShow" style="color: red;">*请填写拒绝通过原因*</div>-->
      </div>
    </Modal>
  </div>
</template>
<script>
import { findStoreList,getProvinces,getCities,auditStoreCustomer,review,customer,audit } from '../../interface';
  export default{
    name: 's_check',
    data(){
      return{
        serch: '',
        storeVal: {
          id: '',
          storeName: '',
          cityName:'',
          provinceName: '',
          telephone: '',
          staffName: '',
          phoneNumber: '',
          operationMode: '',
          storeType: '',
          managementCycle: '',
          address: '',
          storeStatus: '',
          provinceId:'',
          cityId:'',
          area: '',
        },
        columns1: [
          {
            title: '编号',
            key: 'id'
          },
          {
            title: '门店名称',
            key: 'storeName'
          },
          {
            title: '省',
            key: 'provinceName'
          },
          {
            title: '市',
            key: 'cityName'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '门店电话',
            key: 'telephone'
          },
          {
            title: '门店类型',
            key: 'storeType',
            render:(h,params)=>{
              if(!parseInt(params.row.storeType)) {
                return h('div', params.row.storeType)
              } else {
                let storeType = this.getStoreType(params.row.storeType)
                return h('div',storeType)
              }
            }
          },
          {
            title: '管理周期',
            key: 'managementCycle'
          },
          {
            title: '审核状态',
            key: 'storeStatus',
            render:(h,params)=>{
              return h('div',params.row.storeStatus == 2 ?'拒绝':'审核中')
            }
          },
          {
            title: '操作',
            width: 200,
            key: 'action',
            render: (h, params) => {
              return h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.check(params.row)
                    }
                  }
                }, '详情');
            }
          }
        ],
        storeFlag:false,
        provincesData:[],
        citiesData:[],
        data1:[],
        orData:[],
        isSystem: sessionStorage.getItem('isSystem'),
        storeId: sessionStorage.getItem('storeId'),
        storeStatus:'',
        causeOfFailure:'',
        isShow:false,
      }
    },
    created(){
      this.getList();
    },
    methods:{
      serc() {
        if(this.serch == '') {
          this.data1 = this.orData;
        }else{
          this.data1 = this.orData.filter((it)=>it.storeName == this.serch);
        }
      },
      getList(){
        this.$ajax({
          method:'GET',
          url:review(),
        }).then( (res)=>{
          console.log(res)
          if (res.data.stores.storeStatus !== 1) {
            this.data1 = res.data.stores;
            this.orData = res.data.stores;
          }
        }).catch((error)=>{

        })
      },
      check(data){
        this.$ajax({
          method:'GET',
          url:customer()+data.id,
        }).then( (res)=>{
          console.log(data)
          this.storeFlag = true;
          this.storeVal = data;
          this.storeVal.staffName = res.data.customer.name;
          this.storeVal.phoneNumber = res.data.customer.account;
          this.storeVal.storeType = this.getStoreType(data.storeType)
          this.storeStatus =data.storeStatus == 2 ? data.storeStatus : null;
          this.causeOfFailure =data.storeDesc;  
          console.log(this.storeVal)
        }).catch((error)=>{

        })
      },
      check1(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
      getStoreType(data){
        let arr = ['美容院', '皮肤管理', 'SPA会所', '养发', '理疗', '产后修复', '减肥馆', '祛痘馆', '整骨小颜']
        let storeType = ''
        for (let i =0;i<arr.length;i++){
          if (i == data-1) {
              storeType = arr[i]
          }
        }
        return storeType;
      },
      ok(){
        if(this.storeStatus==''){
          this.$Message.error('请选择审核！');
          return;
        }
        if(this.storeStatus == 2 && (this.causeOfFailure == ''|| this.causeOfFailure ==null)){
          // this.isShow = true;
          this.$Message.error('请填写拒绝通过原因!');
          return;
        }
        console.log(this.causeOfFailure)
        this.$ajax({
          method:'POST',
          url: audit(),
          data:{
            storeId: this.storeVal.id,
            status: this.storeStatus,
            desc: this.causeOfFailure
          }
        }).then( (res)=>{
          this.$Message.success('操作成功');
          this.getList();
        })
      }
    }
  }

</script>
<style scoped>
.serc{
  cursor: pointer;
}
</style>
