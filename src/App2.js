import React, { Component } from 'react';
import './App.css';
import Request from 'superagent';



class App2 extends Component {
 constructor(props) {
    super(props);
    this.state = {
      order: "",
      pic: ""
    };
  }

  render() {
    return (
      <div className="flex">
        <div className="app2">
          <p>{this.state.name}</p>
          <img/>
        </div>
      </div>

    );
  }
};

export default App2;