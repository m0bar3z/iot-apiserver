const express = require('express');
const router = express.Router();

// controllers 
const { device: deviceController } = config.path.controllers;

const HomeController = require(`${deviceController}/v1/HomeController`)



/**
 * @api {get} /api/device/v1/ update device
 * @apiVersion 1.0.0
 * @apiName update device
 * @apiDescription update device
 * @apiGroup device
 * @apiParam {varchar} macId device macId
 * @apiSuccessExample {json} Success-Response:
 * {
 *     success:true,
 *     message:"device data sent successfully",
 *     data: [...{no: number, status: status }]
 * }
 * @apiErrorExample {json} Error-Response:
 * {
 *     success:false,
 *     message:"unable to send device data",
 *     data: []
 * }
 */
 router.get('/',HomeController.updateDevice.bind(HomeController));


 
 module.exports = router;