<template>
  <div>
    <Row :gutter="24" class="option" v-if="isSystem == 'true'">
      <Col span="4">
        <Input v-model="serch" placeholder="门店名称" style="margin-top: -1px">
        <span slot="append" class="serc" @click="serc">查找</span>
        </Input>
      </Col>
      <Col span="2" v-if="searchActive">
      <Button class="hy_btn" @click="Return">返回列表</Button>
      </Col>
      <Col span="2">
        <Button class="hy_btn"  @click="newEm">新建门店</Button>
      </Col>
    </Row>
    <Table :row-class-name="rowClassName" :columns="columns1" :data="data1"></Table>
    <div class="page" v-if="isSystem == 'true'">
      <Page :total="pages*10" @on-change="getPage" style="float: right;"></Page>
    </div>


    <Modal  footer-hide v-model="storeFlag" :title="store" :mask-closable="false" >
      联系人：<Input v-model="storeVal.staffName" placeholder="联系人" style="width: 310px"/>
      <br/>
      <br/>
      联系人电话：<Input v-model="storeVal.phoneNumber" @on-keyup="storeVal.phoneNumber=check1(storeVal.phoneNumber)" placeholder="联系人电话" style="width: 290px"/>
      <br/>
      <br/>
      门店名称：<Input v-model="storeVal.storeName" placeholder="门店名称" style="width: 300px"/>
      <br/>
      <br/>
      门店省市：<select id="s_province" name="province" class="sus" v-model="storeVal.provinceName" placeholder="门店所在省" ></select>&nbsp;&nbsp;
      <select id="s_city" name="city" v-model="storeVal.cityName" class="sus" ></select>&nbsp;&nbsp;
      <select id="s_county" name="area"  v-model="storeVal.area" class="sus"></select>
      <br/>
      <br/>
      门店地址：<Input v-model="storeVal.address" placeholder="门店地址" style="width: 300px"/>
      <br/>
      <br/>
      门店电话：<Input v-model="storeVal.telephone" @on-keyup="storeVal.telephone=check1(storeVal.telephone)"  placeholder="门店电话" style="width: 300px"/>
      <br/>
      <br/>
      管理周期：<Input v-model="storeVal.managementCycle" @on-keyup="storeVal.managementCycle=check1(storeVal.managementCycle)" placeholder="管理周期" style="width: 300px"/>
      <br/>
      <br/>
      门店类型：<Select v-model="storeVal.storeType" style="width:300px" :transfer=true  placeholder="门店类型">
        <Option value="1">美容院</Option>
        <Option value="2">皮肤管理</Option>
      </Select>
      <br/>
      <br/>
      经营方式：<Select v-model="storeVal.operationMode" style="width:300px" :transfer=true  placeholder="经营方式">
        <Option value="1">单店</Option>
        <Option value="2">连锁</Option>
      </Select>
      <br/>
      <br/>
      <RadioGroup v-model="storeVal.storeStatus" type="button" v-show="store=='编辑门店'">
        <Radio label="1">正在管理</Radio>
        <Radio label="2">经营不善</Radio>
        <Radio label="3">不再管理</Radio>
      </RadioGroup>

      <div slot="footer">
        <Button type="error" size="large" long @click="newStoret">提交</Button>
      </div>
     </Modal>
     <Modal  footer-hide v-model="questionFlag" :mask-closable="false" width="60%" >
     <div><Button size="large"  v-bind:class="{ active: isRoomActive }" @click="goRoom" style="margin-left: 30px;margin-top: 18px;">房间床位</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isYearActive }" @click="goYear">年流水</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isBrandActive }" @click="goBrand">品牌仪器</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isSalaryActive }" @click="goSalary">薪资制度</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isProjectActive }" @click="goProject">项目/卡</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isCustomerActive }" @click="goCustomer">顾客流量</Button>
     <Button size="large"  style="margin-top: 18px;" v-bind:class="{ active: isProblemActive }" @click="goProblem">经营问题</Button>
     <br/>
     <br/>
     </div> 
     <section v-show="isRoomShow" style="margin-left: 30px;">
     <div style="display: flex;margin-top:10px;"><div >店平方数：<Input v-model="question.shopSquare" style="width: 128px" disabled/></div>
      <div style="margin-left:55px;">年房租：<Input v-model="question.annualRent" style="width: 128px" disabled/></div><div style="margin-left:55px;">床位数：<Input v-model="question.annualRent" style="width: 128px" disabled/></div></div>
      <br/>
      <table border="1">
        <thead>
        <tr>
          <th></th>
          <th>单间</th>
          <th>两人间</th>
          <th>三人间</th>
          <th>三人以上间</th>
        </tr>
      </thead>
        <tr>
          <td>仅淋浴</td>
          <td>100</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>仅坐便</td>
          <td>50</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>仅泡浴</td>
          <td>100</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>淋浴+坐便</td>
          <td>300</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>坐便+泡浴</td>
          <td>100</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>淋浴+泡浴</td>
          <td>300</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
        <tr>
          <td>淋浴+泡浴+坐便</td>
          <td>80</td>
          <td>100</td>
          <td>50</td>
          <td>100</td>
        </tr>
      </table>
      <br/>
      <br/>
      <div style="width:100%;margin:0 auto;" align="center">
  <table border="1">
    <thead>
    <tr>
      <th>美容师（皮肤管理师）</th>
      <th>美体师</th>
      <th>护士</th>
      <th>理疗师</th>
      <th>足疗师</th>
    </tr>
  </thead>
    <tr>
      <td>100</td>
      <td>50</td>
      <td>100</td>
      <td>50</td>
      <td>100</td>
    </tr>
  </table>
      </div>
      <br/>
      </section>
      <section v-show="isYearShow" style="margin-left: 50px;">
      <br/>
      <Button size="large"  @click="showLs" style="background: #CCE8EB;height:60px;width:200px;margin-left: 60px;">连续十二个月店内现金流水</Button>
      <Button size="large"  @click="showSc" style="background: #CCE8EB;height:60px;width:200px;margin-left: 60px;">连续十二个月店内实操</Button>
      <br/>
      <br/>
      <Button size="large"  @click="showKl" style="background: #CCE8EB;height:60px;width:200px;margin-left: 60px;margin-top: 30px;">连续十二个月店内客流</Button>
      <Button size="large"  @click="showYj" style="background: #CCE8EB;height:60px;width:200px;margin-left: 60px;margin-top: 30px;">连续十二个月店内产品业绩</Button>
      <br/>
      <br/>
      </section>
      <section v-show="isBrandShow" >
      <div style="width:100%;"><div style="float:left;width:50%;margin:0 auto;" align="center">直营产品品牌：       <br/>
  <table border="1">
    <thead>
    <tr>
      <th>院护</th>
      <th>家居</th>
    </tr>
  </thead>
    <tr>
      <td>AAAAAAA</td>
      <td>BBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAA</td>
      <td>BBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAA</td>
      <td>BBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAA</td>
      <td>BBBBBBBB</td>
    </tr>
  </table>
</div>
      <div style="float:right;width:50%;margin:0 auto;" align="center">仪器：<br/>
  <table border="1">
    <thead>
    <tr>
      <th>功效</th>
      <th>品牌</th>
    </tr>
  </thead>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
    <tr>
      <td>AAAAAAAAA</td>
      <td>BBBBBBBBBB</td>
    </tr>
  </table>
     </div>
     <div class="clearfloat"></div>
     <br/>
</div>
      </section>
      <section v-show="isSalaryShow">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;薪资制度：<br/><br/><div class="ivu-input-wrapper ivu-input-type" style="width: 90%;margin-left: 30px;"><textarea autocomplete="off" spellcheck="false" rows="2" class="ivu-input" style="height: 130px;margin-top: -10px;" wrap="soft" disabled></textarea></div>
      <br/>
      <br/>
      
      <Button size="large" style="margin-left: 30px;background: #CCE8EB;" @click="showYgxs">员工12个月薪资</Button>
      </section>
      <section v-show="isProjectShow">
      <div style="width:100%;"><div style="float:left;width:50%;margin:0 auto;" align="center">项目价格单：       <br/>
  <table border="1">
    <thead>
    <tr>
      <th>项目</th>
      <th>价格</th>
    </tr>
  </thead>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
    </tr>
  </table>
</div>
      <div style="float:right;width:50%;margin:0 auto;" align="center">卡项：<br/>
  <table border="1">
    <thead>
    <tr>
      <th>项目</th>
      <th>价格</th>
      <th>营销方式</th>
    </tr>
  </thead>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
  </table>
     </div>
     <div class="clearfloat"></div>
</div>
<br/>
      <div style="width:100%;"><div style="float:left;width:50%;margin:0 auto;" align="center">拓客卡：<br/>
  <table border="1">
    <thead>
    <tr>
      <th>项目</th>
      <th>价格</th>
      <th>营销方式</th>
    </tr>
  </thead>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
  </table>
</div>
      <div style="float:right;width:50%;margin:0 auto;" align="center">留客卡：<br/>
  <table border="1">
    <thead>
    <tr>
      <th>项目</th>
      <th>价格</th>
      <th>营销方式</th>
    </tr>
  </thead>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
    <tr>
      <td>XXX</td>
      <td>1000 元</td>
      <td>XXX</td>
    </tr>
  </table>
     </div>
     <div class="clearfloat"></div>
</div>
<div>
            <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;主要拓客方式：      <div style="display: flex;margin-top:20px;margin-left:30px;"><div class="crack-button">团购</div><div  class="crack-button">微信</div><div  class="crack-button">微博</div><div  class="crack-button">APP</div><div  class="crack-button">地推</div><div  class="crack-button">异业联盟</div><div <div  class="crack-button">会议营销</div><div <div  class="crack-button">社区合作</div><div  class="crack-button">行业合作</div></div><br/>
       </div>
      </section>
      <section v-show="isCustomerShow" style="margin-left: 30px;">
     店内注册顾客数量：<Input v-model="question.newCustomers" style="width: 216px" disabled/>
      <br/>
      <br/>
      两个月至少到店一次的顾客数量：<Input v-model="question.numberOfTransactions" style="width: 144px" disabled/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;一个月至少到店一次的顾客数量：<Input v-model="question.numberOfTransactions" style="width: 144px" disabled/>
      <br/>
      <br/>
     一个月至少到店两次的顾客数量：<Input v-model="question.numberOfTransactions" style="width: 144px" disabled/>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 一个月至少到店三次的顾客数量：<Input v-model="question.numberOfTransactions" style="width: 144px" disabled/>
      <br/>
      <br/>
     一个月到店三次以上的顾客数量：<Input v-model="question.numberOfTransactions" style="width: 144px" disabled/>
      <br/>
      <br/>
       每个月的月均业绩：&nbsp;&nbsp;&nbsp;<Input v-model="question.numberOfTransactions" style="width: 188px" disabled/>
      <br/>
      <br/>
      月均新顾客成交业绩：<Input v-model="question.numberOfTransactions" style="width: 188px" disabled/>
      <br/>
      <br/>
       月均老顾客成交业绩：<Input v-model="question.numberOfTransactions" style="width: 188px" disabled/>
      <br/>
      <br/>
      </section>
      <section style="width: 100%;" v-show="isProblemShow">
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;目前自己认为经营的最大问题是什么？：      <br/><br/><div class="ivu-input-wrapper ivu-input-type" style="width: 90%;margin-left: 30px;"><textarea autocomplete="off" spellcheck="false" rows="2" class="ivu-input" style="height: 130px;" wrap="soft" disabled></textarea></div>
      <br/>
      <br/>
      </section>
    </Modal>
     <Modal footer-hide v-model="yearLsFlag" height="20%" width="48%">&nbsp;&nbsp;&nbsp;&nbsp;连续十二个月店内现金流水
       <br/>
       <br/>
       <div style="margin-left: 30px;">
    1月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 2月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;3月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    4月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 5月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;6月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    7月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 8月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;9月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    10月: &nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 11月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;12月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
        </div>
</Modal>
     <Modal footer-hide v-model="yearScFlag" height="20%" width="48%" >&nbsp;&nbsp;&nbsp;&nbsp;连续十二个月店内实操
       <br/>
       <br/>
       <div style="margin-left: 30px;">
    1月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 2月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;3月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    4月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 5月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;6月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    7月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 8月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;9月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    10月: &nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 11月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;12月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
        </div>
</Modal>
     <Modal footer-hide v-model="yearKlFlag" height="20%" width="48%" >&nbsp;&nbsp;&nbsp;&nbsp;连续十二个月店内客流
       <br/>
       <br/>
       <div style="margin-left: 30px;">
    1月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 2月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;3月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    4月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 5月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;6月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    7月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 8月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;9月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    10月: &nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 11月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;12月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
        </div>
</Modal>
     <Modal footer-hide v-model="yearYjFlag" height="20%" width="48%" >&nbsp;&nbsp;&nbsp;&nbsp;连续十二个月店内产品业绩
       <br/>
       <br/>
       <div style="margin-left: 30px;">
    1月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 2月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;3月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    4月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 5月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;6月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    7月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 8月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;9月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    10月: &nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 11月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;12月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
        </div>
</Modal>
     <Modal footer-hide v-model="yearYgxsFlag" height="20%" width="48%" class-name="my-modal" >员工12个月薪资
       <br/>
       <br/>
       <div style="margin-left: 30px;">
    1月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 2月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;3月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    4月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 5月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;6月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    7月: &nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 8月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;9月:&nbsp;&nbsp; <Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
    10月: &nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;&nbsp; 11月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
    &nbsp;&nbsp;&nbsp;12月:&nbsp;<Input v-model="question.numberOfTransactions" style="width: 128px" disabled/>
       <br/>
       <br/>
        </div>
  </Modal>
  </div>
</template>

<script type="text/ecmascript-6">
  import { findStoreList,findStoreListById, newStore, editStore,deleteStore,getProvinces,getCities,checkStorePhone } from '../../interface';

  export default {
    name: 's_index',
    data () {
      return {
        mdstaus: 1,
        storeFlag: false,
        questionFlag: false,
        isRoomShow: true,
        isYearShow: false,
        isBrandShow: false,
        isSalaryShow: false,
        isProjectShow: false,
        isCustomerShow: false,
        isProblemShow: false,
        isRoomActive: true ,
        isYearActive: false ,
        isBrandActive: false ,
        isSalaryActive: false ,
        isProjectActive: false ,
        isCustomerActive: false ,
        isProblemActive: false ,
        yearLsFlag: false,
        yearScFlag: false,
        yearKlFlag: false,
        yearYjFlag: false,
        yearYgxsFlag: false,
        store: '新建门店',
        serch: '',
        searchActive: false,
        storeVal: {
          id: '',
          storeName: '',
          telephone: '',
          staffName: '',
          phoneNumber: '',
          operationMode: '',
          storeType: '',
          managementCycle: '',
          address: '',
          storeStatus: '',
          provinceName:'',
          cityName:'',
          area:'',
        },
        question: {
          id: '',
          staffName: '',
          phoneNumber: '',
          provinceName: '',
          shopSquare: '',
          annualRent: '',
          severalStores: '',
          numberOfRooms: '',
          numberOfBeds: '',
          numberOfEmployees: '',
          areThereAnySales: '',
          areThereAnyShop: '',
          cashFlow: '',
          practiceInTheShop: '',
          innPassengerFlow: '',
          productPerformance: '',
          directProductBrand: '',
          brandNumber: '',
          typeOfInstrument: '',
          numberOfInstruments: '',
          instrumentBrand: '',
          salarySystem: '',
          employeeSalary: '',
          projectPriceList: '',
          card: '',
          extensionCard: '',
          oneCard1: '',
          extensionMethod: '',
          newCustomers: '',
          numberOfTransactions: '',
          numberOfTransactions1: '',
          numberOfTransactions2: '',
          numberOfCustomers: '',
          theNumberOfRenewals: '',
          theBiggestProblem: '',
        },
        columns1: [
          {
            title: '编号',
            key: 'code'
          },
          {
            title: '门店名称',
            key: 'storeName'
          },
          {
            title: '省',
            key: 'provinceName'
          },
          {
            title: '市',
            key: 'cityName'
          },
          {
            title: '区',
            key: 'area'
          },
          {
            title: '地址',
            key: 'address'
          },
          {
            title: '联系人电话',
            key: 'phoneNumber'
          },
          {
            title: '门店电话',
            key: 'telephone'
          },
          {
            title: '管理周期',
            key: 'managementCycle'
          },
          {
            title: '状态',
            key: 'storeStatus',
            render:(h,params)=>{
              if(params.row.storeStatus=='1'){
                return h('div','正在管理')
              }else if(params.row.storeStatus=='2'){
                return h('div','经营不善')
              }else if(params.row.storeStatus=='3'){
                return h('div','不再管理')
              }
            }
          },
          {
            title: '操作',
            width: 210,
            key: 'action',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      if(sessionStorage.getItem('isSystem')) {
                        this.check(params.row)
                      } else {
                        this.$Message.warning('权限不足');
                      }
                    }
                  }
                }, '店务诊断表'),
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
                      if(sessionStorage.getItem('isSystem')) {
                        this.change(params.row)
                      }else {
                        this.$Message.warning('权限不足');
                      }
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status==3?true:false,
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.manerge(params.row.id, params.row.storeName );
                    }
                  }
                }, '管理'),
              /*  h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    disabled: params.row.status==3?true:false,
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      if(params.row.status ==3 ){
                        this.$Message.error('该门店已经放弃了管理');
                      }
                      this.Delete(params.row.id);
                    }
                  }
                }, '删除'),*/
              ]);
            }
          }
        ],
        data1: [],
        total:'',
        page:1,
        pagesize: 10,
        pages:'',
        provincesData:[],
        citiesData:[],
        successTag:'',
        tag:1,
        tempPhone: '',
        isSystem: sessionStorage.getItem('isSystem'),
        storeId: sessionStorage.getItem('storeId'),
      }
    },
    created() {
      this.getData();
      // this.getProvinces();
    },
    mounted() {
      new PCAS("province","city","area");
    },
    methods: {
      newStoret() {
        if(this.storeVal.staffName ==''|| this.storeVal.phoneNumber ==''|| this.storeVal.storeName ==''|| this.storeVal.address ==''|| this.storeVal.telephone ==''|| this.storeVal.managementCycle ==''|| this.storeVal.storeType ==''|| this.storeVal.operationMode ==''|| this.storeVal.provinceName=='请选择' || this.storeVal.provinceName==''|| this.storeVal.cityName=='' || this.storeVal.area==''){
          this.$Message.warning('请填写完整信息');
          return false;
        }
        let URL;
        if(this.store == '编辑门店') {
          URL = editStore();
          if(this.tempPhone != this.storeVal.phoneNumber){
            this.$ajax({
              method:'GET',
              url:checkStorePhone()+'?phoneNumber='+this.storeVal.phoneNumber + '&provinceName='+this.provinceName+'&cityName=' + this.cityName + '&area=' +this.area + '&address=' + this.address
            }).then( (res)=>{
              if(res.data.success){
                this.$Message.error('联系人电话已被注册！');
                return false;
              } else {
                this.$ajax({
                  method: 'POST',
                  dataType: 'JSON',
                  contentType: 'application/json;charset=UTF-8',
                  headers: {
                    "authToken": sessionStorage.getItem('authToken')
                  },
                  data: this.storeVal,
                  url: URL,
                }).then((res) => {
                  this.$Message.success('操作成功');
                  this.getData();
                  this.storeFlag = false;
                }).catch((error) => {
                });
              }
            }).catch((error) => {
            });
          } else {
            this.$ajax({
              method: 'POST',
              dataType: 'JSON',
              contentType: 'application/json;charset=UTF-8',
              headers: {
                "authToken": sessionStorage.getItem('authToken')
              },
              data: this.storeVal,
              url: URL,
            }).then((res) => {
              this.$Message.success('操作成功');
              this.getData();
              this.storeFlag = false;
            }).catch((error) => {
            });
          }
        }else{
          URL = newStore();
          this.$ajax({
            method:'GET',
            url:checkStorePhone()+'?phoneNumber='+this.storeVal.phoneNumber + '&provinceName='+this.storeVal.provinceName+'&cityName=' + this.storeVal.cityName + '&area=' +this.storeVal.area + '&address=' + this.storeVal.address
          }).then( (res)=>{
            if(res.data.success){
              this.$Message.error(res.data.message);
              return false;
            } else {
              this.$ajax({
                method: 'POST',
                dataType: 'JSON',
                contentType: 'application/json;charset=UTF-8',
                headers: {
                  "authToken": sessionStorage.getItem('authToken')
                },
                data: this.storeVal,
                url: URL,
              }).then((res) => {
                this.$Message.success('操作成功');
                this.getData();
                this.storeFlag = false;
              }).catch((error) => {
              });
            }
          }).catch( (err)=>{
          })
        }
      },
      getData(){
        this.tag = 1;
        if(this.isSystem == 'true'){
          this.getList('',this.page,this.pagesize);
        }else{
          this.getList(this.storeId,this.page,this.pagesize);
        }
      },
      getList(name,page,pagesize) {
        if(name==''||name==null){
          var URL = findStoreList()+'?page='+page+'&pageSize='+pagesize;
        }else{
          URL = findStoreList()+'?id='+name+'&page='+page+'&pageSize='+pagesize;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:URL,
        }).then((res) => {
          this.data1 = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getSearch(name,page,pagesize) {
        this.tag = 2;
        if(name==''||name==null){
          var URL = findStoreList()+'?page='+page+'&pageSize='+pagesize;
        }else{
          URL = findStoreList()+'?name='+name+'&page='+page+'&pageSize='+pagesize;
        }
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url:URL,
        }).then((res) => {
          this.data1 = res.data.results;
          this.pages = res.data.pages;
        }).catch((error) => {
        });
      },
      getPage(current){
        this.page = current;
        if(this.tag == 1){
          this.getData();
        }else if(this.tag == 2){
          this.getSearch(this.serch,this.page,this.pagesize);
        }

      },
      getProvinces(){
        this.$ajax({
          method: 'GET',
          url: getProvinces()
        }).then( (res) =>{
          this.provincesData = res.data;
        })
      },
      getCities(id){
        this.$ajax({
          method: 'GET',
          url: getCities()+id,
        }).then( (res) =>{
          this.citiesData = res.data;
        })
      },
      rowClassName (row, index) {
        if (row.storeStatus == '1') {
          return 'jyinfo';
        } else if (row.storeStatus == '2') {
          return 'jydanger';
        } else if (row.storeStatus == '3') {
          return 'jydis';
        }
        return '';
      },
      serc() {
        if(this.serch == '') {
          this.$Message.warning('请输入查询内容');
        }else{
          this.searchActive = true;
          this.getSearch(this.serch,this.page,this.pagesize);
        }
      },
      Return(){
        this.searchActive = false;
        this.serch = '';
        this.getData();
      },
      goRoom(){
        this.isRoomShow = true;
        this.isYearShow =  false;
        this.isBrandShow=  false;
        this.isSalaryShow=  false;
        this.isProjectShow=  false;
        this.isCustomerShow=  false;
        this.isProblemShow= false;
        this.isRoomActive = true;
        this.isYearActive = false;
        this.isBrandActive = false;
        this.isSalaryActive = false;
        this.isProjectActive = false;
        this.isCustomerActive = false;
        this.isProblemActive = false;
     },
      goYear(){
        this.isRoomShow = false;
        this.isYearShow =  true;
        this.isBrandShow=  false;
        this.isSalaryShow=  false;
        this.isProjectShow=  false;
        this.isCustomerShow=  false;
        this.isProblemShow= false;
        this.isRoomActive = false;
        this.isYearActive = true;
        this.isBrandActive = false;
        this.isSalaryActive = false;
        this.isProjectActive = false;
        this.isCustomerActive = false;
        this.isProblemActive = false;
     },
      goBrand(){
        this.isRoomShow = false;
        this.isYearShow =  false;
        this.isBrandShow=  true;
        this.isSalaryShow=  false;
        this.isProjectShow=  false;
        this.isCustomerShow=  false;
        this.isProblemShow= false;
        this.isRoomActive = false;
        this.isYearActive = false;
        this.isBrandActive = true;
        this.isSalaryActive = false;
        this.isProjectActive = false;
        this.isCustomerActive = false;
        this.isProblemActive = false;
     },
      goSalary(){
        this.isRoomShow = false;
        this.isYearShow =  false;
        this.isBrandShow=  false;
        this.isSalaryShow=  true;
        this.isProjectShow=  false;
        this.isCustomerShow=  false;
        this.isProblemShow= false;
        this.isRoomActive = false;
        this.isYearActive = false;
        this.isBrandActive = false;
        this.isSalaryActive = true;
        this.isProjectActive = false;
        this.isCustomerActive = false;
        this.isProblemActive = false;
     },
      goProject(){
        this.isRoomShow = false;
        this.isYearShow =  false;
        this.isBrandShow=  false;
        this.isSalaryShow=  false;
        this.isProjectShow=  true;
        this.isCustomerShow=  false;
        this.isProblemShow= false;
        this.isRoomActive = false;
        this.isYearActive = false;
        this.isBrandActive = false;
        this.isSalaryActive = false;
        this.isProjectActive = true;
        this.isCustomerActive = false;
        this.isProblemActive = false;
     },
      goCustomer(){
        //this.question.numberOfTransactions = '50';
        this.isRoomShow = false;
        this.isYearShow =  false;
        this.isBrandShow=  false;
        this.isSalaryShow=  false;
        this.isProjectShow=  false;
        this.isCustomerShow=  true;
        this.isProblemShow= false;
        this.isRoomActive = false;
        this.isYearActive = false;
        this.isBrandActive = false;
        this.isSalaryActive = false;
        this.isProjectActive = false;
        this.isCustomerActive = true;
        this.isProblemActive = false;
     },
      goProblem(){
        this.isRoomShow = false;
        this.isYearShow =  false;
        this.isBrandShow=  false;
        this.isSalaryShow=  false;
        this.isProjectShow=  false;
        this.isCustomerShow=  false;
        this.isProblemShow= true;
        this.isRoomActive = false;
        this.isYearActive = false;
        this.isBrandActive = false;
        this.isSalaryActive = false;
        this.isProjectActive = false;
        this.isCustomerActive = false;
        this.isProblemActive = true;
     },
      showYgxs(){
        this.yearYgxsFlag = true;
     },
      showLs(){
        this.yearLsFlag = true;
     },
      showSc(){
        this.yearScFlag = true;
     },
      showKl(){
        this.yearKlFlag = true;
     },
      showYj(){
        this.yearYjFlag = true;
     },
      newEm() {
        this.storeFlag = true;
        this.store = '新建门店';
        this.clearNew();
      },
      ok() {
        this.$ajax({
          method: 'POST',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          data: this.question,
          url: editStore(),
        }).then((res) => {
          this.$Message.success('操作成功');
          this.searchActive = false;
          this.questionFlag = false;
          this.serch = '';
          this.getData();
        }).catch((error) => {
        });
      },
      change(data) {
        this.storeFlag = true;
        this.store = '编辑门店';
        this.tempPhone = data.phoneNumber;
        this.storeVal = JSON.parse(JSON.stringify(data));
        PCAS("province","city","area", data.provinceName,data.cityName,data.area);
      },
      manerge(id, storeName) {
        this.$router.push({path:'s_datile/'+id+'/c_index', query:{storeName: storeName}});
      },
      Delete(id){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },

          url: deleteStore()+'?id='+id,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.searchActive = false;
          this.serch = '';
          this.getData();
        }).catch((error) => {
        });
      },
      check(data) {
        this.questionFlag = true;
        this.question = JSON.parse(JSON.stringify(data));
      },
      clearNew() {
        this.storeVal = {
          id: '',
            storeName: '',
            telephone: '',
            staffName: '',
            phoneNumber: '',
            operationMode: '',
            storeType: '',
            managementCycle: '',
            address: '',
            storeStatus: '',
        };
      },
      check1(value){
        return value.replace(/[^\d]/g,'');
      },
      check2(value){
        return value.replace(/[^\d\.]/g,'');
      },
    },
  };
</script>

<style scoped>
  .serc{
    cursor: pointer;
  }
  .page{
    height: 50px;
    margin-top:20px;
    padding-right: 20px;
    background: #fff;
  }
  .sus{
    width: 92px;
    height: 28px;
    border-radius: 4px;
    border-color: #ccc;
  }
 .active{
    background: #DDDDFF;
 }
.my-modal{z-index:1002;}
.ivu-modal{margin-top: -20px;}
table th{width:20%}
.crack-button{width:auto; display:inline-block !important; display:inline; height:22px;background: #CCE8EB;margin-left:20px;border:1px solid;
border-radius:5px;padding-top: 2px;padding-left: 4px;padding-right: 4px;padding-right: 2px;cursor: not-allowed;}
.clearfloat{clear:both;height:0;font-size: 1px;line-height: 0px;} 
.ivu-modal-confirm-footer {
    display: none;
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
</style>
