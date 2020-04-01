import React, { Component } from "react";
import Login from "./login/Login";
import Contest from "./contest/Contest";
import FinalSearch from "./search/FinalSearch";
import { BrowserRouter, Route, Switch} from "react-router-dom";
import CodeEditor from "./editor/CodeEditor";

class Codechef extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/search" exact component={FinalSearch} />
            <Route path={"/contest/:id"} component={Contest} />
            <Route path={"/problem"} component={CodeEditor} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default Codechef;
