'use strict';

import { Router } from 'express';

/**
 * @description Asset route Controller
 * @param AssetController
 */
import * as AssetController from './asset.controller';

import * as auth from '../auth';

var router = new Router();

// /api/assets routes configs
router.get('/', auth.validateApiKey(), AssetController.index);
router.post('/', auth.validateApiKey(), AssetController.create);

// /api/assets/:id routes configs
router.get('/:id', auth.validateApiKey(), AssetController.show);
router.put('/:id', auth.validateApiKey(), AssetController.update);
router.delete('/:id', auth.validateApiKey(), AssetController.destroy);

module.exports = router;
