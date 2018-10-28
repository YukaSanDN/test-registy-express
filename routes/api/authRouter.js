'use strict';

const express = require('express');

const router = express.Router();

const AuthComponent = require('../../controller/authComponents');

router.post('/auth',AuthComponent.Auth );

module.exports = router;