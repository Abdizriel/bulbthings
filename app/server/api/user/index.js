'use strict';

import express from 'express';

/**
 * @description User route Controller
 * @param UserController
 */
import UserController from './user.controller';

import auth from '../auth';

var router = express.Router();

// /api/users routes configs
router.get('/', auth.validateApiKey, UserController.index);
router.post('/', auth.validateApiKey, UserController.create);

// /api/users/:id routes configs
router.get('/:id', auth.validateApiKey, UserController.show);
router.put('/:id', auth.validateApiKey, UserController.update);
router.delete('/:id', auth.validateApiKey, UserController.destroy);

module.exports = router;
