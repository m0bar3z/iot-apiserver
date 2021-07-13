
const Controller = require(`${config.path.controllers.device}/Controller`);
const TAG = 'v1_Home';
const jwt = require("jsonwebtoken")


module.exports = new class HomeController extends Controller {

    async index(req, res) {
        return res.json({ success: true, message: "Home v1" });

    }

    async updateDevice(req, res) {
        try {
            
            let filter = { _id: req.body.macId };
            let device = await this.model.Device.findOne(filter);

            if (!(device && device.active))
                return res.json({ success: false, message: "دستگاه در دسترس نمی باشد", data: [] });

            
            return res.json({ success: true, message: "اطلاعات دستگاه فرستاده شد", data: device.relay });

        }
        catch (err) {
            let handelError = new this.transforms.ErrorTransform(err)
                .parent(this.controllerTag)
                .class(TAG)
                .method('updateDevice')
                .inputParams(req.body)
                .call();

            if (!res.headersSent) return res.status(500).json(handelError);
        }
    }



}


