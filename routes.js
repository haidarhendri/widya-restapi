'use strict';

module.exports = function (app) {
    var json = require('./controller');

    app.route('/')
        .get(json.index);

    app.route('/view/:id')
        .get(json.viewById);
    app.route('/create')
        .post(json.createUser);

}