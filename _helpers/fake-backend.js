// array in local storage for registered users
let users        = JSON.parse(localStorage.getItem('users')) || [];
let books        = JSON.parse(localStorage.getItem('books')) || [];
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];


    
export function configureFakeBackend() {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(() => {

                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    // get parameters from post request
                    let params = JSON.parse(opts.body);

                    // find if any user matches login credentials
                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        // if login details are valid return user details and fake jwt token
                        let user = filteredUsers[0];
                        let responseJson = {
                            id: user.id,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            token: 'fake-jwt-token'
                        };
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(responseJson)) });
                    } else {
                        // else return error
                        reject('Username or password is incorrect');
                    }

                    return;
                }

                // get users
                if (url.endsWith('/users') && opts.method === 'GET') {
                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(users))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // get user by id
                if (url.match(/\/users\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedUsers = users.filter(user => { return user.id === id; });
                        let user = matchedUsers.length ? matchedUsers[0] : null;

                        // respond 200 OK with user
                        resolve({ ok: true, text: () => JSON.stringify(user)});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // register user
                if (url.endsWith('/users/register') && opts.method === 'POST') {
                    // get new user object from post body
                    let newUser = JSON.parse(opts.body);

                    // validation
                    let duplicateUser = users.filter(user => { return user.username === newUser.username; }).length;
                    if (duplicateUser) {
                        reject('Username "' + newUser.username + '" is already taken');
                        return;
                    }

                    // save new user
                    newUser.id = users.length ? Math.max(...users.map(user => user.id)) + 1 : 1;
                    users.push(newUser);
                    localStorage.setItem('users', JSON.stringify(users));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // delete user
                if (url.match(/\/users\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < users.length; i++) {
                            let user = users[i];
                            if (user.id === id) {
                                // delete user
                                users.splice(i, 1);
                                localStorage.setItem('users', JSON.stringify(users));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }

                // Add book
                if (url.endsWith('/buku/add') && opts.method === 'POST') {
                    // get new user object from post body
                    let newBook = JSON.parse(opts.body);

                    // validation
                    let duplicateBook = books.filter(book => { return book.judulBuku === newBook.judulBuku; }).length;
                    if (duplicateBook) {
                        reject('Judul Buku "' + newBook.judulBuku + '" is already taken');
                        return;
                    }

                    // save new book
                    newBook.id = books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;
                    books.push(newBook);
                    localStorage.setItem('books', JSON.stringify(books));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }
                
                // Update book
                if (url.match(/\/buku\/\d+$/) && opts.method === 'PUT') {
                    // get new value book from post body
                    let newBook = JSON.parse(opts.body);

                    // get id book
                    let urlParts = url.split('/');
                    let id = parseInt(urlParts[urlParts.length - 1]);

                    // validation duplicate book
                    // let duplicateBook = books.filter(book => { 
                    //     if(book.id != id){
                    //         return book.judulBuku === newBook.judulBuku; 
                    //     }
                    // }).length;

                    // if (duplicateBook) {
                    //     reject('Judul Buku "' + newBook.judulBuku + '" is already taken');
                    //     return;
                    // };

                    // update book
                    books.forEach((book,i) => {
                        if(book.id == id){
                            book.judulBuku = newBook.judulBuku;
                            book.penulisBuku = newBook.penulisBuku;
                            book.tahunTerbit = newBook.tahunTerbit;
                            book.penerbit = newBook.penerbit;
                            book.jenisBuku = newBook.jenisBuku;
                            book.tanggalInput = newBook.tanggalInput;
                            book.sumberBuku = newBook.sumberBuku;
                            book.bukuLama = newBook.bukuLama;
                            book.rakBuku = newBook.rakBuku;
                        }
                    });

                    // update transaction 
                    transactions.forEach((transaction, i) => {
                        if(transaction.idBuku == id){
                            transaction.judulBuku = newBook.judulBuku
                        }
                    })


                    localStorage.setItem('books', JSON.stringify(books));
                    localStorage.setItem('transactions', JSON.stringify(transactions));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }
                                
                // get books
                if (url.endsWith('/buku') && opts.method === 'GET') {
                    //sort book based on tanggal input
                    books.sort((a,b)=>{
                        return new Date(b.tanggalInput) - new Date(a.tanggalInput)
                    });

                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(books))});
                    } else {
                        // return 401 not authorised if token is null or invalid                        
                        reject('Unauthorised');
                    }

                    return;
                }   

                // get book by id
                if (url.match(/\/buku\/\d+$/) && opts.method === 'GET') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        let matchedBooks = books.filter(book => { return book.id === id; });
                        let book = matchedBooks.length ? matchedBooks[0] : null;


                        // respond 200 OK with book
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(book))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }


                // delete book
                if (url.match(/\/buku\/\d+$/) && opts.method === 'DELETE') {
                    // check for fake auth token in header and return user if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        // find user by id in users array
                        let urlParts = url.split('/');
                        let id = parseInt(urlParts[urlParts.length - 1]);
                        for (let i = 0; i < books.length; i++) {
                            let book = books[i];
                            if (book.id === id) {
                                // delete book
                                books.splice(i, 1);
                                localStorage.setItem('books', JSON.stringify(books));
                                break;
                            }
                        }

                        // respond 200 OK
                        resolve({ ok: true, text: () => Promise.resolve() });
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }
                    return;
                }

                // get Transactions
                if (url.endsWith('/transaksi') && opts.method === 'GET') {
                    //sort transaction berdasarkan belum mengembalikan dan tanggal pinjam
                    transactions.sort((a,b)=>{
                        // if(a.tanggalKembali == "" || b.tanggalKembali == "" && a.tanggalPinjam == b.tanggalPinjam) return 0; 
                        if(b.tanggalKembali == "" ) return 1;
                        if(a.tanggalKembali == "" ) return -1; 
                        return new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam)
                        // return  a < b ? -1 : 1  &&  new Date(b.tanggalPinjam) - new Date(a.tanggalPinjam)
                    });

                    // check for fake auth token in header and return users if valid, this security is implemented server side in a real application
                    if (opts.headers && opts.headers.Authorization === 'Bearer fake-jwt-token') {
                        resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(transactions))});
                    } else {
                        // return 401 not authorised if token is null or invalid
                        reject('Unauthorised');
                    }

                    return;
                }   

                // Add Transaction
                if (url.endsWith('/transaksi/add') && opts.method === 'POST') {
                    // get new transaction object from post body
                    let newTransaction = JSON.parse(opts.body);

                    //update status book to Dipinjam
                    books.forEach((book, i) => {
                        if(book.judulBuku == newTransaction.judulBuku){
                            book.status = 'Dipinjam'
                        }
                    })

                    // save new transaction and data book
                    newTransaction.id = transactions.length ? Math.max(...transactions.map(transaction => transaction.id)) + 1 : 1;
                    transactions.push(newTransaction);
                    localStorage.setItem('transactions', JSON.stringify(transactions));

                    localStorage.setItem('books', JSON.stringify(books));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // Update Transaction
                if (url.endsWith('/transaksi') && opts.method === 'PUT') {
                    // get id and tanggal kembali to update transaction
                    let id = JSON.parse(opts.body);
                    let tanggalKembali = new Date().toISOString().slice(0, 10);
                    let judulBuku;

                    //update tanggal kembali data transaction
                    transactions.forEach((transaction, i) => {
                        if(transaction.id == id){
                            transaction.tanggalKembali = tanggalKembali 
                            judulBuku = transaction.judulBuku;
                        }
                        
                    });
                    
                    //update status data book 
                    books.forEach((book, i) => {
                        if(book.judulBuku == judulBuku){
                            book.status = 'Tersedia'
                        }
                    })

                    //update data on localstorage
                    localStorage.setItem('books', JSON.stringify(books));
                    localStorage.setItem('transactions', JSON.stringify(transactions));

                    // respond 200 OK
                    resolve({ ok: true, text: () => Promise.resolve() });

                    return;
                }

                // pass through any requests not handled above
                realFetch(url, opts).then(response => resolve(response));

            }, 500);
        });
    }
}