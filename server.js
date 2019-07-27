const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const user = require('./routes/user');
const view = require('./routes/view');
const app = express();
const {PORT, dbUrl} = require('./config');

mongoose.connect(dbUrl, {useNewUrlParser : true})
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.use(view);
app.use('/api', user);

app.listen(PORT, console.log(`Listening on port ${PORT}`));