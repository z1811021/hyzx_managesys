
/*export const verifyCode  = function () {
  const URL = '/verification/code/';
  const API = host + URL;
  return API;
};*//**
 * Created by Benson on 2017/12/27.
 */
const host = 'http://116.62.201.135:8080';
//const host = 'http://9.112.49.16:8080';
//const host = 'http://localhost:8080';

//门店列表
export const findStoreList = function () {
  const URL = '/store/page/';
  const API = host + URL;
  return API;
};
export const findStoreListById = function () {
  const URL = '/app/api/store/findStoreById';
  const API = host + URL;
  return API;
};
export const newStore = function () {
  const URL = '/app/api/store/save';
  const API = host + URL;
  return API;
};
export const editStore = function () {
  const URL = '/app/api/store/edit';
  const API = host + URL;
  return API;
};
export const deleteStore = function () {
  const URL = '/app/api/store/delete';
  const API = host + URL;
  return API;
};
export const extendBrandInfo = function () {
  const URL = '/store/extendBrandInfo';
  const API = host + URL;
  return API;
};
export const extendRoom = function () {
  const URL = '/store/extendRoom';
  const API = host + URL;
  return API;
};

export const extendItemInfo = function () {
  const URL = '/store/extendItemInfo';
  const API = host + URL;
  return API;
};
export const extendClientInfo = function () {
  const URL = '/store/extendClientInfo';
  const API = host + URL;
  return API;
};
export const extendWaterInfo = function () {
  const URL = '/store/extendWaterInfo';
  const API = host + URL;
  return API;
};
export const userLogin = function () {
  const URL = '/customer/login';
  const API = host + URL;
  return API;
};
export const customer = function () {
  const URL = '/store/customer/';
  const API = host + URL;
  return API;
};
export const infos = function () {
  const URL = '/store/infos/';
  const API = host + URL;
  return API;
};
export const infoUpdate = function () {
  const URL = '/store/update/';
  const API = host + URL;
  return API;
};
export const userRegister = function () {
  const URL = '/store/register';
  const API = host + URL;
  return API;
};
export const findAuditOfFailure = function () {
  const URL = '/app/api/store/findAuditOfFailure';
  const API = host + URL;
  return API;
};
export const findStoreRegister = function () {
  const URL = '/app/api/store/findStoreRegister';
  const API = host + URL;
  return API;
};
export const auditStoreCustomer = function () {
  const URL = '/app/api/store/auditStoreCustomer';
  const API = host + URL;
  return API;
};
export const audit = function () {
  const URL = '/store/audit';
  const API = host + URL;
  return API;
};
export const checkRegisterStatus = function () {
  const URL = '/store/register/status/';
  const API = host + URL;
  return API;
};
export const extendSalaryInfo = function () {
  const URL = '/store/extendSalaryInfo';
  const API = host + URL;
  return API;
};
export const extendProblemInfo = function () {
  const URL = '/store/extendProblemInfo';
  const API = host + URL;
  return API;
};
export const review = function () {
  const URL = '/store/review';
  const API = host + URL;
  return API;
};
export const getProvinces  = function () {
  const URL = '/province/provinces';
  const API = host + URL;
  return API;
};
export const getCities  = function () {
  const URL = '/city/provinceId/';
  const API = host + URL;
  return API;
};
export const verifyCode  = function () {
  const URL = '/verification/code/';
  const API = host + URL;
  return API;
};
export const changePassword  = function () {
  const URL = '/customer/update/password';
  const API = host + URL;
  return API;
};
export const getRoomInfo  = function () {
  const URL = '/store/getRoomInfo/';
  const API = host + URL;
  return API;
};
export const findStoreByPhone  = function () {
  const URL = '/app/api/store/findStoreByPhone';
  const API = host + URL;
  return API;
};
export const checkStorePhone  = function () {
  const URL = '/customer/account/';
  const API = host + URL;
  return API;
};
export const checkStoreUserName  = function () {
  const URL = '/customer/userName/';
  const API = host + URL;
  return API;
};
export const validatePhone  = function () {
  const URL = '/verification/valid';
  const API = host + URL;
  return API;
};
export const editPassword  = function () {
  const URL = '/app/api/user/editPassword';
  const API = host + URL;
  return API;
};
export const getVerification  = function () {
  const URL = '/app/api/store/getVerification';
  const API = host + URL;
  return API;
};
export const updataByPhone  = function () {
  const URL = '/app/api/store/updataByPhone';
  const API = host + URL;
  return API;
};
export const logout  = function () {
  const URL = '/app/api/user/logout';
  const API = host + URL;
  return API;
};
//项目管理
export const projectsave = function () {
  const URL = '/item/manage/add';
  const API = host + URL;
  return API;
};
export const projectedit = function () {
  const URL = '/app/api/project/edit';
  const API = host + URL;
  return API;
};
export const projectdelete = function () {
  const URL = '/item/manage/delete';
  const API = host + URL;
  return API;
};
export const findProjectList = function () {
  const URL = '/item/manage/store';
  const API = host + URL;
  return API;
};
//方案管理
export const projectPlansave = function () {
  const URL = '/program/manage/add';
  const API = host + URL;
  return API;
};
export const findProjectPlanList = function () {
  const URL = '/program/manage/store';
  const API = host + URL;
  return API;
};
export const projectPlandelete = function () {
  const URL = '/program/manage/delete';
  const API = host + URL;
  return API;
};
//查找症状
export const findproblemList = function () {
  const URL = '/symptom/manage/store';
  const API = host + URL;
  return API;
};
export const saveproblem = function () {
  const URL = '/symptom/manage/add';
  const API = host + URL;
  return API;
};
export const deleteproblem = function () {
  const URL = '/symptom/manage/delete';
  const API = host + URL;
  return API;
};
export const saveSolution = function () {
  const URL = '/solution/manage/add';
  const API = host + URL;
  return API;
};
export const findSolutionList = function () {
  const URL = '/solution/manage/store';
  const API = host + URL;
  return API;
};
export const deleteSolution = function () {
  const URL = '/solution/manage/delete';
  const API = host + URL;
  return API;
};
//员工管理
export const findPostList = function () {
  const URL = '/member/manage/store';
  const API = host + URL;
  return API;
};
export const findPostsave = function () {
  const URL = '/member/manage/add';
  const API = host + URL;
  return API;
};
export const findPostedit = function () {
  const URL = '/app/api/post/edit';
  const API = host + URL;
  return API;
};
export const deletePost = function () {
  const URL = '/member/manage/delete';
  const API = host + URL;
  return API;
};
//客户管理
export const findStoreById = function () {
  const URL = '/client/manage/store';
  const API = host + URL;
  return API;
};
export const editStoreCustomer = function () {
  const URL = '/client/manage/add';
  const API = host + URL;
  return API;
};

//报表
//获取顾问月报
export const findConsultantMonthlyReport = function () {
  const URL = '/app/api/report/findConsultantMonthlyReport';
  const API = host + URL;
  return API;
};
//保存顾问月报
export const saveOrUpateConsultantMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateConsultantMonthlyReport';
  const API = host + URL;
  return API;
};
//获取美容师月报
export const findBeauticianMonthlyReport = function () {
  const URL = '/app/api/report/findBeauticianMonthlyReport';
  const API = host + URL;
  return API;
};
//保存美容师月报
export const saveOrUpateBeauticianMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateBeauticianMonthlyReport';
  const API = host + URL;
  return API;
};

//获取美发技师报表
export const findHairTechnicianMonthlyReport = function () {
  const URL = '/app/api/report/findHairTechnicianMonthlyReport';
  const API = host + URL;
  return API;
};
//保存美发技师报表
export const saveOrUpateHairTechnicianMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateHairTechnicianMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店长月报
export const findManagerOfTheMonthlyReport = function () {
  const URL = '/app/api/report/findManagerOfTheMonthlyReport';
  const API = host + URL;
  return API;
};

//保存店长月报
export const saveOrUpateManagerOfTheMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateManagerOfTheMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店月报
export const findShopMonthlyReport = function () {
  const URL = '/app/api/report/findShopMonthlyReport';
  const API = host + URL;
  return API;
};
//保存店月报
export const saveOrUpateShopMonthlyReport = function () {
  const URL = '/app/api/report/saveOrUpateShopMonthlyReport';
  const API = host + URL;
  return API;
};
//获取店日报
export const findDailyStoreDesign = function () {
  const URL = '/app/api/report/findDailyStoreDesign';
  const API = host + URL;
  return API;
};
//保存店日报
export const saveOrUpateDailyStoreDesign = function () {
  const URL = '/app/api/report/saveOrUpateDailyStoreDesign';
  const API = host + URL;
  return API;
};
//获取详细店日报
export const findShopDailyDetails = function () {
  const URL = '/app/api/report/findShopDailyDetails';
  const API = host + URL;
  return API;
};
//保存详细店日报
export const saveOrUpateShopDailyDetails = function () {
  const URL = '/app/api/report/saveOrUpateShopDailyDetails';
  const API = host + URL;
  return API;
};

//薪资管理

//保存薪资启用与部分数据
export const editSalarySystem = function () {
  const URL = '/salary/manage/add';
  const API = host + URL;
  return API;
};
//查询薪资（实操提成，业绩提成，奖金，）
export const findSalaryByStore = function () {
  const URL = '/salary/manage/store';
  const API = host + URL;
  return API;
};
//查询底薪
export const findByStore = function () {
  const URL = '/specific/rules/store';
  const API = host + URL;
  return API;
};

//保存底薪
export const saveBaseSalary = function () {
  const URL = '/specific/rules/add';
  const API = host + URL;
  return API;
};

//编辑底薪
export const editBaseSalary = function () {
  const URL = '/specific/rules/store';
  const API = host + URL;
  return API;
};

//删除底薪
export const deleteBaseSalary = function () {
  const URL = '/specific/rules/delete';
  const API = host + URL;
  return API;
};

//获取实操提成
export const getPracticalExercise = function () {
  const URL = '/practical/commission/store';
  const API = host + URL;
  return API;
};

//保存实操提成
export const editPracticalExercise = function () {
  const URL = '/practical/commission/add';
  const API = host + URL;
  return API;
};
//删除实操提成
export const deletePracticalExercise = function () {
  const URL = '/practical/commission/delete';
  const API = host + URL;
  return API;
};
//修改实操启用状态
export const editPracticalExerciseStatus = function () {
  const URL = '/practical/commission/edit';
  const API = host + URL;
  return API;
};
//保存手工费提成
export const saveManualFee = function () {
  const URL = '/manual/fee/add';
  const API = host + URL;
  return API;
};
//修改手工费提成
export const editManualFee = function () {
  const URL = '/manual/fee/edit';
  const API = host + URL;
  return API;
};
//删除手工费提成
export const deleteManualFee = function () {
  const URL = '/manual/fee/delete';
  const API = host + URL;
  return API;
};
//获取手工费提成
export const getManualFee = function () {
  const URL = '/manual/fee/store';
  const API = host + URL;
  return API;
};
//保存绩效提成
export const savePerformance = function () {
  const URL = '/performance/add';
  const API = host + URL;
  return API;
};
//修改绩效提成
export const editPerformance = function () {
  const URL = '/performance/edit';
  const API = host + URL;
  return API;
};
//删除绩效提成
export const deletePerformance = function () {
  const URL = '/performance/delete';
  const API = host + URL;
  return API;
};
//获取绩效提成
export const getPerformance = function () {
  const URL = '/performance/store';
  const API = host + URL;
  return API;
};
//获取业绩提成
export const getPerformanceDrawing = function () {
  const URL = '/performance/commission/store';
  const API = host + URL;
  return API;
};
//保存业绩提成
export const editPerformanceDrawing = function () {
  const URL = '/performance/commission/add';
  const API = host + URL;
  return API;
};
//删除业绩提成
export const deletePerformanceDrawing = function () {
  const URL = '/performance/commission/delete';
  const API = host + URL;
  return API;
};
//修改业绩启用状态
export const editPerformanceDrawingStatus = function () {
  const URL = '/performance/commission/edit';
  const API = host + URL;
  return API;
};

//保存迟到早退罚金
export const editLeaveEarlyFines = function () {
  const URL = '/app/api/salary/editLeaveEarlyFines';
  const API = host + URL;
  return API;
};
//删除迟到早退罚金
export const deleteLeaveEarlyFines = function () {
  const URL = '/app/api/salary/deleteLeaveEarlyFines';
  const API = host + URL;
  return API;
};
//保存事假罚金
export const editLeaveAfine = function () {
  const URL = '/app/api/salary/editLeaveAfine';
  const API = host + URL;
  return API;
};
//删除事假罚金
export const deleteLeaveAfine = function () {
  const URL = '/app/api/salary/deleteLeaveAfine';
  const API = host + URL;
  return API;
};
//保存现金业绩罚金
export const editCashPerformancePpenalty = function () {
  const URL = '/app/api/salary/editCashPerformancePpenalty';
  const API = host + URL;
  return API;
};
//删除现金业绩罚金
export const deleteCashPerformancePpenalty = function () {
  const URL = '/app/api/salary/deleteCashPerformancePpenalty';
  const API = host + URL;
  return API;
};
//保存客流罚金
export const editPassengerFines = function () {
  const URL = '/app/api/salary/editPassengerFines';
  const API = host + URL;
  return API;
};
//删除客流罚金
export const deletePassengerFines = function () {
  const URL = '/app/api/salary/deletePassengerFines';
  const API = host + URL;
  return API;
};
//保存消耗罚金
export const editConsumptionPenalty = function () {
  const URL = '/app/api/salary/editConsumptionPenalty';
  const API = host + URL;
  return API;
};
//删除消耗罚金
export const deleteConsumptionPenalty = function () {
  const URL = '/app/api/salary/deleteConsumptionPenalty';
  const API = host + URL;
  return API;
};

//保存客流奖金
export const savecomplaint = function () {
  const URL = '/reward/manage/passger/add';
  const API = host + URL;
  return API;
};
//查询客流奖金
export const getcomplaint = function () {
  const URL = '/reward/manage/passger/store';
  const API = host + URL;
  return API;
};
//删除客流奖金
export const deletecomplaint = function () {
  const URL = '/reward/manage/passger/delete';
  const API = host + URL;
  return API;
};

//保存客流区间奖金
export const saveAccumulativePassengerFlow = function () {
  const URL = '/reward/manage/cumpass/add';
  const API = host + URL;
  return API;
};
//查询客流区间奖金
export const getAccumulativePassengerFlow = function () {
  const URL = '/reward/manage/cumpass/store';
  const API = host + URL;
  return API;
};
//删除客流区间奖金
export const deleteAccumulativePassengerFlow = function () {
  const URL = '/reward/manage/cumpass/delete';
  const API = host + URL;
  return API;
};
//编辑客流区间奖金
export const editAccumulativePassengerFlow = function () {
  const URL = '/reward/manage/cumpass/edit';
  const API = host + URL;
  return API;
};

//删除团队奖金
export const deleteTeamBonus = function () {
  const URL = '/reward/manage/team/delete';
  const API = host + URL;
  return API;
};
//保存团队奖金
export const saveTeamBonus = function () {
  const URL = '/reward/manage/team/add';
  const API = host + URL;
  return API;
};
//查询团队奖金
export const getTeamBonus = function () {
  const URL = '/reward/manage/team/store';
  const API = host + URL;
  return API;
};
//编辑团队奖金
export const editTeamBonus = function () {
  const URL = '/reward/manage/team/edit';
  const API = host + URL;
  return API;
};

//保存活动奖金
export const saveActivityBonus = function () {
  const URL = '/reward/manage/activity/add';
  const API = host + URL;
  return API;
};
//删除活动奖金
export const deleteActivityBonus = function () {
  const URL = '/reward/manage/activity/delete';
  const API = host + URL;
  return API;
};
//查询活动奖金
export const getActivityBonus = function () {
  const URL = '/reward/manage/activity/store';
  const API = host + URL;
  return API;
};
//编辑活动奖金
export const editActivityBonus = function () {
  const URL = '/reward/manage/activity/edit';
  const API = host + URL;
  return API;
};

//保存罚金金额
export const saveforfeitMoney = function () {
  const URL = '/forfeit/manage/conforfeit/add';
  const API = host + URL;
  return API;
};
//查询罚金金额
export const getforfeitMoney = function () {
  const URL = '/forfeit/manage/conforfeit/store';
  const API = host + URL;
  return API;
};
//删除罚金金额
export const deleteforfeitMoney = function () {
  const URL = '/forfeit/manage/conforfeit/delete';
  const API = host + URL;
  return API;
};

//保存迟到罚金金额
export const savelateforfeit = function () {
  const URL = '/forfeit/manage/lateforfeit/add';
  const API = host + URL;
  return API;
};
//查询迟到罚金金额
export const getlateforfeit = function () {
  const URL = '/forfeit/manage/lateforfeit/store';
  const API = host + URL;
  return API;
};
//删除迟到罚金金额
export const deletelateforfeit = function () {
  const URL = '/forfeit/manage/lateforfeit/delete';
  const API = host + URL;
  return API;
};
//编辑迟到罚金金额
export const editlateforfeit = function () {
  const URL = '/forfeit/manage/lateforfeit/edit';
  const API = host + URL;
  return API;
};

//保存表现罚金金额
export const savespecialforfeit = function () {
  const URL = '/forfeit/manage/specialforfeit/add';
  const API = host + URL;
  return API;
};
//查询表现罚金金额
export const getspecialforfeit = function () {
  const URL = '/forfeit/manage/specialforfeit/store';
  const API = host + URL;
  return API;
};
//删除表现罚金金额
export const deletespecialforfeit = function () {
  const URL = '/forfeit/manage/specialforfeit/delete';
  const API = host + URL;
  return API;
};
//编辑表现罚金金额
export const editspecialforfeit = function () {
  const URL = '/forfeit/manage/specialforfeit/edit';
  const API = host + URL;
  return API;
};

//保存月现金总量
export const editMonthlyCashVolume = function () {
  const URL = '/app/api/salary/editMonthlyCashVolume';
  const API = host + URL;
  return API;
};
//删除月现金总量
export const deleteMonthlyCashVolume = function () {
  const URL = '/app/api/salary/deleteMonthlyCashVolume';
  const API = host + URL;
  return API;
};
//保存月客流总量
export const editTotalMonthlyPassengerFlow = function () {
  const URL = '/app/api/salary/editTotalMonthlyPassengerFlow';
  const API = host + URL;
  return API;
};
//删除月客流总量
export const deleteTotalMonthlyPassengerFlow = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyPassengerFlow';
  const API = host + URL;
  return API;
};
//保存月实操总量
export const editTotalMonthlyExercise = function () {
  const URL = '/app/api/salary/editTotalMonthlyExercise';
  const API = host + URL;
  return API;
};
//删除月实操总量
export const deleteTotalMonthlyExercise = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyExercise';
  const API = host + URL;
  return API;
};
//保存月项目总数
export const editTotalMonthlyProject = function () {
  const URL = '/app/api/salary/editTotalMonthlyProject';
  const API = host + URL;
  return API;
};
//删除月项目总数
export const deleteTotalMonthlyProject = function () {
  const URL = '/app/api/salary/deleteTotalMonthlyProject';
  const API = host + URL;
  return API;
};

//卡项管理

//获取会员卡
export const findMembership = function () {
  const URL = '/memCard/manage/store';
  const API = host + URL;
  return API;
};
//保存会员卡
export const saveMembership = function () {
  const URL = '/memCard/manage/add';
  const API = host + URL;
  return API;
};
/*//编辑会员卡
export const editMembership = function () {
  const URL = '/app/api/membership/edit';
  const API = host + URL;
  return API;
};*/
//删除会员卡
export const deleteMembership = function () {
  const URL = '/memCard/manage/delete';
  const API = host + URL;
  return API;
};
//获取拓客卡
export const findExtension = function () {
  const URL = '/extCard/manage/store';
  const API = host + URL;
  return API;
};
//保存拓客卡
export const saveExtension = function () {
  const URL = '/extCard/manage/add';
  const API = host + URL;
  return API;
};
//删除拓客卡
export const deleteExtension = function () {
  const URL = '/extCard/manage/delete';
  const API = host + URL;
  return API;
};
//获取活动卡
export const findactivity = function () {
  const URL = '/actCard/manage/store';
  const API = host + URL;
  return API;
};
//保存活动卡
export const saveactivity = function () {
  const URL = '/actCard/manage/add';
  const API = host + URL;
  return API;
};
//删除活动卡
export const deleteactivity = function () {
  const URL = '/actCard/manage/delete';
  const API = host + URL;
  return API;
};
//获取全部项目
export const findAllProject = function () {
  const URL = '/app/api/project/findAllProject';
  const API = host + URL;
  return API;
};
