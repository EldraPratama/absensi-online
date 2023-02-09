import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { userActions } from '../_actions';
import { alertActions, bookActions } from '../_actions';


class BukuPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        search:'',
        judulBuku:'',
        id:'',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleModal = this.handleModal.bind(this);

  }

  handleChange(event) {
    const { value } = event.target;
    this.setState({
      search: value
    });
    //reset alert
    this.props.clearAlerts();
  }

  componentDidMount() {
    this.props.getBooks();
  }

  handleDeleteBook(id) {
    return (e) => this.props.deleteBook(id);
  }

  handleModal(id,judul) {
    console.log(id);
    console.log(judul);
    this.setState({
      judulBuku: judul,
      id: id,
    });
  }


  render() {
    let { books } = this.props;

  
    //filter data based judul buku
    let filtered ;
    let valueSearch = this.state.search.toLowerCase() ;
    if(books.items){
      filtered = books.items.filter(book => book.judulBuku.toLowerCase().includes( valueSearch ) 
        || book.penulisBuku.toLowerCase().includes( valueSearch )
        || book.jenisBuku.toLowerCase().includes( valueSearch )
      );
    }

    //show data with or without filter
    const data = () => {
      if(this.state.search !=''){
        return filtered;
      }else{  
        return books.items;
      }
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
              Buku dengan judul <b>{judul}</b> akan dihapus
            </div>
            <div className="modal-footer">
              <button onClick={this.handleDeleteBook(id)} type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Iya</button>
              <button type="button" className="btn btn-outline-warning" data-bs-dismiss="modal">Tidak</button>
            </div>
          </div>
        </div>
      </div>
    }

    return (
      books.items 
      ?
        <div className="col-lg">
          <h1>Data Buku </h1>
          <div className="row mb-3">
            <div className="col-md-5">
              <form name="form">
                <div className={'input-group mb-3'}>
                  <button class="btn btn-outline-primary rounded-end rounded-5" type="button" id="button-addon1" disabled>
                    <span class="bi bi-search"></span>
                  </button>
                  <input
                    type="text"
                    className="form-control rounded-start rounded-5"
                    name="search"
                    placeholder="Search" 
                    onChange={this.handleChange}
                  />
                </div>
              </form>
            </div>
            <div className="col-md-5"></div>
            <div className="col-md-2">
              <Link to="/buku/add" className="btn btn-primary float-end rounded-pill">
              <b><i class="bi bi-plus-lg"> </i></b>Input Buku
              </Link>
            </div>
          </div>
          <table class="table table-bordered">
            <thead class="table-primary">
              <tr>
                <th scope="col"> Judul Buku </th>
                <th scope="col"> Penulis </th>
                <th scope="col"> Jenis Buku </th>
                <th scope="col"> Status </th>
                <th scope="col"> Actions </th>
              </tr>
            </thead>

            
              {/* show data book with / without filter */}
              {books.items &&
                <tbody>
                  {data().map((book, index) =>
                    <tr key={book.id}>
                      <td width="40%">{book.judulBuku}</td>
                      <td>{book.penulisBuku}</td>
                      <td>{book.jenisBuku}</td>
                      <td width="10%">
                          {book.status === 'Tersedia' || book.status ==='tersedia'
                            ? <p className="btn btn-sm btn-outline-success">{book.status}</p>
                            : <p className="btn btn-sm btn-outline-danger">Dipinjam</p>
                          }
                      </td>
                      <td width="20%">
                          <Link to={`/buku/detail/${book.id}`}  className="btn btn-sm btn-link">
                              Detail
                          </Link>
                          <Link to={`/buku/edit/${book.id}`}  className="btn btn-sm btn-link">
                              Edit
                          </Link>
                          { book.status == 'Tersedia' || book.status == 'tersedia'
                            // ? <a onClick={this.handleDeleteBook(book.id)} className="btn btn-sm btn-link mx-1">Delete</a>
                            ? 
                              <button onClick={() => this.handleModal(book.id, book.judulBuku)} type="button" className="btn btn-sm btn-link" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Delete</button>
                            : ''
                          }       
                      </td>
                    </tr>
                  )}
                  {data().length == 0 &&
                    <tr>
                      <td colspan="5"><b>Book data not found</b> </td>
                    </tr>
                  }
                </tbody>
              }
                
          </table>


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
  clearAlerts: alertActions.clear,
  getBooks: bookActions.getAll,
  // searchBooks: bookActions.getBySearch,
  deleteBook: bookActions.delete
};


const connectedBukuPage = connect(mapState, actionCreators)(BukuPage);
export { connectedBukuPage as BukuPage };
