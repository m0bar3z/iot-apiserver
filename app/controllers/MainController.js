const Kavenegar = require('kavenegar');
const axios = require('axios').default;
let appConfig = require('config');
const Device = require(`${config.path.models.root}/v1/Device`);
const User = require(`${config.path.models.root}/v1/User`);
const DeviceLog = require(`${config.path.models.root}/v1/DeviceLog`);
const ErrorTransform = require(`${config.path.transforms}/error/Transform`);
const VerificationCode = require(`${config.path.models.root}/v1/VerificationCode`);
const AppInfo = require(`${config.path.models.root}/v1/AppInfo`)


module.exports = class MainController {

    constructor() {
        this.model = { Device,User,DeviceLog,VerificationCode,AppInfo }
        this.transforms = { ErrorTransform };
    }

    showValidationErrors(req, res) {
        let errors = req.validationErrors();
        if (errors) {
            res.status(422).json({
                message: 'Unprocessable Entity',
                data: errors.map(error => {
                    return {
                        'field': error.param,
                        'message': error.msg
                    }
                }),
                success: false
            });
            return true;
        } else {
            return false;
        }
    }


    escapeAndTrim(req, items) {
        items.split(' ').forEach(item => {
            req.sanitize(item).escape();
            req.sanitize(item).trim();
        });
    }


    sendSms(phoneNumber, message) {
        var api = Kavenegar.KavenegarApi({
            apikey: appConfig.sms.KavenegarApi.apikey
        });

        api.Send({
            message: message,
            sender: appConfig.sms.KavenegarApi.sender,
            receptor: phoneNumber
        }, (response, status) => {
            console.log('send Sms ' + status+" message:"+message+" phonenumber:"+phoneNumber)
        });
    }


    sendSmsNegin(phone, message) {
        var param = {
            username: appConfig.sms.negin.user,
            password: appConfig.sms.negin.password,
            mobile: phone,
            message: message,
            type: "2"
        };

        axios.post(appConfig.sms.negin.password.host, param)
            .then(function (response) {
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    generateRandomNumber(min = 1000, max = 9999) {
        let i = (Math.random() * 32768) >>> 0;
        return (i % (min - max)) + min;
    }


    getTimeDiff(olderDate, newerDate, unit = 's') {

        // use a constant date (e.g. 2000-01-01) and the desired time to initialize two dates
        let date = new Date('2019-12-18T23:59:00.798Z');
        let exitDate = new Date('2019-12-18T00:01:00.798Z');


        // the following is to handle cases where the times are on the opposite side of
        // midnight e.g. when you want to get the difference between 9:00 PM and 5:00 AM
        if (newerDate < olderDate) {
            newerDate.setDate(newerDate.getDate() + 1);
        }

        let diff = Date.parse(newerDate) - Date.parse(olderDate); //return milliseconds

        switch (unit) {
            case 'h':
                return Math.floor(diff / 1000 / 60 / 60);
            case 'm':
                return Math.floor(diff / 1000 / 60);
            case 's':
                return Math.floor(diff / 1000);
            case 'ms':
                return diff;
        }


    }





}