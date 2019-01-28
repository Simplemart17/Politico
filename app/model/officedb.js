import moment from 'moment';

moment().format();


const data = [
  {
    id: 1,
    type: 'Federal',
    name: 'President',
    createdOn: moment(),
  },
  {
    id: 2,
    type: 'State',
    name: 'Governor',
    createdOn: moment(),
  },
];

export default data;
