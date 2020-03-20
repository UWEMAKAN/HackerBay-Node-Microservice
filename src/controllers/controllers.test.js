import chai from 'chai';
import nodemock from 'node-mocks-http';
import controller from './controllers';

const expect = chai.expect;
const { findUser, authenticate, verify, validatePatch, patchJson } = controller();

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
    const req = nodemock.createRequest({
      headers: {
          "Content-Type": "application/json",
          authorization: 'Bearer ' + success.token
      }
    });
    const res = nodemock.createResponse();
    it('should return status code 200', () => {
      verify(req, res, (err) => {
        expect(res.statusCode).to.be.equal(200);
        expect(err).to.be.undefined;
      });
    });
  });

  const document = {
    "firstName": "Daniel",
    "contactDetails": {
      "phoneNumbers": []
    }
  };
  const patch = [
    { "op": "replace", "path": "/firstName", "value": "Uwem" },
    { "op": "add", "path": "/lastName", "value": "Nkereuwem" },
    { "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "+2348065556884" }  }
  ];
  const invalidPatch = [
    { "op": "replace", "path": "/first", "value": "Uwem" },
    { "op": "add", "path": "lastName", "value": "Nkereuwem" },
    { "op": "add", "path": "/contactDetails/phoneNumbers/0", "value": { "number": "+2348065556884" }  }
  ];

  describe('function validatePatch', () => {
    describe('valid patch document', () => {
      it('should return null', () => {
        expect(validatePatch(patch, document)).to.be.undefined;
      });
    });
    describe('invalid patch document', () => {
      it('should return null', () => {
        expect(validatePatch(invalidPatch, document)).not.to.be.undefined;
      });
    });
  });

  describe('function patchJson', () => {
    describe('json patch success', () => {
      it('should return patched json document', () => {
        const patchedDocument = patchJson(document, patch);
        expect(patchedDocument).to.be.a('object');
        expect(patchedDocument.firstName).to.be.equal('Uwem');
        expect(patchedDocument).to.have.property('lastName').and.to.be.a('string');
        expect(patchedDocument.contactDetails).to.be.a('object').and.to.have.property('phoneNumbers');
        expect(patchedDocument.contactDetails.phoneNumbers).to.be.a('array').and.to.have.length(1);
      });
    });
  });
});
