
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Home';
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");


module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Home v1" });

    }

    async register(req, res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty();
            req.checkBody('password', 'please enter password').notEmpty();
            req.checkBody('name', 'please enter name').notEmpty();
            req.checkBody('family', 'please enter family').notEmpty();
            req.checkBody('email', 'please enter email').notEmpty();
            req.checkBody('mobile', 'please enter mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb
            let params = {
                username: req.body.username,
                password: req.body.password,
                name: req.body.name,
                family: req.body.family,
                email: req.body.email,
                mobile: req.body.mobile,
            }
            let filter = { username: params.username };
            let user = await this.model.User.findOne(filter);

            if (user)
                return res.json({ success: false, message: "کاربری با این نام کاربری وجود دارد" });

            filter = { mobile: params.mobile };
            user = await this.model.User.findOne(filter);

            if (user)
                return res.json({ success: false, message: "شماره موبایل قبلا برای حساب دیگری استفاده شده است" });

            await this.model.User.create(params);


            return res.json({ success: true, message: "کاربر با موفقیت ثبت شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('register')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async appInfo(req, res) {
        try {
            req.checkBody('versionCode', 'please enter versionCode').notEmpty();
            req.checkBody('os', 'please enter os').notEmpty();

            if (this.showValidationErrors(req, res)) return;

            if(!req.decodedData.user_active)
                return res.json({ success: false, message: "کاربر بلاک می باشد", data: {}})

            // save in mongodb
            let filter = { os: req.body.os, version: req.body.versionCode}
            let updateInfo = await this.model.AppInfo.find(filter).sort({createdAt:-1}).limit(1)
            updateInfo = updateInfo[0]
            if(!updateInfo)
                return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: {} });

            let data = { active: true, update: updateInfo.update, isForce: updateInfo.isForce, updateUrl: updateInfo.updateUrl }
            return res.json({ success: true, message: "اطلاعات نرم افزار فرستاده شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('appInfo')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async login(req, res) {
        try {
            req.checkBody('username', 'please enter username').notEmpty();
            req.checkBody('password', 'please enter password').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb
            let filter = { username: req.body.username };
            let user = await this.model.User.findOne(filter);

            if (!(user && user.active))
                return res.json({ success: false, message: "کاربر در دسترس نمی باشد", data: {} });


            let status = await bcrypt.compare(req.body.password, user.password)
            if (!status)
                return res.json({ success: false, message: "رمزعبور صحیح نمی باشد", data: {} });

            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let payload = {
                user_id: user._id,
                user_active: user.active,
                user_device: user.device
            }
            let idToken = jwt.sign(payload, config.secret, options )

            options = {
                expiresIn: config.accesssTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }

            payload = { scope : config.userScope};

            let accessToken = jwt.sign(payload, config.secret, options)

            let data = { idToken, accessToken};

            return res.json({ success: true, message: "کاربر با موفقیت وارد شد", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('login')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async verificationCode(req, res) {
        try {
            req.checkBody('mobile', 'please enter mobile').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb
            let filter = { mobile: req.body.mobile };

            let user = await this.model.User.findOne(filter);
            if (!(user && user.active))
                return res.json({ success: false, message: "کاربری با این شماره موبایل در دسترس نمی باشد"});

            //code generation
            let code;

            //check if the last code is steel valid
            let lastCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            lastCode = lastCode[0]
            if(lastCode){
                // timeDiff on verification code unit
                let timeDiff = this.getTimeDiff(lastCode.createdAt, new Date().toISOString(), config.verificationCodeUnit)
                // check verification code valid duration
                if(timeDiff < config.verificationCodeDuration){
                    code = lastCode.code
                    this.sendSms(req.body.mobile, code)
                    return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد" });
                }

            }

            //generate new code

            //generate random number
            code = this.generateRandomNumber()
            this.sendSms(req.body.mobile, code)

            //save in mongo
            let params = {
                mobile: req.body.mobile,
                code: code
            }

            await this.model.VerificationCode.create(params);


            return res.json({ success: true, message: "کد تاییدیه به شماره موبایل داده شده ، با موفقیت فرستاده شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('verificationCode')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async checkVerificationCode(req, res) {
        try {
            req.checkBody('mobile', 'please enter mobile').notEmpty();
            req.checkBody('code', 'please enter code').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            // save in mongodb

            let filter = { code: req.body.code, mobile: req.body.mobile }

            let veriCode = await this.model.VerificationCode.find(filter).sort({createdAt:-1}).limit(1)
            veriCode = veriCode[0]
            if(!veriCode)
                return res.json({ success: false, message: "کد تایید صحیح نمی باشد", data: {} });
            // timeDiff on verification code unit
            let timeDiff = this.getTimeDiff(veriCode.createdAt.toISOString(), new Date().toISOString(), config.verificationCodeUnit)
            // check verification code valid duration
            if(timeDiff > config.verificationCodeDuration)
                return res.json({ success: false, message: "کد تایید منقضی شده است", data: {} });

            //remove the code
            await this.model.VerificationCode.findOneAndRemove({_id:veriCode._id})

            let user = await this.model.User.findOne({mobile: req.body.mobile});
            let options = {
                expiresIn: config.idTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let payload = {
                user_id: user._id,
                user_active: user.active,
                user_device: user.device
            }
            let idToken = jwt.sign(payload, config.secret, options )

            options = {
                expiresIn: config.accesssTokenExpire,
                algorithm: config.algorithm,
                issuer: config.issuer,
                audience: config.audience
            }
            let accessToken = jwt.sign({ scope : req.body.scope}, config.secret, options)
            let data = { idToken, accessToken};

            return res.json({ success: true, message: "کد تایید صحیح است", data: data });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('checkVerificationCode')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

}


