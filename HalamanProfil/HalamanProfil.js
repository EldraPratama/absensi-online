import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HalamanProfil extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.logout();

    this.state = {
      username: '',
      password: '',
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return (
      <div className="col-md-12 col-md-offset-3">
        <div className="row justify-content-center mt-4">
          <div className="col-md-5">
            {/* tampilan user */}

            {/* <h3 class="mb-2">Profil Anda</h3>
            <div class="card mb-4" style={{ 'border-color': 'white' }}>
              <div className="row text-center">
                <i
                  class="bi bi-person-circle"
                  style={{ 'font-size': '4em' }}
                ></i>
              </div>
            </div>

            <h5>Informasi Pribadi</h5>
            <div
              class="card shadow mb-4 mt-3"
              style={{
                'border-color': '#00ff0e',
                'background-color': '#b3ffb7',
              }}>
              <div className="card-body">
                <p>Nama : Eldra Surya Pratama</p>
                <p>Jabatan : Penjaga toko</p>
                <p>Alamat : Cimahi Selatan, Cimahi, Jawa Barat</p>
                <p>Email : eldra@gmail.com</p>
                <p>Nomer Hp : 0895330220110</p>
                <p>Jenis kelamin : Laki-laki</p>
                <p>NIK : 123456789</p>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="card rounded-pill bg-danger mt-2 col-md-6">
                <div className="card-body text-center text-white">KELUAR</div>
              </div>
            </div> */}

            {/* tampilan admin */}
            <h3 class="mb-5">Profil Karyawan</h3>
            <form name="form ">
              <div className="row mt-5 mb-5">
                <div className="col-md-8">
                  <div className={'input-group mb-3'}>
                    <button
                      class="btn btn-outline-primary rounded-end rounded-5"
                      type="button"
                      id="button-addon1"
                      disabled
                    >
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
                </div>
                <div className="col-md-3">
                  <div className="card rounded-pill rounded-5">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <i class="bi bi-download"></i>
                      </div>
                      <div className="col-md-6">
                        <p>Unduh</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>

            <table class="table table-bordered mt-5 mb-5">
              <thead class="table-primary">
                <tr>
                  <th scope="col">Nama</th>
                  <th scope="col">Jabatan</th>
                  <th scope="col">Handphone</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tama</td>
                  <td>Kasir</td>
                  <td>08.55</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Fauzi</td>
                  <td>Penjaga Toko</td>
                  <td>09.00</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Ahmad</td>
                  <td>Security</td>
                  <td>-</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Andri</td>
                  <td>Admin</td>
                  <td>-</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Faisal</td>
                  <td>Kasir</td>
                  <td>08.50</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Asep</td>
                  <td>Penjaga Toko</td>
                  <td>08.50</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
                <tr>
                  <td>Ridwan</td>
                  <td>19/01/2023</td>
                  <td>08.50</td>
                  <td><i>Detail Edit Hapus</i></td>
                </tr>
              </tbody>
            </table>

            <nav
              class="navbar fixed-bottom py-lg-2 col-md-5 bg-primary"
              style={{ 'background-color': '#e3f2fd', 'margin-left': '410px' }}
            >
              <div class="container-fluid">
                <a class="navbar-brand mx-auto" href="home">
                  <i
                    class="bi bi-house-fill"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="riwayat">
                  <i
                    class="bi bi-clock-history"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="pengumuman">
                  <i
                    class="bi bi-megaphone-fill"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="profil">
                  <i
                    class="bi bi-person-fill"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedHalamanProfil = connect(mapState, actionCreators)(HalamanProfil);
export { connectedHalamanProfil as HalamanProfil };
