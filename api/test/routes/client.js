/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const utils = require('../utilities');

const clientModule = require('../../routes/client');

const getHandlerForRoute = (spy, route) => spy.args.find(args => args[0] === route)[1];

tape.test('routes/client', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    clientModule(app);
    initTest.ok(app.get.calledOnce, 'app.get is called once');
    initTest.ok(app.get.calledWith('/client/:dcn'), 'sets up a /client/:dcn route');
    initTest.equal(typeof app.get.args[0][1], 'function', 'provided a callback function');
    initTest.end();
  });

  test.test('GET /client/:dcn', (getClientTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    clientModule(app);
    const handler = getHandlerForRoute(app.get, '/client/:dcn');

    getClientTest.test('with a DCN that does not match', (noMatchTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.user = null;
      handler(mocks.req, mocks.res);
      noMatchTest.ok(mocks.res.send.notCalled, 'a response is not sent directly');
      noMatchTest.ok(mocks.res.status.calledOnce, 'HTTP response status is set once');
      noMatchTest.ok(mocks.res.status.calledWith(404), 'HTTP response status is set to 404');
      noMatchTest.ok(mocks.res.statusSend.send.calledOnce, 'HTTP status is sent once');
      noMatchTest.ok(mocks.res.statusSend.send.calledWith('DCN not found'), 'HTTP status is sent with a useful message');
      noMatchTest.end();
    });

    getClientTest.test('with a valid DCN', (yesMatchTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.params.dcn = '123456789';
      handler(mocks.req, mocks.res);
      yesMatchTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
      yesMatchTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
      yesMatchTest.ok(mocks.res.status.notCalled, 'HTTP response status is not set directly');
      yesMatchTest.end();
    });

    getClientTest.end();
  });

  test.end();
});
