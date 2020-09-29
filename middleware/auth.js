var connection = require('../connection');
var pg = require('pg');
var md5 = require('md5');
var response = require('../res');
var jwt = require('jsonwebtoken');
var config = require('../config/secret');
var ip = require('ip');

exports.registrasi = function (req, res) {
    var post = {
        nama: req.body.nama,
        email: req.body.email,
        password: md5(req.body.password),
        jenisKelamin: req.body.jenisKelamin
    }

    var query = "SELECT email FROM ?? WHERE ??=?";
    var table = ["user", "email", post.email];

    //  query = pg.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 0) {
                var query = "INSERT INTO ?? SET ?";
                var table = ["user"];
                // query = pg.format(query, table);
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
    var post = {
        password: req.body.password,
        email: req.body.email
    }

    // const query = {
    //     // give the query a unique name
    //     name: 'fetch-user',
    //     text: "SELECT * FROM $1 WHERE $2=$3 AND $4=$5",
    //     values: ["user", "password", md5(post.password), "email", post.email],
    // }

    const query = {
        // give the query a unique name
        name: 'fetch-user',
        text: "SELECT * FROM $1 WHERE $2=$3 AND $4=$5",
        values: ["user", "password", md5(post.password), "email", post.email],
    }

    //  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
    //  var table = ["user", "password", md5(post.password), "email", post.email];

    //  query = pg.format(query, table);

    connection.query(query, function (error, rows) {
        if (error) {
            console.log(error);
        } else {
            if (rows.length == 1) {
                var token = jwt.sign({ rows }, config.secret, {
                    expiresIn: '2400000'
                });

                id_user = rows[0].id;
                username = rows[0].username;

                var expired = 144000

                var data = {
                    id_user: id_user,
                    access_token: token,
                    ip_address: ip.address()
                }

                var query = "INSERT INTO ?? SET ?";
                var table = ["access_token"];

                // query = pg.format(query, table);
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

exports.profile = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM user WHERE id = $1', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
}