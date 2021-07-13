process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 device home Tests';
const baseRoute = '/api/device/v1';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let device, accessToken, idToken;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        deviceMacId = appConfig.test.device.macId;
        done()
    })


    describe('Check get Apis', () => {

        it('check update device', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/`)
                .send(deviceMacId);
            res.should.have.status(200);
        });

    });



    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
