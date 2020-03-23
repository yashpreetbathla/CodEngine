import React, { Component } from 'react';

import './Contest.css';
class Contest extends Component {
    constructor(props){
      super(props);
      console.log(this);
      console.log('HII');
      console.log(this.props.location.param1 );
    }
    render() { 
        return (
            <div>
              <h1>{this.props.location.param1 }</h1>
                <h1 style={{alignSelf :"center"}}>  Farji CodeChef</h1>
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
    <h1 style={{color:"red"}}>HEY</h1>
      <h2 style={{color:"red"}}>TITLE HEADING</h2>
      <h5 style={{color:"red"}}>Title description, Dec 7, 2017</h5>
      <div className="fakeimg" style={{height:"200px"}} >Image</div>
      <p style={{color:"red"}}>Some text..</p>
      <p style={{color:"red"}}>Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
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
               </div>
          );
    }
}
 
export default Contest;