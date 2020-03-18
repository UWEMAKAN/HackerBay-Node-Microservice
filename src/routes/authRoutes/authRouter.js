import controller from '../../controllers/userController';
import authentication from '../../middlewares/jwtMiddleware';

const { verifyToken } = authentication();

const { authenticate } = controller();

const router = (app) => {
  app.post('/login', (req, res) => {
    const user = req.body;
    const response = authenticate(user);
    return response ? res.json(response) : res.status(500);
  });

  app.get('/login', (req, res) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const data = verifyToken(token);
    return res.json({ data });
  });
};

export default router;
