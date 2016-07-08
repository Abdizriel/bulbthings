import AssetTypeRoutes from '../api/asset';

export default class Routes {
    static init(app, router) {
      const startTime = new Date();

      AssetTypeRoutes.init(router);

      router.route('/')
        .get((req, res) => {
          const uptime = `${new Date() - startTime}ms`;
          res.status(200).json({ startTime, uptime });
        }
      );

      app.use('/api/', router);
    }
}
