<template>
  <div class="sa6">
    <div class="content" v-if="achievementRule==true">
      <h3>绩效PK <span class="notice">{{achievementRule == true?'已启用':'未启用'}}</span></h3>
      <br>
      <div>
        员工缴纳<InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 50px" size="small" /></InputNumber> 元作为绩效基金，<br>
        <div style="margin-top:10px;"><Select :transfer=true style="width:100px;">
          <Option value="消耗" >消耗</Option>
          <Option value="实操" >实操</Option>
          <Option value="业绩" >业绩</Option>
          <Option value="客流" >客流</Option>
        </Select>达到<InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 50px;" size="small"/></InputNumber> 元返还<InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 50px" size="small"/></InputNumber> 元，达不到<InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 50px" size="small" /></InputNumber> 元扣掉<InputNumber :min="0" max="100000" placeholder="面部手工费" style="width: 50px" size="small"/></InputNumber> 元</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    name: 'sa6',
    data(){
      return{
        achievementRule:true
      }
    }
  }
</script>
<style scoped></style>
