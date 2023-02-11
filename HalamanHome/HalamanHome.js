import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HalamanHome extends React.Component {
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
        <div className="row justify-content-center mt-5">
          <div className="col-md-5">
            <div
              class="card shadow mb-5"
              style={{ 'background-color': '#d8d57c' }}
            >
              <div className="row">
                <div className="col-md-3">
                  <div class="card-body">
                    <i
                      class="bi bi-person-circle"
                      style={{ 'font-size': '3em', 'margin-left': '20px' }}
                    ></i>
                  </div>
                </div>
                <div className="col-md-9">
                  <div class="card-body">Name : Eldra Surya Pratama</div>
                  <div class="card-body">Position : Penjaga Toko</div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div
                  class="card shadow"
                  style={{ 'background-color': '#92d4df', height: '80px' }}
                >
                  <div class="card-body text-center">Absen Masuk</div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  class="card shadow"
                  style={{ 'background-color': '#87d266', height: '80px' }}
                >
                  <div class="card-body text-center">Absen Keluar</div>
                </div>
              </div>
            </div>

            <div className="row mt-5">
              <div className="col-md-6">
                <div
                  class="card shadow"
                  style={{ 'background-color': '#d26c66' }}
                >
                  <div class="card-header text-center">Izin</div>
                  <div class="card-body text-center">
                    Isi Form terlebih dahulu untuk mengajukan izin kerja
                    <div className="card rounded-pill text-red mt-5">
                      <div className="card-body">Ajukan Izin</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div
                  class="card shadow"
                  style={{ 'background-color': '#dc92df' }}
                >
                  <div class="card-header text-center font-weight-bold">
                    Sakit
                  </div>
                  <div class="card-body text-center">
                    Isi Form terlebih dahulu untuk mengajukan sakit kerja
                    <div className="card rounded-pill text-red mt-5">
                      <div className="card-body">Ajukan Sakit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="card shadow mb-6 bg-body rounded mt-5">
              <div className="card-header text-center">
                <h2>Home</h2>
              </div>
              <div className="card-body">
                <form name="form" onSubmit={this.handleSubmit}>
                  <div className={'form-group mb-3'}>
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className={
                        'form-control' +
                        (submitted && !username ? ' is-invalid' : '')
                      }
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                    {submitted && !username && (
                      <div className="text-danger">Username is required</div>
                    )}
                  </div>
                  <div className={'form-group mb-3'}>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={
                        'form-control' +
                        (submitted && !password ? ' is-invalid' : '')
                      }
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                    {submitted && !password && (
                      <div className="text-danger">Password is required</div>
                    )}
                  </div>
                  <div className="form-group">
                    <div className="row col-md-12 justify-content-center">
                      <div className="row col-md-6">
                        <button className="btn btn-primary">Login</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div> */}
            <nav
              class="navbar fixed-bottom py-lg-2 col-md-5"
              style={{ 'background-color': '#e3f2fd', 'margin-left': '410px' }}
            >
              <div class="container-fluid">
                <a class="navbar-brand mx-auto" href="home">
                  <i
                    class="bi bi-house-fill"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="#">
                  <i
                    class="bi bi-clock-history"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="#">
                  <i
                    class="bi bi-megaphone-fill"
                    style={{ 'font-size': '2em' }}
                  ></i>
                </a>
                <a class="navbar-brand mx-auto" href="#">
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

const connectedHalamanHome = connect(mapState, actionCreators)(HalamanHome);
export { connectedHalamanHome as HalamanHome };
