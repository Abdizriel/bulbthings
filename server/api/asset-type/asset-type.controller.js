/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/asset-types              ->  index
 * POST    /api/asset-types              ->  create
 * GET     /api/asset-types/:id          ->  show
 * PUT     /api/asset-types/:id          ->  update
 * DELETE  /api/asset-types/:id          ->  destroy
 */

/**
 * @description Asset Type Sequalize Schema
 * @param AssetType
 */
import { AssetType } from '../../config/db.conf.js';

/**
 * @description API Response Utils
 */
import { handleError, handleEntityNotFound, removeEntity, saveUpdates, respondWithResult } from '../utils';

/**
 * @function index
 * @description Function that returns all asset types
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  return AssetType.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single asset type by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function show(req, res) {
  return AssetType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create asset type by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return AssetType.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function update
 * @description Function that update asset type by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return AssetType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function destroy
 * @description Function that delete asset type by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return AssetType.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export default { index, show, create, update, destroy }
