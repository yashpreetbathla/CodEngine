import React, { Component } from 'react';
import { render } from "react-dom";
import AceEditor from "react-ace";
import brace from 'brace';
import './CodeEditor.css';
import 'brace/mode/javascript';
import 'brace/mode/c_cpp'
import 'brace/mode/java'
import 'brace/mode/python'
import 'brace/mode/golang'
import 'brace/theme/monokai'
import 'brace/theme/tomorrow'
import 'brace/theme/github';
import Parser from 'html-react-parser';
class CodeEditor extends Component {
  code4 = "";
  constructor(props) {
    super(props);
    // this.onChange = this.onChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    // this.onChange = this.onChange.bind(this);
    this.state = {
      code: ``,
      codd : " // Write your code here ... ",
       lang: "c_cpp",
      theme: "monokai",
      output: {},
      stat: false,
       customTC:"",
       statement : '',
       running:false,
       sub:false

    };

    var str = window.location.href.split('/');
        
     console.log(str);

    fetch("https://api.codechef.com/contests/"+str[6]+"/problems/"+str[4], {
      headers: {
        Authorization: "Bearer 5678ddbc38e5c81f7a40194d532416936f9ca08f"
      },
      method: "GET"
    }).then(res => {
      return res.json();
    }).then(res => {
    let response = res.result;
    console.log(res);
    console.log(response);
        
          var parsedjson =  JSON.parse(JSON.stringify(response));
          var parsedjson1 =  parsedjson["data"]["content"];
          console.log(parsedjson1);
          this.setState({
              pname : parsedjson1['problemName'],
              pcode : parsedjson1['problemCode'],
              statement : parsedjson1['body'],
              sizelt : parsedjson1['sourceSizeLimit'],
              timelt : parsedjson1['maxTimeLimit'],
              auth : parsedjson1['author'],
              sucsub : parsedjson1['successfulSubmissions'] ,
              totsub : parsedjson1['totalSubmissions'] ,
              lag : parsedjson1['languagesSupported']});
      })
  .catch(err => {
      console.log("NOT DONE");
      console.log(err.response);
      // alert("SESSION EXPIRED! YOU HAVE TO LOGIN AGAIN !");
      // window.location.href = 'http://localhost:8000/index.php'
  })

  }
  sets(s) {
    this.setState({ codd: s });
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.codd !== nextState.codd) {
      return false;
    } else return true;
  }
  handleClick() {
  //   console.log('language...')
  //  console.log(this.state.lang)
    if(this.state.lang === "c_cpp"){
      this.setState({lang:"C++14"});
 
    }
    else if(this.state.lang === "python"){
      this.setState({lang:"PYTH 3.6"});
    }  
    else if(this.state.lang === "java"){
      this.setState({lang:"JAVA"});
    }
    else if(this.state.lang === "javascript"){
      this.setState({lang:"JS"});
    }   
    else if(this.state.lang === "goloang"){
      this.setState({lang:"GO"});
    } 
     var payload = {
      sourceCode: this.state.codd,
      language: this.state.lang,
      input: this.state.customTC
    };
this.setState({running:true,sub:false});
    var data = new FormData();
    data.append("json", JSON.stringify(payload));
    let response;
    if(this.state.running === true)
    fetch("https://api.codechef.com/ide/run", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer 5678ddbc38e5c81f7a40194d532416936f9ca08f"
      },
      method: "POST",
      body: JSON.stringify(payload)
      // body: payload
    })
      .then(res => {
        return res.json();
      })
      .then(data => {
        console.log(JSON.stringify(data));
        response = data.result;
        var parsedjson = JSON.parse(JSON.stringify(response));
        console.log(parsedjson["data"].link);
        var link = parsedjson["data"].link;
        console.log(link);
        
        this.setState({link: link});
        this.setopts();
      })
      .catch(err => {
        console.error(err);
      });
  }
   setopts(){

    if(this.state.running === true)
      fetch("https://api.codechef.com/ide/status?link=" + this.state.link, {
          headers: {
            Authorization: "Bearer 5678ddbc38e5c81f7a40194d532416936f9ca08f"
          },
          method: "GET"
        })
          .then(res => {
            return res.json();
          })
          .then(res => {
            console.log(res);
            var st = res.status;
            console.log(st);
           
            let response = res.result;
            var parsedjson = JSON.parse(JSON.stringify(response));
            // alert(parsedjson);
            console.log("submissions");
            console.log(parsedjson);
            
            let a = {
              status: st,
              date: parsedjson["data"].date,
              op: parsedjson["data"].output,
              mem: parsedjson["data"].memory
            };
            // console.log(a);
            this.setState({
              output: a,
              stat : true
            });
            if(parsedjson["data"].memory == 0){
                setTimeout(()=>{
                this.setopts();
                },20000);
            }
            console.log(this.state.output);
          })
          .catch(err => {
            console.error(err);
          });
  }

 onChange= newValue=> {
      // newValue.preventDefault();
        console.log("change", newValue);
        // this.sets(newValue)
        // this.code4 = newValue;
        this.setState({
          codd:newValue
        })
        console.log(this.state.codd)
      }
      handleCustomTC= e =>{

        this.setState({customTC : e.target.value});
        console.log(this.state.customTC);
      }  
       runCode(){
         console.log('BUTTON RUN');
       }
       submit = ()=>{
         this.setState({sub:true,running:false});
       }
       handleChange1= (e)=>{
        this.setState({lang:e.target.value});
    }
    handleChange2 = (e)=>{
        this.setState({theme:e.target.value});
    } 
    render() {
      const {
        state: { codd, output ,stat,pcode,
          pname,
          statement,
          sizelt,
          timelt,
          auth,
          sucsub,
          totsub,
          running,
          sub,
          lang,
          theme
            }
      } = this;
        return (
            <div>
                <div className="card" style={{borderRadius:"25px",color:"black"}}>
                <h1>{pname} ({pcode})</h1>
                    <p>Successful Submissions : {sucsub} <br></br>Total Submissions : {totsub}</p>
                    <hr/>
                    <em>{Parser(statement)}</em>
                    <hr/>
                    <p>Author : {auth}</p>
                    <p>Maximum Size Limit : {sizelt}</p>
                    <p>Maximum Time Limit : {timelt}</p>
                    <hr/>
                </div>
                <div className="codeeditor">
                <h1>Using React-Ace</h1>
              &emsp;&emsp;&emsp;&emsp; <select 
                    value={lang} 
                    onChange={this.handleChange1} 
                >
                <option value = "c_cpp">C++</option>
                <option value = "java">Java</option>
                <option value = "python">Python</option>
                <option value = "javascript">Javascript</option>
                <option value = "golang">Golang</option>
                </select>
                &emsp;&emsp;
                <select 
                    value={theme} 
                    onChange={this.handleChange2} 
                >
                <option value = "monokai">Monokai</option>
                <option value = "tomorrow">Tomorrow</option>
                <option value = "github">Github</option>
                </select>

                <AceEditor  style={{borderRadius:"25px",width:"95%"}}
           mode = {lang}
           theme = {theme}
          name="editor"
          value={codd}
          onChange={this.onChange}
          fontSize={19}
          editorProps={{$blockScrolling: true}}
        />
                </div>
                <div>
                  <h2>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Custom Input</h2>
                <textarea cols="50" rows="5" className="ta" value={this.state.customTC} onChange={this.handleCustomTC}  >

  </textarea>  
                <button className="button" onClick={this.handleClick}><span> Run </span></button>
                <button className="button2" onClick={this.submit}> <span> Submit </span></button>
                { 
                        sub === true && <div className="card" style={{borderRadius:"25px",color:"black",fontSize:"30px",marginBottom:"25px"}}>
          &emsp;&emsp;&emsp;&emsp; &emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;&emsp;&emsp;  &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   <span>&#9989;</span>
                           Submitted</div>
                }
                {output.mem === 0 && running === true &&<div className="card" style={{borderRadius:"25px",color:"black"}}>
            
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
                &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; Running...

                </div> }

                { sub ===false && stat === true  && output.mem!==0 && <div className="card" style={{borderRadius:"25px",color:"black"}}>
          <p> Status : </p> {output.status} <p> Date : </p>
          {output.date} <p> Memory : </p>
          {output.mem}
          <br /> <p> Output : </p>
          {output.op}
        </div>}
               
    
                </div>
            </div>
          );
    }
}
const data = `function onLoad(editor) {
  console.log("I've loaded!");
}`;
export default CodeEditor;


