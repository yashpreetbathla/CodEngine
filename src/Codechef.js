import React, { Component } from 'react';
import Login from './Login';
import Contest from './Contest';
import Search from './Search';
import Auth from './Auth';
import NewSearch from './NewSearch';
import {BrowserRouter,Route,Switch,withRouter } from 'react-router-dom';
import AutoCompleteText from './AutoCompleteText';


class Codechef extends Component {
  
    render() {
       
        return ( 
            <BrowserRouter>
            <div>
                <Switch>
                    <NewSearch/>

                    {/* <AutoCompleteText/> */}
            {/* <Login /> */}
            {/* <Route path="/" exact component={Login}/>
            <Route path="/search" exact component={Search}/> */}
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