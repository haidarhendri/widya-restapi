'use strict';

module.exports = function (app) {
    var json = require('./controller');

    //route home (base url)
    app.route('/')
        .get(json.index);

    //route membuat user baru
    app.route('/create')
        .post(json.createUser);

}