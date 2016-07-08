import UserRoutes from '../api/user';

export default class Routes {
    static init(app, router) {
      const startTime = new Date();

      UserRoutes.init(router);

      router.route('/')
        .get((req, res) => {
          const uptime = `${new Date() - startTime}ms`;
          res.status(200).json({ startTime, uptime });
        }
      );

      app.use('/api/', router);
    }
}
