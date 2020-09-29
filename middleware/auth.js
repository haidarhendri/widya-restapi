var connection = require('../connection');
var mysql = require('mysql');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

exports.registrasi = function (req, res) {
    //menangkap atribut post
    var post = {
        nama: req.body.nama,
        email: req.body.email,
        password: md5(req.body.password),
        jenisKelamin: req.body.jenisKelamin
    }

    //cari email apakah duplikasi
    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                //menambahkan ke tabel user
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                query = mysql.format(query, table);
                connection.query(query, post, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        response.ok("Berhasil menambahkan user baru", res);
                    }
                });
            } else {
                res.json({
                    success: false,
                    message: "Email telah terdaftar!"
                }).end();
            }
        }
    })
}

exports.login = function (req, res) {
    //menangkap atribut post
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    //verifikasi login
    var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    var table = ["user", "password", md5(post.password), "email", post.email];

    query = mysql.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                //membuat sign jwt
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: '2400000'
                });

                id_user = rows[0].id;
                username = rows[0].username;

                var expired = 144000 //expired dalam ms

                //menangkap atribut post 
                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                //menambahkan untuk history token
                var query = "INSERT INTO ?? SET ?";
                var table = ["access_token"];

                query = mysql.format(query, table);
                connection.query(query, data, function (error, rows) {
                    if (error) {
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token JWT tergenerate!',
                            token: token,
                            expires: expired,
                            currUser: data.id_user,
                            user: username,
                        });
                    }
                });
            }
            else {
                res.json({ "Error": true, "Message": "Email atau password salah!" });
            }
        }
    });
}

//access data by id
exports.profile = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM user WHERE id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
}