import controller from '../../controllers/controllers';

const { verify, createThumbnail } = controller();

const router = (app) => {
  app.post('/createthumbnail', verify, (req, res) => {
    const { uri, responseType } = req.body;
    createThumbnail(uri, responseType)
      .then((thumbnail) => {
        return res.json({ thumbnail });
      })
      .catch((err) => {
        return res.status(500);
      });
  });
};

export default router;
