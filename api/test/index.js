const fs = require('fs');
const path = require('path');

// Require everything so we get accurate coverage reporting
require('../tokens.js');
require('../env.js');

const dirs = ['middleware', 'routes'];
for (const dir of dirs) {
  const files = fs.readdirSync(path.join(__dirname, '..', dir));
  for (const file of files) {
    if (file.endsWith('.js')) {
      require(`../${path.join(dir, file)}`); // eslint-disable-line global-require, import/no-dynamic-require
    }
  }
}
