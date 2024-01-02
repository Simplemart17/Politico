import {
  createUsersTable,
  createPartyTable,
  createOfficeTable,
  createCandidateTable,
  createInterestTable,
  createVoteTable,
} from './queries';
import { generateHashPassword } from '../middleware/Helper';
import db from './db';

const adminPassword = generateHashPassword('admin');
const testPassword = generateHashPassword('test');
const resetToken = '687810e6-0b33-4ae1-841d-fb23983a346f';

const addAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Martin', 'Abolade', 'Aloba', '08012345678', 'simplemart@gmail.com', 'True', adminPassword, 'wwww.image.com'],
});

const addTestAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Test', 'Database', 'Tester', '08012345678', 'test@politico.com', 'True', testPassword, 'wwww.image.com'],
});

const addTestDetails = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl, passwordResetToken, passwordResetExpires) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *',
  values: ['Test', 'Database', 'Tester', '08012345678', 'reset@politico.com', 'false', testPassword, 'wwww.image.com', resetToken, new Date('2023-12-12')],
});

async function createAllTables() {
  await db.query(createUsersTable());
  await db.query(createPartyTable());
  await db.query(createOfficeTable());
  await db.query(createCandidateTable());
  await db.query(createInterestTable());
  await db.query(createVoteTable());
  await db.query(addAdmin());
  await db.query(addTestAdmin());
  await db.query(addTestDetails());
}

createAllTables()
  .then(() => console.log('All tables are created'))
  .catch(err => console.log(err));
