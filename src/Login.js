import React, { Component } from 'react';
import './Login.css';
class Login extends Component {
    constructor(props){
        super(props);
        // alert(window.location.pathname);
    }
        handleClick() {
            window.location.href = "https://api.codechef.com/oauth/authorize?response_type=code&client_id=abc6c2ddbf6d18ee86fc3c25f5673bb1&state=xyz&redirect_uri=http://localhost:3000/search"
          }
    render() { 
        return ( 
            
            <div>
               
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"/>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script> 
                <br/><br/><br/><br/><br/><br/><br/>
                
<div className="login-form" style={{float : 'center'}}>
 
        <h2 className="text-center">Login</h2>   
       
        <div className="form-group">
        {/* <form  > */}
        <div className="log">
        <button type="submit" className="btn btn-primary btn-lg btn-block" onClick={this.handleClick}>Sign in</button>
        </div>
        {/* </form> */}
            {/* <button type="submit" className="btn btn-primary btn-lg btn-block" onclick="https://api.codechef.com/oauth/authorize?response_type=code&client_id=abc6c2ddbf6d18ee86fc3c25f5673bb1&state=xyz&redirect_uri=http://localhost:3000/">Sign in</button> */}
        </div>
    
</div>
            </div>
         );
    }
}
 
export default Login;