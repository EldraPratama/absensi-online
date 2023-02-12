import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HalamanPengumuman extends React.Component {
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
            {/* <h3 class="mb-4">Informasi</h3>
            <div
              class="card shadow mb-4"
              style={{ 'background-color': '#b0fea5' }}
            >
              <div className="row text-center">
                <i class="bi bi-shop-window" style={{ 'font-size': '3em' }}></i>
                <h5>
                  <b>Toko Serbu</b>
                </h5>
                <p>Cimahi</p>
              </div>
            </div>

            <h5>Pengumuman</h5>
            <div
              class="card shadow mb-4 mt-3"
              style={{ 'border-color': '#3afd1e' }}
            >
              <div className="card-body">
                <i>
                  <b> Hallo Semuanya </b>
                </i>
              </div>
              <div className="card-body">
                <i>
                  Diberitahukan kepada rekan rekan semua, bahwa pada hari Senin
                  tanggal 23 Januari diharapkan untuk menggunakan baju batik,
                  karna rencanan kita akan melakukan sesi poto bersama
                </i>
              </div>
              <div className="card-body">
                <i>Terimakasih</i>
              </div>
            </div> */}

            {/* tampilan admin */}
            <h3 class="mb-4">Pengumuman</h3>
            <div
              class="card shadow mb-4"
              style={{ 'background-color': '#b0fea5' }}
            >
              <div className={'input-group mx-auto'} style={{ width: '95%' }}>
                <input
                  type="textarea"
                  className="form-control rounded rounded-5 mt-2"
                  name="search"
                  placeholder="Tulis pembuka disini..."
                />
              </div>
              <div
                className={'input-group mb-3 mx-auto'}
                style={{ width: '95%' }}
              >
                <input
                  type="textarea"
                  className="form-control rounded rounded-5 pb-5 pt-3 mt-2"
                  name="search"
                  placeholder="Tulis Pengumuman disini..."
                />
              </div>
              <div className="row text-center justify-content-center mt-2 mb-2">
                <div className="rounded-pill col-md-4 btn btn-primary">
                  <i>Posting</i>
                </div>
              </div>
            </div>

            <h5>Pengumuman saat ini</h5>
            <div
              class="card shadow mb-4 mt-3"
              style={{ 'border-color': '#3afd1e' }}
            >
              <div className="card-body">
                <i>
                  <b> Hallo Semuanya </b>
                </i>
                <i class="bi bi-pencil-fill ml-5 text-success px-5"></i>
                <i class="bi bi-trash3-fill text-danger"></i>
              </div>
              <div className="card-body">
                <i>
                  Diberitahukan kepada rekan rekan semua, bahwa pada hari Senin
                  tanggal 23 Januari diharapkan untuk menggunakan baju batik,
                  karna rencanan kita akan melakukan sesi poto bersama
                </i>
              </div>
              <div className="card-body">
                <i>Terimakasih</i>
              </div>
            </div>

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

const connectedHalamanPengumuman = connect(
  mapState,
  actionCreators
)(HalamanPengumuman);
export { connectedHalamanPengumuman as HalamanPengumuman };
