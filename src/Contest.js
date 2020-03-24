import React, { Component } from 'react';
// import {withRouter,useParams} from 'react-router-dom';
import { RouteComponentProps, withRouter } from "react-router";
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import './Contest.css';
class Contest extends Component {
  
    constructor(props){
      super(props);
      console.log(this);
      console.log('HII');
      var v = window.location.pathname;
      // alert(v);
      var res = v.substring(9, v.length);
      this.state = {
        val: res,
        problems : [],
        done : false,
        prob: [],
        name : '',
        code : '',
        st : '',
        en : '',
        banner : '',
        announcements : '',
        problemlist : []
      };
      this.setState({
        
        });
      let response;
      fetch("https://api.codechef.com/contests/"+this.state.val+"?fields=&sortBy=&sortOrder=", {
  headers: {
    Authorization: "Bearer a1303845541e18ff0023e765c348d5c26b714027"
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
var getCode = parsedjson['data']['content']['problemsList'].map(val => val.problemCode);
console.log('HEY');
console.log(getCode);
response = response.data.content;
// var temp= this.state.problems;
var lst = [];
for(let x of parsedjson['data']['content']['problemsList']){
//   let resp;
let a = {pcode : x['problemCode'],
ssub : x['successfulSubmissions'],
acc : x['accuracy']};

lst.push(a);
}

this.setState({
  name : response['name'],
  code : response['code'],
  st : response['startDate'],
  en : response['endDate'],
  banner : response['bannerFile'],
  announcements : response['announcements'],
  problemlist : lst,
  done:true
  });
// console.log(temp);
console.log(this.state.problems);

})
.catch(err => {
  console.error(err)
});


    }
   
    render() { 
      const {
        state: {
            val,
            problems,
            done,
            code,
            name,
            st,
            en,
            banner,
            problemlist,
            announcements
        }
    } = this;
        return (
          <div>
            { this.state.done === true && <div>
            {/* <h1>{this.state.val}</h1> */}
                <h1 style = {{alignSelf :"center"}}>  Farji CodeChef</h1>
               <div className="header">
  <h1 style={{color:"purple"}}>My Website</h1>
  <p>Resize the browser window to see the effect.</p>
</div>

<div className="topnav">
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#">Link</a>
  <a href="#" style={{float:"right"}}>Link</a>
</div>

<div className="row">
  <div className="leftcolumn">
    <div className="card" style={{borderRadius:"25px"}} >
    {/* <h1 style={{color:"red"}}>HEY</h1>
      <h2 style={{color:"red"}}>TITLE HEADING</h2>
      <h5 style={{color:"red"}}>Title description, Dec 7, 2017</h5> */}
      {/* <div className="fakeimg" style={{height:"200px"}} >Image</div> */}
     
      {/* {this.state.problems.map((problemDetails,index)=>(
        <div>
          <h2>YASH</h2>
     
          <h4>{problemDetails['data']['content']['problemName']}</h4>&nbsp;&nbsp;&nbsp;&nbsp;
          <h4>{problemDetails['data']['content']['problemCode']}</h4>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <h4>{problemDetails['data']['content']['successfulSubmissions']}</h4>
        </div>
      ))

      } */}

<React.Fragment>
            <ol>
            <h1 style={{color:"green"}}> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{this.state.name} - ({this.state.code}) </h1>
            <h4 style={{color:"red"}}> Start Time : {st} - End Time : {en}</h4>
            </ol>
            <hr/>
            {/* <img src = '${banner}' /> */}
            <div>
            &emsp;&emsp;
              <p style={{color:"green"}}> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   Problem &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;   Submissions  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;     Accuracy</p>
            <ol>
            &emsp;&emsp;
            {problemlist.map((prob, i) => (
              <div>
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;
                
              <ul style={{color:"black"}} key={i}>&emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;<Link className ='lst' to={ "/problem/"+prob.pcode+"/contest/"+ code}
            >{prob.pcode}</Link>  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; {prob.ssub}&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;&emsp; {prob.acc.toPrecision(3)}
              </ul>
            
              </div>
            ))}
            &emsp;&emsp;
            </ol>
            </div>
            <hr/>
            {/* <ol>
          <p style={{color:"green"}}>Announcements</p>
          <p style={{color:"black"}}>{announcements}</p>
          </ol> */}
          <hr/>
          </React.Fragment>
      {/* <p style={{color:"red"}}>Some text..</p>
      <p style={{color:"red"}}>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p> */}
    </div>
  </div>
  <br/>
  <div className="rightcolumn">
    <div className="card">
      <h2 style={{color:"green"}}>About Me</h2>
      <div className="fakeimg" style={{height:"100px"}}>Image</div>
      <p style={{color:"green"}}>Some text about me in culpa qui officia deserunt mollit anim..</p>
    </div>
    <div className="card">
      <h3 style={{color:"green"}}>Follow Me</h3>
      <p style={{color:"green"}}>Some text...</p>
    </div>
    <div className="card">
      <h3 style={{color:"green"}}>Popular Post</h3>
      <div className="fakeimg"><p>Image</p></div>
      <div className="fakeimg"><p>Image</p></div>
      <div className="fakeimg"><p>Image</p></div>
    </div>
    
        </div>
            </div> 
               </div>}
               </div>
          );
    }
}
 
export default withRouter(Contest);