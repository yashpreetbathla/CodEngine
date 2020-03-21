import React, { Component } from 'react';
import './Search.css';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
class FinalSearch extends Component {
  constructor(props){
    
    super(props);
    let response;
    fetch('https://api.codechef.com/contests?fields=&status=&offset=&limit=&sortBy=&sortOrder', {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer a90774c2d8db3a7a03e971c8f8ca3cd660225444'
      },
      method: 'GET'
  })
      .then(res => {
          return res.json();
      })
      .then(res => {
          console.log(res);
          this.setState({questions: res});
         response = res.result;
         var parsedjson =  JSON.parse(JSON.stringify(response));
  // alert(parsedjson);
  console.log(parsedjson);
  var getCode = parsedjson['data']['content']['contestList'].map(val => val.code)
  var getName = parsedjson['data']['content']['contestList'].map(val => val.name)
  var getNameCode = getCode.concat(getName);
  this.items = getNameCode;
  var getStartDate = parsedjson['data']['content']['contestList'].map(val => val.startDate)
  var getEndDate = parsedjson['data']['content']['contestList'].map(val => val.endDate)

  
      })
      .catch(err => {
          console.error(err)
      });
    
    console.log(this.items);
    this.state={
      suggestions:[],
      text:'', 
      code:'' ,
    };
  
}
onTextChanged=(e)=>{
    const value = e.target.value;
    if(value.length === 0){
      this.setState(()=>({
        suggestions:[],
      }));
    }else{
        const regex = new RegExp(`^${value}`, 'i');
      const suggestions = this.items.sort().filter(v=>regex.test(v));
      this.setState(()=>({suggestions, text:value}));
    }
  }
  renderSuggestions(){
    const {suggestions} = this.state;
    if(suggestions.length === 0){
    return null;
    }
    return (
        <ul>
          {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}  >{item}</li>)}
        </ul>
    ) 
  }
  suggestionSelected(value){
    this.setState(()=>({
      text:value,
      suggestions:[]
    }));
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
        const {text} = this.state;
        return (  
            <div>
           <div> <h1>{this.state.code}</h1>  </div>
                <div class="flexbox">
                  
  <div className="search">
    <h1>Search Contest</h1>
    <h3>Click on search icon, then type your keyword.</h3>
    <div>
       
    <input value={text} onChange ={this.onTextChanged} type="text" placeholder="       Search . . ." required  />
      {this.renderSuggestions()}
    </div>
  </div>
</div>
            </div>
        );
    }
}
 
export default withRouter(FinalSearch);