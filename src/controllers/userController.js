import authentication from '../middlewares/jwtMiddleware';

const { createToken } = authentication();
const controller = () => {
  const authenticate = (user) => {
    const username = /.+/;
    const password = /.+/;
    const isUser = username.test(user.username) && password.test(user.password);
    return isUser ? createToken(user) : null;
  };

  return {
    authenticate
  };
};

export default controller;
