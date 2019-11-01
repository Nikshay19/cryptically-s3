const express = require('express')
const app = express()
const cookieParse = require('cookie-parser')
app.use(cookieParse())
app.listen(1234)
app.get('/',(req,res)=>{
console.log(req.cookies)
res.send(req.cookies)
})