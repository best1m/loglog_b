const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();

const SELECT_ALL_TOPIC_QUERY = 'SELECT * FROM topic_backup';


var connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: ''
});

connection.connect()

app.use(cors());

app.get('/', (req, res) => {
    res.send('hello');
})

app.get('/topic/add', (req, res) => {
    console.log(req.query);
    const {title, description, created, author, profile} = req.query;
    const INSERT_TOPIC_QUERY = `INSERT INTO topic_backup(title,description,created,author,profile) VALUES('${title}','${description}','${created}','${author}','${profile}')`;
    connection.query(INSERT_TOPIC_QUERY, function (err, results) {
        if (err) {
            return res.send(err);
        } else {
            return res.send('successfully added topic');
        }
    })
})

app.get('/topic', (req, res) => {
    connection.query(SELECT_ALL_TOPIC_QUERY, function (err, results) {
        if (err) {
            return res.send(err);
        } else {
            return res.json({
                data : results
            })
        }
    })
})


app.listen(4000, () => {
    console.log('topic server on port 4000');
})