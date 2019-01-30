import {
  dropVoteTable, dropCandidateTable, dropOfficeTable, dropPartyTable, dropUsersTable,
} from './queries';
import db from './db';

async function dropAllTables() {
  await db.query(dropVoteTable());
  await db.query(dropCandidateTable());
  await db.query(dropOfficeTable());
  await db.query(dropPartyTable());
  await db.query(dropUsersTable());
}

dropAllTables()
  .then(() => console.log('All tables are dropped'))
  .catch(err => console.log(err));
