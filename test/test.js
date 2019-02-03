import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';
import db from '../app/model/db';
import {
  createUsersTable,
  createPartyTable,
  createOfficeTable,
  createCandidateTable,
  createVoteTable,
  dropCandidateTable,
  dropOfficeTable,
  dropPartyTable,
  dropUsersTable,
  dropVoteTable,
} from '../app/model/queries';

chai.use(chaiHttp);

const { should } = chai;
should();

describe('POLITICO APP TEST', () => {
  before(async () => {
    try {
      await db.query(createUsersTable());
      await db.query(createPartyTable());
      await db.query(createOfficeTable());
      await db.query(createCandidateTable());
      await db.query(createVoteTable());
      console.log('created tables');
    } catch (error) {
      console.log(error);
    }
  });

  after(async () => {
    try {
      await db.query(dropVoteTable());
      await db.query(dropCandidateTable());
      await db.query(dropOfficeTable());
      await db.query(dropPartyTable());
      await db.query(dropUsersTable());
    } catch (error) {
      console.log(error);
    }
  });

  const newUser = {
    firstname: 'Martins',
    lastname: 'Aloba',
    othernames: 'Crown',
    email: 'crown-mart@gmail.com',
    phonenumber: '08012345678',
    username: 'simplemart',
    password: 'mypassword',
    passportUrl: 'www.image1.com',
    isadmin: true,
  };

  const loginUser = {
    email: 'crown-mart@gmail.com',
    password: 'mypassword',
  };

  let token;
  const fakeToken = { token: null };

  // Homepage test
  describe('HOMEPAGE', () => {
    it('should send welcome message for the app', (done) => {
      chai.request(app)
        .get('/api/v1/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('Welcome to politico');
          done(err);
        });
    });
  });

  // User signup test
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
    it('should return error for existing email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          firstname: 'Martins',
          lastname: 'Aloba',
          othernames: 'Crown',
          email: 'crown-mart@gmail.com',
          phonenumber: '08012345678',
          username: 'ssimplemart',
          password: 'mypassword',
          passportUrl: 'www.image1.com',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Email already exist!');
          done(err);
        });
    });
  });

  // user login
  describe('LOGIN', () => {
    it('should return error for wrong email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'mart@gmail.com',
          password: 'mypassword',
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Incorrect email address');
          done(err);
        });
    });
    it('should return error for wrong password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'crown-mart@gmail.com',
          password: 'password',
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Incorrect password!');
          done(err);
        });
    });
    it('should sign users into an account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginUser)
        .end((err, res) => {
          const { body } = res;
          // eslint-disable-next-line prefer-destructuring
          token = body.data[0].token;
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('You have successfully signed in!');
          done(err);
        });
    });
  });
  // party test
  describe('Party /GET', () => {
    it('should return error for empty database', (done) => {
      chai.request(app)
        .get('/api/v1/party')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('No record found!');
          done(err);
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('political Party was successfully created!');
          done(err);
        });
    });
    it('should CREATE another political party', (done) => {
      const newParty = {
        name: 'New Convention Party',
        hqAddress: 'Victoria Island, Lagos',
        logoUrl: 'www.image.com/image3',
      };
      chai.request(app)
        .post('/api/v1/party')
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('political Party was successfully created!');
          done(err);
        });
    });
    it('should return error for existing party name', (done) => {
      const newParty = {
        name: 'Nigeria Civil Party',
        hqAddress: 'Victoria Island, Lagos',
        logoUrl: 'www.image.com/image3',
      };
      chai.request(app)
        .post('/api/v1/party')
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('Party cannot be created!');
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Name field is required!');
          done(err);
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Enter headquarter address of the party!');
          done(err);
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.should.have.property('error');
          res.body.error.should.equal('Please upload party logo!');
          done(err);
        });
    });
  });

  describe('Party /GET', () => {
    it('should GET the list of all political parties', (done) => {
      chai.request(app)
        .get('/api/v1/party')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.equal('Political Party list was successfully retrieved');
          done(err);
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
          done(err);
        });
    });
  });

  describe('Party /GET/:id', () => {
    it('should GET a specific political party', (done) => {
      chai.request(app)
        .get('/api/v1/party/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.message.should.equal('Party record retrieved successfully!');
          done(err);
        });
    });
    it('should return error when an id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/party/4')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.message.should.equal('Party record does not exist!');
          done(err);
        });
    });
  });

  describe('Party /PATCH', () => {
    it('should edit the name of the party', (done) => {
      const newName = {
        name: 'New Nigeria Consensus',
      };
      chai.request(app)
        .get('/api/v1/party')
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/party/1/name')
            .set('x-access-token', token)
            .send(newName)
            .end((err, res) => {
              res.should.have.status(200);
              res.should.be.json;
              res.body.message.should.equal(`Party name was successfully changed to '${newName.name}'`);
              res.body.should.have.property('data');
              done(err);
            });
        });
    });
    it('should return error for updating with existing name', (done) => {
      const newName = {
        name: 'New Nigeria Consensus',
      };
      chai.request(app)
        .get('/api/v1/party')
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/party/2/name')
            .set('x-access-token', token)
            .send(newName)
            .end((err, res) => {
              res.should.have.status(400);
              res.should.be.json;
              res.body.message.should.equal('Party name cannot be updated!');
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
        .set('x-access-token', token)
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/party/10/name')
            .set('x-access-token', token)
            .send(emptyField)
            .end((err, res) => {
              res.should.have.status(404);
              res.should.be.json;
              res.body.should.have.property('message').equal('Party record cannot be found!');
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          chai.request(app)
            .get('/ap1/v1/party')
            .end((err, res) => {
              chai.request(app)
                .delete('/api/v1/party/1')
                .set('x-access-token', token)
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
        .set('x-access-token', token)
        .send(newParty)
        .end((err, res) => {
          chai.request(app)
            .get('/ap1/v1/party')
            .end((err, res) => {
              chai.request(app)
                .delete('/api/v1/party/6')
                .set('x-access-token', token)
                .end((err, res) => {
                  res.should.have.status(404);
                  res.should.be.json;
                  res.body.should.have.property('message').equal('Political Party record cannot be found!');
                  done(err);
                });
            });
        });
    });
  });

  // Test for office endpoint
  describe('Office /GET', () => {
    it('should return error when there is no record in the database', (done) => {
      chai.request(app)
        .get('/api/v1/office')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('No record found!');
          done(err);
        });
    });
  });

  describe('Office /POST', () => {
    it('should CREATE a new government office', (done) => {
      const newOffice = {
        type: 'Legislative',
        name: 'Senate',
      };
      chai.request(app)
        .post('/api/v1/office')
        .set('x-access-token', token)
        .send(newOffice)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.have.property('data');
          res.body.data[0].type.should.equal('Legislative');
          res.body.data[0].name.should.equal('Senate');
          done(err);
        });
    });
    it('should return error when office cannot be created', (done) => {
      const newOffice = {
        type: 'Legislative',
        name: 'Senate',
      };
      chai.request(app)
        .post('/api/v1/office')
        .set('x-access-token', token)
        .send(newOffice)
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.message.should.equal('Office cannot be created!');
          done(err);
        });
    });
  });

  describe('Office /GET', () => {
    it('should GET the list of all government office', (done) => {
      chai.request(app)
        .get('/api/v1/office')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.should.have.property('message');
          res.body.message.should.equal('Government office lists was successfully retrieved');
          done(err);
        });
    });
  });

  describe('Office /GET/:id', () => {
    it('should GET a specific government office', (done) => {
      chai.request(app)
        .get('/api/v1/office/1')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.message.should.equal('Government office was successfully retreived!');
          done(err);
        });
    });
    it('should return error when an id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/office/5')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.message.should.equal('Governmenent office does not exist!');
          done(err);
        });
    });
  });

  // Test for Candidate
  describe('Candidate /POST', () => {
    it('should CREATE a new political party candidate', (done) => {
      const newCandidate = {
        office: 1,
        candidate: 1,
      };
      chai.request(app)
        .post('/api/v1/office/1/register')
        .set('x-access-token', token)
        .send(newCandidate)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.data[0].office.should.equal(1);
          res.body.data[0].user.should.equal(1);
          res.body.message.should.equal('You have successfully registered as candidate!');
          done(err);
        });
    });

    it('should return error when token is not provided', (done) => {
      const newCandidate = {
        office: 1,
        candidate: 1,
      };
      chai.request(app)
        .post('/api/v1/office/1/register')
        .send(newCandidate)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('Token is not provided');
          done(err);
        });
    });
    it('should return error when invalid token is provided', (done) => {
      const newCandidate = {
        office: 1,
        candidate: 1,
      };
      chai.request(app)
        .post('/api/v1/office/1/register')
        .set('x-access-token', fakeToken)
        .send(newCandidate)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('Authentication fails!');
          done(err);
        });
    });
    it('should return error when the information is not processed', (done) => {
      const newCandidate = {
        office: 1,
        candidate: 1,
      };
      chai.request(app)
        .post('/api/v1/office/1/register')
        .set('x-access-token', token)
        .send(newCandidate)
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.message.should.equal('The submission was not accepted!');
          done(err);
        });
    });
  });

  // Test for Voting candidate
  describe('Vote /POST', () => {
    it('submit vote for a candidate', (done) => {
      const newVote = {
        office: 1,
        candidate: 1,
        voter: 1,
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-access-token', token)
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.data[0].office.should.equal(1);
          res.body.data[0].candidate.should.equal(1);
          res.body.data[0].voter.should.equal(1);
          res.body.message.should.equal('Your vote successfully submitted!');
          done(err);
        });
    });

    it('should return error when token is not provided', (done) => {
      const newVote = {
        office: 1,
        candidate: 1,
        voter: 1,
      };
      chai.request(app)
        .post('/api/v1/votes')
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('Token is not provided');
          done(err);
        });
    });
    it('should return error when invalid token is provided', (done) => {
      const newVote = {
        office: 1,
        candidate: 1,
        voter: 1,
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-access-token', fakeToken)
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          done(err);
        });
    });
    it('should return error when the information is not processed', (done) => {
      const newVote = {
        office: 1,
        candidate: 1,
        voter: 1,
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('x-access-token', token)
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.equal('Submission fails!');
          done(err);
        });
    });
  });

  // Test for vote results
  describe('Vote /GET', () => {
    it('should fetch results for election results', (done) => {
      chai.request(app)
        .get('/api/v1/office/1/result')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('Election results was successfully retrieved');
          done(err);
        });
    });
    it('should return error when result cannot be fetched', (done) => {
      chai.request(app)
        .get('/api/v1/office/2/result')
        .set('x-access-token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Result for election not found!');
          done(err);
        });
    });
    it('should return error when token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/office/1/result')
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('Token is not provided');
          done(err);
        });
    });
    it('should return error when invalid token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/office/1/result')
        .set('x-access-token', fakeToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          done(err);
        });
    });
  });
});
