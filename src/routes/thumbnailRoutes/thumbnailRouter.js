import controller from '../../controllers/controllers';

const { verify, createThumbnail } = controller();

const router = (app) => {
  app.post('/createthumbnail', verify, (req, res) => {
    createThumbnail(req, res);
  });
};

export default router;
