const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017';

// new Database({
//     host:'',  //主机
//     port:'',  //端口号
//     database:''  //数据库名称
// })

class Database{
    constructor(ops){
        this.config = { //默认配置
            host:ops.host || 'mongodb://127.0.0.1',
            port:ops.port || '27017',
            // server:this.host+':'+this.port,
            database:ops.database || 'aa'
        }
//            //存放查询时的一些条件
        this.query = {}
    }

    collection(collection){
        // this.query(function(){
        //     return
        // })
        // console.log(collection)
        this.query.collection = collection
        let obj = {
           
            insert: (data,callback) => {
                const { collection } = this.query
                // console.log(this)
                this._query(function(err,db){
                    db.collection(collection).insert(data,function(){
                        callback(...arguments)
                        db.close()
                    })
                })
            },
        
            remove: (where,callback) => {
                const { collection } = this.query
                // console.log(this)
                this._query(function(err,db){
                    db.collection(collection).remove(where,function(){
                        callback(...arguments)
                        db.close()
                    })
                })
            },
        
            update: (where,data,ops={},callback) => {
                if(typeof ops == 'function'){
                    callback = ops
                    ops = {}
                }

                const { collection } = this.query
                // console.log(this)
                // let arg = arguments
                this._query(function(err,db){

                    // db.collection(collection).update(...arg)
                    // db.close()

                    db.collection(collection).update(where,data,ops,function(){
                        callback(...arguments)
                        db.close()
                    })
                })
        
            },
            
            find: (where,callback) => {
                const { collection } = this.query
                let query = {}
                if(callback){
                this._query(function(err,db){
                    db.collection(collection).find(where).toArray(function(){
                        callback(...arguments)
                    })
                })
                    return;
                }
                // console.log(this)
                // return{
                let find = (callback)=>{
                    let keys = Object.keys(query)
                    console.log(keys)
                    if(keys.length == 3){
                        this._query(function(err,db){
                                db
                                .collection(collection)
                                .find(where)
                                [keys[0]](query[keys[0]])
                                [keys[1]](query[keys[1]])
                                [keys[2]](query[keys[2]])
                                .toArray(function(){
                                callback(...arguments)
                                db.close()
                            })
                        })
                        return;
                    }
                    if(keys.length == 2){
                        this._query(function(err,db){
                            db
                            .collection(collection)
                            .find(where)
                            [keys[0]](query[keys[0]])
                            [keys[1]](query[keys[1]])
                            .toArray(function(){
                            callback(...arguments)
                            db.close()
                        })
                    })
                      return;
                    }
                    if(keys.length == 1){
                        this._query(function(err,db){
                            db
                            .collection(collection)
                            .find(where)
                            [keys[0]](query[keys[0]])
                            .toArray(function(){
                            callback(...arguments)
                            db.close()
                        })
                    })
                    return;
                    }
                    // db.collection(collection).find(where).toArray(function(){
                    //     callback(...arguments)
                    // })
                    // return;
                }


                let finds = {
                    limit: (limit,callback) => {
                        query.limit = limit
                        //赋值obj对象
                        // let  objCopy = {...obj}
                        // delete objCopy.limit
                        // console.log(objCopy)
                        if(callback){
                            find(callback)
                            return;
                        }
                        return finds;
                    },
                
                    skip: (skip,callback) => {
                        query.skip = skip
                        if(callback){
                            find(callback)
                            return;
                        }
                        return finds ;
                    },
                
                    sort: (sort,callback) => {
                        query.sort  = sort
                        if(callback){
                            find(callback)
                            return;
                        }
                        return finds
                
                    }
                }
                return finds;
            }
        }
        return obj;
    }

    _query(callback) {
        MongoClient.connect(`${this.config.host}:${this.config.port}`,(err,client)=>{
            // callback(err,client.db(collection),client.close)
            // callback(arguments)
            let db = client.db(this.config.database)
                db.close = client.close
            callback(err,db)
        })
        // 把当前对象复制一份
        // let obj = {...this}
        // MongoClient.connect()

    }
}
module.exports = Database