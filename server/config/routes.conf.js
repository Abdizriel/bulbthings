import UserRoutes from '../api/user';
import AssetRoutes from '../api/asset';
import AssetTypeRoutes from '../api/asset-type';
import AssetAttributeRoutes from '../api/asset-attribute';
import AllocationRoutes from '../api/allocation';

export default class Routes {
    static init(app, router) {
      const startTime = new Date();

      UserRoutes.init(router);
      AssetRoutes.init(router);
      AssetTypeRoutes.init(router);
      AssetAttributeRoutes.init(router);
      AllocationRoutes.init(router);

      router.route('/')
        .get((req, res) => {
          const uptime = `${new Date() - startTime}ms`;
          res.status(200).json({ startTime, uptime });
        }
      );

      app.use('/api/', router);
    }
}
