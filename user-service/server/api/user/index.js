/**
 * @description User route Controller
 * @param UserController
 */
import UserController from './user.controller';
import auth from '../auth';

/**
 * @class UserRoutes
 * @classdesc Class that represents User routes
 * @exports UserRoutes
 * @default
 */
export default class UserRoutes {

  /**
   * @function init
   * @description Init User routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/users routes configs
    router.route('/users')
      .get(auth.validateApiKey, UserController.index)
      .post(auth.validateApiKey, UserController.create);

    // /api/users/:id routes configs
    router.route('/users/:id')
      .get(auth.validateApiKey, UserController.show)
      .put(auth.validateApiKey, UserController.update)
      .delete(auth.validateApiKey, UserController.destroy);
  }
}
