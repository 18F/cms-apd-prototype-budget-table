/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const utils = require('../utilities');

const loginModule = require('../../routes/login');

const getHandlerForRoute = (spy, route) => spy.args.find(args => args[0] === route)[1];

tape.test('routes/login', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    loginModule(app);
    initTest.ok(app.get.calledOnce, 'app.get is called once');
    initTest.ok(app.get.calledWith('/login'), 'sets up a /login route');
    initTest.equal(typeof app.get.args[0][1], 'function', 'provided a callback function');
    initTest.ok(app.post.calledOnce, 'app.post is called once');
    initTest.ok(app.post.calledWith('/login'), 'sets up a /login route');
    initTest.equal(typeof app.post.args[0][1], 'function', 'provided a callback function');
    initTest.end();
  });

  test.test('GET /login', (getLoginTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    loginModule(app);
    const handler = getHandlerForRoute(app.get, '/login');

    getLoginTest.test('with no request user', (noUserTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.user = null;
      handler(mocks.req, mocks.res);
      noUserTest.ok(mocks.res.send.notCalled, 'a response is not sent directly');
      noUserTest.ok(mocks.res.status.calledOnce, 'HTTP response status is set once');
      noUserTest.ok(mocks.res.status.calledWith(401), 'HTTP response status is set to 401');
      noUserTest.ok(mocks.res.statusSend.send.calledOnce, 'HTTP status is sent once');
      noUserTest.ok(mocks.res.statusSend.send.calledWith('Not logged in'), 'HTTP status is sent with a useful message');
      noUserTest.end();
    });

    getLoginTest.test('with a valid request user', (yesUserTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.user = { username: 'test' };
      mocks.req.headers.authorization = 'token';
      handler(mocks.req, mocks.res);
      yesUserTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
      yesUserTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
      yesUserTest.ok(mocks.res.status.notCalled, 'HTTP response status is not set directly');
      yesUserTest.end();
    });

    getLoginTest.end();
  });

  test.test('POST /login', (postLoginTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    loginModule(app);
    const handler = getHandlerForRoute(app.post, '/login');

    const mocks = utils.getMockHandlerArguments();
    mocks.req.body = { username: 'text' };
    process.env.TOKEN_EXPIRE_TIME = '2h';
    handler(mocks.req, mocks.res);
    postLoginTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
    postLoginTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
    const response = mocks.res.send.args[0][0];
    postLoginTest.ok(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(response.token), 'sends a valid token');

    postLoginTest.end();
  });

  test.end();
});
