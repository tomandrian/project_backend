var router = require('express').Router()
var mysql = require('mysql')
var bodyParser = require('body-parser')
router.use(bodyParser.json())
var cors = require('cors')
router.use(cors())

var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Perwira58',
    database: 'project_marketplace'
})

db.connect(() => {
    // console.log('Product DB Connect!')
})


//Get All Data
router.get('/products', (req, res) => {
    var dbStat = 'select * from products'
    db.query(dbStat, (error, output) => {
        if (error) {
            console.log(error)
        } else {
            console.log(output)
            res.send(output)
        }
    })
})


//Get data by ID
router.get('/products/:id', (req, res) => {
    var dbStat = 'select * from products where id = ?'
    db.query(dbStat, req.params.id, (error, output) => {
        if (error) {
            console.log(error)
        } else {
            console.log(output)
            res.send(output)
        }
    })
})

//Post data
router.post('/products', (req, res) => {
    var dbStat = 'insert into products set ?'
    var data = {
        nama: req.body.nama,
        harga: req.body.harga,
        deskripsi: req.body.deskripsi,
        gambar: req.body.gambar

    }
    db.query(dbStat, data, e = (error, output) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            console.log(output)
            res.send({
                nama: req.body.nama,
                harga: req.body.harga,
                deskripsi: req.body.deskripsi,
                gambar: req.body.gambar,
                status: 'Data Terkirim'
            })
        }
    })
    //UPDATE
    router.put('/products/:id', (req, res) => {
        var dbStat = 'update products set ? where id = ?'
        var data = {
            nama: req.body.nama,
            harga: req.body.harga,
            deskripsi: req.body.deskripsi,
            gambar: req.body.gambar
        }

        db.query(dbStat, [data, req.params.id], (error, output) => {
            if (error) {
                console.log(error)
                res.end(error)
            } else {
                console.log(output)
                res.send({
                    nama: req.body.nama,
                    harga: req.body.harga,
                    deskripsi: req.body.deskripsi,
                    gambar: req.body.gambar,
                    status: 'Data Berubah'
                })
            }
        })

    })

    //Delete data by id
    router.delete('/products/id:id', (id, res) => {
        var dbStat = 'delete from products where id = ?'
        db.query(dbStat, req.params.id, (error, output) => {
            if (error) {
                console.log(error)
            } else {
                console.log(error)
                res.send(output)
            }
        })
    })
})


module.exports = router