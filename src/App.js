import React, { Component } from 'react';
import './App.css';
import App1 from './Components/App1.js';
import App2 from './Components/App2.js';
import App3 from './Components/App3.js';

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
    height: "",
    commentBody: [],
    text: "",
    author: "",
    id: "",
    items: []
  };

  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  this.handleCommentChange = this.handleCommentChange.bind(this);
  this.handleComment = this.handleComment.bind(this);
}

handleChange(event) {
  this.setState({value: event.target.value.toLowerCase()});
}

handleSubmit(event) {
  var url = "https://pokeapi.co/api/v2/pokemon/"+this.state.value;
  var urlComment = "http://localhost:3000/api/comments";
  Request.get(url).end((err, response) => {
    {(err || !response.ok) ? alert(this.state.value + " is not in the pokedex")
     : this.setState({
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
    }
  });

  Request.get(urlComment).then((response) => {
    this.setState({
        commentBody: response,
        items: []
    });
  });

      // if (this.state.value === this.state.name){
      //   console.log("yeah")
      // }

      // else{
      //   alert(this.state.value + " is not in the pokedex")
      // }

    // console.log(this.state.value);
    event.preventDefault();
  }


  handleCommentChange(e) {
    this.setState({text: e.target.value});
  }

  handleComment(e) {
    e.preventDefault();
    var callback = console.log('lol');
    Request.post('http://localhost:3000/api/comments')
           .send({
            idComment: this.state.id,
            author: this.state.name,
            text: this.state.text
          })
           // .end(console.log("comment" + this.state.text))
           .end(callback)
           this.ReturnComment();

    var newItem = {
      id: Date.now(),
      author: this.state.name,
      text: this.state.text
    };
    this.setState((prevState) => ({
      items: prevState.items.concat(newItem),
      text: ""
    }));
  }



  ReturnComment(){
    var urlComment = "http://localhost:3000/api/comments";
    // var comcom = .append(this.state.text);
    Request.get(urlComment)
            .then((i) => {this.setState({commentBody: i})});
  }


  render() {
    return (
      <div className="row flex">
        
        <App1
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}
          value={this.state.value}
        />

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
        <App3
          pokeName={this.state.name}
          text={this.state.text}
          commentBody={this.state.commentBody}
          onChange={this.handleCommentChange}
          handleComment={this.handleComment}
          idComment={this.state.id}
          items={this.state.items}
        />
        </div>
        : <p>nothing to display / no such pokemon</p>
      }
      </div>

      );
  }
};

export default App;

//items = comments
// note to self
// use map on display values in response.body.abilities.[].ability.name//
//kapag walang laman, wala muna lalabas sa app2, while rendering naman use preloader... same din sa app3
// use preloader and try catch if no pokemon available
// file handling... use the name/id of the pokemon to name the text file...
//(e) = (event)