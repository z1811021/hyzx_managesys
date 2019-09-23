<template>
  <div>
    <h2 style="padding: .6rem;">产品列表</h2>
    <Row :gutter="24" class="option">
      <Col span="2">
        <Button class="hy_btn" @click="newEm">添加产品</Button>
      </Col>
    </Row>
    <Table :columns="columns" :data="data"></Table>
    <Modal class="modalProjects" v-model="modalShow" :mask-closable="false"  :title="store">
        产品名称：<Input v-model="productItems.name" placeholder="产品名称" style="width: 200px"/>
        <br/>
        <br/>
        产品品牌：<Input v-model="productItems.brand" placeholder="产品品牌" style="width: 200px"/>
        <br/>
        <br/>
        产品单价：<InputNumber
              :min="0" placeholder="产品单价" style="width: 200px" v-model="productItems.price"></InputNumber>元
        <br/>
        <br/>
        产品类型：<Select v-model="productItems.type" placeholder="产品类型" style="width:123px" :transfer=true>
          <Option v-for="item in productTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <div slot="footer">
            <Button type="primary" @click="ok">添加</Button>
            <Button type="ghost" @click="close">取消</Button>
        </div>
      </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import {addProduct,getProduct,deleteProduct} from '../../interface';

  export default {
    name: 'fa_index',
    created() {
      this.getProductList();
    },
    data(){
      return {
        modalShow: false,
        data: [],
        store: '添加产品',
        currentModifyId: '',
        productTypes:[
          {
              value: '1',
              label: '一次性'
          },
          {
              value: '2',
              label: '消耗型'
          }
        ],
        productItems:{
          name:'',
          price:0,
          type:'',
          brand:''
        },
        deleteProduct(row){
          this.$ajax({
            method: 'GET',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            url: deleteProduct()+'/'+this.$route.params.id+'?id='+row.id,
          }).then((res) => {
            this.$Message.success('删除产品成功');
            this.getProductList();
          }).catch((error) => {
            this.$Message.error('操作失败');
          })
        },
        columns: [
          {
            title: '名称',
            key: 'info',
          },
          {
            title: '价格',
            key: 'price',
          },
          {
            title: '品牌',
            key: 'brand',
          },
          {
            title: '类型',
            key: 'showType'
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
                      this.deleteProduct(params.row)
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ]
      };
    },
    methods: {
      newEm() {
        this.modalShow = true;
        this.store = '添加产品';
        this.currentModifyId = '';
        this.productItems = {
          name:'',
          price:0,
          type:'',
          brand:''
        }
      },
      mannger(row){
        this.modalShow = true;
        this.store = '修改产品';
        this.currentModifyId = row.id;
        this.productItems = {
          name:row.info,
          price:parseInt(row.price),
          type:row.type,
          brand:row.brand
        }
      },
      ok(){
        var validateMessage = '';
        if(this.productItems.name == ''){
          validateMessage = validateMessage + "请选输入产品名称！<br/>";
        }
        if(this.productItems.price == ''){
          validateMessage = validateMessage + "请输入产品价格！<br/>";
        }
        if(this.productItems.type == ''){
          validateMessage = validateMessage + "请选择产品类型！<br/>";
        }
        if(this.productItems.brand == ''){
          validateMessage = validateMessage + "请输入产品品牌!<br/>";
        }
        if(validateMessage != ''){
          this.$Message.warning(validateMessage);
          validateMessage = '';
        }else if(this.store == '添加产品'){
          var params = {
            storeId: this.$route.params.id, // 门店 id
            itemId:0, // 关联项目的id，添加的时候设置为 0，新建项目的时候后台会自动关联
            price: this.productItems.price, // 价格
            brand: this.productItems.brand, // 品牌
            info: this.productItems.name, //详情
            type: this.productItems.type // 类型
          }
          let URL = addProduct();
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
            this.$Message.success('添加产品成功');
            this.getProductList();
            this.modalShow=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
        }else if(this.store == '修改产品'){
          var params = {
            storeId: this.$route.params.id, // 门店 id
            id: this.currentModifyId,
            itemId:0, // 关联项目的id，添加的时候设置为 0，新建项目的时候后台会自动关联
            price: this.productItems.price, // 价格
            brand: this.productItems.brand, // 品牌
            info: this.productItems.name, //详情
            type: this.productItems.type // 类型
          }
          let URL = addProduct();
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
            this.$Message.success('添加产品成功');
            this.getProductList();
            this.modalShow=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
        }
      },
      close(){
        this.modalShow = false;
      },
      getProductList(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: getProduct() + '/'+this.$route.params.id,
        }).then((res) => {
          this.data = res.data.product;
          for (var i = 0; i < this.data.length; i++) {
            if(this.data[i].type == '1'){
              this.data[i].showType = '一次性';
            }else if(this.data[i].type == '2'){
              this.data[i].showType = '消耗型';
            }
          }
        }).catch((error) => {
        });
      }
    },
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
