<template>
  <div class="register">
    <div class="layout-logo-left">直营产品品牌</div>
    <div >
        <Select v-model="brandsSelect" style="width:150px;float:left;margin-left:40px;" placeholder="直营产品类别">
          <Option value="1">院护</Option>
          <Option value="2">家居</Option>
        </Select>
        <Input v-model="brandsInput" placeholder="品牌" style="width: 85px;float:left;margin-left:10px;"/>
        <Button class="hy_btn" @click="addBrands" style="float:left;margin-left:10px;">增加</Button>
        <br/>
        <br/>
        <br/>
        <div style="width:100%;">
        <div style="float:left;width:50%;height:auto;">  
          <table class="table" width="80%" border="1">
            <thead>
              <tr>
                <th>院护</th>
                <th style="width:20%;"></th>
              </tr>
              </thead>
              <tbody v-for="(item,index) in brandsYHForm" :key="index">
              <tr>
               <td>{{item.name}}</td>
               <td><Button class="hy_btn" @click="deleteBrandsYHItem(index)">移除</Button></td>
              </tr>
            </tbody>
              <tr v-show="showYH">
               <td></td>
               <td></td>
              </tr>
          </table>
        </div>
        <div style="float:right;width:50%;height:auto;">  
          <table class="table" width="80%" border="1">
            <thead>
              <tr>
                <th>家居</th>
                <th style="width:20%;"></th>
              </tr>
              </thead>
              <tbody v-for="(item,index) in brandsJJForm" :key="index">
              <tr>
               <td>{{item.name}}</td>
               <td><Button class="hy_btn" @click="deleteBrandsJJItem(index)">移除</Button></td>
              </tr>
            </tbody>
              <tr v-show="showJJ">
               <td></td>
               <td></td>
              </tr>
          </table>
        </div>
      </div>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div class="layout-logo-left">仪器品牌</div>
      <Input  v-model="instrumentYQInput" placeholder="功效" style="width: 85px;float:left;margin-left:120px;"/>
      <Input  v-model="instrumentPPInput" placeholder="品牌" style="width: 85px;float:left;margin-left:10px;"/>
      <Button class="hy_btn" @click="addInstruments" style="float:left;margin-left:10px;">增加</Button>
        <br/>
        <br/>
        <br/>
        <table width="70%" class="table" border="1">
          <thead> 
            <tr>
              <th>功效</th>
              <th>品牌</th>
              <th style="width:10%;"></th>
            </tr>
          </thead> 
          <tbody v-for="(item,index) in instrumentsForm">
            <tr >
              <td >{{item.effect}}</td>
              <td >{{item.name}}</td>
              <td><Button class="hy_btn" @click="deleteInstrumentsItem(index)">移除</Button></td>
            </tr> 
          </tbody>
          <tr v-show="showInstruments">
               <td></td>
               <td></td>
               <td></td>
              </tr>
        </table>
    </div>
<div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
    <!-- <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button> -->
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage">下一步</Button>
  </div>
  </div>
</template>

<script>
  import { extendBrandInfo } from '../../interface';
  export default{
    name: 'register_4',
      data() {    
        return {      
          instrumentsForm: [],
          brandsJJForm: [],
          brandsYHForm: [],
          brandsInput: "",
          instrumentYQInput: "",
          instrumentPPInput: "",
          brandsSelect: "",
          showYH: true,
          showJJ: true,
          showInstruments: true
        }  
      },
    methods:{
  addInstruments(){
    for(var i=0; i<this.instrumentsForm.length; i++){
      if(this.instrumentsForm[i].name == this.instrumentPPInput && this.instrumentsForm[i].effect == this.instrumentYQInput){
         this.$Message.error("请务在相同功效下输入重复的仪器品牌！");
        this.instrumentYQInput = "";
        this.instrumentPPInput = ""; 
         return;
      }
    }
    if(this.instrumentYQInput == "" || this.instrumentPPInput == ""){
      this.$Message.error("请完整输入功效和品牌后添加！");
    }else{
        this.instrumentsForm.push({ 
            effect:this.instrumentYQInput, name:this.instrumentPPInput, storeId:sessionStorage['storeId']
        })   
        if(this.instrumentsForm.length == 0){
          this.showInstruments = true;
        }else{
          this.showInstruments = false;
        }  
        this.instrumentYQInput = "";
        this.instrumentPPInput = "";  
    }
  },    
  deleteInstrumentsItem(index) {
      this.instrumentsForm.splice(index,1); 
      if(this.instrumentsForm.length == 0){
        this.showInstruments = true;
      }else{
        this.showInstruments = false;
      }  
      this.instrumentYQInput = "";
      this.instrumentPPInput = "";    
  },
  addBrands(){
    if(this.brandsSelect == 1){
      if(this.brandsInput == ""){
        this.$Message.error("请输入院护品牌后点击添加！")
      }else{
        this.addBrandsYH();
      }
    }else if(this.brandsSelect == 2){
      if(this.brandsInput == ""){
        this.$Message.error("请输入家居品牌后点击添加！")
      }else{
        this.addBrandsJJ();
      }
    }else{
      this.$Message.error("请选择直营品牌院护或家居！");
    }
  },
  addBrandsYH(){   
      for(var i=0; i<this.brandsYHForm.length; i++){
        if(this.brandsYHForm[i].name == this.brandsInput){
           this.$Message.error("请勿输入重复的院护品牌！");
           this.brandsSelect = "";
           this.brandsInput = ""; 
           return;
        }
      }
      this.brandsYHForm.push({ 
           type:1, name:this.brandsInput, storeId:sessionStorage['storeId']
      });
      if(this.brandsYHForm.length == 0){
        this.showYH = true;
      }else{
        this.showYH = false;
      }  
      this.brandsSelect = "";
      this.brandsInput = ""; 
  },    
  deleteBrandsYHItem(index) {      
      this.brandsYHForm.splice(index, 1); 
      if(this.brandsYHForm.length == 0){
        this.showYH = true;
      }else{
        this.showYH = false;
      } 
      this.brandsSelect = "";
      this.brandsInput = "";
  },
  addBrandsJJ(){
      for(var i=0; i<this.brandsJJForm.length; i++){
        if(this.brandsJJForm[i].name == this.brandsInput){
           this.$Message.error("请勿输入重复的家居品牌！");
           this.brandsSelect = "";
           this.brandsInput = ""; 
           return;
        }
      }   
      this.brandsJJForm.push({ 
          type:2, name:this.brandsInput, storeId:sessionStorage['storeId']
      });
      if(this.brandsJJForm.length == 0){
        this.showJJ = true;
      }else{
        this.showJJ = false;
      }     
      this.brandsSelect = "";
      this.brandsInput = "";
  },  
  deleteBrandsJJItem(index) {      
      this.brandsJJForm.splice(index, 1); 
      if(this.brandsJJForm.length == 0){
        this.showJJ = true;
      }else{
        this.showJJ = false;
      } 
      this.brandsSelect = "";
      this.brandsInput = "";
  },
  nextPage(){
	  // this.$router.push({name: 'register_5'});
    const params = {
      storeId: sessionStorage['storeId'],
      brands: [...this.brandsJJForm, ...this.brandsYHForm],
      instruments: this.instrumentsForm
    }
    this.$ajax({
      method: 'post',
      url: extendBrandInfo(),
      data: params,
      withCredentials: true,
    }).then((res) => {
      console.log(res)
      this.$Message.success({content:'提交成功'});
      this.$router.push({name: 'register_5', params:params});
      this.$emit('changeActivename','register_5')
    }).catch((error) =>{
      this.$Message.error({content: '提交失败'});
    })
	},
	priviousPage(){
	  this.$router.push({name: 'register_3'});
	},
    },
    created() {
      this.$emit('changeActivename','register_4')
    }
  }
</script>

<style scoped>
  .register{
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .layout-logo-left{
    display:table;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    font-size: 20px;
    padding: 22px 0;
    color: #66368C;
    /*background-color: #66368C;*/
    text-align: center;
    width: 500px;
    margin: 0 auto;
  }
  .hy_return{
    background-color: #aaa;
    color: #fff;
    margin-left:20px;

  }
  .hy_return:hover {
    border-color: #aaa;
    color: #aaa;
    background-color: #fff;
  }
.footer{
   margin: 45px 0;
}
table{           
   border-collapse: collapse;            
   margin: 0 auto;            
   text-align: center;        
  }        
table td, table th{            
    border: 1px solid #cad9ea;            
    color: #666;            
    height: 30px;        
  }        
table thead th{            
    background-color: #CCE8EB;            
    width: 100px;        
  }        
table tr:nth-child(odd)        
  {            
    background: #fff;        
  }        
table tr:nth-child(even)        
  {            
    background: #F5FAFA;        
  }
li{
    list-style-type:none;
  } 
</style>
