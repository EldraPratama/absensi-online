import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { transactions } from './transactions.reducer';
import { users } from './users.reducer';
import { books } from './books.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  transactions,
  books,
  alert
});

export default rootReducer;