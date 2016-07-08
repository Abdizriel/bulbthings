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
import { Allocation } from '../../config/db.conf';

/**
 * @function respondWithResult
 * @description Function that returns response with data
 * @param {Object} res - Express Framework Response Object
 * @param {Number} statusCode - Response status code
 */
function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

/**
 * @function saveUpdates
 * @description Function that updates entity with new data
 * @param {Object} updates - Updated data
 */
function saveUpdates(updates) {
  return function(entity) {
    return entity.updateAttributes(updates)
        .then(updated => {
          return updated;
        });
  };
}

/**
 * @function removeEntity
 * @description Function that remove entity from Schema
 * @param {Object} res - Express Framework Response Object
 */
function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.destroy()
          .then(() => {
            res.status(204).end();
          });
    }
  };
}

/**
 * @function handleEntityNotFound
 * @description Function that handle entity not found respond
 * @param {Object} res - Express Framework Response Object
 */
function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

/**
 * @function handleError
 * @description Function that returns response with error details
 * @param {Object} res - Express Framework Response Object
 * @param {Number} statusCode - Response status code
 */
function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

/**
 * @function index
 * @description Function that returns all allocations
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
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
