import chai from 'chai';
import controller from './controllers';

const expect = chai.expect;
const { findUser, authenticate, verify, patchJson, createThumbnail } = controller();

describe('Controller methods', () => {
  const user = { username: 'uwemakan@gmail.com', password: 'password' };
  describe('function findUser', () => {
    describe('Valid user', () => {
      it('should return true if user is valid', () => {
        expect(findUser(user)).to.be.equal(true);
      });
    });
    describe('Invalid user', () => {
      it('should return false if user is invalid', () => {
        expect(findUser({ username: '', password: '' })).to.be.equal(false);
      });
    });
  });

  describe('function authenticate: authenticate user and return jwt ', () => {
    describe('authentication success', () => {
      it('should return an object', () => {
        expect(authenticate(user)).to.be.a('object');
      });
      it('should return object with property token', () => {
        expect(authenticate(user)).to.have.property('token');
      });
      it('should return object with property token of type string', () => {
        expect(authenticate(user).token).to.be.a('string');
      });
    });

    describe('authenticate failure', () => {
      it('should return null', () => {
        expect(authenticate({ username: '', password: '' })).to.be.null;
      });
    });
  });

  describe('fuction verify', () => {
    const success = authenticate(user);
    it('should return a valid token', () => {
      expect(success).to.be.a('object');
      expect(success.token).to.be.a('string');
      expect(success.token.split('.').length).to.be.equal(3);
    });
  });
});
