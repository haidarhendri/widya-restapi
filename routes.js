'use strict';

module.exports = function (app) {
    var jsonku = require('./controller');

    app.route('/')
        .get(jsonku.index);

    app.route('/view/:id')
        .get(jsonku.tampilberdasarkanid);
    app.route('/create')
        .post(jsonku.tambahMahasiswa);

}