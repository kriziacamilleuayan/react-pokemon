import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import Autosuggest from 'react-autosuggest';

import Request from 'superagent';

class App extends Component {
 constructor(props) {
    super(props);
    this.state = {
      value: "",
      name: "",
      abilities: "",
      order: "",
      pic: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value.toLowerCase()});
  }

  handleSubmit(event) {
    var url = "https://pokeapi.co/api/v2/pokemon/"+this.state.value;
    Request.get(url).then((response) => {
      this.setState({
        abilities: response.body.abilities,
        name: response.body.name,
        order: response.body.order,
        picFront: response.body.sprites.front_default,
        picBack: response.body.sprites.back_default,
        picShiny: response.body.sprites.front_shiny

      });
    });
    // console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="flex">
          <div className="App">
          <h1>Search Pokemon</h1>
          <form onSubmit={this.handleSubmit}>
              <input type="text" value={this.state.value} onChange={this.handleChange} />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="app2">
          <h1><small>{this.state.order} </small>{this.state.name}</h1>
          <img alt={this.state.name} src={this.state.picFront}/>
          <img alt={this.state.name} src={this.state.picBack}/>
          <img alt={this.state.name} src={this.state.picShiny}/>
        </div>
        <App3/>
      </div>

    );
  }
};

class App3 extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {items: [], text: ''};
  }

  render() {
    return (
      <div  className="app3">
        <h1>Comments</h1>
        <div className="commentsSection">
          <AddComment items={this.state.items} />
        </div>
        <form onSubmit={this.handleSubmit}>
          <textarea onChange={this.handleChange} value={this.state.text} />
          <button>Comment</button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    var newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }
}

class AddComment extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <p key={item.id}>{item.text}</p>
        ))}
      </ul>
    );
  }
}

export default App;

// note to self
// use map on display values in response.body.abilities.[].ability.name
// use preloader and try catch if no pokemon available
// file handling... use the name/id of the pokemon to name the text file...
