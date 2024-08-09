import urlRoutes from './url.route';
import authRoutes from './auth.route';
import { IExpress } from '../types';

const setupRoutes = (app: IExpress, urlPrefix: string = '') => {
  app.use(`${urlPrefix}/url`, urlRoutes);
  app.use(`${urlPrefix}/auth`, authRoutes);
};

export default setupRoutes;
