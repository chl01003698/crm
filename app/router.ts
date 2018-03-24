'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;

    router.get('/', controller.home.index);
    router.post('/api/v1/users/test', controller.v1.user.test);

    router.post('/api/v1/users/create', controller.v1.user.create);//创建账号
    router.post('/api/v1/users/signin', controller.v1.user.signin);//登陆
    router.post('/api/v1/users/searchname', controller.v1.user.searchByNameOrId);//按条件搜索用户
    router.post('/api/v1/users/queryuser', controller.v1.user.searchByProvinceOrLevel);//根据省份或等级搜索用户
    router.get('/api/v1/users/:id', controller.v1.user.queryUserById);//根据用户id搜索用户
    router.post('/api/v1/users/mod/:id', controller.v1.user.updateUserById);//修改用户信息
    router.post('/api/v1/users/freeze/:id', controller.v1.user.freeze);//冻结用户
    router.get('/api/v1/users/getFreeze', controller.v1.user.getFreeze);//获取冻结用户列表

    router.post('/api/v1/role/create', controller.v1.role.create); //创建角色
    router.get('/api/v1/role/getlist', controller.v1.role.getRoleList); //获取角色列表
    router.post('/api/v1/role/queryByName', controller.v1.role.queryByName); //查询
    router.post('/api/v1/role/updateName', controller.v1.role.updateName);  //更新
    router.post('/api/v1/role/delById', controller.v1.role.delById);  //删除
    
    router.post('/api/v1/team/create', controller.v1.team.create);  //创建组织
    router.post('/api/v1/team/queryByName', controller.v1.team.queryByName);  //查询
    router.post('/api/v1/team/updateName', controller.v1.team.updateName);  //更新
    router.post('/api/v1/team/delByName', controller.v1.team.delByName);  //删除

    router.post('/api/v1/applycards/applyCardsInfo', controller.v1.applyCards.applyCardsInfo); //申请房卡
    router.get('/api/v1/applycards/getIsReviewCards', controller.v1.applyCards.getIsReviewCards);  //获取是否有需要审核的房卡
    router.post('/api/v1/applycards/getMyReviewCardsList', controller.v1.applyCards.getMyReviewCardsList);  //  获取需要审核的房卡列表
    router.post('/api/v1/applycards/agreeApplyCards', controller.v1.applyCards.agreeApplyCards);  //同意申请
    router.post('/api/v1/applycards/refuseApplyCards', controller.v1.applyCards.refuseApplyCards); //拒绝申请
    //router.post('/api/v1/role/:id', controller.v1.role.create);
    
};
