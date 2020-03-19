import * as jsonpatch from 'fast-json-patch';
import imageThumbnail from 'image-thumbnail';
import authentication from '../middlewares/jwtMiddleware';

const { createToken, verifyToken } = authentication();
const controller = () => {
  const authenticate = (user) => {
    const username = /.+/;
    const password = /.+/;
    const isUser = username.test(user.username) && password.test(user.password);
    return isUser ? createToken(user.username) : null;
  };

  const verify = (req, res, next) => {
    const { authorization } = req.headers;
    const token = authorization.split(' ')[1];
    const data = verifyToken(token);
    if (!data) {
      return res.status(500);
    }
    next();
  };

  const patchJson = (document, patch) => jsonpatch.applyPatch(document, patch).newDocument;

  const createThumbnail = (req, res) => {
    const { uri } = req.body;
    const options = { width: 50, height: 50, responseType: 'base64' };
    (async function getImageThumbnail() {
      try {
        const thumbnail = await imageThumbnail({ uri }, options);
        return res.json({ thumbnail });
      } catch (err) {
        return res.status(500);
      }
    }());
  };

  return {
    authenticate,
    verify,
    patchJson,
    createThumbnail
  };
};

export default controller;
