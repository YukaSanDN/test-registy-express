'use strict';

const express = require('express');

const router = express.Router();

const UserComponent = require('../../controller/userComponent');

router.post('/user',UserComponent.GetUser );
router.post('/avatar',UserComponent.AddImageUser );

module.exports = router;