import React, { Component } from 'react';
// import {withRouter,useParams} from 'react-router-dom';
import { RouteComponentProps, withRouter } from "react-router";
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import './Contest.css';
import Rankings from './Rankings';
import moment from 'moment'
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
        problemlist : [],
        rankings : [],
        submissions:[],
        ended: ''
      };
      this.setState({
        
        });
      let response;
      fetch("https://api.codechef.com/contests/"+this.state.val+"?fields=&sortBy=&sortOrder=", {
  headers: {
    Authorization: "Bearer 562fec58e42e4fc68929edb05c8ffe430703467e"
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
  var self = this;
  setInterval(()=>{
    var tt = moment(self.state.en).diff(moment());
    var st =moment(self.state.st).diff(moment());

    if(tt<=0 && st<=0){
      console.log('st'+st);
      self.setState({ended:'ended'});
    }
   else if( tt>=0&& st<=0){
    self.setState({ended:'run'});
    self.setState({
      h: moment.duration(moment(self.state.en).diff(moment())).hours(),
      m: moment.duration(moment(self.state.en).diff(moment())).minutes(),
      s: moment.duration(moment(self.state.en).diff(moment())).seconds(),
    })
   }
   else if(st>0){
    self.setState({ended:'begin'});
    self.setState({
      d: moment.duration(moment(self.state.st).diff(moment())).days(),
      h: moment.duration(moment(self.state.st).diff(moment())).hours(),
      m: moment.duration(moment(self.state.st).diff(moment())).minutes(),
      s: moment.duration(moment(self.state.st).diff(moment())).seconds(),
    })
   }
    console.log(moment(self.state.en).diff(moment()))
    //-ve past data 
    console.log(moment(self.state.st).diff(moment()))
  
  },1000);
// console.log(temp);





console.log(this.state.problems);

})
.catch(err => {
  console.error(err)
});
// let response;

                                                                      //RANKINGS


    fetch("https://api.codechef.com/rankings/"+ this.state.val +"?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=", {
      headers: {
        Authorization: "Bearer 562fec58e42e4fc68929edb05c8ffe430703467e"
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
console.log('HEYEGYGEYGBCY');
console.log(parsedjson);

var lst = [];
for(let x of parsedjson['data']['content']){
//   let resp;
let a = {prank : x['rank'],
pusername : x['username'],
score : x['totalScore']};

lst.push(a);
}

this.setState({

  rankings : lst,
  done:true
  });

    })
    .catch(err => {
        console.error(err)
    });
                                                                    //Submissions


 fetch("https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode="+ this.state.val +"&fields=", {
  headers: {
    Authorization: "Bearer 562fec58e42e4fc68929edb05c8ffe430703467e"
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
    console.log('submissions');
    console.log(parsedjson);

var lst = [];
for(let x of parsedjson['data']['content']){
//   let resp;
let a = {problemcode : x['problemCode'],
pusername : x['username'],
result : x['result'],
language:x['language']
};

lst.push(a);
}

this.setState({

submissions : lst,
done:true
});

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
            announcements,
            rankings,
            submissions,
            ended,
            d
        }
    } = this;
        return (
          <div className="contestbackground">
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
            <h1 style={{color:"green"}}> &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;{this.state.name} - ({this.state.code}) </h1>
            <h4 style={{color:"red"}}> Start Time : {st} - End Time : {en}
             Difference:  {this.state.h}{this.state.m}{ this.state.s}</h4>
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
      <h2 style={{color:"black",fontWeight: 'bold'}}>TIMER</h2>
      { ended === "begin" && <div>
      <h5 style={{color:"black",fontWeight: 'bold'}}>Contest Begins In :- </h5>
  <p style={{color:"black",fontWeight: 'bold'}}>   {this.state.d}  : {this.state.h} : {this.state.m} : { this.state.s} </p>

      </div>   }
      { ended === "run" &&<div>
        <h5 style={{color:"black",fontWeight: 'bold'}}>Contest Ends In :- </h5>
        <p style={{color:"black",fontWeight: 'bold'}}>   {this.state.h}:{this.state.m}:{ this.state.s} </p>
        </div>
      }
      { ended === "ended" && <div>
      <h4 style={{color:"black",fontWeight: 'bold'}}>Contest Ended :- </h4>
      </div>

      }
      <p style={{color:"green"}}>   </p>
    </div>
    <div >
      <h2 style={{color:"black",fontWeight: 'bold'}}> &emsp;  &emsp;  &emsp;  &emsp; Rankings</h2>
      <br/>
  
      {/* <div className="fakeimg" style={{height:"100px"}}>Image</div> */}
      {/* <Rankings text={code} /> */}
      <div className ="rank">
        
        <React.Fragment>
       
            <div>
              <p style={{color:"black",fontWeight: 'bold'}}> Rank &emsp; Username   &emsp;  Score </p>
              <hr/>
            <ol>
           
            {rankings.map((prob, i) => (
              <div>
                
              <ul style={{color:"black"}} key={i}>  &nbsp;&nbsp;{prob.prank} &emsp;&nbsp;&nbsp;&nbsp; {prob.pusername} &nbsp;&nbsp;&emsp;&nbsp;  {prob.score }
              </ul>
            
              </div>
            ))}
          
            </ol>
            </div>
            <hr/>
            {/* <ol>
          <p style={{color:"green"}}>Announcements</p>
          <p style={{color:"black"}}>{announcements}</p>
          </ol> */}
          <hr/>
          </React.Fragment>
</div>
    </div>
   <br/>
    <div>
    <h2 style={{color:"black",fontWeight: 'bold'}}>  &emsp;  &emsp;  &emsp;  &emsp; Recent activity</h2>
    <br/>
   
      <div className="rank2">
      <React.Fragment>
       
       <div>
         <p style={{color:"black",fontWeight: 'bold'}}> Username &emsp;  Problem &emsp; Result  &emsp; Lang </p>
         <hr/>
       <ol>
      
       {submissions.map((prob, i) => (
         <div>
           
         <ul style={{color:"black"}} key={i}>{prob.pusername} &emsp;&nbsp;<Link to={ "/problem/"+prob.problemcode+"/contest/"+ code}> {prob.problemcode}</Link> &nbsp;&nbsp;&emsp;&nbsp;  {prob.result } &nbsp;&nbsp;&emsp;{prob.language.substring(0,3) }
           
           
         </ul>
       
         </div>
       ))}
     
       </ol>
       </div>
       <hr/>
       {/* <ol>
     <p style={{color:"green"}}>Announcements</p>
     <p style={{color:"black"}}>{announcements}</p>
     </ol> */}
     <hr/>
     </React.Fragment>
      </div>
    </div>
    
        </div>
            </div> 
               </div>}
               </div>
          );
    }
}
 
export default withRouter(Contest);