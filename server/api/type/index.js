/**
 * @description Type route Controller
 * @param TypeController
 */
import TypeController from './type.controller.js';
import auth from '../auth';

/**
 * @class TypeRoutes
 * @classdesc Class that represents Type routes
 * @exports TypeRoutes
 * @default
 */
export default class TypeRoutes {

  /**
   * @function init
   * @description Init Type routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/types routes configs
    router.route('/types')
      .get(auth.validateApiKey, TypeController.index)
      .post(auth.validateApiKey, TypeController.create);

    // /api/types/:id routes configs
    router.route('/types/:id')
      .get(auth.validateApiKey, TypeController.show)
      .put(auth.validateApiKey, TypeController.update)
      .delete(auth.validateApiKey, TypeController.destroy);
  }
}
