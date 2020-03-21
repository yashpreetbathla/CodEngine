import React, { Component } from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
class Search extends Component {
  constructor(props){
    
    super(props);
    
    // alert(this.props.location.search);
    this.state={
      code:'' 
    }
}

componentDidMount(){
  const values = queryString.parse(this.props.location.search)
  // alert(values.code) // CODE
  let Code = JSON.stringify(values.code);
  // alert(Code);
  
  console.log(Code);
  this.setState({ code: Code });
 
}
    render() {
      
        return (  
            <div>
           <div> <h1>{this.state.code}</h1>  </div>
                <div class="flexbox">
                  
  <div className="search">
    <h1>Search Contest</h1>
    <h3>Click on search icon, then type your keyword.</h3>
    <div>
       
      <input type="text" placeholder="       Search . . ." required  />
    </div>
  </div>
</div>
            </div>
        );
    }
}
 
export default withRouter(Search);