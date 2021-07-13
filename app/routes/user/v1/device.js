const express = require('express');
const router = express.Router();

// controllers
const { user: userController } = config.path.controllers;

const DeviceController = require(`${userController}/v1/DeviceController`)




/**
* @api {post} /api/user/v1/device add device
* @apiVersion 1.0.0
* @apiName  add device
* @apiDescription add device
* @apiGroup device
* @apiParam  {varchar} name device name
* @apiParam  {varchar} macId device macId
* @apiParam  {varchar} relay device relay count
* @apiSuccessExample {json} Success-Response:
* {
*      success:true,
*      message:"دستگاه با موفقیت ثبت شد"
* }
* @apiErrorExample {json} Error-Response:
* {
*      success:false,
*      message:"دستگاهی با این مک آیدی وجود دارد"
* }
*/
router.post('/', DeviceController.addDevice.bind(DeviceController));




/**
* @api {get} /api/user/v1/device get devices
* @apiVersion 1.0.0
* @apiName  get devices
* @apiDescription get devices
* @apiGroup device
* @apiSuccessExample {json} Success-Response:
* {
*       success:true,
*       message:"دستگاه های کاربر با موفقیت ارسال شد",
*       data: [...{
*                 _id: id,
*                 active: active,
*                 name: name,
*                 macId: macId,
*                 ownerId: ownerId,
*                 relay:[...{no: number, status: status}],
*                 user: [...user ids],
*             }]
* }
* @apiErrorExample {json} Error-Response:
* {
*       success:false,
*       message:"دستگاه های کاربر با موفقیت ارسال نشد",
*       data: []
* }
*/
router.get('/', DeviceController.getDevices.bind(DeviceController));



/**
* @api {get} /api/user/v1/device/owner get owner devices
* @apiVersion 1.0.0
* @apiName  get owner devices
* @apiDescription get owner devices
* @apiGroup device
* @apiSuccessExample {json} Success-Response:
* {
*       success:true,
*       message:"دستگاه های کاربر با موفقیت ارسال شد",
*       data: [...{
*                 _id: id,
*                 active: active,
*                 name: name,
*                 macId: macId,
*                 ownerId: ownerId,
*                 relay:[...{no: number, status: status}],
*                 user: [...{name: name, family: family, username: username}],
*             }]
* }
* @apiErrorExample {json} Error-Response:
* {
*       success:false,
*       message:"دستگاه های کاربر با موفقیت ارسال نشد",
*       data: []
* }
*/
router.get('/owner', DeviceController.getOwnerDevices.bind(DeviceController));



/**
* @api {put} /api/user/v1/device/relay update devices status
* @apiVersion 1.0.0
* @apiName  put devices
* @apiDescription put devices
* @apiGroup device
* @apiParam  {varchar} name device name
* @apiParam  {varchar} deviceId device id
* @apiParam  {varchar} relayNumber device relay number
* @apiSuccessExample {json} Success-Response:
* {
*       "status":true,
*        message:"اطلاعات دستگاه اپدیت شد"
* }
* @apiErrorExample {json} Error-Response:
* {
*        success:false,
*        message:"دستگاهی با این اطلاعات موجود نیست"
* }
*/
router.put('/relay', DeviceController.updateDevicesRelay.bind(DeviceController));


/**
* @api {put} /api/user/v1/device/toggle toggle device activity
* @apiVersion 1.0.0
* @apiName  toggle device
* @apiDescription toggle devices
* @apiGroup device
* @apiParam  {varchar} deviceId device id
* @apiSuccessExample {json} Success-Response:
* {
*       "status":true,
*        message:"عملیات با موفقیت انجام شد"
* }
* @apiErrorExample {json} Error-Response:
* {
*        success:false,
*        message:"دستگاهی با این آیدی وجود ندارد"
* }
*/
router.put('/toggle', DeviceController.toggleDevice.bind(DeviceController));


/**
* @api {post} /api/user/v1/device/share share device
* @apiVersion 1.0.0
* @apiName  share devices
* @apiDescription share device with other users
* @apiGroup device
* @apiParam  {varchar} username username
* @apiParam  {varchar} deviceId device id
* @apiSuccessExample {json} Success-Response:
* {
*       "status": true,
*        "message": "با موفقیت انجام شد"
* }
* @apiErrorExample {json} Error-Response:
* {
*        "success":false,
*        "message": "دستگاهی با این آیدی وجود ندارد"
* }
*/
router.post('/share', DeviceController.shareDevice.bind(DeviceController));



/**
* @api {post} /api/user/v1/device/stopShare stop share device
* @apiVersion 1.0.0
* @apiName  stop sharing devices
* @apiDescription stop share device
* @apiGroup device
* @apiParam  {varchar} username username
* @apiParam  {varchar} deviceId device id
* @apiSuccessExample {json} Success-Response:
* {
*       "status": true,
*        "message": "دسترسی کاربر به دستگاه مسدود شد"
* }
* @apiErrorExample {json} Error-Response:
* {
*        "success":false,
*        "message": "دستگاهی با این آیدی وجود ندارد"
* }
*/
router.post('/stopShare', DeviceController.stopShareDevice.bind(DeviceController));

module.exports = router;
