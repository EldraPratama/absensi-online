import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class LoginPage extends React.Component {
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
          <div className="col-md-4 mt-5">
            <div className="card shadow mb-6 bg-body rounded mt-5">
              <div className="card-header text-center">
                <h2>Login</h2>
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
                    {/* <Link to="/register" className="btn btn-link">Register</Link> */}
                  </div>
                </form>
              </div>
            </div>
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

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
