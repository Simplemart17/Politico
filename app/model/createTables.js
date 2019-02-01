import {
  createUsersTable, createPartyTable, createOfficeTable, createCandidateTable, createVoteTable,
} from './queries';
import { generateHashPassword } from '../middleware/Helper';
import db from './db';

const adminPassword = generateHashPassword('admin');

const addAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othernames, username, phoneNumber, email, isAdmin, password, passportUrl) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: ['Martin', 'Abolade', 'Aloba', 'Marts123', '08012345678', 'simplemart@gmail.com', 'True', adminPassword, 'wwww.image.com'],
});

async function createAllTables() {
  await db.query(createUsersTable());
  await db.query(createPartyTable());
  await db.query(createOfficeTable());
  await db.query(createCandidateTable());
  await db.query(createVoteTable());
  await db.query(addAdmin());
}

createAllTables()
  .then(() => console.log('All tables are created'))
  .catch(err => console.log(err));
