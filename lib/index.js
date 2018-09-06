const Database = require('../lib/db')
const db = new Database({
  database:'aa'
})

module.exports = (options)=>{
    console.log(options)
    return (req,res,next)=>{
        // console.log(req) //请求时显示
        // console.log(res)
        req.db = new Database(options)
        next()
    }
}