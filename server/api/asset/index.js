/**
 * @description Asset route Controller
 * @param AssetController
 */
import AssetController from './asset.controller.js';
import auth from '../auth';

/**
 * @class AssetRoutes
 * @classdesc Class that represents Asset routes
 * @exports AssetRoutes
 * @default
 */
export default class AssetRoutes {

  /**
   * @function init
   * @description Init Asset routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/assets routes configs
    router.route('/assets')
      .get(auth.validateApiKey, AssetController.index)
      .post(auth.validateApiKey, AssetController.create);

    // /api/assets/:id routes configs
    router.route('/assets/:id')
      .get(auth.validateApiKey, AssetController.show)
      .put(auth.validateApiKey, AssetController.update)
      .delete(auth.validateApiKey, AssetController.destroy);
  }
}
