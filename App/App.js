import React from 'react';
import { Router, Route, Switch, Redirect, Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { BukuPage } from '../BukuPage';
import { AddPage } from '../BukuPage';
import { EditPage } from '../BukuPage';
import { DetailPage } from '../BukuPage';
import { TransaksiPage } from '../TransaksiPage';
import { AddTransaksi } from '../TransaksiPage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { HalamanHome } from '../HalamanHome';
import { HalamanRiwayat } from '../HalamanRiwayat';
import { HalamanProfil } from '../HalamanProfil';
import { HalamanPengumuman } from '../HalamanPengumuman';
import { HalamanAkun } from '../HalamanAkun';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
  }

  handleClearAlert() {
    this.props.clearAlerts();
  }

  render() {
    const { alert } = this.props;
    // Decide to show the navbar
    let path = history.location.pathname;
    let useNavbar = true;

    if (path == '/login' || path == '/register') {
      useNavbar = false;
    }
    return (
      <>
        {/* <nav class="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
          <div class="container-fluid">
            <Router history={history}>
              <Link to="/" class="navbar-brand">
                Perpustakaan Online  <i class="bi bi-book"></i>
              </Link>
            </Router>
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav">
                <Router history={history}>
                  {useNavbar ? (
                    <>
                      <li class="nav-item">
                        <Link to="/buku" class="nav-link">
                          Data Buku
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link to="/transaksi" class="nav-link">
                          Transaksi
                        </Link>
                      </li>
                      <li class="nav-item">
                        <Link to="/login" class="nav-link">
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li class="nav-item">
                      <Link to="/login" class="nav-link">
                        Login
                      </Link>
                    </li>
                  )}
                </Router>
              </ul>
            </div>
          </div>
        </nav> */}

        {/* <div className="jumbotron"> */}
        <div className="container" height="1200px">
          <div className="col-12 col-offset-2">
            {alert.message && (
              // <div className={`alert ${alert.type}`}>{alert.message}</div>
              <div
                className={`alert ${alert.type} alert-dismissible fade show`}
                role="alert"
              >
                {alert.message}
                <button
                  onClick={() => this.handleClearAlert()}
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
            <Router history={history}>
              <Switch>
                <PrivateRoute exact path="/" component={HomePage} />
                <PrivateRoute exact path="/buku" component={BukuPage} />
                <PrivateRoute path="/buku/add" component={AddPage} />
                <PrivateRoute
                  exact
                  path="/buku/detail/:id"
                  component={DetailPage}
                />
                <PrivateRoute
                  exact
                  path="/buku/edit/:id"
                  component={EditPage}
                />
                <PrivateRoute
                  exact
                  path="/transaksi"
                  component={TransaksiPage}
                />
                <PrivateRoute path="/transaksi/add" component={AddTransaksi} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/home" component={HalamanHome} />
                <Route path="/akun" component={HalamanAkun} />
                <Route path="/pengumuman" component={HalamanPengumuman} />
                <Route path="/profil" component={HalamanProfil} />
                <Route path="/riwayat" component={HalamanRiwayat} />
                <Redirect from="*" to="/" />
              </Switch>
            </Router>
          </div>
        </div>
        {/* </div> */}
      </>
    );
  }
}

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
