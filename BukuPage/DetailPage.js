import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

// import { userActions } from '../_actions';
import { bookActions } from '../_actions';


class DetailPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        judulBuku:'',
        id:'',
    };
    this.handleModal = this.handleModal.bind(this);

  }
  componentDidMount() {
    this.props.getBooks();
  }

  handleDeleteBook(id) {
    return (e) => this.props.deleteBook(id);
  }

  handleModal(id,judul) {
    this.setState({
      judulBuku: judul,
      id: id,
    });
  }

  render() {
    //process get detail data book based on id  
    let { books } = this.props;
    let book
    if(books.items){
      //get id book
      let path = history.location.pathname.split('/');
      let id = parseInt(path[path.length-1]);
      //filter data to get detail data based on id
      book = books.items.filter(book => book.id == id)[0]
    }

    //show modal confirm delete 
    const modal = () => {
      let judul = this.state.judulBuku ;
      let id = this.state.id ;
      return <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">Apakah Kamu yakin untuk hapus Buku ?</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
               Buku dengan judul <b>{judul}</b> akan dihapus, dan kamu akan dikembalikan ke halaman sebelumnya
            </div>
            <div className="modal-footer">
              <button onClick={this.handleDeleteBook(id)} type="button" className="btn btn-outline-danger" data-bs-dismiss="modal" >Iya</button>
              <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Tidak</button>
            </div>
          </div>
        </div>
      </div>
    }
    return (
      book 
      ?
        <div className="col-md-12">
        <h2>Detail Buku {book.judulBuku}</h2>
          <Link to="/buku" className="btn btn-info">Kembali</Link>
          {/* <Link to="/buku" className="btn btn-info mx-5 float-end">Hapus</Link> */}
          { book.status == 'Tersedia' || book.status == 'tersedia'
            ? 
            <button onClick={() => this.handleModal(book.id, book.judulBuku)} type="button" className="btn btn-info mx-5 float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
              Delete</button>
            // <a onClick={this.handleDeleteBook(book.id)} className="btn btn-info mx-5 float-end" disabled>Delete aja</a>
            : ''
          }
          <Link to={`/buku/edit/${book.id}`} className="btn btn-info mx-5 float-end">Edit</Link>
          <div className="mb-4"></div>
        <form name="form" >

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                  <label>Judul Buku</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.judulBuku}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Penulis</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.penulisBuku}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Tahun Terbit</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.tahunTerbit}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3" }>
                <div className="col-3"> 
                    <label>Penerbit</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.penerbit}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Jenis Buku</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.jenisBuku}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Tanggal Input Buku</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.tanggalInput}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Sumber Buku</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.sumberBuku}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3" }>
                <div className="col-3"> 
                    <label>Buku Lama</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.bukuLama}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Rak Buku</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>{book.rakBuku}</label> 
                </div>  
            </div>

            <div className={"row form-group mb-3"}>
                <div className="col-3"> 
                    <label>Status</label> 
                </div>
                <div className="col-1 "> <b>:</b>  </div>
                <div className="col-4">
                  <label>
                  {book.status === 'Tersedia' || book.status ==='tersedia'
                    ? <p className="btn btn-sm btn-success"><b>{book.status}</b></p>
                    : <p className="btn btn-sm btn-danger"><b>Dipinjam</b></p>
                  }
                  </label> 
                </div>  
            </div>

        </form>
          {/* <!-- Modal --> */}
          {modal()}
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
  const { books } = state;
  return { books };
}


const actionCreators = {
  // getUsers: userActions.getAll,
  // getBooks: bookActions.getAll,
  getBooks: bookActions.getAll,
  deleteBook: bookActions.delete
};


const connectedDetailPage = connect(mapState, actionCreators)(DetailPage);
export { connectedDetailPage as DetailPage };
