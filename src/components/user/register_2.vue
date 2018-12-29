<template>
  <div class="register">
    <Form ref="formValidate" :model="roomVal" :rules="ruleValidate" :label-width="100">
      <div class="layout-logo-left">房间</div>
      <FormItem label="店平方数：" prop="roomSize"  class="formItemStyle" >
            <Input v-model="roomVal.roomSize" placeholder="店平方数(平方米)"></Input>
      </FormItem>
      <FormItem label="年房租：" class="formItemStyle" >
          <Row>
            <Col span="10">
              <FormItem  prop="annualRentYear">
                <Input v-model="roomVal.annualRentYear" placeholder="年"></Input>
              </FormItem>  
            </Col>
            <Col span="10" offset="2">
              <FormItem  prop="annualRent">
                <Input v-model="roomVal.annualRent" placeholder="房租(元)"></Input>
              </FormItem>
            </Col>
          </Row>  
      </FormItem>
      <FormItem label="房租增长率：" prop="growthRate"  class="formItemStyle" >
            <Input v-model="roomVal.growthRate" placeholder="房租增长率"></Input>
      </FormItem>
      <FormItem label="房间总数详情："  class="formItemStyle" prop="roomCount">
          <RadioGroup v-model="roomRadio" @on-change="hiddenDetailLabel()">
              <Radio label="displayDetail">输入具体房间数量</Radio>
              <Radio label="noDisplayDetail">直接输入房间总数</Radio>
          </RadioGroup>
          <Input v-model="roomVal.roomCount" placeholder="请输入房间总数(间)" :disabled="showroomCountDisabled" :ifShow="showroomCount"></Input>
      </FormItem>
      <div v-if="showRoomDetail">
        <div class="layout-logo-left">单人间数量</div>
        <div class="container1">
          <FormItem :label="value.lableName" v-for='(value, index) in roomVal.singleRoom' class="formItemStyle2" :key="index">
            <Input v-model="roomVal.singleRoom[index].count" :placeholder="value.lableName+' '+'(间)'"></Input>
          </FormItem>
        </div>
        <div class="layout-logo-left">双人间数量</div>
        <div class="container1">
          <FormItem :label="value.lableName" v-for='(value, index) in roomVal.doubleRoom' class="formItemStyle2" :key="index">
            <Input v-model="roomVal.doubleRoom[index].count" :placeholder="value.lableName+' '+'(间)'"></Input>
          </FormItem>
        </div>
        <div class="layout-logo-left">三人间数量</div>
        <div class="container1">
          <FormItem :label="value.lableName" v-for='(value, index) in roomVal.tribleRoom' class="formItemStyle2" :key="index">
            <Input v-model="roomVal.tribleRoom[index].count" :placeholder="value.lableName+' '+'(间)'"></Input>
          </FormItem>
        </div>
        <div class="layout-logo-left">三人间以上数量</div>
        <div class="container1">
          <FormItem :label="value.lableName" v-for='(value, index) in roomVal.aboveTribleRoom' class="formItemStyle2" :key="index">
            <Input v-model="roomVal.aboveTribleRoom[index].count" :placeholder="value.lableName+' '+'(间)'"></Input>
          </FormItem>
        </div>
      </div>
      <div class="layout-logo-left">员工</div>
      <FormItem label="是否有顾问"  class="formItemStyle" prop="counselor">
        <RadioGroup v-model="roomCounselor" @on-change="hiddenCounselorLabel()">
            <Radio label="noCounselor">否</Radio>
            <Radio label="haveCounselor">是</Radio>
        </RadioGroup>
        <Input v-model="roomVal.counselor" placeholder="请输入顾问人数" v-if="showcounselor"></Input>
      </FormItem>
      <FormItem label="是否有店长"  class="formItemStyle" prop="manager">
        <RadioGroup v-model="roomManager" @on-change="hiddenManagerLabel()">
            <Radio label="noManager">否</Radio>
            <Radio label="haveManager">是</Radio>
        </RadioGroup>
        <Input v-model="roomVal.manager" placeholder="请输入店长人数" v-if="showmanager"></Input>
      </FormItem>
      <FormItem label="美容师（皮肤管理师）：" prop="cosmetologist"  class="formItemStyle" >
            <Input v-model="roomVal.cosmetologist" placeholder="请输入人数"></Input>
      </FormItem>
      <FormItem label="美体师：" prop="Therapist"  class="formItemStyle" >
            <Input v-model="roomVal.Therapist" placeholder="请输入人数"></Input>
      </FormItem>
      <FormItem label="护士：" prop="nurse"  class="formItemStyle" >
        <Input v-model="roomVal.nurse" placeholder="请输入人数"></Input>
      </FormItem>
        <FormItem label="理疗师：" prop="physicalTherapist"  class="formItemStyle" >
          <Input v-model="roomVal.physicalTherapist" placeholder="请输入人数"></Input>
      </FormItem>
        <FormItem label="足疗师：" prop="pedicure"  class="formItemStyle" >
          <Input v-model="roomVal.pedicure" placeholder="请输入人数"></Input>
      </FormItem>
      </Form>
      <div class="footer">
  <!--     <Button class="hy_btn" style="margin-left:20px;" size="large" @click="ok">注册</Button>
      <Button class="hy_btn" style="margin-left:20px;" size="large" @click="search">查询注册结果</Button> -->
        <!-- <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button> -->
        <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage('formValidate')">下一步</Button>
      </div>
  </div>    
</template>

<script>
  import { extendRoom } from '../../interface';
  export default{
    name: 'register_2',
    data(){
      let temArr = [{lableName: '仅淋浴', count:''}, {lableName: '仅坐便', count:''}, {lableName: '仅泡浴', count:''}, {lableName: '淋浴+坐便', count:''}, {lableName: '泡浴+坐便', count:''}, {lableName: '淋浴+泡浴', count:''}, {lableName: '淋浴+坐便+泡浴', count:''}]
      //let [[...singleRoomArr], [...doubleRoomArr], [...tribleRoomArr], [...aboveTribleRoomArr]] = [temArr, temArr, temArr, temArr]
      let singleRoomArr = JSON.parse(JSON.stringify(temArr))
      let doubleRoomArr  = JSON.parse(JSON.stringify(temArr))
      let tribleRoomArr = JSON.parse(JSON.stringify(temArr))
      let aboveTribleRoomArr = JSON.parse(JSON.stringify(temArr))
      const valueEqualNumber = (rule, value, callback) => {
        const valueInt = Number(value)
        if (!Number.isInteger(valueInt) && value.length !== 0 && (typeof this[`show${rule.field}`] ==='undefined' || this[`show${rule.field}`])) {
          callback(new Error('所填必须为数字'));
          } else if (value.length === 0 && (typeof this[`show${rule.field}`] ==='undefined' || this[`show${rule.field}`])){
            callback(new Error('所填不能为空'));
          }else {
            callback();
          }
        };
        const valueEqualString = (rule, value, callback) => {
          if (value.length === 0 && (typeof this[`show${rule.field}`] ==='undefined' || this[`show${rule.field}`])){
            callback(new Error('所填不能为空'));
          }else {
            callback();
          }
        };
      return{
        roomVal: {
          roomSize: '',
          annualRent: '',
          annualRentYear: '',
          roomCount: 0,
          growthRate: '',
          singleRoom: singleRoomArr,
          doubleRoom: doubleRoomArr,
          tribleRoom: tribleRoomArr,
          aboveTribleRoom: aboveTribleRoomArr,
          cosmetologist: '',
          Therapist: '',
          nurse: '',
          physicalTherapist: '',
          pedicure: '',
          counselor: '',
          manager: ''
        },
        roomRadio:'displayDetail',
        roomCounselor: 'haveCounselor',
        roomManager: 'haveManager',
        showRoomDetail: true,
        showroomCountDisabled: true,
        showroomCount: false,
        showcounselor: true,
        showmanager: true,
                ttt: {
        label: 'Demo title',
        inputOptions: { uppercase: true, isRequired: false },
        buttonOption: { textLeft: 'Move All', textRight: 'Move All' },
        resizeBox: "md",
        items: [
          { 'id': '1', 'name': 'Alundra' },
          { 'id': '2', 'name': 'Jess' },
          { 'id': '3', 'name': 'Meia' },
          { 'id': '4', 'name': 'Melzas' },
          { 'id': '5', 'name': 'Septimus' },

          { 'id': '6', 'name': 'Rudy Roughknight' },
          { 'id': '7', 'name': 'Jack Van Burace' },
          { 'id': '8', 'name': 'Hanpan' },
          { 'id': '9', 'name': 'Cecilia Adlehyde' },

          { 'id': '10', 'name': 'Serge' },
          { 'id': '11', 'name': 'Kid' },
          { 'id': '12', 'name': 'Lynx' },
          { 'id': '13', 'name': 'Harle' },

        ],
        colorItems: '#1E90FF',
        selectedItems: []
      },
        ruleValidate: {
          roomSize: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          annualRent: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          annualRentYear: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          growthRate: [
            { validator: valueEqualString, trigger: 'blur' }
          ],
          cosmetologist: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          Therapist: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          nurse: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          physicalTherapist: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          pedicure: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          roomCount: [
            { validator: valueEqualNumber, trigger: 'change' }
          ],
          counselor: [
            { validator: valueEqualNumber, trigger: 'change' }
          ],
          manager: [
            { validator: valueEqualNumber, trigger: 'change' }
          ]
        }
      }
    },
    methods:{
      nextPage(name){
        const roomTypes = [];
        const arrRule = ['onlyShower', 'onlyToilet', 'onlyBubble', 'showerAndToilet', 'bubbleAndToilet', 'showerAndBubble', 'showerAndToiletAndBubble']
        const room = ['singleRoom', 'doubleRoom', 'tribleRoom', 'aboveTribleRoom']
        let num =1;
        for (let val of room){
          let obj1 ={}
          for (let i=0; i<this.roomVal[val].length; i++){
          let obj2 ={}
          let obj2Key = arrRule[i];
          obj2[obj2Key] = this.roomVal[val][i].count;
          obj1 = Object.assign(obj1, obj2)
          }
          obj1 = Object.assign({type:num}, obj1, {storeId: sessionStorage['storeId']})
          roomTypes.push(obj1)
          num+=1;
        }
        const params = {
          storeId: sessionStorage['storeId'],
          roomTypes: roomTypes,
          room: Object.assign({area: this.roomVal.roomSize}, {rent: this.roomVal.annualRent},{rent: this.roomVal.annualRentYear}, {rent: this.roomVal.growthRate}, {roomCount: this.roomVal.roomCount}, {storeId: sessionStorage['storeId']}),
          member: {
            cosmeTologist: this.roomVal.cosmetologist,
            therapist: this.roomVal.Therapist,
            nurse: this.roomVal.nurse,
            physicalTherapist: this.roomVal.physicalTherapist,
            pedicure: this.roomVal.pedicure,
            counselor: this.roomVal.counselor,
            manager: this.roomVal.manager,
            storeId: sessionStorage['storeId']
            },
          }
        this.$refs[name].validate((valid) => {
            if (valid) {
              this.$ajax({
                method: 'POST',
                url: extendRoom(),
                data: params,
                withCredentials: true,
              }).then((res) => {
                console.log(res)
                this.$Message.success('Success!');
                this.$router.push({name: 'register_3', params: params});
                this.$emit('changeActivename','register_3')
              }).catch((error) =>{
                this.$Message.error({content: '提交失败'});
              })
            } else {
                this.$Message.error('无法进入下一步');
            }
        })
	    },
	    priviousPage(){
	     this.$router.push({name: 'register_1'});
       this.$emit('changeActivename','register_1')
	    },
      hiddenDetailLabel(){
        if (this.roomRadio === 'noDisplayDetail') {
          this.showroomCount = true;
          this.showroomCountDisabled = false;
          this.showRoomDetail = false;
        } else {
          this.roomVal.roomCount = 0;
          this.showroomCount = false;
           this.showroomCountDisabled = true;
          this.showRoomDetail = true
        }
      },
      hiddenCounselorLabel(){
        this.showcounselor = this.roomCounselor === 'haveCounselor' ? true : false
        this.roomVal.counselor = this.roomCounselor === 'haveCounselor' ? this.roomVal.counselor : ''
      },
      hiddenManagerLabel(){
        this.showmanager = this.roomManager === 'haveManager' ? true : false
        this.roomVal.manager = this.roomManager === 'haveManager' ? this.roomVal.manager : ''
      },
    },
    created() {
      this.$emit('changeActivename','register_2')
    },
    updated() {
      let count =0
      if (this.showroomCount === false) {
        const roomValArr = [...this.roomVal.singleRoom, ...this.roomVal.doubleRoom, ...this.roomVal.tribleRoom, ...this.roomVal.aboveTribleRoom]
        for (let val of roomValArr) {
          if(parseInt(val.count)) {
            count+=parseInt(val.count)
          }
        }
        this.roomVal.roomCount = count
      } else {
        count = 0
      }
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
.formItemStyle {
  width: 350px;
  margin: 0 auto 20px auto;
}
.formItemStyle2 {
  width: 250px;
  margin: 0 0 0 0px;
}
.formItemStyle2 div{
  margin: 0 0 10px 0;
}
.ivu-select {
  display: block;
}
.checkboxOption{
  display: flex;
}
.footer {
  margin: 30px 0;
}
.container1 {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
}
.ivu-radio-group {
  display: flex;
}
</style>
