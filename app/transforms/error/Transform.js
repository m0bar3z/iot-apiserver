const ServerError = require(`${config.path.models.error}/ServerError`);

module.exports = class Transform {

    constructor(err) {
        this.err = err
        this.enableLog = true;
        this.saveToDb = true;
        this.send = true;
        this.parentTag = '';
        this.classTag = '';
        this.methodTag = '';
        this.projectName = 'userserver';
    }

    parent(value) {
        this.parentTag = value;
        return this;
    }

    class(value) {
        this.classTag = value;
        return this;
    }

    method(value) {
        this.methodTag = value;
        return this;
    }

    inputParams(value) {
        this.input = value
        return this;
    }

    log(value) {
        this.enableLog = value;
        return this;
    }
    save(value) {
        this.saveToDb = value;
        return this;
    }

    sendToClient(value) {
        this.send = value;
        return this;
    }

    printError(tag) {
        if (this.saveToDb) {
            // save to mongo  
            let serverError = new ServerError();
            serverError.project = this.projectName;
            serverError.errorType = this.err.name;
            serverError.parent = this.parentTag;
            serverError.class = this.classTag;
            serverError.method = this.methodTag;
            serverError.inputParams = this.input;
            serverError.message = this.err.message;
            serverError.stack = this.err.stack;
            serverError.save((mongoerr, saveModel) => {
                if (mongoerr)
                    return console.log(` error in error transform ${mongoerr}`);

                if (this.enableLog) {
                    let log = `${this.err.name}:${tag}:${this.err.message}:${saveModel.id}`;
                    console.log(log);
                }
            });
            return;
        }

        if (this.enableLog) {
            let log = `${this.err.name}:${tag}:${this.err.message}:${new Date()}`;
            console.log(log);
        }

    }

    call() {
        let errPath = `${this.parentTag}->${this.classTag}->${this.methodTag}`;

        if (this.err instanceof TypeError) {
            this.printError(errPath)
        } else {
            this.printError(errPath)
        }

        this.err.errName = this.err.name;
        this.err.errMesg = this.err.message;
        this.err.errPath = errPath;


        if (this.send) {
            return { success: false, message: "", data: this.err };
        } else {
            return { success: false, message: "", data: {} }
        }

    }


}