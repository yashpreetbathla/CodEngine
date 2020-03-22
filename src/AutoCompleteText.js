import React, { Component } from 'react';
import TextInput from 'react-autocomplete-input';
import './AutoCompleteText.css';

class AutoCompleteText extends React.Component {
  constructor(props) {
    super(props);
    let response;
    fetch('https://api.codechef.com/contests?fields=&status=&offset=&limit=&sortBy=&sortOrder', {
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer 29e024b555a52f822db45dbbcb94d49d367f0faf'
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
          {suggestions.map((item)=><li onClick={()=>this.suggestionSelected(item)}>{item}</li>)}
        </ul>
    ) 
  }

  suggestionSelected(value){
    this.setState(()=>({
      text:value,
      suggestions:[]
    }));
  }
  render() {
    const {text} = this.state;
    return (
      <div className="AutoCompleteText">
        <input value={text} onChange ={this.onTextChanged} type="text"/>
        
        <React.Fragment>
          {/* {this.items[]} */}
        {/* JSON.stringify({this.state.items}) */}
        {/* JSON.stringify({this.props.getNameCode}) */}
        </React.Fragment>
        
        {this.renderSuggestions()}
      </div>
    );
  }
}
export default AutoCompleteText;