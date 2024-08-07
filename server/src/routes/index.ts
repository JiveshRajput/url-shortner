import urlRoutes from './url.route';
import { IExpress } from '../types';
import authRoutes from './auth.route';

const setupRoutes = (app: IExpress, urlPrefix: string = '') => {
  app.use(`${urlPrefix}/url`, urlRoutes);
  app.use(`${urlPrefix}/auth`, authRoutes);
};

export default setupRoutes;
