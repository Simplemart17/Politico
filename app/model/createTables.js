import moment from 'moment';
import {
  createUsersTable, createPartyTable, createOfficeTable, createCandidateTable, createVoteTable,
} from './queries';
import db from './db';

const addAdmin = () => ({
  text: 'INSERT INTO users(firstname, lastname, othernames, username, phoneNumber, email, isAdmin, registered, password) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
  values: ['Sarah', 'Shawn', 'Alex', 'Shawn_alex', '08012345678', 'sarah10@mail.com', 'True', moment(), 'adminadmin'],
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
