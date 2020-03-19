import http from 'http';
import chai from 'chai';

const expect = chai.expect;

import server from '../dist/app';

describe('Server Ok status', () => {
  it('should return 200', (done) => {
    http.get('http://127.0.0.1:3000', (res) => {
      expect(res.statusCode).to.be.equal(200);
      server.close();
      done();
    });
  });
});
