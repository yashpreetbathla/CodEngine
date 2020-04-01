import React, { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import queryString from "query-string";
import { Link } from "react-router-dom";
import "./Contest.css";
import * as URL from "../config.js";
import moment from "moment";

class Contest extends Component {
  constructor(props) {
    super(props);

    var v = window.location.pathname;

    var res = v.substring(9, v.length);
    this.state = {
      val: res,
      problems: [],
      done: false,
      prob: [],
      name: "",
      code: "",
      st: "",
      en: "",
      banner: "",
      announcements: "",
      problemlist: [],
      rankings: [],
      submissions: [],
      ended: "",
      usrfetched: false,
      userdetails: {},
      notStarted: false,
    };
    this.setState({});

    this.getContest();
  }

  getContest() {
    while (localStorage.getItem("aut_token") === null) {}
    // console.log(localStorage.getItem("aut_token"));
    let response;
    fetch(
      "https://api.codechef.com/contests/" +
        this.state.val +
        "?fields=&sortBy=&sortOrder=",
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
        response = res.result;
        var parsedjson = JSON.parse(JSON.stringify(response));

        var check_parent = parsedjson["data"]["content"]["isParent"];
        var reso = response.data.content;
        this.setState({
          bannner: reso["bannerFile"],
          st: moment(reso["startDate"]).diff(moment()),
          en: reso["endDate"],
        });

        if (check_parent === false) {
          var getCode = parsedjson["data"]["content"]["problemsList"].map(
            (val) => val.problemCode
          );

          response = response.data.content;

          var lst = [];
          for (let x of parsedjson["data"]["content"]["problemsList"]) {
            let a = {
              pcode: x["problemCode"],
              ssub: x["successfulSubmissions"],
              acc: x["accuracy"],
            };

            lst.push(a);
          }

          this.setState({
            name: response["name"],
            code: response["code"],
            st: response["startDate"],
            en: response["endDate"],
            banner: response["bannerFile"],
            announcements: response["announcements"],
            problemlist: lst,
            done: true,
          });
          var self = this;
          setInterval(() => {
            var tt = moment(self.state.en).diff(moment());
            var st = moment(self.state.st).diff(moment());

            if (tt <= 0 && st <= 0) {
              self.setState({ ended: "ended" });
            } else if (tt >= 0 && st <= 0) {
              self.setState({ ended: "run" });
              self.setState({
                d: moment.duration(moment(self.state.st).diff(moment())).days(),
                h: moment
                  .duration(moment(self.state.en).diff(moment()))
                  .hours(),
                m: moment
                  .duration(moment(self.state.en).diff(moment()))
                  .minutes(),
                s: moment
                  .duration(moment(self.state.en).diff(moment()))
                  .seconds(),
              });
            } else if (st > 0) {
              self.setState({ ended: "begin" });
              self.setState({
                d: moment.duration(moment(self.state.st).diff(moment())).days(),
                h: moment
                  .duration(moment(self.state.st).diff(moment()))
                  .hours(),
                m: moment
                  .duration(moment(self.state.st).diff(moment()))
                  .minutes(),
                s: moment
                  .duration(moment(self.state.st).diff(moment()))
                  .seconds(),
              });
            }
          }, 1000);

          //RANKINGS

          fetch(
            "https://api.codechef.com/rankings/" +
              this.state.val +
              "?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=",
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
              response = res.result;
              var parsedjson = JSON.parse(JSON.stringify(response));

              var lst = [];
              for (let x of parsedjson["data"]["content"]) {
                let a = {
                  prank: x["rank"],
                  pusername: x["username"],
                  score: x["totalScore"],
                };

                lst.push(a);
              }

              this.setState({
                rankings: lst,
                done: true,
              });
            })
            .catch((err) => {
              console.error(err);
            });

          //Submissions

          fetch(
            "https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode=" +
              this.state.val +
              "&fields=",
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
              response = res.result;
              var parsedjson = JSON.parse(JSON.stringify(response));

              var lst = [];
              for (let x of parsedjson["data"]["content"]) {
                let a = {
                  problemcode: x["problemCode"],
                  pusername: x["username"],
                  result: x["result"],
                  language: x["language"],
                };

                lst.push(a);
              }

              this.setState({
                submissions: lst,
                done: true,
              });
            })
            .catch((err) => {
              console.error(err);
            });
        } else {
          fetch("https://api.codechef.com/users/me", {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("aut_token"),
            },
            method: "GET",
          })
            .then((res) => {
              return res.json();
            })
            .then((res) => {
              response = res.result;

              var pj = JSON.parse(JSON.stringify(response));

              var i;
              var resp = pj["data"]["content"];

              var a = {
                userid: resp.username,
                fullusrname: resp.fullname,
                rating: resp.ratings.allContest,
                band: resp.band,
              };
              if (resp.ratings.allContest >= 1800) {
                i = 0;
              } else {
                i = 1;
              }

              var chld = parsedjson["data"]["content"]["children"][i];
              var respo = response.data.content;

              var self = this;

              var tt = moment(self.state.en).diff(moment());
              var st = moment(self.state.st).diff(moment());

              if (tt <= 0 && st <= 0) {
                self.setState({ ended: "ended" });
              } else if (tt >= 0 && st <= 0) {
                self.setState({ ended: "run" });
                self.setState({
                  d: moment
                    .duration(moment(self.state.st).diff(moment()))
                    .days(),
                  h: moment
                    .duration(moment(self.state.en).diff(moment()))
                    .hours(),
                  m: moment
                    .duration(moment(self.state.en).diff(moment()))
                    .minutes(),
                  s: moment
                    .duration(moment(self.state.en).diff(moment()))
                    .seconds(),
                });
              } else if (st > 0) {
                self.setState({ ended: "begin", notStarted: true });
                self.setState({
                  d: moment
                    .duration(moment(self.state.st).diff(moment()))
                    .days(),
                  h: moment
                    .duration(moment(self.state.st).diff(moment()))
                    .hours(),
                  m: moment
                    .duration(moment(self.state.st).diff(moment()))
                    .minutes(),
                  s: moment
                    .duration(moment(self.state.st).diff(moment()))
                    .seconds(),
                });
                var str = this.state.val;

                str = str.substring(0, str.length - 1);

                chld = str;

                this.setState({ val: str, notStarted: false });
              }
              this.setState({ userdetails: a, usrfetched: true, val: chld });

              if (this.state.st > 0) {
                fetch(
                  "https://api.codechef.com/contests/" +
                    this.state.val.substring(0, this.state.val.length - 1) +
                    "?fields=&sortBy=&sortOrder=",
                  {
                    headers: {
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
                      "problemsList"
                    ].map((val) => val.problemCode);

                    response = response.data.content;

                    var lst = [];
                    for (let x of parsedjson["data"]["content"][
                      "problemsList"
                    ]) {
                      let a = {
                        pcode: x["problemCode"],
                        ssub: x["successfulSubmissions"],
                        acc: x["accuracy"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      name: response["name"],
                      code: response["code"],
                      st: response["startDate"],
                      en: response["endDate"],
                      banner: response["bannerFile"],
                      announcements: response["announcements"],
                      problemlist: lst,
                      done: true,
                    });
                    var self = this;
                    setInterval(() => {
                      var tt = moment(self.state.en).diff(moment());
                      var st = moment(self.state.st).diff(moment());

                      if (tt <= 0 && st <= 0) {
                        self.setState({ ended: "ended" });
                      } else if (tt >= 0 && st <= 0) {
                        self.setState({ ended: "run" });
                        self.setState({
                          d: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .days(),
                          h: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .hours(),
                          m: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .minutes(),
                          s: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .seconds(),
                        });
                      } else if (st > 0) {
                        self.setState({ ended: "begin", notStarted: true });
                        self.setState({
                          d: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .days(),
                          h: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .hours(),
                          m: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .minutes(),
                          s: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .seconds(),
                        });
                      }
                    }, 1000);
                  })
                  .catch((err) => {
                    console.error(err);
                  });

                //RANKINGS
                fetch(
                  "https://api.codechef.com/rankings/" +
                    this.state.val.substring(0, this.state.val.length - 1) +
                    "?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=",
                  {
                    headers: {
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

                    var lst = [];
                    for (let x of parsedjson["data"]["content"]) {
                      let a = {
                        prank: x["rank"],
                        pusername: x["username"],
                        score: x["totalScore"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      rankings: lst,
                      done: true,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                //Submissions

                fetch(
                  "https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode=" +
                    this.state.val.substring(0, this.state.val.length - 1) +
                    "&fields=",
                  {
                    headers: {
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

                    var lst = [];
                    for (let x of parsedjson["data"]["content"]) {
                      let a = {
                        problemcode: x["problemCode"],
                        pusername: x["username"],
                        result: x["result"],
                        language: x["language"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      submissions: lst,
                      done: true,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              } else {
                //////////////////////ELSE FOR ST < 0
                fetch(
                  "https://api.codechef.com/contests/" +
                    this.state.val +
                    "?fields=&sortBy=&sortOrder=",
                  {
                    headers: {
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
                      "problemsList"
                    ].map((val) => val.problemCode);

                    response = response.data.content;

                    var lst = [];
                    for (let x of parsedjson["data"]["content"][
                      "problemsList"
                    ]) {
                      let a = {
                        pcode: x["problemCode"],
                        ssub: x["successfulSubmissions"],
                        acc: x["accuracy"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      name: response["name"],
                      code: response["code"],
                      st: response["startDate"],
                      en: response["endDate"],
                      banner: response["bannerFile"],
                      announcements: response["announcements"],
                      problemlist: lst,
                      done: true,
                    });
                    var self = this;
                    setInterval(() => {
                      var tt = moment(self.state.en).diff(moment());
                      var st = moment(self.state.st).diff(moment());

                      if (tt <= 0 && st <= 0) {
                        self.setState({ ended: "ended" });
                      } else if (tt >= 0 && st <= 0) {
                        self.setState({ ended: "run" });
                        self.setState({
                          d: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .days(),
                          h: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .hours(),
                          m: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .minutes(),
                          s: moment
                            .duration(moment(self.state.en).diff(moment()))
                            .seconds(),
                        });
                      } else if (st > 0) {
                        self.setState({ ended: "begin", notStarted: true });
                        self.setState({
                          d: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .days(),
                          h: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .hours(),
                          m: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .minutes(),
                          s: moment
                            .duration(moment(self.state.st).diff(moment()))
                            .seconds(),
                        });
                      }
                    }, 1000);
                  })
                  .catch((err) => {
                    console.error(err);
                  });

                //RANKINGS
                fetch(
                  "https://api.codechef.com/rankings/" +
                    this.state.val +
                    "?fields=&country=&institution=&institutionType=&offset=&limit=&sortBy=&sortOrder=",
                  {
                    headers: {
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

                    var lst = [];
                    for (let x of parsedjson["data"]["content"]) {
                      let a = {
                        prank: x["rank"],
                        pusername: x["username"],
                        score: x["totalScore"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      rankings: lst,
                      done: true,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
                //Submissions

                fetch(
                  "https://api.codechef.com/submissions/?result=&year=&username=&language=&problemCode=&contestCode=" +
                    this.state.val +
                    "&fields=",
                  {
                    headers: {
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

                    var lst = [];
                    for (let x of parsedjson["data"]["content"]) {
                      let a = {
                        problemcode: x["problemCode"],
                        pusername: x["username"],
                        result: x["result"],
                        language: x["language"],
                      };

                      lst.push(a);
                    }

                    this.setState({
                      submissions: lst,
                      done: true,
                    });
                  })
                  .catch((err) => {
                    console.error(err);
                  });
              }
            })
            .catch((err) => {
              console.error(err);
            });
        }
      })
      .catch((err) => {
        if (localStorage.getItem("ref_token") === null) {
          window.location.href = URL.default.url;
        } else {
          fetch(
            URL.default.url + `?ref_token=${localStorage.getItem("ref_token")}`,
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
              this.getContest();
            });
        }
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
        d,
      },
    } = this;
    return (
      <div className="contestbackground">
        {this.state.done === true && (
          <div>
            <nav class="contestnav">
              <ul>
                <li>
                  <img className="contestlogo" src="https://github.com/yashpreetbathla/Images/blob/master/Codengine_white-cropped.png?raw=true" alt="CodEngine" />
                </li>
              </ul>
            </nav>

            <div className="row">
              <h1 className="contesthead">
                {" "}
                {this.state.name} - ({this.state.code}){" "}
              </h1>
              <div className="timecontest">
                {ended === "begin" && (
                  <div>
                    <p style={{ textAlign: "center", fontSize: "25px" }}>
                      Contest Starts In:
                    </p>
                    <hr
                      style={{
                        borderTop: "2px solid black",
                        margin: "0px 20% 0px 20%",
                      }}
                    />
                    <ul className="timer">
                      <li>
                        <span>{this.state.d}</span>
                      </li>
                      <li>
                        <span>{this.state.h}</span>
                      </li>
                      <li>
                        <span>{this.state.m}</span>
                      </li>
                      <li>
                        <span>{this.state.s}</span>
                      </li>
                    </ul>
                    <ul className="timerhead">
                      <li id="clock-hrs-days">Days</li>
                      <li id="clock-hrs-left">Hrs</li>
                      <li id="clock-min-left">Min</li>
                      <li id="clock-sec-left">Sec</li>
                    </ul>
                  </div>
                )}
                {ended === "run" && (
                  <div>
                    <p style={{ textAlign: "center", fontSize: "25px" }}>
                      Contest Ends In:
                    </p>
                    <hr
                      style={{
                        borderTop: "2px solid black",
                        margin: "0px 20% 0px 20%",
                      }}
                    />
                    <ul className="timer">
                      <li>
                        <span>{this.state.d}</span>
                      </li>
                      <li>
                        <span>{this.state.h}</span>
                      </li>
                      <li>
                        <span>{this.state.m}</span>
                      </li>
                      <li>
                        <span>{this.state.s}</span>
                      </li>
                    </ul>
                    <ul className="timerhead">
                      <li id="clock-hrs-days">Days</li>
                      <li id="clock-hrs-left">Hrs</li>
                      <li id="clock-min-left">Min</li>
                      <li id="clock-sec-left">Sec</li>
                    </ul>
                  </div>
                )}
                {ended === "ended" && (
                  <div>
                    <p style={{ textAlign: "center", fontSize: "25px" }}>
                      Contest Ended
                    </p>
                    <hr
                      style={{
                        borderTop: "2px solid black",
                        margin: "0px 20% 0px 20%",
                      }}
                    />
                  </div>
                )}
              </div>
              <div className="leftcolumn">
                <div style={{ margin: "0px 5% 10% 0px" }}>
                  <img className="contestimage" src={banner} alt="Contest Banner" />
                </div>
                <React.Fragment>
                  <table
                    className="problemtable"
                    style={{
                      backgroundColor: "rgb(214, 209, 209)",
                      boxShadow: "0 4px 6px -1px rgba(0,0,0,.8)",
                      border: "1px solid rgb(197, 196, 196)",
                    }}
                  >
                    <tbody>
                      <tr>
                        <th>Problem</th>
                        <th>Submissions</th>
                        <th>Accuracy</th>
                      </tr>
                      {problemlist.map((prob, i) => (
                        <tr key={i}>
                          <td>
                            <Link
                              className="lst"
                              to={"/problem/" + prob.pcode + "/contest/" + code}
                            >
                              {prob.pcode}
                            </Link>
                          </td>
                          <td>{prob.ssub}</td>
                          <td>{prob.acc.toPrecision(3)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </React.Fragment>
              </div>

              <div className="rightcolumn">
                <div>
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
                            <td>{prob.score}</td>
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
                            <td>
                              <Link
                                to={
                                  "/problem/" +
                                  prob.problemcode +
                                  "/contest/" +
                                  code
                                }
                              >
                                {" "}
                                {prob.problemcode}
                              </Link>
                            </td>
                            <td>{prob.result}</td>
                            <td>{prob.language.substring(0, 3)}</td>
                          </tr>
                        ))}
                      </table>
                    </React.Fragment>
                  </div>
                </div>
              </div>
            </div>
            <footer className="foot">@CodEngine</footer>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(Contest);
