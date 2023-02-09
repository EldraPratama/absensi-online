import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bookActions } from '../_actions';

class AddPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {              
                judulBuku:'',
                penulisBuku:'',
                tahunTerbit:'',
                penerbit:'',
                jenisBuku:'',
                tanggalInput:'',
                sumberBuku:'',
                bukuLama:'',
                rakBuku:'',
                status:'Tersedia'
            },
            submitted: false,
            RakBuku:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
            JenisBuku:['Novel','Komik','Ensiklopedi','Dongeng','Biografi','Panduan','Majalah','Cerita Bergambar','Kamus']
        };



        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        this.setState({ submitted: true });
        const { book } = this.state;
      
        // validate all input not empty 
        if (book.judulBuku !== '' && book.penulisBuku !== '' && book.tahunTerbit !== '' && book.penerbit !== '' && book.jenisBuku !== '' && book.tanggalInput !== '' && book.sumberBuku !== '' && book.bukuLama !== '' && book.rakBuku !== ''  ) {
            this.props.add(book);
        } 
    } 

    render() {
        const { book, submitted } = this.state;
        return (
            <div className="col-md-12">
                <h2>Input Buku</h2>
                <form name="form" onSubmit={this.handleSubmit}>

                    <div className={"row form-group mb-1"}>
                        <div className="col-md-3"> 
                            <label>Judul Buku</label> 
                        </div>
                        <div className="col-md-1 "> <b>:</b>  </div>
                        <div className="col-md-4">
                            <input type="text" className={"form-control" + (submitted && !book.judulBuku ? ' is-invalid' : '')} name="judulBuku" placeholder="Masukkan judul buku" value={book.judulBuku} onChange={this.handleChange} />
                            {submitted && !book.judulBuku &&
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
                            <input type="text" className={"form-control" + (submitted && !book.penulisBuku ? ' is-invalid' : '')} name="penulisBuku" placeholder="Masukkan Nama Penulis" value={book.penulisBuku} onChange={this.handleChange} />
                            {submitted && !book.penulisBuku &&
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
                            <input type="number" className={"form-control" + (submitted && !book.tahunTerbit ? ' is-invalid' : '')} name="tahunTerbit" placeholder="Masukkan Tahun Terbit" value={book.tahunTerbit} onChange={this.handleChange} min={1900} max={new Date().getFullYear()}/>
                            {submitted && !book.tahunTerbit &&
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
                            <input type="text" className={"form-control" + (submitted && !book.penerbit ? ' is-invalid' : '')} name="penerbit" placeholder="Masukkan Nama Penerbit" value={book.penerbit} onChange={this.handleChange} />
                            {submitted && !book.penerbit &&
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
                            <select class={"form-select" + (submitted && !book.jenisBuku ? ' is-invalid' : '')} aria-label=".form-select-lg example" name="jenisBuku" onChange={this.handleChange}>
                                <option selected>Pilih Jenis buku</option>
                                {/* show data jenis buku */}
                                {this.state.JenisBuku.map((data)=>
                                    <option value={data}>{data}</option>
                                )}
                            </select>
                            {submitted && !book.jenisBuku &&
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
                            <input type="date" className={"form-control"  + (submitted && !book.tanggalInput ? ' is-invalid' : '')} name="tanggalInput"  value={book.tanggalInput ? book.tanggalInput : ''} onChange={this.handleChange} max={new Date().toISOString().slice(0, -14)} />
                            {submitted && !book.tanggalInput &&
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
                            <input type="text" className={"form-control" + (submitted && !book.sumberBuku ? ' is-invalid' : '')} name="sumberBuku" placeholder="Masukkan Sumber Buku" value={book.sumberBuku} onChange={this.handleChange} />
                            {submitted && !book.sumberBuku &&
                            <div className="text-danger">Sumber Buku is required</div>
                            }
                        </div>  
                    </div>

                    <div className={"row form-group mb-1" + (submitted && !book.bukuLama ? ' is-invalid' : '')}>
                        <div className="col-md-3"> 
                            <label>Buku Lama</label> 
                        </div>
                        <div className="col-md-1 "> <b>:</b>  </div>
                        <div className="col-md-4">
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bukuLama" id="inlineRadio1" value="Ya" onChange={this.handleChange}/>
                                <label className="form-check-label" for="inlineRadio1">Ya</label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input className="form-check-input" type="radio" name="bukuLama" id="inlineRadio2" value="Tidak" onChange={this.handleChange}/>
                                <label className="form-check-label" for="inlineRadio2">Tidak</label>
                            </div>

                            {submitted && !book.jenisBuku &&
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
                            <select className={"form-select" + (submitted && !book.rakBuku ? ' is-invalid' : '')} aria-label=".form-select-lg example" name="rakBuku" onChange={this.handleChange}>
                                <option selected>Pilih Rak buku</option>
                                {this.state.RakBuku.map((data)=>
                                    <option value={data}>{data}</option>
                                )}
                            </select>

                            {submitted && !book.rakBuku &&
                            <div className="text-danger">Rak buku is required</div>
                            }
                        </div>  
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary">Simpan</button>
                        <Link to="/buku" className="btn btn-link">Kembali</Link>
                    </div>
                </form>

                <div style={{height: "80px"}}></div>
                
            </div>
        );
    }
}

function mapState(state) {
    const { adding } = state.registration;
    return { adding };
}

const actionCreators = {
    add: bookActions.add
}

const connectedAddPage = connect(mapState, actionCreators)(AddPage);
export { connectedAddPage as AddPage };