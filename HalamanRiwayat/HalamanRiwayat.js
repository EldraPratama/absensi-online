import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HalamanRiwayat extends React.Component {
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
            <h3 class="mb-4">Riwayat</h3>
            <div
              class="card shadow mb-4"
              style={{ 'background-color': '#beecc0' }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div
                    class="card-body"
                    style={{
                      'margin-left': '10px',
                    }}
                  >
                    <div class="card shadow">
                      <div
                        class="card-header text-center font-weight-bold"
                        style={{ 'background-color': '#ecf949' }}
                      >
                        Jan
                      </div>
                      <div class="card-body text-center">10</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mt-3">
                    <b>Bekerja</b>
                  </p>
                  <p>Jam Kerja : 8 jam 55 Menit</p>
                  <p>Status : Selesai</p>
                  <p>Check in : 08.10.00</p>
                  <p>Check out : 17.05.00</p>
                </div>
                <div className="col-md-2">
                  <i
                    class="bi bi-caret-up-fill"
                    style={{ 'font-size': '1.5em', 'margin-left': '30px' }}
                  ></i>
                </div>
              </div>
            </div>

            <div
              class="card shadow mb-4"
              style={{ 'background-color': '#beecc0' }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div
                    class="card-body"
                    style={{
                      'margin-left': '10px',
                    }}
                  >
                    <div class="card shadow">
                      <div
                        class="card-header text-center font-weight-bold"
                        style={{ 'background-color': '#ecf949' }}
                      >
                        Jan
                      </div>
                      <div class="card-body text-center">9</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mt-3">
                    <b>Bekerja</b>
                  </p>
                  <p>Jam Kerja : 8 jam 55 Menit</p>
                  <p>Status : Selesai</p>
                </div>
                <div className="col-md-2">
                  <i
                    class="bi bi-caret-down-fill"
                    style={{ 'font-size': '1.5em', 'margin-left': '30px' }}
                  ></i>
                </div>
              </div>
            </div>

            <div
              class="card shadow mb-4"
              style={{ 'background-color': '#beecc0' }}
            >
              <div className="row">
                <div className="col-md-4">
                  <div
                    class="card-body"
                    style={{
                      'margin-left': '10px',
                    }}
                  >
                    <div class="card shadow">
                      <div
                        class="card-header text-center font-weight-bold"
                        style={{ 'background-color': '#ecf949' }}
                      >
                        Jan
                      </div>
                      <div class="card-body text-center">8</div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mt-3">
                    <b>Izin</b>
                  </p>
                  <p>Jam Kerja : -</p>
                  <p>Status : -</p>
                </div>
                <div className="col-md-2">
                  <i
                    class="bi bi-caret-down-fill"
                    style={{ 'font-size': '1.5em', 'margin-left': '30px' }}
                  ></i>
                </div>
              </div>
            </div>

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

const connectedHalamanRiwayat = connect(
  mapState,
  actionCreators
)(HalamanRiwayat);
export { connectedHalamanRiwayat as HalamanRiwayat };
