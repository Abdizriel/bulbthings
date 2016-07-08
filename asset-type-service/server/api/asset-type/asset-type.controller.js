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
import { AssetType } from '../../config/db.conf';

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