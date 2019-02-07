import {
  createUsersTable, createPartyTable, createOfficeTable, createCandidateTable, createVoteTable,
} from './queries';
import { generateHashPassword } from '../middleware/Helper';
import db from './db';

const adminPassword = generateHashPassword('admin');
const testPassword = generateHashPassword('test');

const addAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Martin', 'Abolade', 'Aloba', '08012345678', 'simplemart@gmail.com', 'True', adminPassword, 'wwww.image.com'],
});

const addTestAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Test', 'Database', 'Tester', '08012345678', 'test@politico.com', 'True', testPassword, 'wwww.image.com'],
});

async function createAllTables() {
  await db.query(createUsersTable());
  await db.query(createPartyTable());
  await db.query(createOfficeTable());
  await db.query(createCandidateTable());
  await db.query(createVoteTable());
  await db.query(addAdmin());
  await db.query(addTestAdmin());
}

createAllTables()
  .then(() => console.log('All tables are created'))
  .catch(err => console.log(err));
