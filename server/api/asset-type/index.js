/**
 * @description AssetType route Controller
 * @param AssetTypeController
 */
import AssetTypeController from './asset-type.controller.js';
import auth from '../auth';

/**
 * @class AssetTypeRoutes
 * @classdesc Class that represents AssetType routes
 * @exports AssetTypeRoutes
 * @default
 */
export default class AssetTypeRoutes {

  /**
   * @function init
   * @description Init AssetType routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/assets routes configs
    router.route('/asset-types')
      .get(auth.validateApiKey, AssetTypeController.index)
      .post(auth.validateApiKey, AssetTypeController.create);

    // /api/assets/:id routes configs
    router.route('/asset-types/:id')
      .get(auth.validateApiKey, AssetTypeController.show)
      .put(auth.validateApiKey, AssetTypeController.update)
      .delete(auth.validateApiKey, AssetTypeController.destroy);
  }
}
