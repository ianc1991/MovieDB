import './login.css'
import AuthService from "../../Services/Users/auth";
import React from 'react';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
      loading: false,
      message: ""
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.username, this.state.password).then(
        () => {
          this.props.history.push("/profile");
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

    render() { return (
      <div className='loginScreenContainer'>
        <div className='loginFormContainer bg-dark'>
          <h1>Login</h1>
          <form 
            className='formContainer' 
            onSubmit={this.handleLogin}
          >
            <input 
              type='text'
              placeholder="Email"
              value={this.state.email}
              onChange={this.onChangeEmail}
              required
            />
            <input 
              type='password' 
              placeholder="Password" 
              value={this.state.password}
              onChange={this.onChangePassword}
              required
            />
            <input 
              type='submit'
              value='Login' 
              className="btn btn-outline-success"
              disabled={this.state.loading}
            />
              {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    )}
};

export default Login;
