import React, { Component } from 'react';
import './FinalSearch.css';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import Contest from './Contest';
import {Link} from 'react-router-dom';
class FinalSearch extends Component {
  idMap = {};
  items = [];
CC='1';
  constructor(props){
    
    super(props);
    
    let response;
    fetch('https://api.codechef.com/contests?fields=&status=&offset=&limit=&sortBy=&sortOrder', {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer a1303845541e18ff0023e765c348d5c26b714027'
      },
      method: 'GET'
  })
      .then(res => {
          return res.json();
      })
      .then(res => {
      
          console.log(res);
         response = res.result;
         var parsedjson =  JSON.parse(JSON.stringify(response));
  // alert(parsedjson);
  console.log(parsedjson);
  var getCode = parsedjson['data']['content']['contestList'].map(val => val.code)
  var getName = parsedjson['data']['content']['contestList'].map(val => val.name)
  var getNameCode = getCode.concat(getName);
  this.items = getNameCode;
  var getNameCode = getCode.concat(getName);
  console.log(this.items);
  for(let x of parsedjson['data']['content']['contestList']){
    this.idMap[x.name] = x.code
    this.idMap[x.code] = x.code
  }
  console.log(this.idMap);
  this.setState({mapping: this.idMap});
  var getStartDate = parsedjson['data']['content']['contestList'].map(val => val.startDate)
  var getEndDate = parsedjson['data']['content']['contestList'].map(val => val.endDate)

  
      })
      .catch(err => {
          console.error(err)
      });
    
    // console.log(this.items);
    this.state={
      suggestions:[],
      text:'', 
      code:'' ,
      mapping:{},
      FC:''
    };
  
}
onTextChanged=(e)=>{
  const value = e.target.value;
  if(value.length === 0){
    this.setState(()=>({
      suggestions:[],
    }));
  }else{
    const regex = new RegExp(`^${value}`,`i`);
    const suggestions = this.items.sort().filter(v=>regex.test(v));
    this.setState(()=>({suggestions, text:value}))  ;
  }
}

  renderSuggestions(){
    const {suggestions} = this.state;
    if(suggestions.length === 0){
    return null;
    }
    var x=this.CC;
    const newTo = { 
      pathname: "/contest/" + x, 
      param1: this.CC 
    };
    return (
        <ul>
          {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}  >   {item}  </li>)}
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

setText(value){
console.log(value);

console.log(this.idMap[value.text]);
var v = this.idMap[value.text];
this.state.FC = v;
this.CC = this.state.FC;
console.log("HEY")
console.log(this.CC);
}
isDisabled() {
  //logic to define if button should be disabled or not
  //return boolean true or false based on that
  // return this.state.FC < 0;
  return this.state.FC;
}
    render() {
        const {text} = this.state;
        return (  
            <div>
           {/* <div> <h1>{this.state.code}</h1>  </div> */}
                <div className="flexbox">
                  
  <div className = "search">
    <h1>Search Contest</h1>
    <h3>Click on search icon, then type your keyword.</h3>
    <div>
       
    <input value={text} onChange ={this.onTextChanged} type="text" placeholder="       Search . . ." required  />
    {/* <input type="button" value="Search"/> */}
      {this.renderSuggestions()}
     <p> {this.setText({text})}</p>
          
        {/* <p>{this.state.FC}</p> */}
        <div className="container-click">
        {this.isDisabled()?<button type="submit" className="click-button" 
         disabled={this.isDisabled()}><Link to= {"/contest/"+ this.state.FC  } className="click">Search</Link></button>:<button type="submit" className="click-button"
         disabled={this.isDisabled()}><Link className="click" >Search</Link></button>}
        
        {/* <Contest text = {this.state.FC} /> */}
        </div>
    </div>
  </div>
</div>
            </div>
        );
    }
}
 
export default withRouter(FinalSearch);