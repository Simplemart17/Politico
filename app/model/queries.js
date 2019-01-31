const createUsersTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          users(
            id SERIAL PRIMARY KEY,
            firstname VARCHAR(128) NOT NULL,
            lastname VARCHAR(128) NOT NULL,
            othernames VARCHAR(128) NOT NULL,
            email VARCHAR(128) UNIQUE NOT NULL,
            phonenumber BIGINT,
            username VARCHAR(128) UNIQUE NOT NULL,
            registered DATE DEFAULT CURRENT_DATE,
            password VARCHAR(128) NOT NULL,
            passportUrl VARCHAR(128),
            isadmin BOOLEAN DEFAULT FALSE
            
          )`;
  return text;
};
const dropUsersTable = () => 'DROP TABLE IF EXISTS users';

const createPartyTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
          parties(
            id SERIAL PRIMARY KEY,
            createdon DATE DEFAULT CURRENT_DATE,
            name VARCHAR(128) NOT NULL,
            hqAddress VARCHAR(128) NOT NULL,
            logoUrl VARCHAR(128)[]
          )`;
  return text;
};
const dropPartyTable = () => 'DROP TABLE IF EXISTS parties';

const createOfficeTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
            offices(
              id SERIAL PRIMARY KEY,
              createdon DATE DEFAULT CURRENT_DATE,
              type VARCHAR(128) UNIQUE NOT NULL,
              name VARCHAR(128) UNIQUE NOT NULL
            )`;
  return text;
};
const dropOfficeTable = () => 'DROP TABLE IF EXISTS offices';

const createCandidateTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              candidates(
                id SERIAL PRIMARY KEY,
                createdon DATE DEFAULT CURRENT_DATE,
                office_id INTEGER NOT NULL REFERENCES offices (id),
                party_id INTEGER NOT NULL REFERENCES parties (id),
                candidate_id INTEGER NOT NULL REFERENCES users (id)
              )`;
  return text;
};
const dropCandidateTable = () => 'DROP TABLE IF EXISTS candidates';

const createVoteTable = () => {
  const text = `CREATE TABLE IF NOT EXISTS
              votes(
                id SERIAL PRIMARY KEY,
                createdon DATE DEFAULT CURRENT_DATE,
                createdby INTEGER NOT NULL REFERENCES users (id),
                office INTEGER NOT NULL REFERENCES offices (id),
                candidate INTEGER NOT NULL REFERENCES candidates (id)
              )`;
  return text;
};
const dropVoteTable = () => 'DROP TABLE IF EXISTS votes';

const deleteParty = id => ({
  text: 'DELETE FROM party WHERE id = $1',
  values: [id],
});

const addUser = () => `INSERT INTO users(firstname, lastname, othernames, email, phonenumber, username, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

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
  deleteParty,
  addUser,
};
