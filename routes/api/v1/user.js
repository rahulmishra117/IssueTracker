const express=require('express');
const router=express.Router();
const userApi=require('../../../controller/api/v1/user_Api');

router.post('/create',userApi.create);
router.post('/login',userApi.login);
module.exports=router;