import React, { Component } from "react";
import PokeCard from "../pokeCard/PokeCard";

import Classes from "./Pokedex.css";
class Pokedex extends Component {
  state = {
    pokemons: [],
    pokeCount: 0
  };

  _getPokemons = (start, end) => {
    let i = start;
    let promiseArray = [];
    while (i <= end) {
      promiseArray.push(fetch("https://pokeapi.co/api/v2/pokemon/" + i));
      i++;
    }

    return Promise.all(promiseArray)
      .then(data => {
        // console.log({ data });
        return new Promise((resolve, reject) => {
          let convertedData = data.map(item => item.json());
          resolve(convertedData);
        });
      })
      .then(pokemonsPromises => Promise.all(pokemonsPromises));
  };

  updatePokemonState = (start, end) => {
    console.log("updating poke state");
    let updatedPokeList = [];
    let promiseArray = this._getPokemons(start, end)
      .then(pokemons => {
        updatedPokeList = [...this.state.pokemons, ...pokemons];
        this.setState({
          pokemons: updatedPokeList,
          pokeCount: this.state.pokeCount + 20
        });
        console.log(this.state);
      })
      .catch(err => console.log(err));
  };

  componentDidMount() {
    this.updatePokemonState(1, 20);
  }

  render() {
    const pokeImgPath =
      "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/";
    return (
      <div className="Pokedex">
        <h1>Welcome to Pokemon Collection</h1>
        <ul>
          {}
          {this.state.pokemons.map(p => {
            return (
              <li key={p.id} className={"poke-list " + p.types[0].type.name}>
                <PokeCard
                  key={p.order}
                  name={p.name}
                  type={p.types[0].type.name}
                  exp={p.base_experience}
                  imgPath={
                    pokeImgPath +
                    (p.id.toString().length < 2
                      ? "00" + p.id + ".png"
                      : p.id.toString().length > 2
                      ? p.id + ".png"
                      : "0" + p.id + ".png")
                  }
                />
              </li>
            );
          })}
        </ul>
        <button
          type="button"
          className="poke-more-btn"
          onClick={() => {
            this.updatePokemonState(
              this.state.pokeCount + 1,
              this.state.pokeCount + 20
            );
          }}
        >
          Load more
        </button>
      </div>
    );
  }
}

export default Pokedex;
