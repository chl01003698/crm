'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/api/v1/users/create', controller.v1.user.create);
    router.post('/api/v1/users/signin', controller.v1.user.signin);
    router.post('/api/v1/users/searchname', controller.v1.user.searchByNameOrId);
    router.post('/api/v1/users/queryuser', controller.v1.user.searchByProvinceOrLevel);
    router.get('/api/v1/users/:id', controller.v1.user.queryUserById);
    router.post('/api/v1/users/mod/:id', controller.v1.user.updateUserById);
    router.post('/api/v1/users/freeze/:id', controller.v1.user.freeze);
    router.get('/api/v1/users/getFreeze', controller.v1.user.getFreeze);
    router.post('/api/v1/role/create', controller.v1.role.create);
    router.post('/api/v1/role/queryByName', controller.v1.role.queryByName);
    router.post('/api/v1/role/updateName', controller.v1.role.updateName);
    router.post('/api/v1/role/delById', controller.v1.role.delById);
    router.post('/api/v1/team/create', controller.v1.team.create);
    router.post('/api/v1/team/queryByName', controller.v1.team.queryByName);
    router.post('/api/v1/team/updateName', controller.v1.team.updateName);
    router.post('/api/v1/team/delByName', controller.v1.team.delByName);
    router.post('/api/v1/applycards/applyCardsInfo', controller.v1.applyCards.applyCardsInfo);
    router.get('/api/v1/applycards/getIsReviewCards', controller.v1.applyCards.getIsReviewCards);
    router.get('/api/v1/applycards/getMyReviewCardsList', controller.v1.applyCards.getMyReviewCardsList);
    router.post('/api/v1/applycards/agreeApplyCards', controller.v1.applyCards.agreeApplyCards);
    //router.post('/api/v1/applycards/refuseApplyCards', controller.v1.applyCards.refuseApplyCards);
    //router.post('/api/v1/role/:id', controller.v1.role.create);
};
