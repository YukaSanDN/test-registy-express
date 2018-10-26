'use strict';

const express = require('express');

const router = express.Router();

const RegistryComponent = require('../../controller/registryComponent');

router.post('/registy',RegistryComponent.Registry );

module.exports = router;