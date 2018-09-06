var express = require('express');
var router = express.Router();
var path = require('path');
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  // let { db } = req 
  // db.collection('users').find({},function(err,result){
  //   res.json(result)
  // })
  console.log(__dirname+"asd");
  next()
});
router.get('/index', function(req, res) {
  
  console.log(path.resolve(__dirname,'../views/index.html'))
  res.sendFile(path.resolve(__dirname,'../views/index.html'))
  // path.resolve(__dirname,'../views/index.html')
  // res.send();
  // })
  // next()
});
router.get('/main',function(req,res){
  res.sendFile(path.resolve(__dirname,'../views/main.html'))
})
router.get('/user',function(req,res){
  res.sendFile(path.resolve(__dirname,'../views/user.html'))
})

module.exports = router;
