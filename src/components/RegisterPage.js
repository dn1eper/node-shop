import React, { Component} from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { registerRequest, registerError } from 'actions/registerActions';
import LoadingImage from 'img/Loading.gif';
import 'styles/AuthForm.css';

class RegisterPage extends Component {
    handleSubmit() {
        var data = {
            username: document.getElementById('username').value,
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        var valid = this.validate(data);
        if (valid === true) {
            this.props.onRegister(data);
        }
        else {
            this.props.onError(valid);
        }
    }

    handleEnterBtnClick(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    // Validation form, return true or error msg
    validate(data) {
        if (!(data.username && data.password && data.email)) {
            return "Enter all the data";
        }
        else if (data.password !== document.getElementById('password_confirmation').value) {
            return "Passwords do not match";
        }
        else return true;
    }

    render() {
        const { inProcess, isRegistered, isError, errorMsg } = this.props;

        return (
            <form className="auth" onKeyDown={this.handleEnterBtnClick.bind(this)}>
                <fieldset>
                    <legend>Register</legend>
                    <div className="error" hidden={!isError}>
                        {errorMsg}
                    </div>
                    <div className="success" hidden={!isRegistered}> 
                        <h2>You have been successfully registered!</h2>
                    </div>
                    <div hidden={isRegistered}>
                    <p>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            className="username"
                        />
                    </p>
                    <p>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="email"
                            autoComplete="email"
                        />
                    </p>
                    <p>
                        <input 
                            type="password"
                            id="password"
                            placeholder="Password"
                            className="password"
                            autoComplete="new-password"
                        />
                    </p>
                    <p>
                        <input 
                            type="password"
                            id="password_confirmation"
                            placeholder="Password confirmation"
                            className="password_confirmation"
                            autoComplete="new-password"
                        />
                    </p>

                    <input 
                        type="button"
                        value="Register"
                        onClick={this.handleSubmit.bind(this)}
                        className="btn"
                        hidden={inProcess}
                    />
                    <button
                        className="btn wait_btn"
                        hidden={!inProcess}
                        disabled
                    ><img src={LoadingImage} alt="registration..."/></button>
                    </div>
                </fieldset>
            </form>
        );
    }
}

export default connect(
    state => ({
        inProcess: state.register.status === 'request',
        isRegistered: state.register.status === 'success',
        isError: state.register.status === 'error',
        errorMsg: state.register.error.message
    }),
    dispatch => ({
        onRegister: bindActionCreators(registerRequest, dispatch), 
        onError: bindActionCreators(registerError, dispatch)
    })
)(RegisterPage);
