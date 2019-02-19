import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPokemons, getPokemon } from './services/pokedex-web-service';

class Pokemons extends Component {
    constructor(props) {
        super(props);

        this.state = ({
            pokemons: [],
            isLoading: true,
        })
    }

    render() {
        const pokemons = this.state.pokemons;
        const isLoading = this.state.isLoading;

        if(isLoading){
            return <div>Loading ...</div>
        }

        return (
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
