/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');

const compositeModule = require('../../middleware/index');

tape.test('middleware/index', (test) => {
  test.test('initialization', (initTest) => {
    const app = {
      use: sinon.spy()
    };

    compositeModule(app, null);
    initTest.equal(app.use.callCount, 4, 'app.use is called four times');
    initTest.equal(typeof app.use.args[0][0], 'function', 'called with a function the first time');
    initTest.equal(typeof app.use.args[1][0], 'function', 'called with a function the second time');
    initTest.equal(typeof app.use.args[2][0], 'function', 'called with a function the third time');
    initTest.equal(typeof app.use.args[3][0], 'function', 'called with a function the fourth time');
    initTest.end();
  });

  test.end();
});
