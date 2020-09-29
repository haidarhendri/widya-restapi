const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var morgan = require('morgan');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

var routes = require('./routes');
routes(app);

app.use('/auth', require('./middleware'));

app.listen(3030, () => {
    console.log(`Server started on port 3030`);
});