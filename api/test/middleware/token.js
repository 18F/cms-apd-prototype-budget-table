/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const util = require('../utilities');

const tokenModule = require('../../middleware/token');

tape.test('middleware/token', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      use: sinon.spy()
    };

    tokenModule(app);
    initTest.ok(app.use.calledOnce, 'app.use is called once');
    initTest.equal(typeof app.use.args[0][0], 'function', 'called with a function');
    initTest.end();
  });

  test.test('handler', (handlerTest) => {
    const app = {
      use: sinon.spy()
    };

    tokenModule(app);
    const handler = app.use.args[0][0];

    handlerTest.test('with no authorization header', (noAuthorizationHeaderTest) => {
      const mocks = util.getMockHandlerArguments();
      mocks.req.user = 'something';
      handler(mocks.req, mocks.res, mocks.next);
      noAuthorizationHeaderTest.notOk(mocks.req.user, 'clears the request user object');
      noAuthorizationHeaderTest.ok(mocks.next.calledOnce, 'next is called one time');
      noAuthorizationHeaderTest.ok(mocks.res.status.notCalled, 'response HTTP status not set');
      noAuthorizationHeaderTest.end();
    });

    handlerTest.test('with invalid authorization header', (invalidAuthorizationTest) => {
      const mocks = util.getMockHandlerArguments();
      mocks.req.user = 'something';
      mocks.req.headers.authorization = 'invalid-token';
      handler(mocks.req, mocks.res, mocks.next);
      invalidAuthorizationTest.notOk(mocks.req.user, 'clears the request user object');
      invalidAuthorizationTest.ok(mocks.next.notCalled, 'next is not called');
      invalidAuthorizationTest.ok(mocks.res.status.calledOnce, 'response HTTP status is set one time');
      invalidAuthorizationTest.ok(mocks.res.status.calledWith(401), 'response HTTP status code is set to 401');
      invalidAuthorizationTest.ok(mocks.res.statusSend.send.calledOnce, 'status is sent');
      invalidAuthorizationTest.ok(mocks.res.statusSend.send.calledWith('Invalid token'), 'status is sent with useful message');
      invalidAuthorizationTest.end();
    });

    handlerTest.test('with a valid authorization header', (validAuthorizationTest) => {
      process.env.JWT_SECRET = 'secret';
      process.env.TOKEN_SIGNATURE_ALGORITHM = 'HS256';
      const mocks = util.getMockHandlerArguments();
      mocks.req.user = 'something';
      mocks.req.headers.authorization = util.validAuthorizationToken;
      handler(mocks.req, mocks.res, mocks.next);
      validAuthorizationTest.ok(mocks.req.user, 'sets the request user object');
      validAuthorizationTest.deepEqual(mocks.req.user, util.validAuthorizationObject, 'derives the correct user object');
      validAuthorizationTest.ok(mocks.next.calledOnce, 'next is called one time');
      validAuthorizationTest.ok(mocks.res.status.notCalled, 'response HTTP status not set');
      validAuthorizationTest.end();
    });

    handlerTest.end();
  });

  test.end();
});
