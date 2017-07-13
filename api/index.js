require('./env');
const express = require('express');
const middleware = require('./middleware');
const routes = require('./routes');

const app = express();

app.use('/schema', express.static('schema'));
app.use('/documentation', express.static('documentation'));

middleware(app);
routes(app);

app.listen(process.env.PORT || 8000);
