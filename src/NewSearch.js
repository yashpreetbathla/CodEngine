import React, { Component } from 'react';
import AutoCompleteText from './AutoCompleteText';
class NewSearch extends Component {
    constructor(){
        super();
        this.state = {
            questions: [],
            contestNames:[]
        }
    }

componentDidMount() {
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
this.setState({contestNames:getNameCode});
var getStartDate = parsedjson['data']['content']['contestList'].map(val => val.startDate)
var getEndDate = parsedjson['data']['content']['contestList'].map(val => val.endDate)
console.log(getNameCode);

    })
    .catch(err => {
        console.error(err)
    });
        
        
  }
 
  render() {
    return (<div>
        {/* {this.state.questions} */}
        HEY
        {/* <React.Fragment>{
        // JSON.stringify([this.state.questions.result])}
        JSON.stringify([this.state.contestNames])}
        </React.Fragment> */}
        <AutoCompleteText getNameCode={this.state.contestNames}/>
{/* Object.keys(this.state.questions.object).map((key, i) => (
    <p key={i}>
      <span>Key Name: {key}</span>
      <span>Value: {this.state.questions.object[key]}</span>
    </p>
  ) */}
        
    </div>)
  }
}
export default NewSearch;