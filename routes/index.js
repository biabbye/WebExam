// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

var express = require("express");
var router = express.Router();
var path = require('path');

router.get('*', (req, res) => {
    try{
        console.log(res.sendFile(path.join(__dirname, '../client/build/index.html')));
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
});

module.exports = router;
