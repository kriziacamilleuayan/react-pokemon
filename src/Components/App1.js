import React, { Component } from 'react';

export default React.createClass({

  
  render(){
    return(
      <div className="App">
          <div className="col-sm-4">
            <div className="container-fluid">
              <div className="search">
                <img alt="pikachu" className="pikachu-gif" src={this.props.pictureSearch} />
                <h1 className="searchPokemon">Search Pokemon</h1>
                <form onSubmit={this.props.onSubmit}>
                  <input type="text" className="textbux" placeholder="enter name / ID" value={this.props.value} onChange={this.props.onChange} />
                  <br/>
                  <input type="submit" value="Submit" className="btn btn-default"/>
                </form>
              </div>
            </div>
          </div>
        </div>
      )
  }
})

// hello