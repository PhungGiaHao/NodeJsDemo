const express = require('express')
const morgan = require('morgan')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ProductsRouter = require  ('./Router/ProductsRouter')
const CategoryRouter = require('./Router/CatagoryRouter')
require('dotenv/config')
const apiurl = process.env.api
const StringDb = process.env.ConnectString

app.use(bodyParser.json())
app.use(morgan('tiny'))

mongoose.connect(StringDb,{
    useNewUrlParser:true,
    useFindAndModify:true,
    dbName:"DayHoc",
}).then(()=>{
    console.log("connection database .......")
}).catch(err=>{
    console.log(err)
})

app.use(`${apiurl}/products`,ProductsRouter)
app.use(`${apiurl}/category`,CategoryRouter)
app.listen(3000, () =>{
    console.log("app running port 3000")
})