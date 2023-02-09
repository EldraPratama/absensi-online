import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { alertActions, transactionActions } from '../_actions';

class TransaksiPage extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      search:'',
      pengembalian: false,
    };

    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      search: value
    });
    //reset alert
    this.props.clearAlerts();
  }

  componentDidMount() {
    this.props.getTransactions();
  }

  //when pengembalian onclick  
  handlePengembalian(id) {
    this.setState({ pengembalian: true });
    this.props.update(id);
     
  }

  render() {
    const { user, users, transactions } = this.props;

    //filter data transaction
    let filtered ;
    let valueSearch = this.state.search.toLowerCase();
    if(transactions.items){
      filtered = transactions.items.filter(transaction => transaction.judulBuku.toLowerCase().includes(valueSearch)
      || transaction.peminjam.toLowerCase().includes(valueSearch)
      || transaction.tanggalPinjam.toLowerCase().includes(valueSearch));
    }

    //show data with or without filter
    const data = () => {
      if(this.state.search !=''){
        return filtered;
      }else{  
        return transactions.items;
      }
    }

    //mengubah format tampilan tanggal 
    const formatTanggal = (data) => {
      let tanggal = data.split('-');
      let tahun = tanggal[0]
      let bulan = tanggal[1]
      let hari = tanggal[2]

      switch(bulan) {
          case '01': bulan = "Januari"; break;
          case '02': bulan = "Februari"; break;
          case '03': bulan = "Maret"; break;
          case '04': bulan = "April"; break;
          case '05': bulan = "Mei"; break;
          case '06': bulan = "Juni"; break;
          case '07': bulan = "Juli"; break;
          case '08': bulan = "Agustus"; break;
          case '09': bulan = "September"; break;
          case '10': bulan = "Oktober"; break;
          case '11': bulan = "November"; break;
          case '12': bulan = "Desember"; break;
      }
      let result = hari +' '+ bulan +' '+ tahun;
      return result
    }

    //refresh data transaction and change state pengembalian when click pengembalian
    if(this.state.pengembalian == true){
      this.setState({ pengembalian: false });
      this.props.getTransactions();
    }

    return (
      transactions.items
      ?
        <div className="col-lg">
          <h2>Transaksi Peminjaman dan Pengembalian</h2>
          <div className="row mb-3">
            <div className="col-md-5">
              <form name="form">
                <div className={'input-group mb-3'}>
                  <button class="btn btn-outline-primary rounded-end rounded-5" type="button" id="button-addon1" disabled>
                    <span class="bi bi-search"></span>
                  </button>
                  <input type="text" className="form-control rounded-start rounded-5" name="search" placeholder="Search"
                  onChange={this.handleChange}/>
                </div>
              </form>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-2">
                <Link to="/transaksi/add" className="btn btn-primary float-end rounded-pill">
                <b><i class="bi bi-plus-lg"> </i></b>Pinjam Buku
                </Link>
            </div>
          </div>
          <table class="table table-bordered ">
            <thead class="table-primary">
              <tr>
                <th scope="col">Judul Buku </th>
                <th scope="col">Nama Peminjam </th>
                <th scope="col">Tanggal Pinjam </th>
                <th scope="col">Estimasi Pengembalian </th>
                <th scope="col">Tanggal Kembali </th>
                <th scope="col"> Actions </th>
              </tr>
            </thead>

            {/* show data with or without filter  */}
            {transactions.items && 
              <tbody>
                {data().map((transaction, index) =>
                  <tr key={transaction.id}>
                    <td>{transaction.judulBuku}</td>
                    <td width="20%">{transaction.peminjam}</td>
                    <td width="15%">{formatTanggal(transaction.tanggalPinjam)}</td>
                    <td width="15%">{formatTanggal(transaction.estimasiPengembalian)}</td>
                    <td width="15%"> {transaction.tanggalKembali ? formatTanggal(transaction.tanggalKembali) : "-"} </td>
                    <td width="12%">  
                        { transaction.tanggalKembali == ''
                          ? <a onClick={()=>this.handlePengembalian(transaction.id)} className="btn btn-sm btn-link      mx-1">Pengembalian</a>
                          : ''
                        }                     
                    </td>
                  </tr>
                )}
                {data().length == 0 &&
                  <tr>
                    <td colspan="5"><b>Transaction data not found</b> </td>
                  </tr>
                }
              </tbody>
            }
          </table>

        </div>
      :
        //show spinner 
        <div class="m-5">
          <div class="text-center">
            <div class="spinner-grow text-primary mx-4" role="status"></div>
            <div class="spinner-grow text-success mx-4" role="status"></div>
            <div class="spinner-grow text-danger mx-4" role="status"></div>
            <div class="spinner-grow text-warning mx-4" role="status"></div>
          </div>
        </div>
    );
  }
}

function mapState(state) {
  // console.log(state);
  const { users, authentication, transactions } = state;
  const { user } = authentication;
  return { user, users, transactions };
}

const actionCreators = {
  update: transactionActions.update,
  getTransactions: transactionActions.getAll,
  clearAlerts: alertActions.clear,
};

const connectedTransaksiPage = connect(mapState, actionCreators)(TransaksiPage);
export { connectedTransaksiPage as TransaksiPage };
