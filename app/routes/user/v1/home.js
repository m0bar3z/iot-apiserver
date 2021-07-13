const express = require('express');
const router = express.Router();

// controllers 
const { user: userController } = config.path.controllers;

const HomeController = require(`${userController}/v1/HomeController`)



/**
 * @api {post} /api/user/v1/ register
 * @apiVersion 1.0.0
 * @apiName register
 * @apiDescription register user
 * @apiGroup home
 * @apiParam  {varchar} username user username
 * @apiParam  {varchar} password user password
 * @apiParam  {varchar} name  name
 * @apiParam  {varchar} family  family 
 * @apiParam  {varchar} email email 
 * @apiParam  {varchar} mobile mobile 
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"کاربر با موفقیت ثبت شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success:false,
 *     message:"کاربری با این مشخصات موجود است"
 * }
 */
router.post('/',HomeController.register.bind(HomeController));




/**
 * @api {post} /api/user/v1/app/info app info 
 * @apiVersion 1.0.0
 * @apiName info
 * @apiDescription app info 
 * @apiGroup home
 * @apiParam  {int} versionCode versionCode
 * @apiParam  {varchar} os os
 * @apiSuccessExample {json} Success-Response:
 * {
 *   status: true,
 *   message:"اطلاعات نرم افزار فرستاده شد",
 *   data:{
 *       update:false,
 *       updateUrl:"http://cafebazar.com/ir.team-x.ir/mohsenapp,
 *       force:false
 *  }
 *}
 * @apiErrorExample {json} Error-Response:
 *{
 *    status: false,
 *    message:"کاربر بلاک می باشد",
 *    data:{}
 *}
 */
 router.post('/app/info',HomeController.appInfo.bind(HomeController));




/**
 * @api {post} /api/user/v1/login login
 * @apiVersion 1.0.0
 * @apiName login
 * @apiDescription login user
 * @apiGroup home
 * @apiParam  {varchar} username user username
 * @apiParam  {varchar} password user password
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"کاربر با موفقیت وارد شد",
 *     data:{
 *          idToken: idToken, 
 *          accessToken: accessToken
 *     }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success:false,
 *      message:"کاربر وارد نشد",
 *      data:{}
 * }
 */
 router.post('/login',HomeController.login.bind(HomeController));


/**
 * @api {post} /api/user/v1/login/mobile requset verification Code 
 * @apiVersion 1.0.0
 * @apiName verificationCode
 * @apiDescription requset verification Code
 * @apiGroup home
 * @apiParam  {varchar} mobile user mobile
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد"
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success:false,
 *      message:"کاربری با این شماره موبایل در دسترس نمی باشد"
 * }
 */
 router.post('/login/mobile',HomeController.verificationCode.bind(HomeController));



/**
 * @api {post} /api/user/v1/login/mobile/check check Verification Code
 * @apiVersion 1.0.0
 * @apiName  checkVerificationCode
 * @apiDescription checkVerificationCode
 * @apiGroup home
 * @apiParam  {varchar} mobile user mobile
 * @apiParam  {varchar} code user code
 * @apiSuccessExample {json} Success-Response:
 * {
 *      success:true,
 *      message:"کد تایید صحیح است",
 *      data:{
 *          idToken: idToken, 
 *          accessToken: accessToken
 *     }
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *      success:false,
 *      message:"کد تایید صحیح نمی باشد",
 *      data: {}
 * }
 */
 router.post('/login/mobile/check',HomeController.checkVerificationCode.bind(HomeController));


 module.exports = router;