/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/users              ->  index
 * POST    /api/users              ->  create
 * GET     /api/users/:id          ->  show
 * PUT     /api/users/:id          ->  update
 * DELETE  /api/users/:id          ->  destroy
 */

/**
 * @description User Sequalize Schema
 * @param User
 */
import { User } from '../../config/db.conf';

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
 * @description Function that returns all asset types
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function index(req, res) {
  return User.findAll()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

/**
 * @function show
 * @description Function that returns single user by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function show(req, res) {
  return User.find({
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
 * @description Function that create user by provided request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function create(req, res) {
  return User.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(validationError(res));
}

/**
 * @function update
 * @description Function that update user by provided id in url and updated data in request body
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  return User.find({
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
 * @description Function that delete user by id provided in url
 * @param {Object} req - Express Framework Request Object
 * @param {Object} res - Express Framework Response Object
 */
function destroy(req, res) {
  return User.find({
    where: {
      _id: req.params.id
    }
  })
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}

export default { index, show, create, update, destroy }
