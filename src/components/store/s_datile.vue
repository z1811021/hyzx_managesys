<template>
  <div>
    <div style="margin: 10px;font-size: 16px">门店 - {{name}}<Button style="width:10%;margin-left:25px;" size="small" @click="goManage" type="primary" long>进入门店系统</Button></div>
    <Row :gutter="24" class="option">
      <!--<Col span="3">-->
        <!--<Button class="hy_btn" @click="got('m_index_set')">会员权益设置</Button>-->
      <!--</Col>-->
      <Col span="3">
        <Button class="hy_btn" :class="{active:isActive1}" @click="got('c_index')">顾客管理</Button>
      </Col>
      <Col span="3">
        <Dropdown @on-click="got">
          <Button class="hy_btn" :class="{active:isActive2}">
            卡项管理
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="cr_index">会员卡</DropdownItem>
            <DropdownItem name="tk_m">拓客卡</DropdownItem>
            <DropdownItem name="hd_m">活动卡</DropdownItem>
<!--             <DropdownItem name="lc_m">疗程组合卡</DropdownItem>
            <DropdownItem name="cp_m">产品卡</DropdownItem> -->
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="3">
        <Dropdown @on-click=got>
          <Button class="hy_btn" :class="{active:isActive3}">
            项目管理
            <Icon type="arrow-down-b"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="p_project_category">项目功效类别</DropdownItem>
            <DropdownItem name="p_symptom">症状管理</DropdownItem>
            <DropdownItem name="p_index" :disabled="!(symptomData.length>0 && projectCategoryData.length>0)">项目列表</DropdownItem>
            <DropdownItem name="p_plan_index" :disabled="!(symptomData.length>0 && projectCategoryData.length>0 && projectData.length>0)">项目方案</DropdownItem>
            <DropdownItem name="p_meal_index" :disabled="!(symptomData.length>0 && projectCategoryData.length>0 && projectData.length>0)">项目套餐</DropdownItem>
            <DropdownItem name="p_program" :disabled="!(symptomData.length>0 && projectCategoryData.length>0 && projectData.length>0)">解决方案管理</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
      <Col span="3">
        <Button class="hy_btn" :class="{active:isActive4}" @click="got('e_index')">员工管理</Button>
      </Col>
      <Col span="3">
      <Button class="hy_btn" :class="{active:isActive5}" @click="got('sa_index')">薪资管理</Button>
      </Col>
      <Col span="3">
      <Button class="hy_btn" :class="{active:isActive6}" @click="got('fa_index')">产品管理</Button>
      </Col>
      <!--<Col span="3">-->
      <!--<Button class="hy_btn" :class="{active:isActive7}" @click="got('t_index')">报表管理</Button>-->
      <!--</Col>-->
    </Row>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {findManagerOfTheMonthlyReport,findproblemList,getProjectCategory,findProjectListByGroup} from '../../interface';

  export default {
    name: 's_datile',
    data(){
      return{
        name: '',
        isActive1: false,
        isActive2: false,
        isActive3: false,
        isActive4: false,
        isActive5: false,
        isActive6: false,
        isActive7: false,
        projectData: [],
        symptomData: [],
        projectCategoryData: [],
      }
    },
    created() {
      const m_id = this.$route.params.id;
      this.getUrl();
      this.name = this.$route.query.storeName;
      this.getSymptom();
      this.getProjectCategory();
      this.getProejcts();
    },
    methods: {
      got(path) {
        this.refactive(path);
        this.$router.push({name: path});
      },
      getSymptom(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findproblemList() + '/'+this.$route.params.id,
        }).then((res) => {
          this.symptomData = res.data.symptomManageInfo;
        }).catch((error) => {
        });
      },
      getProjectCategory(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: getProjectCategory() + '/'+this.$route.params.id,
        }).then((res) => {
          this.projectCategoryData = res.data.itemTypeManageInfo;
        }).catch((error) => {
        });
      },
      getProejcts(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findProjectListByGroup() + '/'+this.$route.params.id,
        }).then((res) => {
          var wholeData = res.data.itemManage;
            for(var item in wholeData){
                if(wholeData[item].length>0){
                  for (var i = 0; i < wholeData[item].length; i++) {
                    wholeData[item][i].projectCategory = item;
                    this.projectData.push(wholeData[item][i]);
                  }
                }
            }
        }).catch((error) => {
        });
      },
      refactive(name){
        this.isActive1 = false;
        this.isActive2 = false;
        this.isActive3 = false;
        this.isActive4 = false;
        this.isActive5 = false;
        this.isActive6 = false;
        this.isActive7 = false;
        if(name == 'c_index'){
         this.isActive1 = true;
       }
       if(name == 'cr_index' || name == 'tk_m'|| name == 'hd_m'){
          this.isActive2 = true;
       }
       if(name == 'p_index' || name == 'p_symptom' || name == 'p_program' || name == 'p_plan_index' || name == 'p_meal_index'){
          this.isActive3 = true;
       }
       if(name == 'e_index'){
          this.isActive4 = true;
       }
        if(name == 'sa_index'){
          this.isActive5 = true;
        }
        if(name == 'fa_index'){
          this.isActive6 = true;
        }
        if(name == 't_index'){
          this.isActive7 = true;
        }
      },
      getUrl(){
        var test = window.location.href;
        var arr = test.split('/');
        this.refactive(arr[arr.length-1]);
      },
      wait() {
        this.$Message.error('暂未开放，敬请期待');
      },
      goManage(){
        console.log(sessionStorage)
      }
    },
  };
</script>

<style scoped>

  .active{
    border-color: #66368C;
    color: #66368C;
  }
</style>
