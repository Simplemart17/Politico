const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            othername VARCHAR(128) NOT NULL,
            email VARCHAR(128) UNIQUE NOT NULL,
            phoneNumber BIGINT,
            username VARCHAR(128) NOT NULL,
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
                party INTEGER NOT NULL REFERENCES parties (id),
                office INTEGER NOT NULL REFERENCES offices (id),
                candidate INTEGER NOT NULL REFERENCES users (id),
                PRIMARY KEY (office, candidate)
              )`;
  return text;
};
const dropCandidateTable = () => 'DROP TABLE IF EXISTS candidates';

const createVoteTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              votes(
                id SERIAL,
                createdOn DATE DEFAULT CURRENT_DATE,
                office INTEGER NOT NULL REFERENCES offices (id),
                candidate INTEGER NOT NULL REFERENCES candidates (id),
                voter INTEGER NOT NULL REFERENCES users (id),
                PRIMARY KEY (office, voter)
              )`;
  return text;
};
const dropVoteTable = () => 'DROP TABLE IF EXISTS votes';

const addUser = () => 'INSERT INTO users(firstname, lastname, othername, email, phoneNumber, username, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';

const newCandidate = () => 'INSERT INTO candidates(party, office, candidate) VALUES($1, $2, $3) RETURNING *';

const newVote = () => 'INSERT INTO votes(office, candidate, voter) VALUES($1, $2, $3) RETURNING *';

const newOffice = () => 'INSERT INTO offices(type, name) VALUES($1, $2) RETURNING *';

const getOffices = () => 'SELECT * FROM offices';

const getOffice = () => 'SELECT * FROM offices WHERE id = $1';

const getParties = () => 'SELECT * FROM parties';

const getParty = () => 'SELECT * FROM parties WHERE id = $1';

const newParty = () => 'INSERT INTO parties(name, hqAddress, logoUrl) VALUES($1, $2, $3) RETURNING *';

const deleteParty = () => 'DELETE FROM parties WHERE id = $1 returning *';

const updateParty = () => 'UPDATE parties SET name = $1 WHERE id = $2 RETURNING *';

const getUsers = () => 'SELECT * FROM users WHERE id = $1';

const getResults = () => `SELECT candidate, COUNT (candidate) AS result
FROM votes
WHERE office = $1
GROUP BY candidate`;

export {
  createUsersTable,
  dropUsersTable,
  createPartyTable,
  dropPartyTable,
  createOfficeTable,
  dropOfficeTable,
  createCandidateTable,
  dropCandidateTable,
  createVoteTable,
  dropVoteTable,
  addUser,
  newCandidate,
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
};
