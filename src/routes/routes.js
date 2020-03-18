import authRoutes from './authRoutes/authRouter';
import jsonPatchRoutes from './jsonPatchRoutes/jsonPatchRouter';
import thumbnailRoutes from './thumbnailRoutes/thumbnailRouter';

const routes = (app) => ({
  login: authRoutes(app),
  jsonPatch: jsonPatchRoutes(app),
  thumbnail: thumbnailRoutes(app)
});

export default routes;
