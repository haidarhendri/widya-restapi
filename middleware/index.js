var express = require('express');
var auth = require('./auth');
var router = express.Router();
var verification = require('./verification');

//daftarkan menu register dan login
router.post('/api/register', auth.registrasi);
router.post('/api/login', auth.login);

//melihat profil dengan id
router.get('/api/profile/:id', verification(), auth.profile);


module.exports = router;