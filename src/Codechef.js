import React, { Component } from 'react';
import Login from './Login';
import Contest from './Contest';
import Search from './Search';
import Auth from './Auth';
import NewSearch from './NewSearch';
import FinalSearch from './FinalSearch';
import {BrowserRouter,Route,Switch,withRouter } from 'react-router-dom';
import AutoCompleteText from './AutoCompleteText';
import CodeEditor from './CodeEditor';


class Codechef extends Component {
  
    render() {
       
        return ( 
            <BrowserRouter>
            <div>
                <Switch>
                    {/* <NewSearch/> */}
        
            {/* <Route path="/" exact component={FinalSearch}/>  */}
                    {/* <AutoCompleteText/> */}
            {/* <Login /> */}
            <Route path="/" exact component={Login}/>
            <Route path="/search" exact component={FinalSearch}/>

           <Route path={"/contest/:id"} component={Contest}/>
           <Route path = {"/problem"} component = {CodeEditor}/>
           
            {/* <Search /> */}
            {/* <Contest /> */}
            {/* <Auth /> */}
            </Switch>
            </div>
            </BrowserRouter>
            );
    }
}
 
export default Codechef;