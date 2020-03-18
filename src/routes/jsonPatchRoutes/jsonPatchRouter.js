import controller from '../../controllers/controllers';

const { verify, patchJson } = controller();

const router = (app) => {
  app.patch('/jsonpatch', verify, (req, res) => {
    const { document, patch } = req.body;
    const patchedDocument = patchJson(document, patch);
    return res.json({ patchedDocument });
  });
};

export default router;
