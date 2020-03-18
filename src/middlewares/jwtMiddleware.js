import jwt from 'jsonwebtoken';

import jwtSecret from '../config/jwtConfig';

const authentication = () => {
  const createToken = (user) => {
    const token = jwt.sign({ username: user.username }, jwtSecret);
    return { success: true, token };
  };

  const verifyToken = (token) => {
    const decoded = jwt.verify(token, jwtSecret);
    return { success: true, data: decoded };
  };

  return {
    createToken,
    verifyToken
  };
};

export default authentication;
