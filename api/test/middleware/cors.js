/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');
const utils = require('../utilities');

const corsModule = require('../../middleware/cors');

tape.test('middleware/cors', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      use: sinon.spy()
    };

    corsModule(app, null);
    initTest.ok(app.use.calledOnce, 'app.use is called once');
    initTest.equal(typeof app.use.args[0][0], 'function', 'called with a function');
    initTest.end();
  });

  test.test('adds headers to a response', (headersTest) => {
    const app = {
      use: sinon.spy()
    };

    const schema = {
      paths: {
        '/test1': {
          get: { },
          post: { }
        },
        '/test2': {
          get: { },
          put: { }
        },
        '/test3/{parameter}': {
          get: { }
        }
      }
    };

    const expectedMethods = {
      '/test1': 'GET,POST',
      '/test2': 'GET,PUT',
      '/test3/{parameter}': 'GET'
    };

    corsModule(app, schema);
    const handler = app.use.args[0][0];

    const setsHeaders = (req, res, setsHeadersTest) => {
      setsHeadersTest.ok(req.get.calledOnce, 'request header is retrieved once');
      setsHeadersTest.ok(req.get.calledWith('origin'), 'gets the ORIGIN request header');
      setsHeadersTest.equal(res.header.callCount, 3, 'three headers were set');
      setsHeadersTest.ok(res.header.calledWith('Access-Control-Allow-Origin', utils.requestOrigin), 'Access-Control-Allow-Origin header is set to request origin');
      setsHeadersTest.ok(res.header.calledWith('Access-Control-Allow-Methods', expectedMethods[req.url]), 'Access-Control-Allow-Methods header is set to the allowed methods');
      setsHeadersTest.ok(res.header.calledWith('Access-Control-Allow-Headers', 'Accepts, Authorization, Content-Length, Content-Type'), 'Access-Control-Allow-Headers header is set to the allowed headers');
    };

    headersTest.test('where the path is not supported', (unsupportedPathTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.url = '/unsupported-path';
      handler(mocks.req, mocks.res, mocks.next);
      unsupportedPathTest.ok(mocks.res.sendStatus.calledOnce, 'HTTP response status is set once');
      unsupportedPathTest.ok(mocks.res.sendStatus.calledWith(404), 'HTTP status code 404 is sent');
      unsupportedPathTest.ok(mocks.next.notCalled, 'next is not called');
      unsupportedPathTest.end();
    });

    headersTest.test('where the path has parameters', (parameterPathTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.url = '/test3/param';
      mocks.req.method = 'GET';
      handler(mocks.req, mocks.res, mocks.next);
      // This is the URL that should have been matched, so that's the one we should check against
      mocks.req.url = '/test3/{parameter}';
      setsHeaders(mocks.req, mocks.res, parameterPathTest);
      parameterPathTest.ok(mocks.next.calledOnce, 'next is called');
      parameterPathTest.end();
    });

    headersTest.test('where the method is not OPTIONS', (notOptionsRequestTest) => {
      notOptionsRequestTest.test('where the method is not supported', (unsupportedMethodTest) => {
        const mocks = utils.getMockHandlerArguments();
        mocks.req.url = '/test1';
        mocks.req.method = 'PUT';
        handler(mocks.req, mocks.res, mocks.next);
        setsHeaders(mocks.req, mocks.res, unsupportedMethodTest);
        unsupportedMethodTest.ok(mocks.res.sendStatus.calledOnce, 'HTTP response status is set once');
        unsupportedMethodTest.ok(mocks.res.sendStatus.calledWith(405), 'HTTP status code 405 is sent');
        unsupportedMethodTest.ok(mocks.next.notCalled, 'next is not called');
        unsupportedMethodTest.end();
      });

      notOptionsRequestTest.test('where the method is supported', (supportedMethodTest) => {
        const mocks = utils.getMockHandlerArguments();
        mocks.req.url = '/test1';
        mocks.req.method = 'GET';
        handler(mocks.req, mocks.res, mocks.next);
        setsHeaders(mocks.req, mocks.res, supportedMethodTest);
        supportedMethodTest.ok(mocks.next.calledOnce, 'next is called');
        supportedMethodTest.end();
      });

      notOptionsRequestTest.end();
    });

    headersTest.test('where the method is OPTIONS', (optionsRequestTest) => {
      const mocks = utils.getMockHandlerArguments();
      mocks.req.url = '/test2';
      mocks.req.method = 'OPTIONS';
      handler(mocks.req, mocks.res, mocks.next);
      setsHeaders(mocks.req, mocks.res, optionsRequestTest);
      optionsRequestTest.ok(mocks.res.sendStatus.calledOnce, 'HTTP response status is set once');
      optionsRequestTest.ok(mocks.res.sendStatus.calledWith(200), 'HTTP status code 200 is sent');
      optionsRequestTest.ok(mocks.next.notCalled, 'next is not called');
      optionsRequestTest.end();
    });

    headersTest.end();
  });

  test.end();
});
