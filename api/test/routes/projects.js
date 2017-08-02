/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const utils = require('../utilities');

const projectsModule = require('../../routes/projects');

const getHandlerForRoute = (spy, route) => spy.args.find(args => args[0] === route)[1];

tape.test('routes/projects', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      get: sinon.spy()
    };

    projectsModule(app);
    initTest.ok(app.get.calledOnce, 'app.get is called once');
    initTest.ok(app.get.calledWith('/projects'), 'sets up a /projects route');
    initTest.equal(typeof app.get.args[0][1], 'function', 'provided a callback function');
    initTest.end();
  });

  test.test('GET /projects', (getRequestsTest) => {
    const app = {
      get: sinon.spy()
    };

    projectsModule(app);
    const handler = getHandlerForRoute(app.get, '/projects');

    const mocks = utils.getMockHandlerArguments();
    handler(mocks.req, mocks.res).then(() => {
      getRequestsTest.ok(mocks.res.send.calledOnce, 'a response is sent directly, one time');
      getRequestsTest.equal(typeof mocks.res.send.args[0][0], 'object', 'sends an object');
      getRequestsTest.ok(mocks.res.status.notCalled, 'HTTP response status is not set directly');
      getRequestsTest.end();
    });
  });

  test.end();
});
