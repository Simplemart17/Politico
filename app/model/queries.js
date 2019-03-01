const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            othername VARCHAR(128),
            email VARCHAR(128) UNIQUE NOT NULL,
            phoneNumber VARCHAR(128),
            registered DATE DEFAULT CURRENT_DATE,
            password VARCHAR(128) NOT NULL,
            passportUrl VARCHAR(128),
            isAdmin BOOLEAN DEFAULT FALSE
          )`;
  return text;
};
const dropUsersTable = () => 'DROP TABLE IF EXISTS users';

const createPartyTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          parties(
            id SERIAL PRIMARY KEY,
            createdon DATE DEFAULT CURRENT_DATE,
            name VARCHAR(128) UNIQUE NOT NULL,
            hqAddress VARCHAR(128) NOT NULL,
            logoUrl VARCHAR(128)
          )`;
  return text;
};
const dropPartyTable = () => 'DROP TABLE IF EXISTS parties';

const createOfficeTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
            offices(
              id SERIAL PRIMARY KEY UNIQUE,
              type VARCHAR(128) NOT NULL,
              name VARCHAR(128) UNIQUE NOT NULL
            )`;
  return text;
};
const dropOfficeTable = () => 'DROP TABLE IF EXISTS offices';

const createCandidateTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              candidates(
                id SERIAL UNIQUE,
                createdon DATE DEFAULT CURRENT_DATE,
                status VARCHAR(128) DEFAULT 'vote',
                party INTEGER NOT NULL REFERENCES parties (id),
                office INTEGER NOT NULL REFERENCES offices (id),
                candidate INTEGER NOT NULL REFERENCES users (id),
                PRIMARY KEY (office, candidate)
              )`;
  return text;
};
const dropCandidateTable = () => 'DROP TABLE IF EXISTS candidates';

const createInterestTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              interest(
                id SERIAL UNIQUE,
                createdon DATE DEFAULT CURRENT_DATE,
                status VARCHAR(128) DEFAULT 'pending',
                party INTEGER NOT NULL REFERENCES parties (id),
                office INTEGER NOT NULL REFERENCES offices (id),
                candidate INTEGER UNIQUE NOT NULL REFERENCES users (id),
                PRIMARY KEY (office, candidate)
              )`;
  return text;
};
const dropInterestTable = () => 'DROP TABLE IF EXISTS interest';

const createVoteTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              votes(
                id SERIAL,
                createdOn DATE DEFAULT CURRENT_DATE,
                office INTEGER NOT NULL REFERENCES offices (id),
                party INTEGER REFERENCES parties(id),
                candidate INTEGER NOT NULL REFERENCES users (id),
                voter INTEGER NOT NULL REFERENCES users (id),
                PRIMARY KEY (office, voter)
              )`;
  return text;
};
const dropVoteTable = () => 'DROP TABLE IF EXISTS votes';

const addUser = () => 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';

const newCandidate = () => 'INSERT INTO candidates(party, office, candidate) VALUES($1, $2, $3) RETURNING *';

const candidateInterest = () => 'INSERT INTO interest(party, office, candidate) VALUES($1, $2, $3) RETURNING *';

const newVote = () => 'INSERT INTO votes(office, party, candidate, voter) VALUES($1, $2, $3, $4) RETURNING *';

const newOffice = () => 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *';

const getOffices = () => 'SELECT * FROM offices';

const getOffice = () => 'SELECT * FROM offices WHERE id = $1';

const getParties = () => 'SELECT * FROM parties';

const getParty = () => 'SELECT * FROM parties WHERE id = $1';

const newParty = () => 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *';

const deleteParty = () => 'DELETE FROM parties WHERE id = $1 returning *';

const updateParty = () => 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';

const getUsers = () => 'SELECT * FROM users WHERE id = $1';

const getInterestedCandidate = () => `
SELECT interest.id, 
  users.id AS userid, 
  users.firstname, 
  users.lastname, 
  offices.id AS officeId, 
  offices.name AS officeName, 
  parties.id AS partyId, 
  parties.name AS partyName, 
  interest.status
FROM interest
INNER JOIN users ON users.id = interest.candidate
INNER JOIN parties ON parties.id = interest.party
INNER JOIN offices ON offices.id = interest.office`;

const getRegisteredCandidates = () => `
SELECT candidates.id, 
  users.id AS userid, 
  users.firstname, 
  users.lastname, 
  offices.id AS officeId, 
  offices.name AS officeName,
  offices.type AS officeType, 
  parties.id AS partyId, 
  parties.name AS partyName,
  candidates.status
FROM candidates
INNER JOIN users ON users.id = candidates.candidate
INNER JOIN parties ON parties.id = candidates.party
INNER JOIN offices ON offices.id = candidates.office`;

const updateInterestStatus = () => `
  UPDATE interest 
  SET status = 'registered'
  WHERE office = $1 AND candidate = $2`;

const updateVoteStatus = () => `
  UPDATE candidates
  SET status = 'voted'
  WHERE office = $1 AND candidate =$2`;

const getResults = () => `
SELECT candidate,
  users.id,
  users.firstname, 
  users.lastname,
  offices.name AS officename,
  offices.id AS officeid,
  parties.id AS partiesid,
  parties.logourl,
COUNT (candidate) AS result
FROM votes 
INNER JOIN users ON users.id = votes.candidate
INNER JOIN offices ON offices.id = votes.office
INNER JOIN parties ON parties.id = votes.party
WHERE office = $1
GROUP BY candidate, users.id, offices.name, offices.id, parties.id`;

export {
  createUsersTable,
  dropUsersTable,
  createPartyTable,
  dropPartyTable,
  createOfficeTable,
  dropOfficeTable,
  createCandidateTable,
  dropCandidateTable,
  createInterestTable,
  dropInterestTable,
  createVoteTable,
  dropVoteTable,
  addUser,
  newCandidate,
  candidateInterest,
  newOffice,
  getOffices,
  getOffice,
  getParties,
  newParty,
  deleteParty,
  updateParty,
  getParty,
  newVote,
  getUsers,
  getResults,
  getInterestedCandidate,
  updateInterestStatus,
  getRegisteredCandidates,
  updateVoteStatus,
};
