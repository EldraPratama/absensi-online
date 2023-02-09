import { transactionConstants } from '../_constants';

export function transactions(state = {}, action) {
  switch (action.type) {
    case transactionConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case transactionConstants.GETALL_SUCCESS:
      return {
        items: action.transactions
      };
    case transactionConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case transactionConstants.GETBYID_REQUEST:
      return {
        loading: true
      };
    case transactionConstants.GETBYID_SUCCESS:
      return {
        item: action.transaction
      };
    case transactionConstants.GETBYID_FAILURE:
      return { 
        error: action.error
      };
    case transactionConstants.DELETE_REQUEST:
      // add 'deleting:true' property to transaction being deleted
      return {
        ...state,
        items: state.items.map(transaction =>
          transaction.id === action.id
            ? { ...transaction, deleting: true }
            : transaction
        )
      };
    case transactionConstants.DELETE_SUCCESS:
      // remove deleted transaction from state
      return {
        items: state.items.filter(transaction => transaction.id !== action.id)
      };
    case transactionConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to transaction 
      return {
        ...state,
        items: state.items.map(transaction => {
          if (transaction.id === action.id) {
            // make copy of transaction without 'deleting:true' property
            const { deleting, ...transactionCopy } = transaction;
            // return copy of transaction with 'deleteError:[error]' property
            return { ...transactionCopy, deleteError: action.error };
          }

          return transaction;
        })
      };
    default:
      return state
  }
}