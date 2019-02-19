import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPokemons } from './services/pokedex-web-service';

class Pokemons extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            pokemons: [],
            foundPokemons: [],
            isLoading: true,
            searchPokemon: ''
        });

        this.searchPokemonHandler = this.searchPokemonHandler.bind(this);
    }

    searchPokemonHandler(event){
        let pokemonName = event.target.value;

        let foundPokemons = this.state.pokemons.filter(pokemon => 
            pokemon.name
            .toLowerCase()
            .startsWith(pokemonName.toLowerCase()))
        
        this.setState({
            searchPokemon: pokemonName,
            foundPokemons: foundPokemons,
        });
    }

    render() {
        let pokemons = this.state.pokemons;
        const isLoading = this.state.isLoading;

        if(this.state.foundPokemons.length > 0){
            pokemons = this.state.foundPokemons;
        }

        if(isLoading){
            return <div>Loading ...</div>
        }

        return (
            <div className="page">
                <div className="page__search">
                    <input type="text" name="pokemonName" placeholder="Enter pokemon name" 
                        value={this.state.searchPokemon} onChange={this.searchPokemonHandler} />
                </div>
                <ul className="pokemons">
                {
                    pokemons.map(pokemon => {
                        return <li className="pokemons__item">
                            <div className="pokemon">
                                <img className="pokemon__sprite" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                    pokemon.id
                                    }.png`} alt=""></img>
                                <p className="pokemon__name">{pokemon.name}</p>
                            </div>
                        </li>
                    })
                }
            </ul>
            </div>
        )
    };

    componentDidMount() {
        getPokemons()
            .then((pokemons) => {
                pokemons.map(pokemon => {
                    let { url } = pokemon
                    pokemon.id = url.substring(34, url.length - 1)
                    pokemon.name = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
                    return pokemon;
                });

                this.setState({
                    pokemons: pokemons,
                    isLoading: false,
                });
            });
    }
};

ReactDOM.render(<Pokemons />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
