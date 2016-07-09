/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';
import UserRoutes from './api/user';
import AssetRoutes from './api/asset';
import TypeRoutes from './api/type';
import AllocationRoutes from './api/allocation';

export default function(app) {

  // Insert routes below
  app.use('/api/users', UserRoutes);
  app.use('/api/assets', AssetRoutes);
  app.use('/api/types', TypeRoutes);
  app.use('/api/allocations', AllocationRoutes);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
