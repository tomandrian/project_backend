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
    console.log('Consumers Db Connect!')
})


//Get All Data
router.get('/users', (req, res) => {
    var dbStat = 'select * from consumers'
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
router.get('/users/:id', (req, res) => {
    var dbStat = 'select * from consumers where id = ?'
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
router.post('/users', (req, res) => {
    var dbStat = 'insert into consumers set ?'
    var data = {
        nama: req.body.nama,
        tgllahir: req.body.tgllahir,
        email: req.body.email,
        password: req.body.password

    }
    db.query(dbStat, data, e = (error, output) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
            console.log(output)
            res.send({
                nama: req.body.nama,
                tgllahir: req.body.tgllahir,
                email: req.body.email,
                password: req.body.password,
                status: 'Data Terkirim'
            })
        }
    })
    //UPDATE
    router.put('/users/:id', (req, res) => {
        var dbStat = 'update consumers set ? where id = ?'
        var data = {
            nama: req.body.nama,
            tgllahir: req.body.tgllahir,
            email: req.body.email,
            password: req.body.password
        }

        db.query(dbStat, [data, req.params.id], (error, output) => {
            if (error) {
                console.log(error)
                res.end(error)
            } else {
                console.log(output)
                res.send({
                    nama: req.body.nama,
                    tgllahir: req.body.tgllahir,
                    email: req.body.email,
                    password: req.body.password,
                    status: 'Data Berubah'
                })
            }
        })

    })

    //Delete data by id
    router.delete('/users/id:id', (id, res) => {
        var dbStat = 'delete from consumers where id = ?'
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