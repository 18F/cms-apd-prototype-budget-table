/* eslint-disable import/no-extraneous-dependencies */
const tape = require('tape');
const fork = require('child_process').fork;
const path = require('path');
const request = require('request-promise-native');
const swaggerParser = require('swagger-parser');
const AJV = require('ajv');

const ajv = new AJV();
let swagger;
let serverProcess;

function methodIsUnsupported(methodName, test) {
  request[methodName]('http://0.0.0.0:8000/client/dcn')
    .then(() => {
      test.fail('should not return successfully');
      test.end();
    })
    .catch((err) => {
      test.equal(err.response.statusCode, 405, 'returns a 405 error');
      test.end();
    })
    .catch((err) => {
      test.fail(err);
      test.end();
    });
}

function runTests() {
  tape.test('api endpoints', (test) => {
    test.test('/client/{department-client-number}...', (clientDCNTest) => {
      clientDCNTest.test('get', (getTest) => {
        getTest.test('with an invalid DCN', (invalidDCN) => {
          request.get('http://0.0.0.0:8000/client/dcn')
            .then(() => {
              invalidDCN.fail('should not return successfully');
              invalidDCN.end();
            })
            .catch((err) => {
              invalidDCN.equal(err.response.statusCode, 404, 'returns a 404 error');
              invalidDCN.end();
            })
            .catch((err) => {
              invalidDCN.fail(err);
              invalidDCN.end();
            });
        });

        getTest.test('with a valid DCN', (validDCN) => {
          request.get({ method: 'GET', uri: 'http://0.0.0.0:8000/client/123456789', resolveWithFullResponse: true })
            .then((response) => {
              validDCN.equal(response.statusCode, 200, 'returns a 200 HTTP status code');
              const body = JSON.parse(response.body);
              const validator = ajv.compile(swagger.paths['/client/{department-client-number}'].get.responses['200'].schema);
              const valid = validator(body);
              validDCN.ok(valid, 'body should be valid according to swagger spec');
              validDCN.notOk(validator.errors, 'no errors');
              validDCN.end();
            })
            .catch((err) => {
              test.fail(err);
              validDCN.end();
            });
        });

        getTest.end();
      });

      clientDCNTest.test('put', (putTest) => {
        methodIsUnsupported('put', putTest);
      });

      clientDCNTest.test('post', (postTest) => {
        methodIsUnsupported('post', postTest);
      });

      clientDCNTest.test('delete', (deleteTest) => {
        methodIsUnsupported('del', deleteTest);
      });

      clientDCNTest.end();
    });

    test.end();
  });

  // lean on tape's serial nature to teardown the server process
  tape.test('HTTP server teardown', (t) => {
    if (serverProcess) {
      serverProcess.kill('SIGTERM');
    }
    t.end();
  });
}

tape.test('HTTP server setup', (t) => {
  // instantiate the HTTP server so we can actually hit its endpoints
  serverProcess = fork(path.join(__dirname, '../index'));

  // wait a second so it can actually crank up
  setTimeout(() => {
    // load swagger so we can validate against it
    swaggerParser.dereference(path.join(__dirname, '../documentation/swagger.json'))
      .then((parsedSwagger) => {
        swagger = parsedSwagger;

        // once we've got the swagger loaded, run the inner tests and
        // mark this setup as complete
        runTests();
        t.end();
      });
  }, 1000);
});
