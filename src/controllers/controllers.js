import * as jsonpatch from 'fast-json-patch';
import imageThumbnail from 'image-thumbnail';
import authentication from '../middlewares/jwtMiddleware';

const { createToken, verifyToken } = authentication();

const controller = () => {
  const findUser = (user) => {
    const username = /.+/;
    const password = /.+/;
    return username.test(user.username) && password.test(user.password);
  };

  const authenticate = (user) => {
    const isUser = findUser(user)
    return isUser ? createToken(user.username) : null;
  };

  const verify = (req, res, next) => {
    // console.log("req", req);
    console.log("req.headers", req.headers);
    const { authorization } = req.headers;
    console.log('authorization', authorization);
    const token = authorization.split(' ')[1];
    const data = verifyToken(token);
    if (!data) {
      return res.status(500);
    }
    next();
  };

  const validatePatch = (patch, document) => {
    return jsonpatch.validate(patch, document);
  };

  const patchJson = (document, patch) => {
    const isInValid = validatePatch(patch, document);
    if (isInValid) {
      return null;
    }
    return jsonpatch.applyPatch(document, patch).newDocument;
  }

  const createThumbnail = (uri, responseType) => {
    async function getImageThumbnail(){
      const options = { width: 50, height: 50, responseType };
      try {
        return await imageThumbnail({ uri }, options);
      } catch (err) {
        return Promise.reject(Error('resource not found'));
      }
    };

    return getImageThumbnail();
  };

  return {
    findUser,
    authenticate,
    verify,
    validatePatch,
    patchJson,
    createThumbnail
  };
};

export default controller;
