<template>
  <div class="register">
    <Form ref="formValidate" :model="roomVal" :rules="ruleValidate" :label-width="100">
      <div class="layout-logo-left">房间</div>
      <FormItem label="店平方数：" prop="roomSize"  class="formItemStyle" >
            <Input v-model="roomVal.roomSize" placeholder="店平方数"></Input>
      </FormItem>
      <FormItem label="年租房：" prop="annualRent"  class="formItemStyle" >
            <Input v-model="roomVal.annualRent" placeholder="年租房"></Input>
      </FormItem>
      <div class="layout-logo-left">单人间数量</div>
      <div class="container1">
        <FormItem :label="value.lableName" v-for='(value, index) in roomVal.singleRoom' class="formItemStyle2" :key="index">
          <Input v-model="roomVal.singleRoom[index].count" :placeholder="value.lableName"></Input>
        </FormItem>
      </div>
      <div class="layout-logo-left">双人间数量</div>
      <div class="container1">
        <FormItem :label="value.lableName" v-for='(value, index) in roomVal.doubleRoom' class="formItemStyle2" :key="index">
          <Input v-model="roomVal.doubleRoom[index].count" :placeholder="value.lableName"></Input>
        </FormItem>
      </div>
      <div class="layout-logo-left">三人间数量</div>
      <div class="container1">
        <FormItem :label="value.lableName" v-for='(value, index) in roomVal.tribleRoom' class="formItemStyle2" :key="index">
          <Input v-model="roomVal.tribleRoom[index].count" :placeholder="value.lableName"></Input>
        </FormItem>
      </div>
      <div class="layout-logo-left">三人间以上数量</div>
      <div class="container1">
        <FormItem :label="value.lableName" v-for='(value, index) in roomVal.aboveTribleRoom' class="formItemStyle2" :key="index">
          <Input v-model="roomVal.aboveTribleRoom[index].count" :placeholder="value.lableName"></Input>
        </FormItem>
      </div>
      <div class="layout-logo-left">员工</div>
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
        <Button class="hy_btn" size="large" @click="priviousPage">上一步</Button>
        <Button class="hy_btn" style="margin-left:20px;" size="large" @click="nextPage('formValidate')">下一步</Button>
      </div>
  </div>    
</template>

<script>
  import { extendRoom } from '../../interface';
  export default{
    name: 'register_2',
    data(){
      const valueEqualNumber = (rule, value, callback) => {
      const valueInt = Number(value)
      if (!Number.isInteger(valueInt) && value.length !== 0) {
        callback(new Error('所填必须为数字'));
        } else {
          callback();
        }
      };
      let temArr = [{lableName: '仅淋浴', count:''}, {lableName: '仅坐便', count:''}, {lableName: '仅泡浴', count:''}, {lableName: '淋浴+坐便', count:''}, {lableName: '泡浴+坐便', count:''}, {lableName: '淋浴+泡浴', count:''}, {lableName: '淋浴+坐便+泡浴', count:''}]
      //let [[...singleRoomArr], [...doubleRoomArr], [...tribleRoomArr], [...aboveTribleRoomArr]] = [temArr, temArr, temArr, temArr]
      let singleRoomArr = JSON.parse(JSON.stringify(temArr))
      let doubleRoomArr  = JSON.parse(JSON.stringify(temArr))
      let tribleRoomArr = JSON.parse(JSON.stringify(temArr))
      let aboveTribleRoomArr = JSON.parse(JSON.stringify(temArr))

      return{
        roomVal: {
          roomSize: '',
          annualRent: '',
          singleRoom: singleRoomArr,
          doubleRoom: doubleRoomArr,
          tribleRoom: tribleRoomArr,
          aboveTribleRoom: aboveTribleRoomArr,
          cosmetologist: '',
          Therapist: '',
          nurse: '',
          physicalTherapist: '',
          pedicure: ''
        },
        ruleValidate: {
          roomSize: [
            { validator: valueEqualNumber, trigger: 'blur' }
          ],
          annualRent: [
            { validator: valueEqualNumber, trigger: 'blur' }
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
          room: Object.assign({area: this.roomVal.roomSize}, {rent: this.roomVal.annualRent}, {storeId: sessionStorage['storeId']}),
          member: {
            cosmeTologist: this.roomVal.cosmetologist,
            therapist: this.roomVal.Therapist,
            nurse: this.roomVal.nurse,
            physicalTherapist: this.roomVal.physicalTherapist,
            pedicure: this.roomVal.pedicure,
            storeId: sessionStorage['storeId']}
          }
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
        // this.$refs[name].validate((valid) => {
        //     if (valid) {
        //         this.$Message.success('Success!');
        //         this.$router.push({name: 'register_3', params:{register2Info: this.roomVal}});
        //         this.$emit('changeActivename','register_3')
        //     } else {
        //         this.$Message.error('无法进入下一步');
        //     }
        // })
        // this.$router.push({name: 'register_3', params:{register2Info: this.roomVal}});
        // this.$emit('changeActivename','register_3')
	    },
	    priviousPage(){
	     this.$router.push({name: 'register_1'});
       this.$emit('changeActivename','register_1')
	    },
    },
    created() {
      this.$emit('changeActivename','register_2')
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
</style>
