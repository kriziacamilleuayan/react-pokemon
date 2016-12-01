import React, { Component } from 'react';

export default React.createClass({
 render (){
  return (
          <div className="app2">
          <div className="col-sm-4">
            <div className="container-fluid">
              <h1 className="pokeName"><small >{this.props.pokeOrder} </small>{this.props.pokeName}</h1>
              <hr/>
              <div className="flex">
              <div className="margin-auto">
                <img alt={this.props.pokePicFront} src={this.props.pokePicFront}/>
                <p>Front</p>
              </div>
              <div className="margin-auto">
                <img alt={this.props.pokePicBack} src={this.props.pokePicBack}/>
                <p>back</p>
              </div>
              <div className="margin-auto">
                <img alt={this.props.pokePicShiny} src={this.props.pokePicShiny}/>
                <p>shiny</p>
              </div>
              </div>
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
})
