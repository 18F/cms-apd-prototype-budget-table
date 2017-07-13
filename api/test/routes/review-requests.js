/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const utils = require('../utilities');

const requestsModule = require('../../routes/review/requests');

const getHandlerForRoute = (spy, route) => spy.args.find(args => args[0] === route)[1];

tape.test('routes/review/requests', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      get: sinon.spy()
    };

    requestsModule(app);
    initTest.ok(app.get.calledTwice, 'app.get is called twice');
    initTest.ok(app.get.calledWith('/review/requests'), 'sets up a /review/requests route');
    initTest.ok(app.get.calledWith('/review/requests/:requestID'), 'sets up a /review/requests/:requestID route');
    initTest.equal(typeof app.get.args[0][1], 'function', 'provided a callback function');
    initTest.equal(typeof app.get.args[1][1], 'function', 'provided a callback function');
    initTest.end();
  });

  test.test('GET /review/requests', (getRequestsTest) => {
    const app = {
      get: sinon.spy()
    };

    requestsModule(app);
    const handler = getHandlerForRoute(app.get, '/review/requests');

    const mocks = utils.getMockHandlerArguments();
    handler(mocks.req, mocks.res).then(() => {
      getRequestsTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
      getRequestsTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
      getRequestsTest.ok(mocks.res.status.notCalled, 'HTTP response status is not set directly');
      getRequestsTest.end();
    });
  });

  test.test('GET /review/requests/:requestID', (getRequestTest) => {
    const app = {
      get: sinon.spy()
    };

    requestsModule(app);
    const handler = getHandlerForRoute(app.get, '/review/requests/:requestID');

    getRequestTest.test('with a request ID that does not match', (noMatchTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.user = null;
      mocks.req.params.requestID = 'no good';
      handler(mocks.req, mocks.res).then(() => {
        noMatchTest.ok(mocks.res.send.notCalled, 'a response is not sent directly');
        noMatchTest.ok(mocks.res.status.calledOnce, 'HTTP response status is set once');
        noMatchTest.ok(mocks.res.status.calledWith(404), 'HTTP response status is set to 404');
        noMatchTest.ok(mocks.res.statusSend.send.calledOnce, 'HTTP status is sent once');
        noMatchTest.ok(mocks.res.statusSend.send.calledWith(`No financial request with ID '${mocks.req.params.requestID}' found`), 'HTTP status is sent with a useful message');
        noMatchTest.end();
      });
    });

    getRequestTest.test('with a valid DCN', (yesMatchTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.params.requestID = 'FR-MMIS-2017-01-R01';
      handler(mocks.req, mocks.res).then(() => {
        yesMatchTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
        yesMatchTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
        yesMatchTest.ok(mocks.res.status.notCalled, 'HTTP response status is not set directly');
        yesMatchTest.end();
      });
    });

    getRequestTest.end();
  });

  test.end();
});
