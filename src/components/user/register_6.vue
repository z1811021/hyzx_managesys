<template>
  <div class="register">
    <div >
      <div class="layout-logo-left">项目表</div>
      <Input  v-model="cardNameInput" placeholder="项目名称" style="width: 85px;float:left;margin-left:15%;"/>
      <Input  v-model="cardPriceInput" placeholder="价格区间" style="width: 85px;float:left;margin-left:10px;"/>
      <Input  v-model="cardStyleInput" placeholder="次数" style="width: 85px;float:left;margin-left:10px;"/>
      <Button class="hy_btn" @click="addCard" style="float:left;margin-left:10px;">增加</Button>
        <br/>
        <br/>
        <br/>
        <table width="70%" class="table" border="1">
          <thead> 
            <tr>
              <th>项目名称</th>
              <th>价格区间</th>
              <th>次数</th>
              <th style="width:10%;"></th>
            </tr>
          </thead> 
          <tbody v-for="(item,index) in cardsForm">
            <tr >
              <td >{{item.name}}</td>
              <td >{{item.price}}</td>
              <td >{{item.count}}</td>
              <td><Button class="hy_btn" @click="deleteCard(index)">移除</Button></td>
            </tr> 
          </tbody>
          <tr v-show="showCard">
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
            </tr> 
        </table>
    </div>
    <br/>
    <br/>
     <label style="margin-left:15%;float:left;height: 32px;line-height: 32px;" for="Name">拓客卡：</label><Input  placeholder="拓客卡" v-model="extensionCard" style="width: 185px;float:left;margin-left:10px;"/>
    <br/>
    <br/>
    <br/>
    <br/>
    <label style="margin-left:15%;float:left;height: 32px;line-height: 32px;" for="Name">留客卡：</label><Input  placeholder="留客卡" v-model="guestCard" style="width: 185px;float:left;margin-left:10px;"/>
    <br/>
    <br/>
      <div >
      <div class="layout-logo-left">近六个月拓客方式</div>
      <Select v-model="customerCardSel" style="width:150px;float:left;margin-left:15%;" placeholder="主要拓客方式">
          <Option value="1">团购</Option>
          <Option value="2">微信</Option>
          <Option value="3">微博</Option>
          <Option value="4">APP</Option>
          <Option value="5">地推</Option>
          <Option value="6">异业联盟</Option>
          <Option value="7">会议营销</Option>
          <Option value="8">社区合作</Option>
          <Option value="9">行业合作</Option>
        </Select>
      <Input  v-model="customerCardNum" placeholder="拓进人数" style="width: 85px;float:left;margin-left:10px;"/>
      <Input  v-model="customerNum" placeholder="成交人数" style="width: 85px;float:left;margin-left:10px;"/>
      <Button class="hy_btn" @click="addCustomerCard" style="float:left;margin-left:10px;">增加</Button>
        <br/>
        <br/>
        <br/>
        <table width="70%" class="table" border="1">
          <thead> 
            <tr>
              <th>拓客方式</th>
              <th>拓进人数</th>
              <th>成交人数</th>
              <th style="width:10%;"></th>
            </tr>
          </thead> 
          <tbody v-for="(item,index) in customerCardsForm">
            <tr >
              <td >{{item.type}}</td>
              <td >{{item.exCount}}</td>
              <td >{{item.dealCount}}</td>
              <td><Button class="hy_btn" @click="deleteCustomerCard(index)">移除</Button></td>
            </tr> 
          </tbody>
            <tr v-show="showCustomerCard">
              <td ></td>
              <td ></td>
              <td ></td>
              <td ></td>
            </tr> 
        </table>
    </div>

<div class="footer">
<!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
    <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button>
    <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage">下一步</Button>
  </div>
  </div>
</template>

<script>
  import { extendItemInfo } from '../../interface';
  export default{
    name: 'register_6',
      data() {    
        return {      
          cardsForm : [],
          customerCardsForm: [],
          instrumentYQInput: "",
          instrumentPPInput: "",
          cardNameInput : "",
          cardPriceInput : "",
          cardStyleInput : "",
          customerCardNum : "",
          customerNum : "",
          customerCardSel: "",
          guestCard: "",
          extensionCard: "",
          showCard: true,
          showCustomerCard: true
        }  
      },
    methods:{
  addCard(){
      for(var i=0; i<this.cardsForm.length; i++){
        if(this.cardsForm[i].name == this.cardNameInput){
           this.$Message.error("请勿输入重复的项目名称！");
           this.cardNameInput = "";
           this.cardPriceInput = "";
           this.cardStyleInput = ""; 
           return;
        }
      }
    if(this.cardNameInput == "" || this.cardPriceInput == "" || this.cardStyleInput == ""){
      this.$Message.error("请完整输入项目和价格后添加！");
    }else{
        this.cardsForm.push({ 
        name:this.cardNameInput, price:this.cardPriceInput, count:this.cardStyleInput, storeId:sessionStorage['storeId']
        })  
        this.cardNameInput = "";
        this.cardPriceInput = "";
        this.cardStyleInput = ""; 
        this.showCard = false;
    }
  },    
  deleteCard(index) {
    this.cardsForm.splice(index,1); 
    if(this.cardsForm.length == 0){
      this.showCard = true;
    }else{
      this.showCard = false;
    }
    this.cardNameInput = "";
    this.cardPriceInput = "";
    this.cardStyleInput = ""; 
  },
  addCustomerCard(){
      for(var i=0; i<this.customerCardsForm.length; i++){
        if(this.customerCardsForm[i].selection == this.customerCardSel){
           this.$Message.error("请勿输入重复的拓客方式！");
           this.customerCardSel = "";
           this.customerCardNum = "";
           this.customerNum = "";
           return;
        } 
      }
    if(this.customerCardSel == 1){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
          this.customerCardsForm.push({ 
            type:"团购", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'], selection:this.customerCardSel})  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 2){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
          this.customerCardsForm.push({ 
              type:"微信", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 3){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
          this.customerCardsForm.push({ 
              type:"微博", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 4){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
        this.customerCardsForm.push({ 
              type:"APP", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 5){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
        this.customerCardsForm.push({ 
              type:"地推", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 6){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
        this.customerCardsForm.push({ 
              type:"异业联盟", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 7){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
        this.customerCardsForm.push({ 
              type:"会议营销", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 8){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
          this.customerCardsForm.push({ 
              type:"社区合作", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else if(this.customerCardSel == 9){
      if(this.customerCardNum == "" || this.customerNum == ""){
        this.$Message.error("请输入拓客人数成交人数后点击添加！")
      }else{
        this.customerCardsForm.push({ 
              type:"行业合作", exCount:this.customerCardNum, dealCount:this.customerNum, storeId:sessionStorage['storeId'],selection:this.customerCardSel
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
          this.showCustomerCard = false;
      }
    }else{
      this.$Message.error("请选择拓客方式后点击添加！")
    }
  },
  deleteCustomerCard(index) {
      this.customerCardsForm.splice(index,1); 
      if(this.customerCardsForm.length == 0){
      this.showCustomerCard = true;
        }else{
          this.showCustomerCard = false;
        }
        this.customerCardSel = "";
        this.customerCardNum = "";
        this.customerNum = "";
  },
  nextPage(){
    const params = {
      storeId: sessionStorage['storeId'],
      items: this.cardsForm,
      card: Object.assign({storeId: sessionStorage['storeId']}, {extensionCard:this.extensionCard}, {guestCard:this.guestCard}),
      extensions: this.customerCardsForm
    }
    //this.$router.push({name: 'register_5'});
    this.$ajax({
      method: 'post',
      url: extendItemInfo(),
      data: params,
      withCredentials: true,
    }).then((res) => {
      console.log(res)
      this.$Message.success({content:'提交成功'});
      this.$router.push({name: 'register_7', params: params} );
      this.$emit('changeActivename','register_7')
    }).catch((error) =>{
      this.$Message.error({content: '提交失败'});
    })
  },
  priviousPage(){
    this.$router.push({name: 'register_5'});
  },
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
   margin: 30px 0;
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
