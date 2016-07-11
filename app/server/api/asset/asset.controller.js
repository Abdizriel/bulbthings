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
import { Asset, Type } from '../../sqldb';

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
export function index(req, res) {
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
export function show(req, res) {
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
export function create(req, res) {
  return Type.findById(req.body.TypeId)
    .then(validateCreateParameters(req))
    .then(() => Asset.create(req.body))
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

/**
 * @function validateCreateParameters
 * @description Function that validate if all type attributes where provided
 * @param {Object} req - Express Framework Request Object
 */
function validateCreateParameters(req) {
  return function(entity) {
    if (!entity) return Promise.reject('Type not exist');
    if (!req.body.parameters) return Promise.reject('Parameters are note provided');

    const typeAttributes = entity.attrs;
    const parametersKeys = Object.keys(req.body.parameters);
    const missingParameters = typeAttributes.filter(attr => {
      return parametersKeys.indexOf(attr) == -1;
    });

    if(missingParameters.length) {
      return Promise.reject(`Not all parameters are provided: ${ missingParameters.join(', ')}`);
    }

    return null;
  }
}

/**
 * @function update
 * @description Function that update asset by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(validateUpdateParameters(req))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(validationError(res));
}

/**
 * @function validateCreateParameters
 * @description Function that validate if all type attributes where provided
 * @param {Object} req - Express Framework Request Object
 */
function validateUpdateParameters(req) {
  return function(entity) {
    if (!req.body.parameters) return entity;

    const typeId = req.body.TypeId || entity.TypeId;

    return Type.findById(typeId)
      .then(type => {
        if (!type) return Promise.reject('Type not exist');
        const typeAttributes = type.attrs;
        const assetParameters = req.body.parameters || entity.parameters;
        const parametersKeys = Object.keys(assetParameters);
        const missingParameters = typeAttributes.filter(attr => {
          return parametersKeys.indexOf(attr) == -1;
        });
        if(missingParameters.length) return Promise.reject(`Not all parameters are provided: ${ missingParameters.join(', ')}`);
        return entity;
      })
      .catch(err => Promise.reject(err));

  }
}

/**
 * @function destroy
 * @description Function that delete asset by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Asset.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
