import React, { Component } from 'react';
class Auth extends Component {
    state = {
        isLoggedIn : false,
        userID : '',
        name : '',
        email: '',
        picture:''    
      };
      constructor(props){
          super(props);
          
      }
      async componentDidMount() {
        const url = "https://api.codechef.com/oauth/authorize?response_type=code&client_id=abc6c2ddbf6d18ee86fc3c25f5673bb1&state=xyz&redirect_uri=http://localhost:3000/search";
        const response = await fetch(url);
        const data = await response.json();
        // this.setState({ person: data.results[0], loading: false });
        {this.setState({isLoggedIn:true})}
    }
    // http://localhost:3000/?code=51ac50fa479ec5bb4db325bf7a388df5acebd5d2&state=xyz
    
    render() { 
let Content;
        if(!this.state.isLoggedIn){
            return <div>Loading...</div>

        }else{
            return ( 
                <div>
    <h1>HEY</h1>
    
                </div>
             );
        }
      
       
    }
}
 
export default Auth;