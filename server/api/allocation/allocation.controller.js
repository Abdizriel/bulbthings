/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/allocations              ->  index
 * POST    /api/allocations              ->  create
 * PUT     /api/allocations/:id          ->  update
 * DELETE  /api/allocations/:id          ->  destroy
 */

/**
 * @description Allocation Sequalize Schema
 * @param Allocation
 */
import { Allocation } from '../../config/db.conf.js';

/**
 * @description API Response Utils
 */
import { handleError, handleEntityNotFound, removeEntity, saveUpdates, respondWithResult } from '../utils';

/**
 * @function index
 * @description Function that returns all allocations
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  let query = {
    where: {}
  };

  if (req.query) {
    if (req.query.hasOwnProperty('asset')) query.where['assetId'] = req.query.asset;
    if (req.query.hasOwnProperty('user')) query.where['userId'] = req.query.user;
    if (req.query.hasOwnProperty('allocated') && req.query.allocated) {
      const queryTime = new Date();
    }
  }

  return Allocation.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function create
 * @description Function that create allocation by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return Allocation.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

/**
 * @function update
 * @description Function that update allocation by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Allocation.find({
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
 * @description Function that delete allocation by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return Allocation.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export default { index, create, update, destroy }
