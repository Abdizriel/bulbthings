/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/types              ->  index
 * POST    /api/types              ->  create
 * GET     /api/types/:id          ->  show
 * PUT     /api/types/:id          ->  update
 * DELETE  /api/types/:id          ->  destroy
 */

/**
 * @description Type Sequalize Schema
 * @param Type
 */
import { Type } from '../../sqldb';

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
 * @description Function that returns all types
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function index(req, res) {
  return Type.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single type by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function show(req, res) {
  return Type.find({
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
 * @description Function that create type by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function create(req, res) {
  return Type.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

/**
 * @function update
 * @description Function that update type by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return Type.find({
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
 * @description Function that delete type by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
export function destroy(req, res) {
  return Type.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
