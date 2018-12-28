<template>
   <div class="register">
    <Menu mode="horizontal" :theme="theme1" :active-name="activename"  @on-select="go">
      <Row type='flex' justify="center">
        <Col span="3">
          <MenuItem name="register_1" v-bind:style="register_1" disabled>
              <Icon type="ios-paper"></Icon>
              注册门店
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_2" v-bind:style="register_2" disabled>
              <Icon type="ios-paper"></Icon>
              房间床位
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_3" v-bind:style="register_3" disabled>
              <Icon type="ios-paper"></Icon>
              年数据
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_4" v-bind:style="register_4" disabled>
              <Icon type="ios-paper"></Icon>
              品牌仪器
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_5" v-bind:style="register_5" disabled>
              <Icon type="ios-paper"></Icon>
              薪资制度
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_6" v-bind:style="register_6" disabled>
              <Icon type="ios-paper"></Icon>
              项目/卡
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_7" v-bind:style="register_7" disabled>
              <Icon type="ios-paper"></Icon>
              顾客流量
          </MenuItem>
        </Col>
        <Col span="3">
          <MenuItem name="register_8" v-bind:style="register_8" disabled>
              <Icon type="ios-paper"></Icon>
              经营问题
          </MenuItem>
        </Col>
      </Row>  
    </Menu>
    <router-view @changeActivename="changeActivename"></router-view>
   </div>  
</template>
<script>
    export default {
        data () {
            return {
                theme1: 'light',
                activename: this.$route.path.slice(1),
                register_1: {
                  visibility: 'hidden'
                },
                register_2: {
                  visibility: 'hidden'
                },
                register_3: {
                  visibility: 'hidden'
                },
                register_4: {
                  visibility: 'hidden'
                },
                register_5: {
                  visibility: 'hidden'
                },
                register_6: {
                  visibility: 'hidden'
                },
                register_7: {
                  visibility: 'hidden'
                },
                register_8: {
                  visibility: 'hidden'
                },
            }
        },
        methods: {
          go(name) {
            this.$router.push({name: name});
          },
          changeActivename(data) {
            let _this = this;
            _this.activename = data;
            this[data].visibility = 'visible'
          }
        }
    }
</script>
<style scoped>
  .register{
    padding-top: 5px;
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .ivu-menu-item-active:not(.ivu-menu-submenu){
    background-color: #F7EFFE;
    color: #66368C!important;
    font-weight: 600;
    border-bottom: 2px solid #66368C!important;
  }
  .ivu-menu-light.ivu-menu-horizontal .ivu-menu-item:hover{
    color: #66368C;
    border-bottom: 2px solid #66368C;
  }
  .ivu-menu-item {
    cursor: not-allowed;
  }
  .ivu-menu-item-active {
    cursor: pointer;
  }
</style>