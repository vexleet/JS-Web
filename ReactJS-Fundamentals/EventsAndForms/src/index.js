import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getPokemons } from './services/pokedex-web-service';

console.log(getPokemons);

class Pokemons extends Component {
    constructor(props){
        super(props);

        this.state = ({
            pokemons: [],
        })
    }

    render() {
        const pokemons = this.state.pokemons;
        console.log(pokemons);
        return (
            <ul>
                {
                    pokemons.map(pokemon => {
                        return <li>{pokemon.name}</li>
                    })
                }
            </ul>
        )
    };

    componentDidMount() {
        getPokemons()
            .then((pokemons) => {
                this.setState({ pokemons});
            });
    }
};

ReactDOM.render(<Pokemons />, document.getElementById('root'));

// ReactDOM.render(<App />, document.getElementById('root'));
