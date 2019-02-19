const apiUrl = "https://pokeapi.co/api/v2/pokemon?limit=700";

export const getPokemons = () => {
    return fetch(apiUrl)
        .then(res => res.json())
        .then(data => data.results)
        .catch(error => console.error(error));
};

export const getPokemon = (pokemonUrl) => {
    return fetch(pokemonUrl)
        .then(res => res.json())
        .then(data => data);
}