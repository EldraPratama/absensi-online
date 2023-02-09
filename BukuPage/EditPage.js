import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bookActions } from '../_actions';


class EditPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          book: {              
              judulBuku: '',
              penulisBuku: '',
              tahunTerbit: '',
              penerbit:'',
              jenisBuku:'',
              tanggalInput:'',
              sumberBuku:'',
              bukuLama:'',
              rakBuku:'',
              status:''
          },
          submitted: false,
          RakBuku:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
          JenisBuku:['Novel','Komik','Ensiklopedi','Dongeng','Biografi','Panduan','Majalah','Cerita Bergambar','Kamus']

        }; 
        //get data by id for edit book's value 
        this.props.getBook();

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    componentDidMount() {
    //   this.props.getBook();
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const { book } = this.state;

        this.setState({ submitted: true });

        // validate all input not empty 
        if (book.judulBuku !== '' && book.penulisBuku !== '' && book.tahunTerbit !== '' && book.penerbit !== '' && book.jenisBuku !== '' && book.tanggalInput !== '' && book.sumberBuku !== '' && book.bukuLama !== '' && book.rakBuku !== ''  ) {
            this.props.update(book);
        } 
    }

    render() {
        //variabel to get book data based on id
        const book = this.props.books.item ? this.props.books.item : '';
        //variabel to get state data 
        const state = this.state.book ;
        // console.log(this.state);
        // console.log(this.props);
        const {submitted } = this.state;

        
        if(book){
            // console.log(book);
            if(state.judulBuku == '' && state.penulisBuku == '' && state.tahunTerbit == '' && state.penerbit == '' && state.jenisBuku == ''){
                this.setState({
                    book: {
                        judulBuku : book.judulBuku,
                        penulisBuku : book.penulisBuku,
                        tahunTerbit : book.tahunTerbit,
                        penerbit : book.penerbit,
                        jenisBuku : book.jenisBuku,
                        tanggalInput : book.tanggalInput,
                        sumberBuku : book.sumberBuku,
                        bukuLama : book.bukuLama,
                        rakBuku : book.rakBuku,
                        status : book.status,
                    }
                });
            }
        }

        return (
            book 
            ?
                <div className="col-md-12">
                    <h2>Edit Buku</h2>
                    <form name="form" onSubmit={this.handleSubmit}>

                        <div className={"row form-group mb-1" }>
                            <div className="col-md-3"> 
                                <label>Judul Buku</label> 
                            </div> 
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="text" className={"form-control" + ( submitted && !state.judulBuku ? ' is-invalid' : '')} name="judulBuku" placeholder="Masukkan judul buku" value={state.judulBuku} onChange={this.handleChange} />
                                {submitted && !state.judulBuku &&
                                    <div className="text-danger">Judul Buku is required</div>
                                }
                            </div>  
                        </div>
    
                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Penulis</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="text" className={"form-control" + ( submitted && !state.penulisBuku ? ' is-invalid' : '')} name="penulisBuku" placeholder="Masukkan Nama Penulis" value={state.penulisBuku} onChange={this.handleChange} />
                                {submitted && !state.penulisBuku &&
                                    <div className="text-danger">Penulis is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Tahun Terbit</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="number" className={"form-control" + ( submitted && !state.tahunTerbit ? ' is-invalid' : '')} name="tahunTerbit" placeholder="Masukkan Tahun Terbit" value={state.tahunTerbit} onChange={this.handleChange} min={1900} max={new Date().getFullYear()} />
                                {submitted && !state.tahunTerbit &&
                                <div className="text-danger">Tahun Terbit is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Penerbit</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="text" className={"form-control" + ( submitted && !state.penerbit ? ' is-invalid' : '')} name="penerbit" placeholder="Masukkan Nama Penerbit" value={state.penerbit} onChange={this.handleChange} />
                                {submitted && !state.penerbit &&
                                <div className="text-danger">Penerbit is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Jenis Buku</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <select class={"form-select" + ( submitted && !state.jenisBuku ? ' is-invalid' : '')} aria-label=".form-select-lg example" name="jenisBuku" value={state.jenisBuku} onChange={this.handleChange}>                                   
                                    {this.state.JenisBuku.map((data)=>
                                        <option value={data}>{data}</option>
                                    )}
                                </select>

                                {submitted && !state.jenisBuku &&
                                <div className="text-danger">Jenis buku is required</div>
                                }
                            </div>  
                        </div>
    
                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Tanggal Input Buku</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="date" className={"form-control" + ( submitted && !state.tanggalInput ? ' is-invalid' : '')} name="tanggalInput" value={state.tanggalInput} onChange={this.handleChange} />
                                {submitted && !state.tanggalInput &&
                                <div className="text-danger">Tanggal Input is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Sumber Buku</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <input type="text" className={"form-control" + ( submitted && !state.sumberBuku ? ' is-invalid' : '')} name="sumberBuku" placeholder="Masukkan Sumber Buku" value={state.sumberBuku} onChange={this.handleChange} />
                                {submitted && !state.sumberBuku &&
                                <div className="text-danger">Sumber Buku is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Buku Lama</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bukuLama" id="inlineRadio1" value="Ya" onChange={this.handleChange} checked={ state.bukuLama =='Ya'}/>
                                    <label class="form-check-label" for="inlineRadio1">Ya</label>
                                </div>
                                <div class="form-check form-check-inline">
                                    <input class="form-check-input" type="radio" name="bukuLama" id="inlineRadio2" value="Tidak" onChange={this.handleChange} checked={ state.bukuLama =='Tidak'}/>
                                    <label class="form-check-label" for="inlineRadio2">Tidak</label>
                                </div>

                                {submitted && !state.jenisBuku &&
                                <div className="text-danger">Buku Lama is required</div>
                                }
                            </div>  
                        </div>

                        <div className={"row form-group mb-1"}>
                            <div className="col-md-3"> 
                                <label>Rak Buku</label> 
                            </div>
                            <div className="col-md-1 "> <b>:</b>  </div>
                            <div className="col-md-4">
                                <select class={"form-select"  + ( submitted && !state.rakBuku ? ' is-invalid' : '')} aria-label=".form-select-lg example" name="rakBuku" value={state.rakBuku} onChange={this.handleChange}>
                                {this.state.RakBuku.map((data)=>
                                    <option value={data}>{data}</option>
                                )}
                                </select>

                                {submitted && !state.rakBuku &&
                                <div className="text-danger">Rak buku is required</div>
                                }
                            </div>  
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary">Simpan</button>
                            <Link to="/buku" className="btn btn-link">Kembali</Link>
                        </div>
                    </form>
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
    add: bookActions.add,
    getBook: bookActions.getById,
    update: bookActions.update,

}

const connectedEditPage = connect(mapState, actionCreators)(EditPage);
export { connectedEditPage as EditPage };