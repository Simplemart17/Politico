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
const resetToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU1NjM1MjMwMiwiZXhwIjoxNTU2NDM4NzAyfQ.Si4OxmwLZxzOp3fcebjRSM4YkTAV0xMtgZ_3FnbWshw';

const addAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Martin', 'Abolade', 'Aloba', '08012345678', 'simplemart@gmail.com', 'True', adminPassword, 'wwww.image.com'],
});

const addTestAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
  values: ['Test', 'Database', 'Tester', '08012345678', 'test@politico.com', 'True', testPassword, 'wwww.image.com'],
});

const addTestDetails = () => ({
  text: 'INSERT INTO users(firstname, lastname, othername, phoneNumber, email, isAdmin, password, passportUrl, passwordResetToken) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: ['Test', 'Database', 'Tester', '08012345678', 'reset@politico.com', 'false', testPassword, 'wwww.image.com', resetToken],
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
