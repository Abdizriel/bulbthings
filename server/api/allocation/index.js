/**
 * @description Allocation route Controller
 * @param AllocationController
 */
import AllocationController from './allocation.controller.js';
import auth from '../auth';

/**
 * @class AllocationRoutes
 * @classdesc Class that represents Allocation routes
 * @exports AllocationRoutes
 * @default
 */
export default class AllocationRoutes {

  /**
   * @function init
   * @description Init Allocation routes for Express router
   * @param {Router} router - Express Framework Router
   * @static
   */
  static init(router) {

    // /api/allocations routes configs
    router.route('/allocations')
      .get(auth.validateApiKey, AllocationController.index)
      .post(auth.validateApiKey, AllocationController.create);

    // /api/allocations/:id routes configs
    router.route('/allocations/:id')
      .put(auth.validateApiKey, AllocationController.update)
      .delete(auth.validateApiKey, AllocationController.destroy);
  }
}
