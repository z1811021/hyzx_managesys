<template>
    <div id="pdfDom">
        <div id="register_button">
            <Button type="info" @click="print()">打印PDF</Button>
            <Button type="success" @click="back()">回到首页</Button>
        </div>
        <header><span></span>注册信息汇总表</header>
        <div id="register_1_info">
            <ul>
                <li class="licenter"><div class="item2">门店品牌：<span>{{register_1_info.storeName}}</span></div><div class="item2">类型：<span>{{register_1_info.franchType}}</span></div></li>
                <li class="licenter"><div class="item2">联系人：<span>{{register_1_info.name}}</span></div><div class="item2">联系电话：<span>{{register_1_info.account}}</span></div></li>
                <li class="licenter"><div class="item2">门店省份：<span>{{register_1_info.provinceName}}</span></div><div class="item2">门店城市：<span>{{register_1_info.cityName}}</span></div></li>
                <li class="licenter"><div class="item2">门店地址：<span>{{register_1_info.address}}</span></div><div class="item2">门店电话：<span>{{register_1_info.telephone}}</span></div></li>
                <li class="licenter"><div class="item2">门店类型: <span>{{register_1_info.storeType}}</span></div><div class="item2">经营状态：<span>{{register_1_info.operationMode}}</span></div></li>  
            </ul>
        </div>
        <header><span></span>房间床位</header>
        <div id="register_2_info">
            <h3>房间</h3>
            <ul>
                <li class="licenter"><div class="item2">店平方数：<span>{{register_2_info.room.area}}</span><span> 平方米</span></div><div class="item2">年房租:<span>{{register_2_info.room.rent}}</span><span> 元</span></div></li>
                <li class="licenter">房间总数详情：<span>{{register_2_info.room.roomCount}}</span><span> 间</span></li>
                <div v-if="register_2_roomTypes">
                    <h3>单人间数量</h3>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[0].onlyShower}}</span><span> 间</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[0].onlyToilet}}</span><span> 间</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[0].onlyBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[0].showerAndToilet}}</span><span> 间</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[0].bubbleAndToilet}}</span><span> 间</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[0].showerAndBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[0].showerAndToiletAndBubble}}</span><span> 间</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h3>双人间数量</h3>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[1].onlyShower}}</span><span> 间</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[1].onlyToilet}}</span><span> 间</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[1].onlyBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[1].showerAndToilet}}</span><span> 间</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[1].bubbleAndToilet}}</span><span> 间</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[1].showerAndBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[1].showerAndToiletAndBubble}}</span><span> 间</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h3>三人间数量</h3>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[2].onlyShower}}</span><span> 间</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[2].onlyToilet}}</span><span> 间</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[2].onlyBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[2].showerAndToilet}}</span><span> 间</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[2].bubbleAndToilet}}</span><span> 间</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[2].showerAndBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[2].showerAndToiletAndBubble}}</span><span> 间</span></div><div class="item4"><span></span></div></li>
                    </ul>
                    <h3>三人间以上数量</h3>
                    <ul>
                        <li><div class="item4">仅淋浴：<span>{{register_2_info.roomTypes[3].onlyShower}}</span><span> 间</span></div><div class="item4">仅坐便：<span>{{register_2_info.roomTypes[3].onlyToilet}}</span><span> 间</span></div><div class="item4">仅泡浴：<span>{{register_2_info.roomTypes[3].onlyBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便：<span>{{register_2_info.roomTypes[3].showerAndToilet}}</span><span> 间</span></div></li>
                        <li><div class="item4">泡浴+坐便：<span>{{register_2_info.roomTypes[3].bubbleAndToilet}}</span><span> 间</span></div><div class="item4">淋浴+泡浴：<span>{{register_2_info.roomTypes[3].showerAndBubble}}</span><span> 间</span></div><div class="item4">淋浴+坐便+泡浴：<span>{{register_2_info.roomTypes[3].showerAndToiletAndBubble}}</span><span> 间</span></div><div class="item4"><span></span></div></li>
                    </ul>
                </div>
            </ul>
            <h3>员工</h3>
            <ul>
                <li><div class="item2">是否有顾问：<span>{{register_2_info.member.counselor}}</span></div><div class="item2">是否有店长：<span>{{register_2_info.member.manager}}</span></div></li>
                <li><div class="item2">美容师（皮肤管理师）：<span>{{register_2_info.member.cosmeTologist}}</span></div><div class="item2">美体师：<span>{{register_2_info.member.therapist}}</span></div></li>
                <li><div class="item2">护士：<span>{{register_2_info.member.nurse}}</span></div><div class="item2">理疗师：<span>{{register_2_info.member.physicalTherapist}}</span></div></li>
                <li><div class="item2">足疗师：<span>{{register_2_info.member.pedicure}}</span></div></li>
            </ul>
        </div>
        <header><span></span>年流水</header>
        <div id="register_3_info">
            <h3>连续十二个月店内现金流水 (元)</h3>
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_3_info[0]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月流水:'}}<span>     {{ value }}</span><span> 元</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h3>连续十二个月店内店内实操 (元)</h3>
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_3_info[1]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月实操:'}}<span>     {{ value }}</span><span> 元</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h3>连续十二个月店内店内客流 (元)</h3>
            <ul>
               <Row>
                    <Col v-for="(value, key) in this.register_3_info[2]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月客流:'}}<span>     {{ value }}</span><span> 元</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
            <h3>连续十二个月店内产品业绩 (元)</h3>
            <ul>
               <Row>
                    <Col v-for="(value, key) in this.register_3_info[3]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月业绩:'}}<span>     {{ value }}</span><span> 元</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
        </div>
        <header><span></span>品牌仪器</header>
        <div id="register_4_info">
            <div id="register_4_info_header"><h3>直营产品品牌</h3><h3>仪器品牌</h3></div>
            <div id="register_4_info_body">
                <Table :columns="chanpinColumns" width="400" class="tableClass" :data='jiajuyuanhu'>

                </Table>
                <Table :columns="yiqiColumns" width="400" class="tableClass" :data='register_4_info.instruments'>

                </Table>
            </div>
        </div>
        <header><span></span>薪资制度</header>
        <div id="register_5_info">
            <h3>薪资制度描述</h3>
            <p>{{register_5_desc}}</p>
            <h3>员工连续十二个月薪资（元）</h3>  
            <ul>
                <Row>
                    <Col v-for="(value, key) in this.register_5_info[0]" span="6" :key="key">
                        <li>
                            <div>{{key.split('_')[1].slice(2,4)+'年'+key.split('_')[2]+'月薪资:'}}<span>     {{ value }}</span><span> 元</span></div>
                        </li>
                    </Col>
                </Row>
            </ul>
        </div>
        <header><span></span>项目/卡</header>
        <div id="register_6_info">
            <h3>项目表</h3>
            <Table :columns="xiangmuColumns" :data="register_6_info.items"></Table>
             <div class="item2">拓客卡：<span>{{register_6_info.card.extensionCard}}</span></div> 
             <div class="item2">留客卡：<span>{{register_6_info.card.guestCard}}</span></div>
             <h3>近六个月托客方式</h3>
             <Table :columns="tuokeColumns" :data="register_6_info.extensions"></Table>
        </div>
        <header><span></span>顾客流量</header>
        <div id="register_7_info">
            <ul>
                <li><div class="item3">店内注册顾客数量：<span>{{register_7_info.client.rcCount}}</span><span> 人</span></div><div class="item3">两个月至少到店一次的顾客数量：<span>{{register_7_info.client.tmoCount}}</span><span> 人</span></div><div class="item3">一个月至少到店一次的顾客数量：<span>{{register_7_info.client.omoCount}}</span><span> 人</span></div></li>
                <li><div class="item3">一个月至少到店两次的顾客数量：<span>{{register_7_info.client.omtCount}}</span><span> 人</span></div><div class="item3">一个月至少到店三次的顾客数量：<span>{{register_7_info.client.omthCount}}</span></div><div class="item3">一个月到店三次以上的顾客数量：<span>{{register_7_info.client.omfCount}}</span><span> 人</span></div></li>
                <li><div class="item3">每个月的月均业绩：<span>{{register_7_info.client.avgMonPerformance}}</span><span> 人</span></div><div class="item3">月均新顾客成交业绩：<span>{{register_7_info.client.monNcliPerformance}}</span><span> 人</span></div><div class="item3">月均老顾客成交业绩：<span>{{register_7_info.client.monOcliPerformance}}</span><span> 人</span></div></li>
            </ul>
        </div>
        <header><span></span>经营问题</header>
        <div id="register_8_info">
            <h3>目前经营最大问题</h3>
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
            register_1_info:{},
            register_2_info:{},
            register_3_info:[],
            register_4_info:{},
            register_5_info:[],
            register_6_info:{},
            register_7_info:{},
            register_8_info:{},
            register_5_desc:"",
            jiajuyuanhu:[],
            jiaju:[],
            yuanhu:[],
            register_2_roomTypes: true
            
        }
    },
    created () {

    },
    mounted () {
        this.$ajax({
            method: 'GET',
            url: infos()+sessionStorage['storeId'],
        }).then((res)=>{
            console.log(res)
            this.register_1_info = res.data.register_1
            this.register_2_info = res.data.register_2
            this.change_register_3_info(res.data.register_3);
            this.register_4_info = res.data.register_4
            this.change_register_5_info(res.data.register_5);
            this.register_5_desc = res.data.register_5.salary.desc
            this.register_6_info = res.data.register_6
            this.register_7_info = res.data.register_7
            this.register_8_info = res.data.register_8


            this.register_1_info.storeType = this.storeTypeTransfer(this.register_1_info.storeType)
            this.register_1_info.operationMode = this.operationModeTransfer(this.register_1_info.operationMode)
            this.register_1_info.franchType = this.franchTypeTransfer(this.register_1_info.franchType)
            
            this.getYuanhuInfo()
            this.register_2_roomTypes = this.checkObjValueEmpty(this.register_2_info.roomTypes)
            // this.register_3_info = this.emptyTransfer(this.register_3_info)
            // this.register_4_info = this.emptyTransfer(this.register_4_info)
            // this.register_5_info = this.emptyTransfer(this.register_5_info)
            // this.register_6_info = this.emptyTransfer(this.register_6_info)
            // this.register_7_info = this.emptyTransfer(this.register_7_info)
            // this.register_8_info = this.emptyTransfer(this.register_8_info)
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
    //判断数组对象是否没有空值
    checkObjValueEmpty(arr){
        let emptyValArr = [];
        let newArr = arr.map((item,index)=>{
            item.id = ''
            item.roomNumbers  = ''
            item.storeId = ''
            item.type = ''
            emptyValArr.push(Array.from(new Set(Object.values(item))).length > 1)

        })
        return emptyValArr.includes(true);
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
        let objMonth = parseInt(data.curMonth.split('-')[1])-1 !== 0 ? parseInt(data.curMonth.split('-')[1])-1 : 12;
        let currentMonth = new Date().getMonth() !== 0 ? new Date().getMonth() : 12;
        let currentYear =  new Date().getFullYear();
        const objYear = parseInt(data.curMonth.split('-')[0]);
        let sumMonth = currentYear - objYear === 0 ? 0 : 12
        let deduct =  objMonth - currentMonth - sumMonth;
            deduct = currentYear - objYear > 2 ? 0 : deduct;
        let num=1;
        for (let count = 1+deduct; count<=12+deduct; count++){
        let obj1;
        let monthData = count >= 1 && currentYear - objYear <= 2 ? data[`month_${num}`] : null; 
            monthData = monthData === '' ? null : monthData
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
    font-weight: bold;
    margin: 50px 0 10px 0;
}

h1,h3{
    width: 500px;
    margin: 0 auto;
    text-align: center;
}

.licenter{
    
    text-align: center;
}
.item2{
    display:block;
    text-align: justify;
}
.item4,.item3{
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

