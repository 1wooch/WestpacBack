var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/get/demo',function(req,res){
  res.status(200).json({message: "Hello World"}); 
}); //work




module.exports = router;
