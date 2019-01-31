import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';
import db from '../app/model/db';

chai.use(chaiHttp);

const { should } = chai.should();

const newUser = {
  firstname: 'Martins',
  lastname: 'Aloba',
  othernames: 'Crown',
  email: 'crown-mart@gmail.com',
  phonenumber: '08012345678',
  username: 'simplemart',
  password: 'password',
  passportUrl: 'www.image1.com',
};

// User signin test
describe('SIGNUP', () => {
  it('should create new user account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/signup')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('You have successfully registered!');
        done(err);
      });
  });
});

// user login
describe('LOGIN', () => {
  it('should sign users into an account', (done) => {
    chai.request(app)
      .post('/api/v1/auth/login')
      .send(newUser)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('You have successfully signed in!');
        done(err);
      });
  });
});

describe('Party /GET', () => {
  it('should GET the list of all political parties', (done) => {
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Political Party list was successfully retrieved');
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
        res.body.data[0].name.should.equal('Nigeria Civil Party');
        res.body.data.should.have.property('hqAddress');
        res.body.data[0].hqAddress.should.equal('Victoria Island, Lagos');
        res.body.data.should.have.property('logoUrl');
        res.body.data[0].logoUrl.should.equal('www.image.com/image3');
        done(err);
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

describe('Party /PATCH', () => {
  it('should edit the name of the party', (done) => {
    const newName = {
      name: 'New nigeria Consensus',
    };
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        chai.request(app)
          .patch('/api/v1/party/1/name')
          .send(newName)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.have.property('message');
            res.body.message.should.equal(`Party name was successfully changed to '${newName.name}'`);
            res.body.should.have.property('data');
            res.body.data.should.be.a('object');
            done(err);
          });
      });
  });
  it('should return error when name field is empty', (done) => {
    const emptyField = {
      name: '',
    };
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        chai.request(app)
          .patch('/api/v1/party/1/name')
          .send(emptyField)
          .end((err, res) => {
            res.should.have.status(400);
            res.should.be.json;
            res.body.should.have.property('error').equal('name field is required!');
            done(err);
          });
      });
  });
  it('should return error when party record is not found', (done) => {
    const emptyField = {
      name: 'Nigeria America Party',
    };
    chai.request(app)
      .get('/api/v1/party')
      .end((err, res) => {
        chai.request(app)
          .patch('/api/v1/party/10/name')
          .send(emptyField)
          .end((err, res) => {
            res.should.have.status(404);
            res.should.be.json;
            res.body.should.have.property('error').equal('Party record cannot be found!');
            done(err);
          });
      });
  });
});

describe('Party /DELETE/:id', () => {
  it('should delete a specific political party from the database', (done) => {
    const newParty = {
      name: 'Community Pational Party',
      hqAddress: 'Glass House, Abuja',
      logoUrl: '',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        chai.request(app)
          .get('/ap1/v1/party')
          .end((err, res) => {
            chai.request(app)
              .delete('/api/v1/party/1')
              .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message').equal('Political Party was successfully deleted!');
                done(err);
              });
          });
      });
  });
  it('should return error when a specific political party is not not found', (done) => {
    const newParty = {
      name: 'Community Pational Party',
      hqAddress: 'Glass House, Abuja',
      logoUrl: '',
    };
    chai.request(app)
      .post('/api/v1/party')
      .send(newParty)
      .end((err, res) => {
        chai.request(app)
          .get('/ap1/v1/party')
          .end((err, res) => {
            chai.request(app)
              .delete('/api/v1/party/6')
              .end((err, res) => {
                res.should.have.status(404);
                res.should.be.json;
                res.body.should.have.property('error').equal('Political Party record cannot be found!');
                done(err);
              });
          });
      });
  });
});

// Test for office endpoint
describe('Party /POST', () => {
  it('should CREATE a new political party', (done) => {
    const newOffice = {
      type: 'Legislative',
      name: 'Senate',
    };
    chai.request(app)
      .post('/api/v1/office')
      .send(newOffice)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.have.property('data');
        res.body.data.should.be.a('object');
        res.body.data.should.have.property('type').equal('Legislative');
        res.body.data.should.have.property('name').equal('Senate');
        done();
      });
  });
});

describe('Office /GET', () => {
  it('should GET the list of all government office', (done) => {
    chai.request(app)
      .get('/api/v1/office')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.equal('Government office lists was successfully retrieved');
        done();
      });
  });
});

describe('Office /GET/:id', () => {
  it('should GET a specific government office', (done) => {
    chai.request(app)
      .get('/api/v1/office/1')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.a.json;
        res.body.should.have.property('message');
        res.body.message.should.equal('Government office was successfully retreived!');
        done();
      });
  });
  it('should return error when an id is not found', (done) => {
    chai.request(app)
      .get('/api/v1/office/5')
      .end((err, res) => {
        res.should.have.status(404);
        res.should.be.a.json;
        res.body.should.have.property('error');
        res.body.error.should.equal('Governmenent office does not exist!');
        done();
      });
  });
});
