import React, { Component } from 'react';
// import {withRouter,useParams} from 'react-router-dom';
import { RouteComponentProps, withRouter } from "react-router";
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import './Contest.css';
import Rankings from './Rankings';
import moment from 'moment';
import Logo from './logo192.png';
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
    Authorization: "Bearer 956f0e2731d661d3b8a57685161e5f78d4268b22"
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
        Authorization: "Bearer 956f0e2731d661d3b8a57685161e5f78d4268b22"
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
    Authorization: "Bearer 956f0e2731d661d3b8a57685161e5f78d4268b22"
  },
  method: 'GET'
}).then(res => {
    return res.json();
})
.then(res => {

    console.log(res);
    response = res.result;
    var parsedjson =  JSON.parse(JSON.stringify(response));
   
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
                  { this.state.done === true && 
                  <div>
                    <nav class="contestnav">
                      <ul>
                        <li><h2 style={{color:"white"}}>CodEngine</h2></li>
                      </ul>
                    </nav>

                    <div className="row">
                      <h1 className="contesthead"> {this.state.name} - ({this.state.code}) </h1>
                      <div className="timecontest">
                        { ended === "begin" && 
                              <div>
                                <p style={{textAlign:"center", fontSize:"25px"}}>Contest Starts In:</p>
                                <hr style={{borderTop: "2px solid black", margin: "0px 20% 0px 20%" }}/>
                                <ul className="timer"> 
                                  <li><span>{this.state.d}</span></li>
                                  <li><span>{this.state.h}</span></li>
                                  <li><span>{this.state.m}</span></li> 
                                  <li><span>{ this.state.s}</span></li>
                                </ul>
                                <ul className="timerhead">
                                  <li id="clock-hrs-left">Hrs</li>
                                  <li id="clock-min-left">Min</li>
                                  <li id="clock-sec-left">Sec</li> 
                                </ul>
                              </div>   
                            }
                            { ended === "run" &&
                              <div>
                                <p style={{textAlign:"center", fontSize:"25px"}}>Contest Ends In:</p>
                                <hr style={{borderTop: "2px solid black", margin: "0px 20% 0px 20%" }}/>
                                <ul className="timer"> 
                                  <li ><span>{this.state.h}</span></li>
                                  <li><span>{this.state.m}</span></li> 
                                  <li><span>{ this.state.s}</span></li>
                                </ul>
                                <ul className="timerhead">
                                  <li id="hrs-left">Hrs</li>
                                  <li id="min-left">Min</li>
                                  <li id="sec-left">Sec</li> 
                                </ul>
                              </div>    
                            }
                            { ended === "ended" && <div>
                                <p style={{textAlign:"center", fontSize:"25px"}}>Contest Ended</p>
                                <hr style={{borderTop: "2px solid black", margin: "0px 20% 0px 20%" }}/>
                              </div>}
                      </div>
                      <div className="leftcolumn">
                          <React.Fragment>
                              <table className="problemtable">
                                <tbody>
                                  <tr>
                                    <th>Problem</th>
                                    <th>Submissions</th>
                                    <th>Accuracy</th>
                                  </tr>
                                  {problemlist.map((prob, i) => (
                                    <tr key={i}>
                                      <td><Link className ='lst' to={ "/problem/"+prob.pcode+"/contest/"+ code}>{prob.pcode}</Link></td>
                                      <td>{prob.ssub}</td>
                                      <td>{prob.acc.toPrecision(3)}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                          </React.Fragment>
                    
                      </div>
                      
                      <div className="rightcolumn">
                        <div >
                          <h4 className="ranklist">Ranking</h4>
                          <div className="rank">
                            <React.Fragment>
                                <table className="problemtable">
                                  <tbody>
                                    <tr>
                                      <th>Rank</th>
                                      <th>Username</th>
                                      <th>Score</th>
                                    </tr>
                                  </tbody>
                                  {rankings.map((prob, i) => (
                                    <tr key={i}>
                                      <td>{prob.prank}</td>
                                      <td>{prob.pusername}</td>
                                      <td>{prob.score }</td>
                                    </tr>
                                  ))}
                                </table>
                              </React.Fragment>
                          </div>
                        </div>

                        <div>
                          <h4 className="ranklist">Recent activity</h4>
                          <div className="rank">
                            <React.Fragment>
                              <table className="problemtable">
                                  <tbody>
                                    <tr>
                                      <th>Username</th>
                                      <th>Problem</th>
                                      <th>Result</th>
                                      <th>Lang</th>
                                    </tr>
                                  </tbody>
                                  {submissions.map((prob, i) => (
                                    <tr key={i}>
                                      <td>{prob.pusername}</td>
                                      <td><Link to={ "/problem/"+prob.problemcode+"/contest/"+ code}> {prob.problemcode}</Link></td>
                                      <td>{prob.result }</td>
                                      <td>{prob.language.substring(0,3)}</td>
                                    </tr>
                                  ))}
                              </table>
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