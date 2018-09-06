var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  // res.send('respond with a resource');
  let { db,query,session,body } = req
  let { action } = req.query
  // 登录
  if(action == 'login'){
    var account = req.query.account;
    let where = {}
    where['account'] = `${account}`;
    console.log(where);
    db.collection('users').find(where,function(err,result){
      if(err) throw err;
      console.log(result);
      if(result != ''){
        res.send({
          code:"200",
          msg:"操作成功",
          item:result
      });
      }else{
        res.send({
          code:500,
          msg:err
        })
      }
    // console.log(result)
    })
};
  // 查询操作
  if(action == 'check'){
    db.collection('users').find({},function(err,result){
      res.send({
        code:"200",
        msg:"操作成功",
        item:result
      });
    })
};

// 查询操作
if(action == 'list'){
  // var account = req.query.account;
  console.info(req.query);
var index = req.query.index || 0;
let size = req.query.size || 3;

console.info("测试",index*size,(index-1+2)*size)
// var rs = {
// 	retCode:"0",
// 	count:list.length,
// 	items:c
// }db.test.sort({"amount":1}).skip(100000).limit(10
db.collection('studentDB').find({},function(err,result){
  // db.collection('studentDB').find({}).sort({"stu_id":1}).skip(index*size).limit(3,function(err,result){
    var c = result.slice(index*size,(index-1+2)*size)  
  res.send({
      code:"200",
      count:result.length,
      msg:"操作成功",
      item:c
    });
  })
};

//增加操作
if(action == 'add'){
  console.log(req.query.id)
  let id = req.query.id;
  let stu_name = req.query.stu_name;
  let stu_age = req.query.stu_age;
  let stu_sex = req.query.stu_sex;
  let stu_class = req.query.stu_class;
  let where = {}
  where['stu_id'] = `${id}`;
  console.log(where)
  // 验证数据库中是否存在
  db.collection('studentDB').find(where,function(err,result){
    if(result != ""){
      res.send({
        code:"500",
        msg:"操作失败",
        item:result
      });
    }else{
      where['stu_name'] = `${stu_name}`;
      where['stu_age'] = `${stu_age}`;
      where['stu_sex'] = `${stu_sex}`;
      where['stu_class'] = `${stu_class}`;
      console.log(where);
      db.collection('studentDB').insert(where,function(err,result){
      console.log('add')
      res.send({
        icode:"200",
        msg:"操作成功",
        item:result
       });
     })
    }
  })

}
});
router.post('/', function(req, res, next) {
  // res.send('respond with a resource');
  let { db,query,session,body } = req
  let { action } = req.query
  if(action == 'del'){
    console.log(req.body.account)
    var account = req.body.account;
    let where = {}
    where['account'] = `${account}`;
    console.log(where);
    db.collection('users').remove(where,function(err,result){
    console.log('del')
    // if(err) throw err;
    // res.json(result)
    res.send({
      code:"200",
      msg:"操作成功",
      item:result
    });
})
  }


//删除操作
  if(action == 'delete'){
    console.log(req.body.id)
    var id = req.body.id;
    let where = {}
    where['stu_id'] = `${id}`;
    console.log(where);
    db.collection('studentDB').remove(where,function(err,result){
    console.log('delete')
    res.send({
      code:"200",
      msg:"操作成功",
      item:result
    });
  })
  }

})

module.exports = router;
