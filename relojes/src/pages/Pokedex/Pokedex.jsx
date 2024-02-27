import React from "react";
import { useState } from "react";
import "./Pokedex.css";
import Axios from "axios";

const Pokedex = () => {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    number: "",
    species: "",
    image: "",
    hp: "",
    attack: "",
    defense: "",
    speed: "",
    type: "",
  });

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (res) => {
        setPokemon({
          name: pokemonName,
          number: res.data.id,
          species: res.data.species.name,
          image: res.data.sprites.front_default,
          hp: res.data.stats[0].base_stat,
          attack: res.data.stats[1].base_stat,
          defense: res.data.stats[2].base_stat,
          speed: res.data.stats[5].base_stat,
          //en tipos, si tiene un segundo tipo, devolverá un array con ambos tipos separados por /, si no, solo devuelve la primera posicion
          type: res.data.types[1]
            ? [res.data.types[0].type.name, "/", res.data.types[1]?.type.name]
            : res.data.types[0].type.name,
        });
        setPokemonChosen(true);
      }
    );
  };

  return (
    <div className="Pokedex">
      <div className="TitleSection">
        <h1>Pokédex</h1>
        <input
          type="text"
          onChange={(e) => {
            setPokemonName(e.target.value.toLowerCase());
          }}
        />
        <div>
          {pokemonName && (
            <button onClick={searchPokemon}>Search Pokémon</button>
          )}
        </div>
      </div>
      <div className="DisplaySection">
        {!pokemonChosen ? (
          <h1> Please choose a Pokémon </h1>
        ) : (
          <>
            <h1>{pokemon.name}</h1>
            <img src={pokemon.image} alt={pokemon.name} />
            <div className="mainstats">
              <h3>Number: #{pokemon.number}</h3>
              <h3>Species: {pokemon.species}</h3>
              <h3>Type: {pokemon.type}</h3>
            </div>
            <h4>Hp: {pokemon.hp}</h4>
            <h4>Attack: {pokemon.attack}</h4>
            <h4>Defense: {pokemon.defense}</h4>
            <h4>Speed: {pokemon.speed}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default Pokedex;