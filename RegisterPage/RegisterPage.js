import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class RegisterPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                firstName: '',
                lastName: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.firstName && user.lastName && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const { registering  } = this.props;
        const { user, submitted } = this.state;
        return (
            <div className="col-md-12 col-md-offset-3">
                <div className="row justify-content-center">
                    <div className="col-md-7">
                        <div className="card shadow">
                            <div className="card-header text-center">
                                <h2>Register</h2>
                            </div>
                            <div className="card-body">
                                <form name="form" onSubmit={this.handleSubmit}>
                                    <div className={'form-group mb-3'}>
                                        <label htmlFor="firstName">First Name</label>
                                        <input type="text" className={"form-control" + (submitted && !user.firstName ? ' is-invalid' : '') } name="firstName" value={user.firstName} onChange={this.handleChange} />
                                        {submitted && !user.firstName &&
                                            <div className="text-danger">First Name is required</div>
                                        }
                                    </div>
                                    <div className={'form-group mb-3'}>
                                        <label htmlFor="lastName">Last Name</label>
                                        <input type="text" className={"form-control" + (submitted && !user.lastName ? ' is-invalid' : '')} name="lastName" value={user.lastName} onChange={this.handleChange} />
                                        {submitted && !user.lastName &&
                                            <div className="text-danger">Last Name is required</div>
                                        }
                                    </div>
                                    <div className={'form-group mb-3' }>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" className={"form-control" + (submitted && !user.username ? ' is-invalid' : '')} name="username" value={user.username} onChange={this.handleChange} />
                                        {submitted && !user.username &&
                                            <div className="text-danger">Username is required</div>
                                        }
                                    </div>
                                    <div className={'form-group mb-3' }>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" className={"form-control" + (submitted && !user.password ? ' is-invalid' : '') } name="password" value={user.password} onChange={this.handleChange} />
                                        {submitted && !user.password &&
                                            <div className="text-danger">Password is required</div>
                                        }
                                    </div>
                                    <div className="form-group mb-3">
                                        <button className="btn btn-primary">Register</button>
                                        <Link to="/login" className="btn btn-link">Cancel</Link>
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
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    register: userActions.register
}

const connectedRegisterPage = connect(mapState, actionCreators)(RegisterPage);
export { connectedRegisterPage as RegisterPage };