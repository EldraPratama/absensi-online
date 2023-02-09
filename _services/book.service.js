import { authHeader } from '../_helpers';
import { history } from '../_helpers';


export const bookService = {
    add,
    getAll,
    getById,
    update,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/buku`, requestOptions).then(handleResponse);
}

function getById() {
    //get id
    let path = history.location.pathname.split('/');
    let id = parseInt(path[path.length-1]);

    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`/buku/${id}`, requestOptions).then(handleResponse);
}

function add(buku) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buku)
    };

    return fetch(`/buku/add`, requestOptions).then(handleResponse);
}

function update(book) {
    //get id
    let path = history.location.pathname.split('/');
    let id = parseInt(path[path.length-1]);

    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    };

    return fetch(`/buku/${id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`/buku/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}