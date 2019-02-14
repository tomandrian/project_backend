var router = require('express').Router()
var mysql = require('mysql')
var bodyParser = require('body-parser')
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false })) // harus selalu di masukan 
var cors = require('cors')
router.use = (cors())
// router.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// })


var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Perwira58',
    database: 'project_marketplace'
})

db.connect(() => {
    // console.log('Consumers DB Connect!')
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

//login
router.post('/login', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    db.query('SELECT * FROM consumers WHERE email = ?', email, function (error, results, fields) {
        if (error) {
            // console.log("error ocurred", error);
            res.send({
                "code": 400,
                "failed": "error ocurred"
            })
        } else {
            // console.log('The solution is: ', results);
            if (results.length > 0) {
                if (results[0].password == password) {
                    console.log(results.password)
                    res.send({
                        results,
                        "code": 200,
                        "success": "login sucessfull"
                    });
                } else {
                    res.send({
                        "code": 204,
                        "success": "Email and password does not match"
                    });
                }
            }
            else {
                res.send({
                    "code": 204,
                    "success": "Email does not exits"
                });
            }
        }
    });
})

module.exports = router