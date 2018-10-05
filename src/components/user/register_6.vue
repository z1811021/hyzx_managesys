<template>
  <div class="register">
    <div >
      <div class="layout-logo-left">项目表</div>
      <Input  v-model="cardNameInput" placeholder="项目名称" style="width: 85px;float:left;margin-left:120px;"/>
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
              <td >{{item.style}}</td>
              <td><Button class="hy_btn" @click="deleteCard(index)">移除</Button></td>
            </tr> 
          </tbody>
        </table>
    </div>
    <br/>
    <br/>
     <label style="margin-left:120px;float:left;height: 32px;line-height: 32px;" for="Name">拓客卡：</label><Input  placeholder="拓客卡" style="width: 185px;float:left;margin-left:10px;"/>
    <br/>
    <br/>
    <br/>
    <br/>
    <label style="margin-left:120px;float:left;height: 32px;line-height: 32px;" for="Name">留客卡：</label><Input  placeholder="留客卡" style="width: 185px;float:left;margin-left:10px;"/>
    <br/>
    <br/>
      <div >
      <div class="layout-logo-left">近六个月拓客方式</div>
      <Select v-model="customerCardSel" style="width:150px;float:left;margin-left:120px;" placeholder="主要拓客方式">
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
              <td >{{item.style}}</td>
              <td >{{item.number}}</td>
              <td >{{item.deNumber}}</td>
              <td><Button class="hy_btn" @click="deleteCustomerCard(index)">移除</Button></td>
            </tr> 
          </tbody>
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
  export default{
    name: 'register_6',
      data() {    
        return {      
          instrumentsForm: [{effect:"", name:"", storeId:19}],
          cardsForm : [{name:"", price:"", style:"", storeId:19}],
          customerCardsForm: [{style:"", number:"", deNumber:"", storeId:19}],
          instrumentYQInput: "",
          instrumentPPInput: "",
          cardNameInput : "",
          cardPriceInput : "",
          cardStyleInput : "",
          customerCardNum : "",
          customerNum : "",
          customerCardSel: ""
        }  
      },
    methods:{
  addInstruments(){
    if(this.instrumentYQInput == "" || this.instrumentPPInput == ""){
      alert("请完整输入项目和价格后添加！");
    }else{
      if(this.instrumentsForm[0].effect == ""){
        this.instrumentsForm = [];
        this.instrumentsForm.push({ 
            effect:this.instrumentYQInput, name:this.instrumentPPInput, storeId:19
        })  
        this.instrumentYQInput = "";
        this.instrumentPPInput = "";
      } else{
        this.instrumentsForm.push({ 
            effect:this.instrumentYQInput, name:this.instrumentPPInput, storeId:19
        })   
        this.instrumentYQInput = "";
        this.instrumentPPInput = "";
      }   
    }
  },    
  deleteInstrumentsItem(index) {
    if(this.instrumentsForm.length == 1){
       this.instrumentsForm = [{effect:"", name:"", storeId:19}];
    }else{
      this.instrumentsForm.splice(index,1);
    }      
  },
  addCard(){
    if(this.cardNameInput == "" || this.cardPriceInput == "" || this.cardStyleInput == ""){
      alert("请完整输入项目和价格后添加！");
    }else{
      if(this.cardsForm[0].name == ""){
        this.cardsForm = [];
        this.cardsForm.push({ 
            name:this.cardNameInput, price:this.cardPriceInput, style:this.cardStyleInput, storeId:19
        })  
        this.cardNameInput = "";
        this.cardPriceInput = "";
        this.cardStyleInput = "";
      } else{
        this.cardsForm.push({ 
            name:this.cardNameInput, price:this.cardPriceInput, style:this.cardStyleInput, storeId:19
        })   
        this.cardNameInput = "";
        this.cardPriceInput = "";
        this.cardStyleInput = "";
      }   
    }
  },    
  deleteCard(index) {
    if(this.cardsForm.length == 1){
       this.cardsForm = [{name:"", price:"", style:""}];
    }else{
      this.cardsForm.splice(index,1);
    }      
  },
  addCustomerCard(){
    if(this.customerCardSel == 1){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"团购", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"团购", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 2){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"微信", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"微信", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 3){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"微博", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"微博", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 4){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"APP", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"APP", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 5){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"地推", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"地推", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 6){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"异业联盟", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"异业联盟", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 7){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"会议营销", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"会议营销", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 8){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"社区合作", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"社区合作", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else if(this.customerCardSel == 9){
      if(this.customerCardNum == "" || this.customerCardNum == ""){
        alert("请输入拓客人数成交人数后点击添加！")
      }else{
        if(this.customerCardsForm[0].style == ""){
          this.customerCardsForm = [];
          this.customerCardsForm.push({ 
              style:"行业合作", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })  
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        } else{
          this.customerCardsForm.push({ 
              style:"行业合作", number:this.customerCardNum, deNumber:this.customerNum, storeId:19
          })   
          this.customerCardSel = "";
          this.customerCardNum = "";
          this.customerNum = "";
        }
      }
    }else{
      alert("请选择拓客方式后点击添加！")
    }
  },
  deleteCustomerCard(index) {
    if(this.customerCardsForm.length == 1){
       this.customerCardsForm = [{style:"", number:"", deNumber:""}];
    }else{
      this.customerCardsForm.splice(index,1);
    }      
  },
  nextPage(){
    this.$router.push({name: 'register_5'});
  },
  priviousPage(){
    this.$router.push({name: 'register_3'});
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
