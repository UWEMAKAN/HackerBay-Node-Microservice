import controller from '../../controllers/controllers';

const { authenticate } = controller();

const router = (app) => {
  app.post('/login', (req, res) => {
    const user = req.body;
    const response = authenticate(user);
    return response ? res.json(response) : res.status(500);
  });
};

export default router;
