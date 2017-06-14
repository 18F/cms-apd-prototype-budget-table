/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const sinon = require('sinon');

const setup = () => {
  // Unload the env module and unset known environment variables
  delete require.cache[require.resolve('../env')];
  delete process.env.TOKEN_EXPIRE_TIME;
  delete process.env.TOKEN_SIGNATURE_ALGORITHM;
  delete process.env.JWT_SECRET;

  // Fake out the dotenv.config() method so we don't accidentally
  // load from .env files
  require('dotenv'); // eslint-disable-line global-require
  require.cache[require.resolve('dotenv')].exports.config = sinon.spy();
};

tape.test('env', (test) => {
  test.test('with no environment variables set', (noEnvVarTest) => {
    setup();

    // Override Math.random so we can verify that it's called and
    // that the value it returns is used to build the secret
    const rand = Math.random;
    Math.random = sinon.stub().returns(42 / 256);

    require('../env'); // eslint-disable-line global-require
    noEnvVarTest.equal(process.env.TOKEN_EXPIRE_TIME, '2h', 'sets default token expiration time');
    noEnvVarTest.equal(process.env.TOKEN_SIGNATURE_ALGORITHM, 'HS512', 'sets the default signature algorithm');
    noEnvVarTest.equal(Math.random.callCount, 128, '128 random bytes are created');
    noEnvVarTest.ok(/(2A){128}/i.test(process.env.JWT_SECRET), 'generates an appropriate random JWT secret');
    noEnvVarTest.end();

    // Reset Math.random
    Math.random = rand;
  });

  test.test('with all environment variables already set', (allEnvVarTest) => {
    setup();
    process.env.TOKEN_EXPIRE_TIME = 'my time';
    process.env.TOKEN_SIGNATURE_ALGORITHM = 'my algorithm';
    process.env.JWT_SECRET = 'my secret';

    require('../env'); // eslint-disable-line global-require
    allEnvVarTest.equal(process.env.TOKEN_EXPIRE_TIME, 'my time', 'doesn\'t change expiration time');
    allEnvVarTest.equal(process.env.TOKEN_SIGNATURE_ALGORITHM, 'my algorithm', 'doesn\'t change signature algorithm');
    allEnvVarTest.equal(process.env.JWT_SECRET, 'my secret', 'doesn\'t change JWT secret');
    allEnvVarTest.end();
  });

  // Remove dotenv from the require cache, so the next time it's
  // loaded it'll be the right one.  This'll clean up the mocking.
  // Then reload the env module to get the environment back to what
  // the .env file says it should be, or defaults, whichever.
  delete require.cache[require.resolve('dotenv')];

  // Clean up env vars
  delete process.env.TOKEN_EXPIRE_TIME;
  delete process.env.TOKEN_SIGNATURE_ALGORITHM;
  delete process.env.JWT_SECRET;

  delete require.cache[require.resolve('../env')];
  require('../env'); // eslint-disable-line global-require
  test.end();
});
