'use strict';

var response = require('./res');
var connection = require('./connection');

exports.index = function (req, res) {
    response.ok("Widya REST API!", res)
};

//menampilkan semua data mahasiwa berdasarkan id
exports.viewById = function (req, res) {
    let id = req.params.id;
    connection.query('SELECT * FROM user WHERE id = ?', [id],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok(rows, res);
            }
        });
};

//menambahkan data mahasiswa
exports.createUser = function (req, res) {
    var nama = req.body.nama;
    var email = req.body.email;
    var password = req.body.password;
    var jenisKelamin = req.body.jenisKelamin;

    connection.query('INSERT INTO user (nama, email, password, jenisKelamin) VALUES(?,?,?,?)',
        [nama, email, password, jenisKelamin],
        function (error, rows, fields) {
            if (error) {
                console.log(error);
            } else {
                response.ok("Seccess Create Data!", res)
            }
        });
};