import AssetRoutes from '../api/asset';

export default class Routes {
    static init(app, router) {
      const startTime = new Date();

      AssetRoutes.init(router);

      router.route('/')
        .get((req, res) => {
          const uptime = `${new Date() - startTime}ms`;
          res.status(200).json({ startTime, uptime });
        }
      );

      app.use('/api/', router);
    }
}
