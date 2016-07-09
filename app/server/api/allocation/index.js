'use strict';

import express from 'express';

/**
 * @description Allocation route Controller
 * @param AllocationController
 */
import AllocationController from './allocation.controller';

import auth from '../auth';

var router = express.Router();

// /api/allocations routes configs
router.get('/', auth.validateApiKey, AllocationController.index);
router.post('/', auth.validateApiKey, AllocationController.create);

// /api/allocations/:id routes configs
router.put('/:id', auth.validateApiKey, AllocationController.update);
router.delete('/:id', auth.validateApiKey, AllocationController.destroy);

module.exports = router;
