<template>
    <div id="pdfDom">
        <div id="register_button">
            <Button type="info" @click="print()">打印PDF</Button>
            <Button type="success" @click="back()">回到首页</Button>
        </div>
        <header><span></span>注册信息汇总表</header>
        <div id="register_1_info">
            <ul>
                <li class="licenter"><div class="item2">门店品牌：<span>{{storeVal.storeName}}</span></div><div class="item2">类型：<span>{{storeVal.franchType}}</span></div></li>
                <li class="licenter"><div class="item2">联系人：<span>{{validatePhoneVal.name}}</span></div><div class="item2">联系电话：<span>{{validatePhoneVal.account}}</span></div></li>
                <li class="licenter"><div class="item2">门店省份：<span></span></div><div class="item2">门店城市：<span></span></div></li>
                <li class="licenter"><div class="item2">门店地址：<span>{{storeVal.address}}</span></div><div class="item2">门店电话：<span>{{storeVal.telephone}}</span></div></li>
                <li class="licenter"><div class="item2">门店类型: <span>{{storeVal.storeType}}</span></div><div class="item2">经营状态：<span>{{storeVal.operationMode}}</span></div></li>  
            </ul>
        </div>
        <div id="register_2_info">
            <h1>房间</h1>
            <ul>
                <li class="licenter"><div class="item2">店平方数：<span>{{register_2_info.room.area}}</span></div><div class="item2">年租房:<span>{{register_2_info.room.rent}}</span></div></li>
                <li class="licenter">房间总数详情：<span>{{register_2_info.room.roomCount}}</span></li>
                <div>
                    <h2>单人间数量</h2>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[0].onlyShower}}</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[0].onlyToilet}}</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[0].onlyBubble}}</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[0].showerAndToilet}}</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[0].bubbleAndToilet}}</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[0].showerAndBubble}}</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[0].showerAndToiletAndBubble}}</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h2>双人间数量</h2>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[1].onlyShower}}</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[1].onlyToilet}}</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[1].onlyBubble}}</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[1].showerAndToilet}}</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[1].bubbleAndToilet}}</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[1].showerAndBubble}}</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[1].showerAndToiletAndBubble}}</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h2>三人间数量</h2>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[2].onlyShower}}</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[2].onlyToilet}}</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[2].onlyBubble}}</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[2].showerAndToilet}}</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[2].bubbleAndToilet}}</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[2].showerAndBubble}}</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[2].showerAndToiletAndBubble}}</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h2>三人间以上数量</h2>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[3].onlyShower}}</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[3].onlyToilet}}</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[3].onlyBubble}}</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[3].showerAndToilet}}</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[3].bubbleAndToilet}}</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[3].showerAndBubble}}</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[3].showerAndToiletAndBubble}}</span></div><div class="item4"><span></span></div></li>
                    </ul>
                </div>
            </ul>
            <h1>员工</h1>
            <ul>
                <li><div class="item2">是否有顾问：<span>{{register_2_info.member.counselor}}</span></div><div class="item2">是否有店长：<span>{{register_2_info.member.manager}}</span></div></li>
                <li><div class="item2">美容师（皮肤管理师）：<span>{{register_2_info.member.cosmeTologist}}</span></div><div class="item2">美体师：<span>{{register_2_info.member.therapist}}</span></div></li>
                <li><div class="item2">护士：<span>{{register_2_info.member.nurse}}</span></div><div class="item2">理疗师：<span>{{register_2_info.member.physicalTherapist}}</span></div></li>
                <li><div class="item2">足疗师：<span>{{register_2_info.member.pedicure}}</span></div></li>
            </ul>
        </div>
        <div id="register_3_info">
            <h1>连续十二个月店内现金流水</h1>
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_3_info[0]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月流水:'}}<span>     {{ value }}</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h1>连续十二个月店内店内实操</h1>
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_3_info[1]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月实操:'}}<span>     {{ value }}</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h1>连续十二个月店内店内客流</h1>
            <ul>
               <Row>
                    <Col v-for="(value, key) in this.register_3_info[2]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月客流:'}}<span>     {{ value }}</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h1>连续十二个月店内产品业绩</h1>
            <ul>
               <Row>
                    <Col v-for="(value, key) in this.register_3_info[3]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月业绩:'}}<span>     {{ value }}</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
        </div>
        <div id="register_4_info">
            <div id="register_4_info_header"><h1>直营产品品牌</h1><h1>仪器品牌</h1></div>
            <div id="register_4_info_body">
                <Table :columns="chanpinColumns" width="400" class="tableClass" :data='jiajuyuanhu'>

                </Table>
                <Table :columns="yiqiColumns" width="400" class="tableClass" :data='register_4_info.instruments'>

                </Table>
            </div>
        </div>
        <div id="register_5_info">
            <h1>薪资制度</h1>
            <p>test containt</p>
            <h1>员工连续十二个月薪资（元）</h1>  
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_5_info[0]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月薪资:'}}<span>     {{ value }}</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
        </div>
        <div id="register_6_info">
            <h1>项目表</h1>
            <Table :columns="xiangmuColumns" :data="register_6_info.items"></Table>
             <div class="item2">拓客卡：<span>{{register_6_info.card.extensionCard}}</span></div><div class="item2">留客卡：<span>{{register_6_info.card.guestCard}}</span></div>
             <h1>近六个月托客方式</h1>
             <Table :columns="tuokeColumns" :data="register_6_info.extensions"></Table>
        </div>
        <div id="register_7_info">
            <h1>顾客流量<i></i></h1>
            <ul>
                <li><div class="item3">店内注册顾客数量：<span>{{register_7_info.client.rcCount}}</span></div><div class="item3">两个月至少到店一次的顾客数量：<span>{{register_7_info.client.tmoCount}}</span></div><div class="item3">一个月至少到店一次的顾客数量：<span>{{register_7_info.client.omoCount}}</span></div></li>
                <li><div class="item3">一个月至少到店两次的顾客数量：<span>{{register_7_info.client.omtCount}}</span></div><div class="item3">一个月至少到店三次的顾客数量：<span>{{register_7_info.client.omthCount}}</span></div><div class="item3">一个月到店三次以上的顾客数量：<span>{{register_7_info.client.omfCount}}</span></div></li>
                <li><div class="item3">每个月的月均业绩：<span>{{register_7_info.client.avgMonPerformance}}</span></div><div class="item3">月均新顾客成交业绩：<span>{{register_7_info.client.monNcliPerformance}}</span></div><div class="item3">月均老顾客成交业绩：<span>{{register_7_info.client.monOcliPerformance}}</span></div></li>
            </ul>
        </div>
        <div id="register_7_info">
            <h1>目前经营最大问题</h1>
            <p>{{register_8_info.problem.desc}}</p>
        </div>
    </div>
</template>
<script>
import { infos } from '../../interface';
export default {
    data(){
        return {
            chanpinColumns:[
                {
                    title:"院护",
                    key:'YH'
                },
                {
                    title:"家居",
                    key:'JJ'
                }
            ],
            yiqiColumns:[
                {
                    title:"功效",
                    key:'effect'
                },
                {
                    title:"品牌",
                    key:'name'
                }
            ],
            xiangmuColumns:[
                {
                    title:"项目名称",
                    key:'name'
                },
                {
                    title:"价格区间",
                    key:'price'
                },
                {
                    title:"次数",
                    key:'count'
                }
            ],
            tuokeColumns:[
                {
                    title:"托客方式",
                    key:'type'
                },
                {
                    title:"拓进人数",
                    key:'exCount'
                },
                 {
                    title:"成交人数",
                    key:'dealCount'
                },
            ],
            htmlTitle:"注册信息表",
            storeVal:{},
            validatePhoneVal:{},
            register_2_info:{},
            register_3_info:[],
            register_4_info:{},
            register_5_info:[],
            register_6_info:{},
            register_7_info:{},
            register_8_info:{},
            jiajuyuanhu:[],
            jiaju:[],
            yuanhu:[]
            
        }
    },
    created () {

    },
    mounted () {
        this.$ajax({
            method: 'GET',
            url: infos()+34,
        }).then((res)=>{
            this.storeVal = res.data.register_1.store
            this.validatePhoneVal = res.data.register_1.customer
            this.register_2_info = res.data.register_2
            this.change_register_3_info(res.data.register_3);
            this.register_4_info = res.data.register_4
            this.change_register_5_info(res.data.register_5);
            this.register_6_info = res.data.register_6
            this.register_7_info = res.data.register_7
            this.register_8_info = res.data.register_8

            //this.register_2_info = JSON.parse(sessionStorage.register_2_info)
            //this.register_3_info = JSON.parse(sessionStorage.register_3_info)
            //this.register_4_info = JSON.parse(sessionStorage.register_4_info)
            // this.register_5_info = JSON.parse(sessionStorage.register_5_info)
            // this.register_6_info = JSON.parse(sessionStorage.register_6_info)
            // this.register_7_info = JSON.parse(sessionStorage.register_7_info)
            // this.register_8_info = JSON.parse(sessionStorage.register_8_info)
            //console.log(this.storeVal)
            this.storeVal.storeType = this.storeTypeTransfer(this.storeVal.storeType)
            this.storeVal.operationMode = this.storeTypeTransfer(this.storeVal.operationMode)
            this.storeVal.franchType = this.franchTypeTransfer(this.storeVal.franchType)
            
            this.getYuanhuInfo()
            this.register_2_info = this.emptyTransfer(this.register_2_info)
            this.register_3_info = this.emptyTransfer(this.register_3_info)
            this.register_4_info = this.emptyTransfer(this.register_4_info)
            this.register_5_info = this.emptyTransfer(this.register_5_info)
            this.register_6_info = this.emptyTransfer(this.register_6_info)
            this.register_7_info = this.emptyTransfer(this.register_7_info)
            this.register_8_info = this.emptyTransfer(this.register_8_info)
        })

    },
    methods: {
      getYuanhuInfo:function(){
          
          for (let index = 0; index < this.register_4_info.brands.length; index++) {
              const type = this.register_4_info.brands[index].type;
              const a ={};
              
              if(type ==2){
                this.jiaju.push({name:this.register_4_info.brands[index].name})
              }
              else if(type ==1){
                 this.yuanhu.push({name:this.register_4_info.brands[index].name}) 
              }
              
          }
          let ac = new Array();
          if(this.jiaju.length>=this.yuanhu.length){
              ac = this.jiaju
          }else{
              ac = this.yuanhu
          }
          for (let b = 0; b < ac.length; b++) {
            //   this.jiajuyuanhu[b].JJ = this.jiaju[b].name;
            //   this.jiajuyuanhu[b].YH = this.yuanhu[b].name
            if(this.jiaju[b]&&this.yuanhu[b]){
                this.jiajuyuanhu[b] = {
                JJ:this.jiaju[b].name,
                YH:this.yuanhu[b].name

              }
            }else if(!this.jiaju[b]){
                this.jiajuyuanhu[b] = {
                JJ:"无",
                YH:this.yuanhu[b].name
             }
            }
            else if(!this.yuanhu[b]){
                this.jiajuyuanhu[b] = {
                JJ:this.jiaju[b].name,
                YH:"无"
             }
            }
              
          }
          
      }  ,
      //空字符串转化为无
    emptyTransfer : (obj)=>{
         
      for(var key in obj){
        if(obj[key]===""){
            
          obj[key]="无"
        }
        if(typeof(obj[key])=="object"){
           this.a.methods.emptyTransfer(obj[key])
        }
        
    }
    
    return obj
    },
    change_register_3_info(obj){
        const data = JSON.parse(JSON.stringify(obj))
        for (let i=0; i<data.waterInfos.length;i++){
            let objData = this.obtainMonth(data.waterInfos[i],data.waterInfos[i]['type'])
            this.register_3_info.push(objData)
        }
    },
    change_register_5_info(obj){
        const data = JSON.parse(JSON.stringify(obj))
        let objData = this.obtainMonth(data.salary,null)
        this.register_5_info.push(objData)
    },
    obtainMonth(data,type){ 
        let obj={}
        let objMonth = parseInt(data.curMonth.split('-')[1])-1;
        let currentMonth =  new Date().getMonth();
        let currentYear =  new Date().getFullYear();
        const objYear = parseInt(data.curMonth.split('-')[0]);
        let deduct = objMonth - currentMonth <0 ? objMonth - currentMonth+12  : objMonth - currentMonth;
            deduct = currentYear - objYear > 2 ? 0 : deduct;
        let num=1; 
        console.log(deduct)   
        for (let count = 1+deduct; count<=12+deduct; count++){
        let obj1;
        let monthData = count >= 1 && currentYear - objYear <= 2 ? data[`month_${num}`] : null; 
            monthData = monthData === '' ? null : monthData
        console.log(monthData)
        if (currentMonth <= 12 && currentMonth>0) {
          obj1 = JSON.parse(`{"${type}_${currentYear}_${currentMonth}": ${monthData}}`);
        }else{
          let currentMonthNew = currentMonth+12;
          let currentYearNew = currentYear-1
          obj1 = JSON.parse(`{"${type}_${currentYearNew}_${currentMonthNew}": ${monthData}}`);
        }
        currentMonth--; 
        num++;
        obj = Object.assign(obj, obj1)
      }
        return obj;
    },
    print(){
        //导出pdf
        this.getPdf()
    },
    back(){
        this.$router.push({name: 'login'});
    }
    }
}
</script>
<style scoped>
header{
    text-align: center;
    font-size: 30px;
    font-weight: bold
}

h1,h2{
    width: 500px;
    margin: 0 auto;
    text-align: center;
}

.licenter{
    
    text-align: center;
}
.item4,.item2,.item3{
    display: inline-block;
    text-align: justify;
    
   
}
.item4,.item2,.item3{
    flex: 1
}
#register_2_info,#register_1_info,#register_3_info{
    text-align: center;
    width: 1000px;
    margin: 0 auto
}
#register_button{
    width: 1000px;
    margin: 10px auto;
}
.tableClass{
    display: inline-block
}
ul{
    width: 1000px;
    margin: 0 auto
}
ul li{
    list-style: none;
    display: flex;
    
}
#register_4_info,#register_5_info,#register_6_info,#register_7_info,#register_8_info{
    width: 1000px;
    margin: 0 auto
}
#pdfDom{
    font-size: 15px
}
#register_4_info_header,#register_4_info_body{
    display:flex;
    justify-content: space-between;
}
</style>

