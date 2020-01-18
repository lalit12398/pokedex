import React, { Component } from "react";

class PokeCard extends Component {
  render() {
    return (
      <label className={"PokeCard " + this.props.type}>
        <input type="checkbox" />
        <div className="poke-card-wrap">
          <div className="poke-card-front">
            <img src={this.props.imgPath} />
            <h3>{this.props.name}</h3>
            <p className="poke-type">{this.props.type}</p>
          </div>
          <div className="poke-card-back">
            <h3>{this.props.name}</h3>
            <div className="poke-brief">
              <h1>this is the title</h1>
            </div>
            <p className="poke-type">{this.props.type}</p>
            <p>jhbjhbjhbjh</p>
          </div>
        </div>
      </label>
    );
  }
}

export default PokeCard;
