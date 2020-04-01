import React, { Component } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
import brace from "brace";
import "./CodeEditor.css";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/mode/java";
import "brace/mode/python";
import "brace/mode/golang";
import "brace/theme/monokai";
import "brace/theme/tomorrow";
import "brace/theme/github";
import Parser from "html-react-parser";

class CodeEditor extends Component {
  code4 = "";
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      code: ``,
      codd: " // Write your code here ... ",
      lang: "c_cpp",
      theme: "monokai",
      output: {},
      stat: false,
      customTC: "",
      statement: "",
      running: false,
      sub: false,
      clicked: false,
    };

    this.getProblems();
  }
  getProblems() {
    var str = window.location.href.split("/");
    while (localStorage.getItem("aut_token") === null) {}
    fetch(
      "https://api.codechef.com/contests/" + str[6] + "/problems/" + str[4],
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("aut_token"),
        },
        method: "GET",
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        let response = res.result;

        var parsedjson = JSON.parse(JSON.stringify(response));
        var parsedjson1 = parsedjson["data"]["content"];

        this.setState({
          pname: parsedjson1["problemName"],
          pcode: parsedjson1["problemCode"],
          statement: parsedjson1["body"],
          sizelt: parsedjson1["sourceSizeLimit"],
          timelt: parsedjson1["maxTimeLimit"],
          auth: parsedjson1["author"],
          sucsub: parsedjson1["successfulSubmissions"],
          totsub: parsedjson1["totalSubmissions"],
          lag: parsedjson1["languagesSupported"],
        });
      })
      .catch((err) => {
        if (localStorage.getItem("ref_token") === null) {
          window.location.href = "http://localhost:8000/index.php";
        } else {
          fetch(
            `http://localhost:8000/index.php/?ref_token=${localStorage.getItem(
              "ref_token"
            )}`,
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Accept: "application/json",
              },
              method: "GET",
            }
          )
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              var tk = res.access_token;
              var rtk = res.refresh_token;
              localStorage.setItem("aut_token", tk);
              localStorage.setItem("ref_token", rtk);
              this.getProblems();
            });
        }
        // alert("SESSION EXPIRED! YOU HAVE TO LOGIN AGAIN !");
        // window.location.href = 'http://localhost:8000/index.php'
      });
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
    if (this.state.lang === "c_cpp") {
      this.setState({ lang: "C++14" });
    } else if (this.state.lang === "python") {
      this.setState({ lang: "PYTH 3.6" });
    } else if (this.state.lang === "java") {
      this.setState({ lang: "JAVA" });
    } else if (this.state.lang === "javascript") {
      this.setState({ lang: "JS" });
    } else if (this.state.lang === "goloang") {
      this.setState({ lang: "GO" });
    }

    var payload = {
      sourceCode: this.state.codd,
      language: this.state.lang,
      input: this.state.customTC,
    };
    this.setState({ running: true, sub: false });
    var data = new FormData();
    data.append("json", JSON.stringify(payload));
    let response;
    if (this.state.running == true)
      fetch("https://api.codechef.com/ide/run", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("aut_token"),
        },
        method: "POST",
        body: JSON.stringify(payload),
        // body: payload
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          response = data.result;
          var parsedjson = JSON.parse(JSON.stringify(response));

          var link = parsedjson["data"].link;

          this.setState({ link: link });
          this.setopts();
        })
        .catch((err) => {
          console.error(err);
        });
  }
  setopts() {
    if (this.state.running === true)
      fetch("https://api.codechef.com/ide/status?link=" + this.state.link, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("aut_token"),
        },
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          var st = res.status;

          let response = res.result;
          var parsedjson = JSON.parse(JSON.stringify(response));

          let a = {
            status: st,
            date: parsedjson["data"].date,
            op: parsedjson["data"].output,
            mem: parsedjson["data"].memory,
          };

          this.setState({
            output: a,
            stat: true,
          });
          if (parsedjson["data"].memory == 0) {
            setTimeout(() => {
              this.setopts();
            }, 20000);
          }
        })
        .catch((err) => {
          console.error(err);
        });
  }

  onChange = (newValue) => {
    this.setState({
      codd: newValue,
    });
  };
  handleCustomTC = (e) => {
    this.setState({ customTC: e.target.value });
  };
  runCode() {}
  submit = () => {
    this.setState({ sub: true, running: false });
  };
  handleChange1 = (e) => {
    this.setState({ lang: e.target.value });
  };
  handleChange2 = (e) => {
    this.setState({ theme: e.target.value });
  };
  myFunction = () => {
    var bl = this.state.clicked;
    if (bl === false) bl = true;
    else bl = false;
    this.setState({ clicked: bl });
  };
  render() {
    const {
      state: {
        codd,
        output,
        stat,
        pcode,
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
        theme,
        clicked,
      },
    } = this;
    return (
      <div>
        <nav class="CodeeditorNav">
          <ul>
            <li>
              <img className="contestlogo" src="https://github.com/yashpreetbathla/Images/blob/master/Codengine_white-cropped.png?raw=true" alt="CodEngine" />
            </li>
          </ul>
        </nav>
        <div className="card">
          <div className="qhead">
            <h1>
              {pname} ({pcode})
            </h1>
            <p>
              Successful Submissions : {sucsub} <br></br>Total Submissions :{" "}
              {totsub}
            </p>
          </div>
          <p
            className="question"
            style={{
              textAlign: "justify",
              textJustify: "inter-word",
              margin: "0px",
            }}
          >
            {Parser(statement)}
          </p>
          <div className="authdiv">
            <p>Author : {auth}</p>
            <p>Maximum Size Limit : {sizelt}</p>
            <p>Maximum Time Limit : {timelt}</p>
          </div>
        </div>
        <div className="codeeditor">
          <h2>Problem Code : ({pcode})</h2>
          <select
            className="codelang"
            value={lang}
            onChange={this.handleChange1}
          >
            <option value="c_cpp">C++</option>
            <option value="java">Java</option>
            <option value="python">Python</option>
            <option value="javascript">Javascript</option>
            <option value="golang">Golang</option>
          </select>
          <select
            className="codelang"
            value={theme}
            onChange={this.handleChange2}
          >
            <option value="monokai">Monokai</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="github">Github</option>
          </select>
          <AceEditor
            style={{
              borderRadius: "25px",
              width: "80%",
              margin: "20px 10px 10px 10px",
            }}
            mode={lang}
            theme={theme}
            name="editor"
            value={codd}
            onChange={this.onChange}
            fontSize={19}
            editorProps={{ $blockScrolling: true }}
          />
        </div>

        <div className="cinput">
          <button className="button" onClick={this.handleClick}>
            <span> Run </span>
          </button>
          <button className="button2" onClick={this.submit}>
            {" "}
            <span> Submit </span>
          </button>
          <input type="checkbox" onClick={this.myFunction}></input>
          <label className="checkinput">Custom Input</label>
          {clicked === true && (
            <div>
              <textarea
                className="customtext"
                value={this.state.customTC}
                onChange={this.handleCustomTC}
              ></textarea>
            </div>
          )}
          {sub === true && (
            <div className="card submitbox">
              {" "}
              <span>&#9989;</span>Submitted
            </div>
          )}
          {output.mem === 0 && running === true && (
            <div
              className="card runnbox"
              style={{ borderRadius: "25px", color: "black" }}
            >
              <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              <p style={{ padding: "5% 0px 0px 40%" }}>Running...</p>
            </div>
          )}
          {stat === true && output.mem !== 0 && (
            <div
              className="codeoutput"
              style={{ borderRadius: "25px", color: "black" }}
            >
              {" "}
              <p style={{ fontWeight: "bold" }}> Status : {output.status}</p>
              <p style={{ fontWeight: "bold" }}> Date : {output.date} </p>
              <p style={{ fontWeight: "bold" }}>Memory : {output.mem} </p>{" "}
              <hr /> <p style={{ fontWeight: "bold" }}> Output : </p>{" "}
              {output.op}{" "}
            </div>
          )}
        </div>
        <footer className="foot">@CodEngine</footer>
      </div>
    );
  }
}
const data = `function onLoad(editor) {
}`;
export default CodeEditor;
