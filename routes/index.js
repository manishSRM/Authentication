var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var db_url = 'mongodb://localhost:27017/contentuploader';

/* GET home page. */
router.get('/', function(req, res, next) {
    // console.log("Hello");
    res.render('index');
});

router.post('/register', function(req, res, next) {
    MongoClient.connect(db_url, function(err, db) {
        if (!err) {
            db.collection('user').insert(req.body, function() {
                db.close();
            });
            res.redirect('/login');
        }
    });
});

router.get('/login', function(req, res, next) {
    // console.log("Hello");
    res.render('login');
});

router.post('/login', function(req, res, next) {
    MongoClient.connect(db_url, function(err, db) {
        if (!err) {
            var cursor = db.collection('user').find({'email': req.body.email, 'password': req.body.password})
            cursor.each(function(err, doc) {
                if (doc) {
                    res.redirect('/hello');
                    return false;
                } else {
                    res.send("err");
                }
            });
        }
    });
});

router.get('/hello', function(req, res, next) {
    // console.log("Hello");
    res.render('hello');
});


module.exports = router;
