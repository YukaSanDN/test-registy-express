'use strict';

const express = require('express');

const router = express.Router();

const RegistryComponent = require('../../controller/registryComponent');

router.post('/registry',RegistryComponent.Registry );

module.exports = router;