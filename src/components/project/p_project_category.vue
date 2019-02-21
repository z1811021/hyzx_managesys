<template>
  <div>
    <h2 style="padding: .6rem;">项目类别列表</h2>
      <Row :gutter="24" class="option">
        <Col span="2">
          <Button class="hy_btn" @click="add">添加项目类别</Button>
        </Col>
      </Row>
      <div style="height:auto;display:inline-block;margin-top:10px;">
        <div style="float:left;margin-left:20px;">
          <h3 style="margin-left:10px;">面部项目类别列表：</h3>
          <Table :columns="faceColumns" :data="faceData" size="small" width="440" style="margin-top:10px;"></Table>
        </div>
        <div style="float:right;margin-left:50px;">
          <h3 style="margin-left:10px;">身体项目类别列表：</h3>
          <Table :columns="bodyColumns" :data="bodyData" size="small" width="440" style="margin-top:10px;"></Table>
        </div>
      </div>
      <Modal v-model="categoryFlag" :mask-closable="false" :title="category">
        <br/>
        <RadioGroup v-model="vertical" vertical style="margin-left:15%;">
            <Radio label="1">
                <Icon type="ios-person"></Icon>
                <span>面部类别：</span>
                <Input v-model="faceTitle" :disabled="!(vertical == '1')" style="margin-left:5%;width:160px;" @on-keydown.enter="submitFace" ref="content"></Input>
                <Button v-if="vertical == '1'" type="primary" style="margin-left:10px;" @click="submitFace">添加</Button>
            </Radio>
            <br/>
            <Radio label="2">
                <Icon type="ios-body"></Icon>
                <span>身体类别：</span>
                <Input v-model="bodyTitle" :disabled="!(vertical == '2')" style="margin-left:5%;width:160px;" @on-keydown.enter="submitBody"></Input>
                <Button v-if="vertical == '2'" type="primary" style="margin-left:10px;" @click="submitBody">添加</Button>
            </Radio>
        </RadioGroup>
        <br/>
        <br/>
        <div style="height:auto;display:inline-block;margin-top:10px;">
          <div style="float:left;margin-left:100px;">
            <Tree v-if="faceCategories[0].children.length>0" :data="faceCategories" title="面部类别"></Tree>
          </div>
          <div style="float:right;margin-right:-200px;">
            <Tree v-if="bodyCategories[0].children.length>0" :data="bodyCategories" title="身体类别"></Tree>
          </div>
        </div>
        <div slot="footer">
          <Button type="primary" @click="ok">添加</Button>
          <Button type="ghost" @click="close">取消</Button>
        </div>
      </Modal>
      <Modal class="modalProjects" v-model="manFaceFlag" :mask-closable="false" title="修改面部项目类别">
        <Input v-model="modifyFace"  style="width: 300px"></Input>
        <div slot="footer">
          <Button type="primary" @click="faceManOk">修改</Button>
          <Button type="ghost" @click="faceManClose">取消</Button>
        </div>
      </Modal>
      <Modal class="modalProjects" v-model="manBodyFlag" :mask-closable="false" title="修改身体项目类别">
        <Input v-model="modifyBody" style="width: 300px"></Input>
        <div slot="footer">
          <Button type="primary" @click="bodyManOk">修改</Button>
          <Button type="ghost" @click="bodyManClose">取消</Button>
        </div>
      </Modal>
  </div>
</template>
<script type="text/ecmascript-6">
  import {saveProjectCategory,getProjectCategory,deleteProjectCategory,editProjectCategory} from '../../interface';

  export default {
    name: 'p_project_category',
    created() {
      this.getFaceCategory();
      this.getBodyCategory();
    },
    data(){
      return {
        categoryFlag:false,
        focusFace: false,
        focusBody: false,
        manFaceFlag: false,
        manBodyFlag: false,
        modifyFace: '',
        modifyBody: '',
        modifyFaceId: '',
        modifyBodyId: '',
        face: [],
        body: [],
        faceData: [],
        bodyData: [],
        faceTitle: '',
        bodyTitle: '',
        category: "添加项目类别",
        vertical: "",
        faceCategories: [
          {
            title: '面部类别',
            expand: true,
            children: []
          }
        ],
        bodyCategories: [
        {
            title: '身体类别',
            expand: true,
            children: []
          }
        ],
        data:[],
        faceColumns: [
            {
              title: '项目类别名称',
              key: 'typeName',
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
                        this.manFace(params.row)
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
                        this.delFace(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
          bodyColumns: [
            {
              title: '项目类别名称',
              key: 'typeName',
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
                        this.manBody(params.row)
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
                        this.delBody(params.row)
                      }
                    }
                  }, '删除'),
                ]);
              }
            }
          ],
      }
    },
    methods: {
      getFaceCategory(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: getProjectCategory() + '/'+this.$route.params.id+'?itemType=1',
        }).then((res) => {
          this.faceData = res.data.itemTypeManageInfo;
        }).catch((error) => {
        });
      },
      getBodyCategory(){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: getProjectCategory() + '/'+this.$route.params.id+'?itemType=2',
        }).then((res) => {
          this.bodyData = res.data.itemTypeManageInfo;
        }).catch((error) => {
        });
      },
      faceManClose(){
        this.manFaceFlag = false;
        this.modifyFaceId = '';
      },
      bodyManClose(){
        this.manBodyFlag = false;
        this.modifyBodyId = '';
      },
      manFace(row){
        this.manFaceFlag = true;
        this.modifyFace = row.typeName;
        this.modifyFaceId = row.id;
      },
      manBody(row){
        this.manBodyFlag = true;
        this.modifyBody = row.typeName;
        this.modifyBodyId = row.id;
      },
      faceManOk(){
        var itemTypeManage = {
              // 记录的id
              id: this.modifyFaceId,
              // 门店 id              
              storeId:this.$route.params.id,
              // 项目管理类别类型，1 面部， 2 身体
              itemType:"1",
              // 项目管理类别名称
              typeName: this.modifyFace
        };
        let URL = editProjectCategory();
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: itemTypeManage,
            url: URL,
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getFaceCategory();
            this.getBodyCategory();
            this.manFaceFlag = false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
      },
      bodyManOk(){
        var itemTypeManage = {
              // 记录的id
              id: this.modifyBodyId,
              // 门店 id              
              storeId:this.$route.params.id,
              // 项目管理类别类型，1 面部， 2 身体
              itemType:"2",
              // 项目管理类别名称
              typeName: this.modifyBody
        };
        let URL = editProjectCategory();
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: itemTypeManage,
            url: URL,
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getFaceCategory();
            this.getBodyCategory();
            this.manBodyFlag = false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
      },
      delFace(row){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deleteProjectCategory()+'/'+this.$route.params.id+"?itemType=1&typeName="+row.typeName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getFaceCategory();
          this.getBodyCategory();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      delBody(row){
        this.$ajax({
          method: 'GET',
          dataType: 'JSON',
          contentType: 'application/json;charset=UTF-8',
          headers: {
            "authToken": sessionStorage.getItem('authToken')
          },
          url: deleteProjectCategory()+'/'+this.$route.params.id+"?itemType=2&typeName="+row.typeName,
        }).then((res) => {
          this.$Message.success('操作成功');
          this.getFaceCategory();
          this.getBodyCategory();
        }).catch((error) => {
          this.$Message.error('操作失败');
        })
      },
      ok(){
        var itemTypeManages = [];
        for (var i = 0; i < this.faceCategories[0].children.length; i++) {
          var curItemType = {
              // 门店 id              
              storeId:this.$route.params.id,
              // 项目管理类别类型，1 面部， 2 身体
              itemType:"1",
              // 项目管理类别名称
              typeName:this.faceCategories[0].children[i].title
          }
          itemTypeManages.push(curItemType);
        }
        for (var j = 0; j < this.bodyCategories[0].children.length; j++) {
          var curItemType = {
              // 门店 id              
              storeId:this.$route.params.id,
              // 项目管理类别类型，1 面部， 2 身体
              itemType:"2",
              // 项目管理类别名称
              typeName:this.bodyCategories[0].children[j].title
          }
          itemTypeManages.push(curItemType);
        }
        let URL = saveProjectCategory();
          this.$ajax({
            method: 'POST',
            dataType: 'JSON',
            contentType: 'application/json;charset=UTF-8',
            headers: {
              "authToken": sessionStorage.getItem('authToken')
            },
            data: itemTypeManages,
            url: URL,
          }).then((res) => {
            this.$Message.success('操作成功');
            this.getFaceCategory();
            this.getBodyCategory();
            this.categoryFlag=false;
          }).catch((error) => {
            this.$Message.error('操作失败');
          });
      },
      add(){
        this.categoryFlag = true;
        this.vertical = '';
        this.faceCategories[0].children = [];
        this.bodyCategories[0].children = [];
        for (var i = 0; i < this.faceData.length; i++) {
          var currentFace = {
            title: this.faceData[i].typeName
          };
          this.faceCategories[0].children.push(currentFace);
        }
        for (var j = 0; j < this.bodyData.length; j++) {
          var currentBody = {
            title: this.bodyData[j].typeName
          };
          this.bodyCategories[0].children.push(currentBody);
        }
      },
      close(){
        this.categoryFlag = false;
      },
      submitFace(){
        var currentFace = {
          title: this.faceTitle
        };
        var validateMessage = '';
        for (var i = 0; i < this.faceCategories[0].children.length; i++) {
          if(this.faceCategories[0].children[i].title == this.faceTitle){
            validateMessage = validateMessage + "该项目类型已存在！<br/>";
          }
        }
        if(validateMessage != ''){
          this.$Message.warning(validateMessage);
          validateMessage = '';
        }else{
          this.faceCategories[0].children.push(currentFace);
          this.faceTitle = '';
        }
      },
      submitBody(){
        var currentBody = {
          title: this.bodyTitle
        };
        var validateMessage = '';
        for (var i = 0; i < this.bodyCategories[0].children.length; i++) {
          if(this.bodyCategories[0].children[i].title == this.bodyTitle){
            validateMessage = validateMessage + "该项目类型已存在！<br/>";
          }
        }
        if(validateMessage != ''){
          this.$Message.warning(validateMessage);
          validateMessage = '';
        }else{
          this.bodyCategories[0].children.push(currentBody);
          this.bodyTitle = '';
        }
      },
    }
  };
</script>

<style scoped>
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
  .leftRadio{
    float:left;
    margin-left:80px;
  }
  .modalProjects {
    margin: 0 auto;            
    text-align: center;    
  }
</style>
