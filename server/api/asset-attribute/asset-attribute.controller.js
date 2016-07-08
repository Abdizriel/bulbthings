/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/asset-attributes              ->  index
 * POST    /api/asset-attributes              ->  create
 * GET     /api/asset-attributes/:id          ->  show
 * PUT     /api/asset-attributes/:id          ->  update
 * DELETE  /api/asset-attributes/:id          ->  destroy
 */

/**
 * @description Asset Attribute Sequalize Schema
 * @param AssetAttribute
 */
import { AssetAttribute } from '../../config/db.conf.js';

/**
 * @description API Response Utils
 */
import { handleError, handleEntityNotFound, removeEntity, saveUpdates, respondWithResult } from '../utils';

/**
 * @function index
 * @description Function that returns all asset-attributes
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  return AssetAttribute.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single asset-attribute by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function show(req, res) {
  return AssetAttribute.find({
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
 * @description Function that create asset-attribute by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return AssetAttribute.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function update
 * @description Function that update asset-attribute by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return AssetAttribute.find({
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
 * @description Function that delete asset-attribute by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return AssetAttribute.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export default { index, show, create, update, destroy }
