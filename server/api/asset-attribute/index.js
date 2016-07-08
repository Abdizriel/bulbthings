/**
 * @description Asset Attribute route Controller
 * @param AssetAttributeController
 */
import AssetAttributeController from './asset-attribute.controller.js';
import auth from '../auth';

/**
 * @class AssetAttributeRoutes
 * @classdesc Class that represents Asset Attribute routes
 * @exports AssetAttributeRoutes
 * @default
 */
export default class AssetAttributeRoutes {

  /**
   * @function init
   * @description Init Asset Attribute routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/asset-attributes routes configs
    router.route('/asset-attributes')
      .get(auth.validateApiKey, AssetAttributeController.index)
      .post(auth.validateApiKey, AssetAttributeController.create);

    // /api/asset-attributes/:id routes configs
    router.route('/asset-attributes/:id')
      .get(auth.validateApiKey, AssetAttributeController.show)
      .put(auth.validateApiKey, AssetAttributeController.update)
      .delete(auth.validateApiKey, AssetAttributeController.destroy);
  }
}
