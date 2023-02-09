import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions, bookActions, transactionActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getUsers();
        this.props.getBooks();
        this.props.getTransactions();
    }

    handleDeleteUser(id) {
        return (e) => this.props.deleteUser(id);
    }

    render() {
        const { user, users, books, transactions } = this.props;

        //make variable to store total book, total book dipinjam, total book tersedia

        let totalBooks, booksTersedia, booksDipinjam;
        if(books.items){
            totalBooks    = books.items.length
            booksDipinjam = books.items.filter(book => { return book.status == 'Dipinjam'; }).length
            booksTersedia = books.items.filter(book => { return book.status == 'Tersedia'; }).length
        }

        //make variable to store total transaction, total transaction dipinjam, total transaction tersedia
        let totalTransactions, transactionsDipinjam, transactionsDikembalikan
        if(transactions.items){
            totalTransactions = transactions.items.length
            transactionsDipinjam = transactions.items.filter(data => { return data.tanggalKembali == ''; }).length;
            transactionsDikembalikan = transactions.items.filter(data => { return data.tanggalKembali != ''; }).length;
        }
        return (
            books.items && transactions.items
            ?
                <div className="col-md-12">
                    <div className="row justify-content-center">
                        {/* <img src="https://images.app.goo.gl/yXnHGJgL9zSH3NnD8" alt="Perpustakaan"/> */}
                        <h1 className="text-center">Selamat Datang di Perpustakaan Online</h1>
                        <div className="row mt-5 text-center">
                            <div className="col-sm-6 ">
                                <div className="card shadow rounded-pill bg-primary bg-gradient bg-opacity-80 text-white">
                                    <div className="card-body">
                                        <h3 className="card-title">Total data Buku <i class="bi bi-book-half"></i></h3>
                                        <h2 className="card-title">{totalBooks}</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="card shadow rounded-pill bg-success bg-gradient bg-opacity-85 text-white">
                                    <div className="card-body">
                                        <h3 className="card-title">Total data Transaksi <i class="bi bi-clipboard-data-fill"></i></h3>
                                        <h2 className="card-title">{totalTransactions}</h2>      
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row mt-3 text-center">
                            <div className="col-sm-3">
                                <div className="card shadow border-success btn btn-outline-success rounded-pill">
                                    <div className="card-body">
                                        <h5 className="card-title">Status Buku Tersedia</h5>
                                        <h3 className="card-title">{booksTersedia}</h3>
                                
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card shadow border-danger btn btn-outline-danger rounded-pill">
                                    <div className="card-body">
                                        <h5 className="card-title">Status Buku Dipinjam</h5>
                                        <h3 className="card-title">{booksDipinjam}</h3>
                                
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card shadow border-warning btn btn-outline-warning rounded-pill">
                                    <div className="card-body">
                                        <h5 className="card-title">Buku masih Dipinjam</h5>
                                        <h3 className="card-title">{transactionsDipinjam}</h3>
                                
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-3">
                                <div className="card shadow border-info btn btn-outline-info rounded-pill">
                                    <div className="card-body">
                                        <h5 className="card-title">Buku sudah Dikembalikan</h5>
                                        <h3 className="card-title">{transactionsDikembalikan}</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            :
                //show spinner 
                <div className="m-5">
                    <div className="text-center">
                    <div className="spinner-grow text-primary mx-4" role="status"></div>
                    <div className="spinner-grow text-success mx-4" role="status"></div>
                    <div className="spinner-grow text-danger mx-4" role="status"></div>
                    <div className="spinner-grow text-warning mx-4" role="status"></div>
                    </div>
                </div>
        );
    }
}

function mapState(state) {
    const { users, authentication, books, transactions } = state;
    const { user } = authentication;
    return { user, users, books, transactions };
}

const actionCreators = {
    getUsers: userActions.getAll,
    deleteUser: userActions.delete,
    getBooks: bookActions.getAll,
    getTransactions: transactionActions.getAll,
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };