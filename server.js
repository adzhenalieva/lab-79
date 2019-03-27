const express = require('express');
const items = require('./app/items');
const categories = require('./app/categories');
const places = require('./app/places');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
const port = 8000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'user',
    password : '1qaz@WSX29',
    database : 'lab'
});

app.use('/items', items(connection));
app.use('/categories', categories(connection));
app.use('/places', places(connection));


connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
});
