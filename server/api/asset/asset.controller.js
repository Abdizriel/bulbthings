/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/assets              ->  index
 * POST    /api/assets              ->  create
 * GET     /api/assets/:id          ->  show
 * PUT     /api/assets/:id          ->  update
 * DELETE  /api/assets/:id          ->  destroy
 */

/**
 * @description Asset Sequalize Schema
 * @param Asset
 */
import { Asset } from '../../config/db.conf.js';

/**
 * @description API Response Utils
 */
import {
  validationError,
  handleError,
  handleEntityNotFound,
  removeEntity,
  saveUpdates,
  respondWithResult
} from '../utils';

/**
 * @function index
 * @description Function that returns all assets
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  return Asset.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single asset by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function show(req, res) {
  return Asset.find({
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
 * @description Function that create asset by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return Asset.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

/**
 * @function update
 * @description Function that update asset by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(validationError(res));
}

/**
 * @function destroy
 * @description Function that delete asset by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export default { index, show, create, update, destroy }
