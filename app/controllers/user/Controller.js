let appConfig = require('config');


const MainController = require(`${config.path.mainController}`);

module.exports = class Controller extends MainController {
    constructor() {
        super();
        this.controllerTag = 'User'
    }
}