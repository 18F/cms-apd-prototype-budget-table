/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');

const compositeModule = require('../../routes/index');

tape.test('routes/index', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      get: sinon.spy(),
      post: sinon.spy()
    };

    compositeModule(app);
    initTest.equal(app.get.callCount, 3, 'app.get is called two times');
    initTest.ok(app.get.calledWith('/login'), 'sets up the /login route');
    initTest.ok(app.get.calledWith('/review/requests'), 'sets up the /review/requests route');
    initTest.ok(app.get.calledWith('/review/requests/:requestID'), 'sets up the /review/requests/:requestID route');
    initTest.ok(app.get.args.every(arg => typeof arg[1] === 'function'), 'provides a handler to every route');

    initTest.equal(app.post.callCount, 1, 'app.post is called one time');
    initTest.ok(app.post.calledWith('/login'), 'sets up the /login route');
    initTest.ok(app.post.args.every(arg => typeof arg[1] === 'function'), 'provides a handler to every route');
    initTest.end();
  });

  test.end();
});
