import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';

chai.use(chaiHttp);

const { should } = chai.should();

describe('Party /GET', () => {
  it('should GET the list of all political parties', (done) => {
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Political Party list was successfully retrieved')
        done();
      });
  });
  it('should return error for invalid address', (done) => {
    chai.request(app)
      .get('/api/v')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('The page cannot be found!');
        done();
      });
  });
});

describe('Party /GET/:id', () => {
  it('should GET a specific political party', (done) => {
    chai.request(app)
      .get('/api/v1/party/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Party record retrieved successfully!');
        done();
      });
  });
  it('should return error when an id is not found', (done) => {
    const id = 'none';
    chai.request(app)
      .get(`/api/v1/party/${id}`)
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('Party record does not exist!');
        done();
      });
  });
});

describe('Party /POST', () => {
  it('should CREATE a new political party', (done) => {
    const newParty = {
      name: 'Nigeria Civil Party',
      hqAddress: 'Victoria Island, Lagos',
      logoUrl: 'www.image.com/image3',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('name');
        res.body.data.name.should.equal('Nigeria Civil Party');
        res.body.data.should.have.property('hqAddress');
        res.body.data.hqAddress.should.equal('Victoria Island, Lagos');
        res.body.data.should.have.property('logoUrl');
        res.body.data.logoUrl.should.equal('www.image.com/image3');
        done();
      });
  });
  it('should return error for name field is empty', (done) => {
    const newParty = {
      name: ' ',
      hqAddress: 'Victoria Island, Lagos',
      logoUrl: 'www.image.com/image3',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('Name field is required!');
        done();
      });
  });
  it('should return error for headquarter field is empty', (done) => {
    const newParty = {
      name: 'Community Pational Party',
      hqAddress: '',
      logoUrl: 'www.image.com/image3',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('Enter headquarter address of the party!');
        done();
      });
  });
  it('should return error for logo field is empty', (done) => {
    const newParty = {
      name: 'Community Pational Party',
      hqAddress: 'Glass House, Abuja',
      logoUrl: '',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('Please upload party logo!');
        done();
      });
  });
});
