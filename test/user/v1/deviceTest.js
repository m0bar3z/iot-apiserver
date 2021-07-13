process.env.NODE_ENV = 'test';
let chai = require('chai');
let should = chai.should();
const sectionName = 'V1 user device Tests';
const baseRoute = '/api/user/v1';
let chaiHttp = require('chai-http');
let server = require('../../../server');
let appConfig = require('config');
let user, device, updatedDevice, appInfo, accessToken, idToken, shareDevice, stopShareDevice;
const axios = require('axios').default;


chai.use(chaiHttp);

describe(`${sectionName}`, () => {


    before((done) => {
        console.log('Waiting to ensure database connection stablished ');
        user = appConfig.test.user;
        device = appConfig.test.device;
        updatedDevice = appConfig.test.updatedDevice;
        appInfo = appConfig.test.appInfo;
        user.code = appConfig.test.code;
        shareDevice = appConfig.test.shareDevice;
        stopShareDevice = appConfig.test.stopShareDevice;
        axios.post(`http://localhost:4000/api/user/v1/login`, user)
            .then(function (response) {
                response = response.data;
                if (response.success) {
                    idToken = response.data.idToken
                    accessToken = response.data.accessToken
                } else {
                    console.log("errorrrrrrrrrr: no token provided ");
                }
                setTimeout(() => {
                    console.log('Okay, lets begin!');
                    done();
                }, 1000);
            })
            .catch((error) => {
                console.log("error", error);
            });
    })



    describe('Check get Apis', () => {

        it('check get device', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/device`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

        it('check get owner device', async () => {
            const res = await chai
                .request(server)
                .get(`${baseRoute}/device/owner`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send();
            res.should.have.status(200);
        });

    });

    describe('Check Post Apis', () => {

        it('check register device', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/device`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(device);
            res.should.have.status(200);
        });

        it('check share device', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/device/share`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(shareDevice);
            res.should.have.status(200);
        });

        it('check remove device', async () => {
            const res = await chai
                .request(server)
                .post(`${baseRoute}/device/remove`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(stopShareDevice);
            res.should.have.status(200);
        });

    });

    describe('Check Put Apis', () => {

        it('check update device', async () => {
            const res = await chai
                .request(server)
                .put(`${baseRoute}/device/relay`)
                .set('Authorization', accessToken)
                .set('idToken', idToken)
                .send(updatedDevice);
            res.should.have.status(200);
        });

    });

    after(async () => {
        console.log(`Section ${sectionName} finished`);
    });

});
