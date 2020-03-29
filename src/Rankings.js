import React, { Component } from 'react';
class Rankings extends Component {
   
    constructor(props){
        super(props);
        let response;
        fetch("https://api.codechef.com/rankings/"+ this.state.linkFor   +"?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=", {
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : 'Bearer 4b1223fe8c73e891eb4f6a8b29627a8ee262e6a8'
            },
            method: 'GET'
        }).then(res => {
            return res.json();
        })
        .then(res => {
        
            console.log(res);
           response = res.result;
           var parsedjson =  JSON.parse(JSON.stringify(response));
    // alert(parsedjson);
    console.log(parsedjson);
   
        })
        .catch(err => {
            console.error(err)
        });
    }
    state = { 
        linkFor:this.props.text
     }
    render() { 
        return ( <div>
            <h1 style={{color:"green"}}> Rankings of {this.props.text} </h1>
        </div> );
    }
}
 
export default Rankings;


