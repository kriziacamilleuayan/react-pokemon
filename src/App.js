import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
//var Preload = require('react-preload').Preload; //not wurking
// import Autosuggest from 'react-autosuggest';
// var ImagePreloaderComponent = require('react-image-preloader'); //ihope this works

// mamaya ko na po ayusin yung codes T_T

import Request from 'superagent';

class App extends Component {
 constructor(props) {
  super(props);
  this.state = {
    body: "",
    value: "",
    name: "",
    abilities: "",
    order: "",
    weight: "",
    height: ""
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
      body: response.body,
      height: response.body.height,
      weight: response.body.weight,
      abilities: response.body.abilities,
      name: response.body.name,
      order: response.body.id,
      picFront: response.body.sprites.front_default,
      picBack: response.body.sprites.back_default,
      picShiny: response.body.sprites.front_shiny,
      types: response.body.types,
      moves: response.body.moves,
      statName: response.body.stats
    });
  });
    // console.log(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="row flex">
        <div className="App">
          <div className="col-sm-4">
            <div className="container-fluid">
              <div className="search">
                <h1 className="searchPokemon">Search Pokemon</h1>
                <form onSubmit={this.handleSubmit}>
                  <input type="text" className="textbux" value={this.state.value} onChange={this.handleChange} />
                  <br/>
                  <input type="submit" value="Submit" className="btn btn-default"/>
                </form>
              </div>
            </div>
          </div>
        </div>

        {this.state.order ? 
          <div className="flex labas">
        <App2 
        pokeOrder={this.state.order}
        pokeName={this.state.name}
        pokePicFront={this.state.picFront}
        pokePicBack={this.state.picBack}
        pokePicShiny={this.state.picShiny}
        pokeTypes={this.state.types}
        pokeHeight={this.state.height}
        pokeWeight={this.state.weight}
        pokeAbilities={this.state.abilities}
        pokeMoves={this.state.moves}
        />
        <App3 pokeProp={this.state.name}/>
        </div>
        : <p>nothing to display / no such pokemon</p>
      }
      </div>

      );
  }
};


class App2 extends Component{
 render (){
  return (
          <div className="app2">
          <div className="col-sm-4">
            <div className="container-fluid">
              <h1 className="pokeName"><small >{this.props.pokeOrder} </small>{this.props.pokeName}</h1>
              <hr/>
              <img alt={this.props.pokeName} src={this.props.pokePicFront}/>
              <img alt={this.props.pokeName} src={this.props.pokePicBack}/>
              <img alt={this.props.pokeName} src={this.props.pokePicShiny}/>
              <hr/>
              <p><b>Type/s</b></p>
              <p>
              {this.props.pokeTypes && this.props.pokeTypes.map((typesObject) => 
                typesObject.type.name).join(', ')}
              </p>
              <hr/>
              <p><b>Height</b>: {this.props.pokeHeight} ft</p>
              <p><b>Weight</b>: {this.props.pokeWeight} kg</p>
              <hr/>
              <p><b>Abilities</b></p>
              <p>
              {this.props.pokeAbilities && this.props.pokeAbilities.map((abilityObject) => 
                abilityObject.ability.name).join(', ')}
              </p>
              <hr/>
              <p><b>Moves</b></p>
              <p>
              {this.props.pokeMoves && this.props.pokeMoves.map((movesObject) => 
                movesObject.move.name).join(', ')}
              </p>
            </div>
          </div>
        </div>
    )
 }
}

class App3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      text: "",
      author: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
      
      var callback = console.log('lol');
      Request.post('http://localhost:3000/api/comments')
             .send({
              author: this.props.pokeProp,
              text: this.state.text
            })
             .end(callback);
    //
    // var commentUrl = "http://localhost:3000/api/comments";
    // Request.post(commentUrl) => {

    // };
    //
   e.preventDefault(); 
    var newItem = {
      id: Date.now(),
      author: this.state.name,
      text: this.state.text
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ''
    }));
  }

  render() {
    return (
      <div  className="app3">
        <div className="col-sm-4">
          <div className="container-fluid">
            <h1>Comments</h1>
            <div className="commentsSection">
            <AddComment items={this.state.items} />
            </div>
            <form onSubmit={this.handleSubmit}>
              <textarea className="textarea" onChange={this.handleChange} value={this.state.text} />
              <button className="btn btn-default">Comment</button>
            </form>
          </div>
        </div>
      </div>
      );
    }
  }

class AddComment extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
        body: [],
        author: '',
        comment: ''
      };
    }

  readComment(){
      var url = "http://localhost:3000/api/comments";
      Request.get(url).then((response) => {
        this.setState({
            body: response
        });
      });
  }


  render() {
    return (
      <div>
      {this.props.items.map(item => (
        <p className="itemComment"  key={item.id}>{item.text}</p>
        ))}
      </div>
      );
    }
  }



export default App;

//items = comments
// note to self
// use map on display values in response.body.abilities.[].ability.name//
//kapag walang laman, wala muna lalabas sa app2, while rendering naman use preloader... same din sa app3
// use preloader and try catch if no pokemon available
// file handling... use the name/id of the pokemon to name the text file...
//(e) = (event)