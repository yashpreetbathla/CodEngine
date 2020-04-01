import React, { Component } from "react";
import "./FinalSearch.css";
import { withRouter } from "react-router-dom";
import queryString from "query-string";
import Contest from "../contest/Contest";
import { Link } from "react-router-dom";
import * as URL from "../config.js";
class FinalSearch extends Component {
  idMap = {};
  items = [];
  CC = "1";
  constructor(props) {
    super(props);
    this.state = {
      suggestions: [],
      text: "",
      code: "",
      mapping: {},
      FC: "",
    };
    var str = window.location.href;
    try {
      str = window.location.href.split("=")[1].split("&")[0];
    } catch {
      window.location.href = URL.default.url;
    }

    fetch(URL.default.url + `?code=${str}`, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        var tk = res.access_token;
        var rtk = res.refresh_token;
        // console.log(tk);
       if(tk !== null){
        localStorage.setItem("aut_token", tk);
        localStorage.setItem("ref_token", rtk);
       } 
      
      
      })
      .catch((err) => {
        console.log(err.response);
      });
          
      let response;
      fetch(
        "https://api.codechef.com/contests?fields=&status=&offset=&limit=&sortBy=&sortOrder",
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: "Bearer " + localStorage.getItem("aut_token"),
          },
          method: "GET",
        }
      )
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          response = res.result;
          var parsedjson = JSON.parse(JSON.stringify(response));

          var getCode = parsedjson["data"]["content"]["contestList"].map(
            (val) => val.code
          );
          var getName = parsedjson["data"]["content"]["contestList"].map(
            (val) => val.name
          );
          var getNameCode = getCode.concat(getName);
          this.items = getNameCode;
          var getNameCode = getCode.concat(getName);

          for (let x of parsedjson["data"]["content"]["contestList"]) {
            this.idMap[x.name] = x.code;
            this.idMap[x.code] = x.code;
          }

          this.setState({ mapping: this.idMap });
          var getStartDate = parsedjson["data"]["content"]["contestList"].map(
            (val) => val.startDate
          );
          var getEndDate = parsedjson["data"]["content"]["contestList"].map(
            (val) => val.endDate
          );
        })
        .catch((err) => {
          if (localStorage.getItem("ref_token") === null) {
            window.location.href = URL.default.url;
          } else {
            fetch(
              URL.default.url +
                `?ref_token=${localStorage.getItem("ref_token")}`,
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
                let response;
                fetch(
                  "https://api.codechef.com/contests?fields=&status=&offset=&limit=&sortBy=&sortOrder",
                  {
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                      Authorization:
                        "Bearer " + localStorage.getItem("aut_token"),
                    },
                    method: "GET",
                  }
                )
                  .then((res) => {
                    return res.json();
                  })
                  .then((res) => {
                    response = res.result;
                    var parsedjson = JSON.parse(JSON.stringify(response));

                    var getCode = parsedjson["data"]["content"][
                      "contestList"
                    ].map((val) => val.code);
                    var getName = parsedjson["data"]["content"][
                      "contestList"
                    ].map((val) => val.name);
                    var getNameCode = getCode.concat(getName);
                    this.items = getNameCode;
                    var getNameCode = getCode.concat(getName);

                    for (let x of parsedjson["data"]["content"][
                      "contestList"
                    ]) {
                      this.idMap[x.name] = x.code;
                      this.idMap[x.code] = x.code;
                    }

                    this.setState({ mapping: this.idMap });
                    var getStartDate = parsedjson["data"]["content"][
                      "contestList"
                    ].map((val) => val.startDate);
                    var getEndDate = parsedjson["data"]["content"][
                      "contestList"
                    ].map((val) => val.endDate);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              });
          }
        });
   
  }

  onTextChanged = (e) => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, `i`);
      suggestions = this.items.sort().filter((v) => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    var x = this.CC;
    const newTo = {
      pathname: "/contest/" + x,
      param1: this.CC,
    };
    return (
      <ul>
        {suggestions.map((item) => (
          <Link to={"/contest/" + this.idMap[item]}>
            {" "}
            <li onClick={() => this.suggestionSelected(item)}> {item} </li>{" "}
          </Link>
        ))}
      </ul>
    );
  }
  suggestionSelected(value) {
    this.setState(() => ({
      text: value,
      suggestions: [],
    }));
  }
  componentDidMount() {
    const values = queryString.parse(this.props.location.search);

    let Code = JSON.stringify(values.code);
    Code = Code.substring(1, Code.length - 1);

    this.setState({ code: Code });
  }

  setText(value) {
    var v = this.idMap[value.text];
    this.state.FC = v;
    this.CC = this.state.FC;
  }
  isDisabled() {
    return this.state.FC;
  }
  render() {
    const { text } = this.state;
    return (
      <div className="finalsearchback">
        <nav className="contestnav">
          <ul>
            <li>
              <img className="searchimage" src="https://github.com/yashpreetbathla/Images/blob/master/Codengine_white-cropped.png?raw=true" alt="CodEngine" />
            </li>
          </ul>
        </nav>
        <div className="flexbox">
          <div className="search">
            <h1>Search Contest</h1>
            <h3>Click on search icon, to search for the contest</h3>
            <div className="inputsearch">
              <input
                value={text}
                onChange={this.onTextChanged}
                type="text"
                placeholder="       Search . . ."
                required
              />
              <div className="contestlist">
                {this.renderSuggestions()}
                {this.setText({ text })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(FinalSearch);
