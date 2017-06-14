/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const utils = require('./utilities');

const tokensModule = require('../tokens');

tape.test('tokens', (test) => {
  test.test('getUserFromToken', (getUserFromTokenTest) => {
    getUserFromTokenTest.test('with invalid token', (invalidTokenTest) => {
      process.env.JWT_SECRET = 'secret';
      process.env.TOKEN_SIGNATURE_ALGORITHM = 'HS256';
      const testFn = () => tokensModule.getUserFromToken('invalid token');
      invalidTokenTest.throws(testFn, 'throws an exception');
      invalidTokenTest.end();
    });

    getUserFromTokenTest.test('with valid token', (validTokenTest) => {
      validTokenTest.test('with invalid secret', (invalidSecretTest) => {
        process.env.JWT_SECRET = 'invalid secret';
        process.env.TOKEN_SIGNATURE_ALGORITHM = 'HS256';
        const testFn = () => tokensModule.getUserFromToken(utils.validAuthorizationToken);
        invalidSecretTest.throws(testFn, 'throws an exception');
        invalidSecretTest.end();
      });

      validTokenTest.test('with valid secret', (validSecretTest) => {
        process.env.JWT_SECRET = 'secret';
        process.env.TOKEN_SIGNATURE_ALGORITHM = 'HS256';
        const user = tokensModule.getUserFromToken(utils.validAuthorizationToken);
        validSecretTest.deepEqual(user, utils.validAuthorizationObject, 'resolves the correct object');
        validSecretTest.end();
      });

      validTokenTest.end();
    });

    getUserFromTokenTest.end();
  });

  test.test('createTokenFromUser', (createTokenFromUser) => {
    process.env.JWT_SECRET = 'secret';
    process.env.TOKEN_SIGNATURE_ALGORITHM = 'HS256';
    process.env.TOKEN_EXPIRE_TIME = '2h';
    const token = tokensModule.createTokenFromUser(utils.validAuthorizationObject);
    createTokenFromUser.ok(token, 'returns a token');
    createTokenFromUser.ok(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+/.test(token), 'token has valid structure');
    // We can't test the actual value of the token because it
    // will have an iat based on the timestampe when the token
    // was created.  The only way to test the value of the
    // token would be to decrypt it and then check the parts
    // we expect (e.g., validAuthorizationObject).
    createTokenFromUser.end();
  });

  test.end();
});
