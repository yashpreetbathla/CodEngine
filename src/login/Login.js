import React, { Component } from "react";
import "./Login.css";
import * as URL from '../config.js';
class Login extends Component {
  constructor(props) {
    super(props);
  }
  handleClick() {
    window.location.href = URL.default.url;
     }
  render() {
    return (
      <div className="loginbackground">
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="login-form" style={{ float: "center" }}>
          
          <div style={{}}>
            <img className="logoimage" src="https://github.com/yashpreetbathla/Images/blob/master/Codengine-cropped.png?raw=true" alt="CodEngine" />
          </div>
          <div className="form-group">
         
            <div className="log">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={this.handleClick}
              >
                Sign in
              </button>
            </div>
               </div>
        </div>
      </div>
    );
  }
}

export default Login;
