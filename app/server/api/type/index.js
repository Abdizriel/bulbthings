'use strict';

import { Router } from 'express';

/**
 * @description Type route Controller
 * @param TypeController
 */
import * as TypeController from './type.controller';

import * as auth from '../auth';

var router = new Router();

// /api/types routes configs
router.get('/', auth.validateApiKey(), TypeController.index);
router.post('/', auth.validateApiKey(), TypeController.create);

// /api/types/:id routes configs
router.get('/:id', auth.validateApiKey(), TypeController.show);
router.put('/:id', auth.validateApiKey(), TypeController.update);
router.delete('/:id', auth.validateApiKey(), TypeController.destroy);

module.exports = router;
