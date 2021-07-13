
const Controller = require(`${config.path.controllers.user}/Controller`);
const TAG = 'v1_Device';
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

module.exports = new class DeviceController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Device v1" });

    }

    async addDevice(req, res) {
        try {
            req.checkBody('name', 'please enter device name').notEmpty();
            req.checkBody('macId', 'please enter macId').notEmpty();
            req.checkBody('relay', 'please enter relay count').notEmpty();

            if (this.showValidationErrors(req, res)) return;

            //add device
            let params = {
                name: req.body.name,
                macId: req.body.macId,
                ownerId: req.decodedData.user_id,
                relay: [],
                user: []
            }

            for (let index = 0; index < req.body.relay; index++) {
                params.relay.push({ no: index + 1, status: false });
            }

            let filter = { macId: params.macId };
            let device = await this.model.Device.findOne(filter);
            if (device)
                return res.json({ success: false, message: "دستگاهی با این مک آیدی وجود دارد" });

            //add the device to user
            filter = { _id: req.decodedData.user_id };

            let deviceUser = await this.model.User.findOne(filter);
            if (!deviceUser)
                return res.json({ success: false, message: "کاربری با این ایدی موجود نیست" });

            params.user.push(deviceUser._id)
            let newDevice = await this.model.Device.create(params);

            deviceUser.device.push(newDevice._id)
            await deviceUser.save()

            return res.json({ success: true, message: "دستگاه با موفقیت ثبت شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('addDevice')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }


    async getDevices(req, res) {
        try {
            let filter = { active: true };

            let devices = [];
            let activeDevices = await this.model.Device.find(filter)

            for (let index = 0; index < activeDevices.length; index++) {
                if (activeDevices[index].user.includes(req.decodedData.user_id))
                    devices.push(activeDevices[index]);
            }

            return res.json({ success: true, message: "دستگاه های کاربر با موفقیت ارسال شد", data: devices });

        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getDevices')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async getOwnerDevices(req, res) {
        try {
            let filter = { ownerId: req.decodedData.user_id, active: true };

            let ownDevices = await this.model.Device.find(filter)

            let users = []
            for (let index = 0; index < ownDevices.length; index++) {
                users = [...users, ...ownDevices[index].user]
            }

            filter = { _id: { $in: users } }
            users = await this.model.User.find(filter, { _id: 1, name: 1, family: 1, username: 1 })

            let userInfo = [];
            let i;
            for (let index = 0; index < ownDevices.length; index++) {
                //omit owner id from users
                i = ownDevices[index].user.indexOf(ownDevices[index].ownerId)
                if (i > -1)
                    ownDevices[index].user.splice(i, 1)
                userInfo = users.filter(user => ownDevices[index].user.includes(user._id))
                ownDevices[index].user = userInfo
            }


            return res.json({ success: true, message: "دستگاه های کاربر با موفقیت ارسال شد", data: ownDevices });

        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('getOwnerDevices')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async updateDevicesRelay(req, res) {
        try {
            req.checkBody('name', 'please enter device name').notEmpty();
            req.checkBody('deviceId', 'please enter deviceId').notEmpty();
            req.checkBody('relayNumber', 'please enter relay count').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            //log the update
            let filter = { _id: req.body.deviceId };

            let device = await this.model.Device.findOne(filter)
            if (!device)
                return res.json({ success: false, message: "دستگاهی با این اطلاعات موجود نیست" });

            if (!device.active)
                return res.json({ success: false, message: "دستگاهی با این اطلاعات فعال نیست" });

            if ((req.body.relayNumber > device.relay.length) || (req.body.relayNumber < 1))
                return res.json({ success: false, message: "شماره رله معتبر نیست" });

            let deviceLog = {
                deviceId: device._id,
                user: req.decodedData.user_id
            }

            for (let index = 1; index <= device.relay.length; index++) {
                if (index == req.body.relayNumber) {
                    deviceLog['relay' + index] = !device.relay[index - 1].status
                } else
                    deviceLog['relay' + index] = device.relay[index - 1].status
            }

            //update the device
            let updatedRelay = [];
            for (let index = 0; index < device.relay.length; index++) {
                if (index + 1 == req.body.relayNumber) {
                    updatedRelay.push({ no: index + 1, status: !device.relay[index].status });
                } else
                    updatedRelay.push({ no: index + 1, status: device.relay[index].status });
            }

            let updatedDevice = await this.model.Device.findByIdAndUpdate(device._id, { relay: updatedRelay })
            if (!updatedDevice)
                return res.json({ success: false, message: "اطلاعات دستگاه با موفقیت اپدیت نمی شود" });

            await this.model.DeviceLog.create(deviceLog);


            return res.json({ success: true, message: "اطلاعات دستگاه اپدیت شد" });
        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('updateDevicesRelay')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async shareDevice(req, res) {
        try {
            req.checkBody('username', 'please enter device name').notEmpty();
            req.checkBody('deviceId', 'please enter deviceId').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let user = await this.model.User.findOne({ username: req.body.username })
            if (!user)
                return res.json({
                    success: false,
                    message: "کاربر پیدا نشد"
                })

            let device = await this.model.Device.findOne({ _id: req.body.deviceId })
            if (!device)
                return res.json({
                    success: false,
                    message: "دستگاهی با این آیدی وجود ندارد"
                })

            let owner = req.decodedData
            if (user._id == owner.user_id)
                return res.json({
                    success: false,
                    message: "نمیتوانید دستگاه را با خودتان به اشتراک بگذارید"
                })

            let userHasDevice = user.device.find(id => id.toString() === req.body.deviceId)
            if (userHasDevice)
                return res.json({
                    success: false,
                    message: "کاربر به این دستگاه دسترسی دارد"
                })

            let ownerDevices = await this.model.User.findOne({ _id: owner.user_id }, 'device')
            let ownerHasDevice = ownerDevices.device.find(id => id.toString() === req.body.deviceId)
            if (!ownerHasDevice || device.ownerId != owner.user_id)
                return res.json({
                    success: false,
                    message: "مالکیت این دستگاه به شما تعلق ندارد و شما نمیتوانید این عملیات را انجام دهید"
                })

            await device.user.push(user._id)
            await device.save()
            await user.device.push(device._id)
            await user.save()

            return res.json({
                success: true,
                message: "با موفقیت انجام شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('shareDevice')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }

    async stopShareDevice(req, res) {
        try {
            req.checkBody('username', 'please enter device name').notEmpty();
            req.checkBody('deviceId', 'please enter deviceId').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let user = await this.model.User.findOne({ username: req.body.username })
            if (!user)
                return res.json({
                    success: false,
                    message: "کاربر پیدا نشد"
                })

            let device = await this.model.Device.findOne({ _id: req.body.deviceId })
            if (!device)
                return res.json({
                    success: false,
                    message: "دستگاهی با این آیدی وجود ندارد"
                })

            let userHasDevice = user.device.find(id => id == req.body.deviceId)
            if (!userHasDevice)
                return res.json({
                    success: false,
                    message: "کاربر به این دستگاه دسترسی ندارد"
                })

            let owner = req.decodedData;
            let ownerDevices = await this.model.User.findOne({ _id: owner.user_id }, 'device')
            let ownerHasDevice = ownerDevices.device.find(id => id.toString() === req.body.deviceId)
            if (!ownerHasDevice || device.ownerId != owner.user_id)
                return res.json({
                    success: false,
                    message: "مالکیت این دستگاه به شما تعلق ندارد و شما نمیتوانید این عملیات را انجام دهید"
                })

            let updatedDevice = device.user.filter(id => id.toString() != user._id.toString())
            await this.model.Device.findByIdAndUpdate(device._id, { user: updatedDevice })
            let newDeviceList = user.device.filter(id => id.toString() != req.body.deviceId)
            await this.model.User.findByIdAndUpdate(user._id, { device: newDeviceList })

            return res.json({
                success: true,
                message: "عملیات با موفقیت انجام شد"
            })
        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('stopShareDevice')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }

    }

    async toggleDevice(req, res) {
        try {
            req.checkBody('deviceId', 'please enter deviceId').notEmpty();
            if (this.showValidationErrors(req, res)) return;

            let device = await this.model.Device.findOne({ _id: req.body.deviceId })
            if (!device)
                return res.json({
                    success: false,
                    message: "دستگاهی با این آیدی وجود ندارد"
                })

            let owner = req.decodedData;
            let ownerDevices = await this.model.User.findOne({ _id: owner.user_id }, 'device')
            let ownerHasDevice = ownerDevices.device.find(id => id.toString() === req.body.deviceId)
            if (!ownerHasDevice || device.ownerId != owner.user_id)
                return res.json({
                    success: false,
                    message: "مالکیت این دستگاه به شما تعلق ندارد و شما نمیتوانید این عملیات را انجام دهید"
                })

            await this.model.Device.findByIdAndUpdate(device._id, { active: !device.active })

            return res.json({
                success: true,
                message: "عملیات با موفقیت انجام شد"
            })

        } catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('toggleDevice')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }

    }

}


