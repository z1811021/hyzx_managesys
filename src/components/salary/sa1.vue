<template>
  <div class="sa1">
    <h3>{{typeOfBaseSalaryIndex}}<span style="margin-left:10px;">{{monthlyCashType}}</span></h3>
    <div v-if="typeOfBaseSalary!=5&&typeOfBaseSalary!=6">
     <Button class="hy_btn btn" @click="Add">新增</Button>
     <br>
     <Table  :columns="columns1" :data="salarydata1" ></Table>
     <Modal class="modalProjects" v-model="salaryFlag" :mask-closable="false" :title="title">
       低限：<InputNumber :min="0" max="100000" v-model="add.lowLimit" placeholder="低限" style="width: 300px"></InputNumber>
       <br/>
       <br/>
       高限：<InputNumber :min="0" max="100000" v-model="add.highLimit" placeholder="高限" style="width: 300px"></InputNumber>
       <br/>
       <br/>
       金额：<InputNumber :min="0" max="100000" v-model="add.money" placeholder="金额" style="width: 300px"></InputNumber>
       <br/>
       <br/>
       <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
       </div>
     </Modal>
   </div>
    <div v-if="typeOfBaseSalary==5">
      <Input style="width:300px;" v-model="add.basePay" placeholder="元">
        <span slot="prepend">固定底薪：</span>
        <Button slot="append" icon="archive" @click="save">保存</Button>
      </Input>   
    </div>
    <div v-if="typeOfBaseSalary==6">

      <Button class="hy_btn btn" @click="Add">新增</Button>
      <br>
      <Table  :columns="columns" :data="salarydata" ></Table>
      <Modal  class="modalProjects" v-model="salaryFlag2" :mask-closable="false" :title="title1">
        员工类型：<Select v-model="add.empType" style="width:300px;" @on-change="changeEmp">
        <Option v-for="(item,index) in employeeList" :value="item.jobTitle" :key="item.id">{{ item.jobTitle}}</Option>
      </Select>
        <br/>
        <br/>
        <div v-if="showCuEmGrade">员工级别：<Select v-model="add.empLevel" style="width:300px;">
        <Option v-for="item in currentGrades" :value="item.grade" :key="item.grade">{{ item.grade}}</Option>
      </Select>
        <br/>
        <br/></div>
        员工底薪：<Input v-model="add.empSalary" placeholder="员工底薪" style="width: 300px"/>
        <br/>
        <br/>
        <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close2">取消</Button>
        </div>
      </Modal>
    </div>
  </div>

</template>

<script>
  import {findBonusesJsonByStore,findSalaryByStore,findByStore,editMonthlyCashVolume,editTotalMonthlyPassengerFlow,editTotalMonthlyExercise,editTotalMonthlyProject,editSalarySystem,editStaffLevelBaseSalary,deleteBaseSalary,saveBaseSalary,editBaseSalary,findPostList,} from '../../interface.js'
  import vtable from './sa_table'
  export default{
    name: 'sa1',
    data(){
      return{
        data:{},
        baseSalary: '',
        typeOfBaseSalary: '' ,
        typeOfBaseSalaryIndex: '',
        showCuEmGrade:false,
        currentGrades:[],
        columns1: [
          {
            title: '低限',
            key: 'lowLimit'
          },
          {
            title: '高限',
            key: 'highLimit'
          },
          {
            title: '金额',
            key: 'money'
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
                      this.Delete(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        columns: [
          {
            title: '员工类型',
            key: 'empType'
          },
          {
            title: '员工级别',
            key: 'empLevel'
          },
          {
            title: '员工底薪',
            key: 'empSalary'
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
                      this.updateStaffLevel(params.row)
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
                      this.deleteStaffLevel(params.row)
                    }
                  }
                }, '删除'),
              ]);
            }
          }
        ],
        cityList: [
        {
          value: '1',
          label: '个人'
        },
        {
          value: '2',
          label: '全店'
        },
        ],
        cityList1:[
          {
            value: '1',
            label: '按月现金总量'
          },
          {
            value: '2',
            label: '按月客流总量'
          },
          {
            value: '3',
            label: '按月实操总量'
          },
          {
            value: '4',
            label: '按月项目总量'
          },
          {
            value: '5',
            label: '按固定底薪'
          },
          {
            value: '6',
            label: '按员工级别底薪'
          },

        ],
        salarydata1:[],
        salarydata:[],
        salaryType: '',
        salaryFlag: false,
        salaryFlag2: false,
        monthlyCashType:'',
        title:'',
        title1:'',
        modifyId: '',
        add:{
          // 门店 id (不能为空)           
          storeId: this.$route.params.id,
          // 低限
          lowLimit: "",
          // 高限
          highLimit: "",
          // 金额
          money: "",
          // 底薪
          basePay: "",
          // 员工类别(可以传递中文或者数字，推荐数字较好)
          empType: "",
          // 员工级别
          empLevel: "",
          // 员工工资
          empSalary: "",
          // 与上一页的薪资管理对应的基本薪资一样
          baseSalaryRule: "",
          // 与上一页的薪资管理对应的底薪方式后的单选框一样，可为空，推荐使用数字，1 个人，2 全店
          baseSalaryOption: "" 
        },
        ut:{},
        data:[],
        employeeList:[]
      }
    },
    methods:{
      getEmList() {
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: findPostList()+"/"+this.$route.params.id,
        }).then((res) => {
          this.employeeList = res.data.memMangeInfo;
          for(var i = 0; i < this.employeeList.length; i++){
            if(this.employeeList[i].postGrade == 0){
              this.employeeList[i].showEmGrade = false;
            }else if(this.employeeList[i].postGrade == 1){
              this.employeeList[i].showEmGrade = true;
              var currentGr = {};
              for(var j=0;j<this.employeeList[i].levelNum;j++){
                currentGr = {"grade":this.Arabia_To_SimplifiedChinese(j+1)+"级"}
                this.currentGrades.push(currentGr);
              }
            }
          }
        }).catch((error) => {
        });
      },
      changeEmp(){
        for(var i = 0; i < this.employeeList.length; i++){
          if(this.add.empType == this.employeeList[i].jobTitle){
            this.showCuEmGrade = this.employeeList[i].showEmGrade;
          }
        }
      },
      getData(){
        this.salarydata1 = [];
        this.salarydata = [];
        this.$ajax({
          method: 'get',
          url: findByStore()+'/'+this.$route.params.id,
        }).then( (res) =>{
          for(var i = 0; i < res.data.specificRulesInfo.length; i++){
            if(res.data.specificRulesInfo[i].baseSalaryRule == this.typeOfBaseSalary){
              if(this.typeOfBaseSalary!=5 && this.typeOfBaseSalary!=6){
                this.salarydata1.push(res.data.specificRulesInfo[i]);
              }else if(this.typeOfBaseSalary==5){
                this.add.basePay = res.data.specificRulesInfo[i].basePay;
              }else if(this.typeOfBaseSalary==6){
                this.salarydata.push(res.data.specificRulesInfo[i]);
              }
            }
          }
        }).catch( (error) =>{
          console.log(error);
          this.$Message.error('获取失败！');
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
      getData2(){
        this.$ajax({
          method: 'get',
          url:findSalaryByStore()+'/'+this.$route.params.id
        }).then( (res) => {
          this.typeOfBaseSalary = parseInt(res.data.salaryMangeInfo.baseSalaryRule);
          this.monthlyCashType = res.data.salaryMangeInfo.baseSalaryOption;
          this.typeOfBaseSalaryIndex = this.cityList1[this.typeOfBaseSalary-1].label;
        }).catch((error)=>{
          this.$Message.error('获取失败！');
        })
      },
      save(){
        this.add.baseSalaryRule = this.typeOfBaseSalary;
        var specificRules = this.add;
        this.$ajax({
            method: 'post',
            url: saveBaseSalary(),
            data: specificRules,
          }).then( (res) =>{
            this.$Message.success('保存成功')            
            this.getData();
            this.getData2();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
      },
      close(){
        this.salaryFlag = false;
      },
      close2(){
        this.salaryFlag2 = false;
      },
      ok(){
        this.add.baseSalaryRule = this.typeOfBaseSalary;
        if(this.monthlyCashType == "个人"){
          this.add.baseSalaryOption = 1;
        }else if(this.monthlyCashType == "全店"){
          this.add.baseSalaryOption = 2;
        }
        if(this.title == "新建" || this.title == "新建"){
          var specificRules = this.add;
          this.$ajax({
            method: 'post',
            url: saveBaseSalary(),
            data: specificRules,
          }).then( (res) =>{
            this.$Message.success('保存成功');
            if(this.typeOfBaseSalary!=5 && this.typeOfBaseSalary!=6){
              this.salaryFlag = false;
            }else if(this.typeOfBaseSalary==6){
              this.salaryFlag2 = false;
            }
            this.getData();
            this.getData2();
          }).catch( (error) =>{
            this.$Message.error('保存失败');
          })
        }else if(this.title == "修改" || this.title == "修改"){
          this.add.id = this.modifyId;
          var specificRules = this.add;
            this.$ajax({
              method: 'post',
              url: saveBaseSalary(),
              data: specificRules,
            }).then( (res) =>{
              this.$Message.success('保存成功');
              if(this.typeOfBaseSalary!=5 && this.typeOfBaseSalary!=6){
                this.salaryFlag = false;
              }else if(this.typeOfBaseSalary==6){
                this.salaryFlag2 = false;
              }
              this.getData();
              this.getData2();
            }).catch( (error) =>{
              this.$Message.error('保存失败');
            })
        }
      },
      Arabia_To_SimplifiedChinese(Num) {
          for (var i = Num.length - 1; i >= 0; i--) {
              Num = Num.replace(",", "")//替换Num中的“,”
              Num = Num.replace(" ", "")//替换Num中的空格
          }    
          if (isNaN(Num)) { //验证输入的字符是否为数字
              //alert("请检查小写金额是否正确");
              return;
          }
          //字符处理完毕后开始转换，采用前后两部分分别转换
          var part = String(Num).split(".");
          var newchar = "";
          //小数点前进行转化
          for (var i = part[0].length - 1; i >= 0; i--) {
              if (part[0].length > 10) {
                  //alert("位数过大，无法计算");
                  return "";
              }//若数量超过拾亿单位，提示
              var tmpnewchar = ""
              var perchar = part[0].charAt(i);
              switch (perchar) {
                  case "0":  tmpnewchar = "零" + tmpnewchar;break;
                  case "1": tmpnewchar = "一" + tmpnewchar; break;
                  case "2": tmpnewchar = "二" + tmpnewchar; break;
                  case "3": tmpnewchar = "三" + tmpnewchar; break;
                  case "4": tmpnewchar = "四" + tmpnewchar; break;
                  case "5": tmpnewchar = "五" + tmpnewchar; break;
                  case "6": tmpnewchar = "六" + tmpnewchar; break;
                  case "7": tmpnewchar = "七" + tmpnewchar; break;
                  case "8": tmpnewchar = "八" + tmpnewchar; break;
                  case "9": tmpnewchar = "九" + tmpnewchar; break;
              }
              switch (part[0].length - i - 1) {
                  case 0: tmpnewchar = tmpnewchar; break;
                  case 1: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
                  case 2: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
                  case 3: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
                  case 4: tmpnewchar = tmpnewchar + "万"; break;
                  case 5: if (perchar != 0) tmpnewchar = tmpnewchar + "十"; break;
                  case 6: if (perchar != 0) tmpnewchar = tmpnewchar + "百"; break;
                  case 7: if (perchar != 0) tmpnewchar = tmpnewchar + "千"; break;
                  case 8: tmpnewchar = tmpnewchar + "亿"; break;
                  case 9: tmpnewchar = tmpnewchar + "十"; break;
              }
              newchar = tmpnewchar + newchar;
          }   
          //替换所有无用汉字，直到没有此类无用的数字为止
          while (newchar.search("零零") != -1 || newchar.search("零亿") != -1 || newchar.search("亿万") != -1 || newchar.search("零万") != -1) {
              newchar = newchar.replace("零亿", "亿");
              newchar = newchar.replace("亿万", "亿");
              newchar = newchar.replace("零万", "万");
              newchar = newchar.replace("零零", "零");      
          }
          //替换以“一十”开头的，为“十”
          if (newchar.indexOf("一十") == 0) {
              newchar = newchar.substr(1);
          }
          //替换以“零”结尾的，为“”
          if (newchar.lastIndexOf("零") == newchar.length - 1) {
              newchar = newchar.substr(0, newchar.length - 1);
          }
          return newchar;
      },
      updateStaffLevel(row){
        this.title = "修改";
        this.title1 = "修改";
        this.modifyId = row.id;
        this.salaryFlag2 = true;
        this.add = JSON.parse(JSON.stringify(row));
        for(var i = 0; i < this.employeeList.length; i++){
          if(this.add.empType == this.employeeList[i].jobTitle){
            this.showCuEmGrade = this.employeeList[i].showEmGrade;
          }
        }
      },
      update(row){
        this.title = "修改";
        this.title1 = "修改";
        this.modifyId = row.id;
        this.salaryFlag=true;
        this.add = JSON.parse(JSON.stringify(row));
      },
      deleteStaffLevel(row){
        this.$ajax({
          method: 'get',
          url: deleteBaseSalary()+'/'+this.$route.params.id+'?id='+row.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getData2();
          this.getData();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      Delete(row){
        this.$ajax({
          method: 'get',
          url: deleteBaseSalary()+'/'+this.$route.params.id+'?id='+row.id,
        }).then( (res)=>{
          this.$Message.success('删除成功');
          this.getData2();
          this.getData();
        }).catch( (res) =>{
          this.$Message.error('删除失败');
        })
      },
      Add(){
        this.title = "新建";
        this.title1 = "新建";
        this.modifyId = '';
        if(this.typeOfBaseSalary!=5 && this.typeOfBaseSalary!=6){
              this.salaryFlag = true;
            }else if(this.typeOfBaseSalary==6){
              this.salaryFlag2 = true;
            };
        this.add={
          // 门店 id (不能为空)           
          storeId: this.$route.params.id,
          // 低限
          lowLimit: "",
          // 高限
          highLimit: "",
          // 金额
          money: "",
          // 底薪
          basePay: "",
          // 员工类别(可以传递中文或者数字，推荐数字较好)
          empType: "",
          // 员工级别
          empLevel: "",
          // 员工工资
          empSalary: "",
          // 与上一页的薪资管理对应的基本薪资一样
          baseSalaryRule: "",
          // 与上一页的薪资管理对应的底薪方式后的单选框一样，可为空，推荐使用数字，1 个人，2 全店
          baseSalaryOption: "" 
        };    
      },
      takeMonitor(){
        this.getData();
        this.getData2();
      }
    },
    created(){
      this.getData2();
      this.getEmList();
    },
    mounted(){
      this.getData();
    }
  }

</script>

<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .sa1{
    padding-left: .6rem;
  }
  h3{
    margin: 0 0 10px 0;
  }
  .btn{
    margin: 10px 0 20px 0;
  }
</style>
