import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app/app';
import db from '../app/model/db';
import {
  createUsersTable,
  createPartyTable,
  createOfficeTable,
  createCandidateTable,
  createInterestTable,
  createVoteTable,
  dropCandidateTable,
  dropInterestTable,
  dropOfficeTable,
  dropPartyTable,
  dropUsersTable,
  dropVoteTable,
} from '../app/model/queries';


chai.use(chaiHttp);

const should = chai.should();

process.env.NODE_ENV === 'test';

describe('POLITICO APP TEST', () => {
  before(async () => {
    try {
      await db.query(createUsersTable());
      await db.query(createPartyTable());
      await db.query(createOfficeTable());
      await db.query(createCandidateTable());
      await db.query(createInterestTable());
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
      await db.query(dropInterestTable());
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
    email: 'testmail@gmail.com',
    password: 'mypassword',
  };

  const loginUser = {
    email: 'test@politico.com',
    password: 'test',
  };

  let userToken;
  let token;
  const fakeToken = { token: null };
  const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE1NTE0NDM4NDQsImV4cCI6MTU1MTUzMDI0NH0.Wf-C74JZ2m_b3pccXGIs2SKhH6BBdcE3honkSlGT-8k';
  const resetToken1 = 'edad3fcc-aec0-4ece-af7e-f5867cef14a3';
  const resetToken2 = '687810e6-0b33-4ae1-841d-fb23983a346f';

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
          const { body } = res;
          userToken = body.data[0].token;
          res.should.have.status(201);
          res.should.be.json;
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
          email: 'testmail@gmail.com',
          password: 'mypassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.error.should.equal('Email already exist!');
          done(err);
        });
    });
    it('should return error for empty field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          lastname: 'Aloba',
          email: 'testmail@gmail.com',
          password: 'mypassword',
        })
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
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
          email: 'testing@politico.com',
          password: 'admin',
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.json;
          res.body.error.should.equal('Incorrect email address');
          done(err);
        });
    });
    it('should return error for wrong password', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'simplemart@gmail.com',
          password: 'testing',
        })
        .end((err, res) => {
          res.should.have.status(406);
          res.should.be.json;
          res.body.error.should.equal('Incorrect password!');
          done(err);
        });
    });
    it('should return error for incomplete credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'simplemart@gmail.com',
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.should.be.json;
          res.body.message.should.equal('You are denied access!');
          done(err);
        });
    });
    it('should sign admin in to an account', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(loginUser)
        .end((err, res) => {
          const { body } = res;
          // eslint-disable-next-line prefer-destructuring
          token = body.data[0].token;
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.equal('You have successfully signed in!');
          done(err);
        });
    });
  });

  // Get user
  describe('USER', () => {
    it('should return user detail', (done) => {
      chai.request(app)
        .get('/api/v1/auth/profile')
        .set('token', userToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.message.should.equal('User successfully retrieved!');
          done(err);
        });
    });
    it('should return error for invalid credential', (done) => {
      chai.request(app)
        .get('/api/v1/auth/profile')
        .set('token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          done(err);
        });
    });
  });

  // party test
  describe('Party /GET', () => {
    it('should return error for empty database', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.message.should.equal('No record found!');
          done(err);
        });
    });
  });

  describe('Party /POST', () => {
    it('should CREATE a new political party', (done) => {
      const party1 = {
        name: 'Nigeria Civil Party',
        hqAddress: 'Victoria Island, Abuja',
        logoUrl: 'www.image.com',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', token)
        .send(party1)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.equal('political Party was successfully created!');
          done();
        });
    });
    it('should CREATE another political party', (done) => {
      const newParty = {
        name: 'New Convention Party',
        hqAddress: 'Victoria Island, Lagos',
        logoUrl: 'www.image.com',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.equal('political Party was successfully created!');
          done(err);
        });
    });
    it('should return an error for passing a user token', (done) => {
      const party1 = {
        name: 'Nigeria Another Congress',
        hqAddress: 'Victoria Island, Abuja',
        logoUrl: 'www.image.com',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', userToken)
        .send(party1)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('You cannot access this route!');
          done();
        });
    });
    it('should return error for existing party name', (done) => {
      const newParty = {
        name: 'Nigeria Civil Party',
        hqAddress: 'Victoria Island, Lagos',
        logoUrl: 'www.image.com',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', token)
        .send(newParty)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.equal('Party cannot be created!');
          done(err);
        });
    });
  });

  // Parties test
  describe('Party /GET', () => {
    it('should GET the list of all political parties', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.should.be.a('object');
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
          res.body.error.should.equal('The page cannot be found!');
          done(err);
        });
    });
    it('should return an error for passing an invalid token', (done) => {
      chai.request(app)
        .get('/api/v1/parties')
        .set('token', invalidToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.a.json;
          res.body.error.should.equal('Authentication fails!');
          done(err);
        });
    });
  });

  describe('Party /GET/:id', () => {
    it('should GET a specific political party', (done) => {
      chai.request(app)
        .get('/api/v1/parties/1')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.message.should.equal('Party record retrieved successfully!');
          done(err);
        });
    });
    it('should return error when an id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/parties/4')
        .set('token', token)
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
        .get('/api/v1/parties')
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/parties/1/name')
            .set('token', token)
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
        .get('/api/v1/parties')
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/parties/2/name')
            .set('token', token)
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
        .get('/api/v1/parties')
        .set('token', token)
        .end((err, res) => {
          chai.request(app)
            .patch('/api/v1/parties/10/name')
            .set('token', token)
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
        name: 'Community Rational Party',
        hqAddress: 'Glass House, Abuja',
        logoUrl: '',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', token)
        .send(newParty)
        .end((err, res) => {
          chai.request(app)
            .get('/ap1/v1/parties')
            .end((err, res) => {
              chai.request(app)
                .delete('/api/v1/parties/1')
                .set('token', token)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.json;
                  res.body.data[0].should.have.property('message').equal('Political Party was successfully deleted!');
                  done(err);
                });
            });
        });
    });
    it('should return error when a specific political party is not not found', (done) => {
      const newParty = {
        name: 'Community Rational Party',
        hqAddress: 'Glass House, Abuja',
        logoUrl: '',
      };
      chai.request(app)
        .post('/api/v1/parties')
        .set('token', token)
        .send(newParty)
        .end((err, res) => {
          chai.request(app)
            .get('/ap1/v1/parties')
            .end((err, res) => {
              chai.request(app)
                .delete('/api/v1/parties/6')
                .set('token', token)
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
        .get('/api/v1/offices')
        .set('token', token)
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
        .post('/api/v1/offices')
        .set('token', token)
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
        .post('/api/v1/offices')
        .set('token', token)
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
        .get('/api/v1/offices')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.message.should.equal('Government office lists was successfully retrieved');
          done(err);
        });
    });
  });

  describe('Office /GET/:id', () => {
    it('should GET a specific government office', (done) => {
      chai.request(app)
        .get('/api/v1/offices/1')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.a.json;
          res.body.message.should.equal('Government office was successfully retrieved!');
          done(err);
        });
    });
    it('should return error when an id is not found', (done) => {
      chai.request(app)
        .get('/api/v1/offices/5')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.a.json;
          res.body.message.should.equal('Government office does not exist!');
          done(err);
        });
    });
  });

  // Test for Candidate
  describe('Candidate /POST', () => {
    it('should CREATE a new political party candidate', (done) => {
      chai.request(app)
        .post('/api/v1/candidate/2/register')
        .set('token', token)
        .send({
          party: 2,
          office: 1,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.equal('You have successfully registered as candidate!');
          done(err);
        });
    });
    it('should return error for empty list of interested candidates', (done) => {
      chai.request(app)
        .get('/api/v1/candidates')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.be.json;
          res.body.message.should.equal('No record found!');
          done(err);
        });
    });
    it('should register candidate interest for offices', (done) => {
      chai.request(app)
        .post('/api/v1/candidate/interest')
        .set('token', userToken)
        .send({
          party: 2,
          office: 1,
        })
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.message.should.equal('You have successfully submitted your interest!');
          done(err);
        });
    });
    it('should return an error for registering twice', (done) => {
      chai.request(app)
        .post('/api/v1/candidate/interest')
        .set('token', userToken)
        .send({
          party: 2,
          office: 1,
        })
        .end((err, res) => {
          res.should.have.status(422);
          res.should.be.json;
          res.body.message.should.equal('You are allowed to register only once!');
          done(err);
        });
    });
    it('should return the list of all interested candidates', (done) => {
      chai.request(app)
        .get('/api/v1/candidates')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.data.should.have.length(1);
          res.body.message.should.equal('Lists of candidates successfully retrieved!');
          done(err);
        });
    });
    it('should return the list of all registered candidates', (done) => {
      chai.request(app)
        .get('/api/v1/candidate/registered')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.data.should.have.length(1);
          res.body.message.should.equal('Lists of registered candidates successfully retrieved!');
          done(err);
        });
    });
    it('should return error when token is not provided', (done) => {
      const newCandidate = {
        party: 1,
        office: 1,
      };
      chai.request(app)
        .post('/api/v1/candidate/1/register')
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
        party: 1,
        office: 1,
      };
      chai.request(app)
        .post('/api/v1/candidate/1/register')
        .set('token', fakeToken)
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
        party: 1,
        office: 1,
      };
      chai.request(app)
        .post('/api/v1/candidate/1/register')
        .set('token', token)
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
        party: 2,
        candidate: 1,
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('token', token)
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.data[0].office.should.equal(1);
          res.body.data[0].candidate.should.equal(1);
          res.body.message.should.equal('Your vote successfully submitted!');
          done(err);
        });
    });

    it('should return error when token is not provided', (done) => {
      const newVote = {
        office: 1,
        candidate: 1,
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
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('token', fakeToken)
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
      };
      chai.request(app)
        .post('/api/v1/votes')
        .set('token', token)
        .send(newVote)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.be.json;
          res.body.message.should.equal('You are allowed to vote once for a candidate');
          done(err);
        });
    });
  });

  // Test for vote results
  describe('Vote /GET', () => {
    it('should fetch results for election results', (done) => {
      chai.request(app)
        .get('/api/v1/vote/1/result')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.message.should.equal('Election results was successfully retrieved');
          done(err);
        });
    });
    it('should return error when result cannot be fetched', (done) => {
      chai.request(app)
        .get('/api/v1/vote/2/result')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Result for election not found!');
          done(err);
        });
    });
    it('should return error when token is not provided', (done) => {
      chai.request(app)
        .get('/api/v1/vote/1/result')
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          res.body.error.should.equal('Token is not provided');
          done(err);
        });
    });
    it('should return error when invalid token is provided', (done) => {
      chai.request(app)
        .get('/api/v1/vote/1/result')
        .set('token', fakeToken)
        .end((err, res) => {
          res.should.have.status(403);
          res.should.be.json;
          done(err);
        });
    });
  });

  // Test for forgot password
  describe('FORGOT PASSWORD /POST', () => {
    it('should send password reset instruction', (done) => {
      const payload = { email: 'test@politico.com' };
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send(payload)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal(`Password reset instruction was sent to ${payload.email}`);
          done(err);
        });
    });
    it('should return error when email does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/forgot-password')
        .send({ email: 'mymail@mail.com' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('There is no account with this email address');
          done(err);
        });
    });
  });

  // Test for password reset
  describe('RESET PASSWORD /GET', () => {
    it('should return error for invalid token', (done) => {
      chai.request(app)
        .get('/api/v1/auth/reset-password/49876jkghdfvghj-dguye89063478-efdvuk789')
        .send({ password: 'newpassword' })
        .end((err, res) => {
          res.should.have.status(404);
          res.body.error.should.equal('Invalid verification token, kindly re-authenticate!');
          done(err);
        });
    });
    it('should reset password with right credentials', (done) => {
      chai.request(app)
        .get(`/api/v1/auth/reset-password/${resetToken1}`)
        .send({ password: 'mynewpassword1' })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.message.should.equal('Password was successfully reset');
          done(err);
        });
    });
    it('should return error for expired token', (done) => {
      chai.request(app)
        .get(`/api/v1/auth/reset-password/${resetToken2}`)
        .send({ password: 'mynewpassword1' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.error.should.equal('Token has expired!');
          done(err);
        });
    });
  });
});
