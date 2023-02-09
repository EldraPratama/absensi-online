import { transactionConstants } from '../_constants';
import { transactionService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const transactionActions = {
    add,
    getAll,
    update,
    // getById,
    // delete: _delete
};

function add(transaction) {
    return dispatch => {
        dispatch(request(transaction));

        transactionService.add(transaction)
            .then(
                transaction => { 
                    dispatch(success());
                    history.push('/transaksi');
                    dispatch(alertActions.success('Add transaction successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(transaction) { return { type: transactionConstants.ADD_REQUEST, transaction } }
    function success(transaction) { return { type: transactionConstants.ADD_SUCCESS, transaction } }
    function failure(error) { return { type: transactionConstants.ADD_FAILURE, error } }
}

function update(id) {
    return dispatch => {
        dispatch(request(id));
        console.log('action' + id)

        transactionService.update(id)
            .then(
                id => { 
                    dispatch(success(id));
                    history.push('/transaksi');
                    dispatch(alertActions.success('Pengembalian transaction successful'));
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(id) { return { type: transactionConstants.UPDATE_REQUEST, id } }
    function success(id) { return { type: transactionConstants.UPDATE_SUCCESS, id } }
    function failure(error) { return { type: transactionConstants.UPDATE_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        transactionService.getAll()
            .then(
                transactions => dispatch(success(transactions)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: transactionConstants.GETALL_REQUEST } }
    function success(transactions) { return { type: transactionConstants.GETALL_SUCCESS, transactions } }
    function failure(error) { return { type: transactionConstants.GETALL_FAILURE, error } }
}

// function getById() {
//     return dispatch => {
//         dispatch(request());

//         bookService.getById()
//             .then(
//                 book => dispatch(success(book)),
//                 error => dispatch(failure(error))
//         );
//     };

//     function request() { return { type: bookConstants.GETBYID_REQUEST } }
//     function success(book) { 
//         // if detail data not found redirect to page buku
//         if(book == null){
//             history.push('/buku')
//         };
//         return { type: bookConstants.GETBYID_SUCCESS, book } 
//     }
//     function failure(error) { return { type: bookConstants.GETBYID_FAILURE, error } }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         bookService.delete(id)
//             .then(
//                 book => { 
//                     dispatch(success(id));
//                     dispatch(alertActions.success('Delete book successful'));
//                 },
//                 error => {
//                     dispatch(failure(id, error));
//                 }
//             );
//     };

//     function request(id) { return { type: bookConstants.DELETE_REQUEST, id } }
//     function success(id) { return { type: bookConstants.DELETE_SUCCESS, id } }
//     function failure(id, error) { return { type: bookConstants.DELETE_FAILURE, id, error } }
// }

