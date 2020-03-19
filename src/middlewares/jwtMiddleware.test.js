import chai from 'chai';
import authentication from './jwtMiddleware';

const expect = chai.expect;

const { createToken, verifyToken } = authentication();

describe('Authenticating the api consumer using Json Web Token', () => {
  let obj;
  const username = 'uwemakan@gmail.com';
  describe('function createToken', () => {
    obj = createToken(username);
    it('should return an object', () => {
      expect(obj).to.be.a('object');
    });
    it('should return an object with property token', () => {
      expect(obj).to.have.property('token');
    });
    it('should return an object with property token of type string', () => {
      expect(obj.token).to.be.a('string');
    });
  });

  describe('function verifyToken', () => {
    const validToken = obj.token;
    const invalidToken = obj.token.split('.').join('');
    describe('with validToken', () => {
      it('should return object', () => {
        expect(verifyToken(validToken)).to.be.a('object');
      });
      it('object should have property data', () => {
        expect(verifyToken(validToken)).to.have.property('data');
      });
      it('data should be of type object and have properties username and iat', () => {
        expect(verifyToken(validToken).data).to.be.a('object')
        expect(verifyToken(validToken).data).to.have.property('username');
        expect(verifyToken(validToken).data).to.have.property('iat');
      });
      it('data.username should have same value as username', () => {
        expect(verifyToken(validToken).data.username).to.be.equal(username);
      });
    });
  });
});
