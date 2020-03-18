import authRoutes from './authRoutes/authRouter';

const routes = (app) => ({ login: authRoutes(app) });

export default routes;
