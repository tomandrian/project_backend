var express = require('express')
var cors = require('cors')
var product = require('./productTable')
var consumer = require('./consumerTable')
var app = express()
app.use(product)
app.use(consumer)
app.use(cors())



app.get('/', (req, res) => {
    res.send('<h1>tes express</h1>')
})

var port = 8000
app.listen(port, () => {
    console.log('Server Database aktif di port ' + port)
})
