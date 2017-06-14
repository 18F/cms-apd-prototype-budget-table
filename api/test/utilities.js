const sinon = require('sinon'); // eslint-disable-line import/no-extraneous-dependencies

module.exports.requestOrigin = 'request origin';

module.exports.getMockHandlerArguments = () => {
  const statusSend = {
    send: sinon.spy()
  };

  return {
    req: {
      get: sinon.stub().returns(module.exports.requestOrigin),
      method: '',
      headers: { },
      params: { }
    },
    res: {
      header: sinon.spy(),
      send: sinon.spy(),
      sendStatus: sinon.spy(),
      status: sinon.stub().returns(statusSend),
      statusSend
    },
    next: sinon.spy()
  };
};

// Should also have an expired token

module.exports.validAuthorizationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QifQ.FILrByQNl1Mx00RSZonmT3p5waGlFaymZJ3e3a5VBac';
module.exports.validAuthorizationObject = { username: 'test' };
