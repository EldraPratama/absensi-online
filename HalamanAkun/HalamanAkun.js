import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HalamanAkun extends React.Component {
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
            {/* tampilan admin */}
            <div className="row">
              <div className="col-md-7">
                <h3 class="mb-3">Akun Karyawan</h3>
                <i class="bi bi-chevron-double-left text-success"></i>
                <i class="text-success">Ke Profil</i>
              </div>
            </div>
            <form name="form ">
              <div className="row mt-5 mb-5">
                <div className="col-md-9">
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
              </div>
            </form>

            <table class="table table-bordered mt-5 mb-5">
              <thead class="table-primary">
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Username</th>
                  <th scope="col">Password</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tama123</td>
                  <td>abdjhsay23eksjdh</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Fauzi.farhan12</td>
                  <td>pasdnk3ugdssq</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>Ahmad321</td>
                  <td>78dshueyd67</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>4</td>
                  <td>Andri_cimahi</td>
                  <td>hdsaujber23yue6</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>5</td>
                  <td>Faisal.m123</td>
                  <td>oedj387e378fe7g</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>6</td>
                  <td>AsepRidwan25</td>
                  <td>pewk48f7i3he7</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
                </tr>
                <tr>
                  <td>7</td>
                  <td>Ridwan@bandung</td>
                  <td>pdskofe763hj</td>
                  <td>
                    <i class="text-danger">Reset Password</i>
                  </td>
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

const connectedHalamanAkun = connect(mapState, actionCreators)(HalamanAkun);
export { connectedHalamanAkun as HalamanAkun };
