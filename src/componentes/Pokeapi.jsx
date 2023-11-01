import axios from 'axios';
import { useEffect, useState } from 'react';

export const Pokeapi = () => {
    const [pokemons, setPokemons] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(async (response) => {
            const results = response.data.results;
            const pokemonDetails = await Promise.all(
                results.map(async (pokemon) => {
                    const response = await axios.get(pokemon.url);
                    return response.data;
                })
            );
        },)
    }, []);
    
    async function getPokemons() {
        // const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        // setData(response.data.results);
        // console.log(response.data);

        axios.get('https://pokeapi.co/api/v2/pokemon?limit=20')
        .then(async (response) => {
            const results = response.data.results;
            const pokemonDetails = await Promise.all(
                results.map(async (pokemon) => {
                    const response = await axios.get(pokemon.url);
                    return response.data;
                })
            );
            setPokemons(pokemonDetails);
            setLoading(false);
        })
    }

    getPokemons();

    return (
        <div>
            {
                <ul>
                    {pokemons.map((pokemon, index) => (
                        <li key={index}>
                            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                            {pokemon.name}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
};
