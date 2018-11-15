// 导出页面为PDF格式
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
export default{
  install (Vue, options) {
    // 导出pdf方法
    Vue.prototype.getPdf = function () {
      // console.log("1")
      var title = this.htmlTitle
      html2Canvas(document.querySelector('#pdfDom'), {
        allowTaint: true
      }).then(function (canvas) {
        let contentWidth = canvas.width
        let contentHeight = canvas.height
        let pageHeight = contentWidth / 592.28 * 841.89
        let leftHeight = contentHeight
        let position = 0
        let imgWidth = 595.28
        let imgHeight = 592.28 / contentWidth * contentHeight
        let pageData = canvas.toDataURL('image/jpeg', 1.0)
        let PDF = new JsPDF('', 'pt', 'a4')
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 841.89
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      }
      )
    }
    Vue.prototype.storeTypeTransfer = (storeType) => {
        if(storeType ==1){
          return "美容院"
        }
        else if(storeType ==2){
          return "皮肤管理"
        }
        else if(storeType ==3){
          return "SPA会所"
        }
        else if(storeType ==4){
          return "养发"
        }
        else if(storeType ==5){
          return "理疗"
        }
        else if(storeType ==6){
          return "产后修复"
        }
        else if(storeType ==7){
          return "减肥馆"
        }
        else if(storeType ==8){
          return "祛痘馆"
        }
        else if(storeType ==9){
          return "整骨小颜"
        }
        else{
          return "无"
        }
    }
    Vue.prototype.storeTypeTransferBack = (storeType) => {
        if(storeType =="美容院"){
          return '1'
        }
        else if(storeType =="皮肤管理"){
          return '2'
        }
        else if(storeType =="SPA会所"){
          return '3'
        }
        else if(storeType =="养发"){
          return '4'
        }
        else if(storeType =="理疗"){
          return '5'
        }
        else if(storeType =="产后修复"){
          return '6'
        }
        else if(storeType =="减肥馆"){
          return '7'
        }
        else if(storeType =="祛痘馆"){
          return '8'
        }
        else if(storeType =="整骨小颜"){
          return '9'
        }
        else{
          return ""
        }
    }
    Vue.prototype.operationModeTransfer = (operationMode)=>{
      if(operationMode ==1){
        return "单店"
      }else if(operationMode ==2){
        return "连锁"
      }else{
        return "无"
      }
    }
    Vue.prototype.operationModeTransferBack = (operationMode)=>{
      if(operationMode =="单店"){
        return '1'
      }else if(operationMode =="连锁"){
        return '2'
      }else{
        return ""
      }
    }
    Vue.prototype.franchTypeTransfer = (franchType)=>{
      if(franchType ==1){
        return "直营"
      }else if(franchType ==2){
        return "加盟"
      }else if(franchType == 3){
        return "总部"
      }else{
        return "无"
      }
    }
    Vue.prototype.franchTypeTransferBack = (franchType)=>{
      if(franchType =="直营"){
        return '1'
      }else if(franchType =="加盟"){
        return '2'
      }else if(franchType == "总部"){
        return '3'
      }else{
        return ""
      }
    }  
  }
}
