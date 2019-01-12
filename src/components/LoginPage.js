import React, { Component } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { REDIRECT_AFTER_LOGIN, REGISTER_URL } from 'Constants';
import { loginRequest, loginError } from 'actions/loginActions';
import LoadingImage from 'img/Loading.gif';
import I18n from 'i18n';
import 'styles/AuthForm.css';


// TODO: Add I18n
class LoginPage extends Component {
    handleSubmit() {
        var data = {
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        }

        var valid = this.validate(data);
        if (valid === true) {
            this.props.onLogin(data);
        }
        else {
            this.props.onError(valid);
        }
    }

    // Validation form, return true or error msg
    validate(data) {
        if (!(data.password && data.email)) {
            return "Enter all the data";
        }
        else return true;
    }

    handleEnterBtnClick(event) {
        if (event.key === 'Enter') {
            this.handleSubmit();
        }
    }

    render() {
        const { isSigned, isError, inProcess, errorMsg, locale } = this.props;

        if (isSigned) return (
            <Redirect to={{ pathname: `/${REDIRECT_AFTER_LOGIN}` }}/>
        );
        else return (
            <form className="auth" onKeyDown={this.handleEnterBtnClick.bind(this)}>
                <fieldset>
                    <legend>{I18n[locale].login.prompt}</legend>
                    <div className="error" hidden={!isError}>
                        {errorMsg}
                    </div>
                    <p>
                        <input
                            type="text"
                            id="email"
                            placeholder={I18n[locale].login.email}
                            className="email"
                            autoComplete="email"
                        />
                    </p>
                    <p>
                        <input
                            type="password"
                            id="password"
                            placeholder={I18n[locale].login.password}
                            className="password"
                            autoComplete="current-password"
                        />
                    </p>

                    <input
                        type="button"
                        value={I18n[locale].login.login}
                        onClick={this.handleSubmit.bind(this)}
                        className="btn"
                        id="loginBtn"
                        hidden={inProcess}
                    />
                    <button
                        className="btn wait_btn"
                        hidden={!inProcess}
                        disabled
                    ><img src={LoadingImage} alt={I18n[locale].login.logining}/></button>
                    <NavLink to={`/${REGISTER_URL}`} >
                        <input
                            type="button"
                            value={I18n[locale].login.register}
                            className="btn"
                            id="signupBtn"
                        />
                    </NavLink>
                </fieldset>
            </form>
        );
    }
}

export default connect(
    state => ({
        inProcess: state.auth.status === 'request',
        isSigned: state.auth.status === 'signed',
        isError: state.auth.status === 'error',
        errorMsg: state.auth.error.message,
			  locale: state.locale,
    }),
    dispatch => ({
        onLogin: bindActionCreators(loginRequest, dispatch),
        onError: bindActionCreators(loginError, dispatch)
    })
)(LoginPage);
