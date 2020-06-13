import axios from 'axios';

export const fetchInitialInfo = async () => {
    const response = await axios.get('https://pokeapi.co/api/v2/pokedex/1/');
    const { data: { pokemon_entries } } = response;

    return pokemon_entries;
};

export const fetchPokemons = async (queryText, infoPokemons) => {
    try {
        const filteredPokemons = infoPokemons.reduce((acc, pokemon) => {
            const { entry_number, pokemon_species: { name } } = pokemon;
                    
            if (entry_number.toString().includes(queryText) || name.includes(queryText.toLowerCase())) {
                acc.push(fetchInfoPokemon(entry_number));
            }

            return acc;
        }, []);

        const pokemons = await Promise.all(filteredPokemons);

        return pokemons;
    } catch (error) {
        console.error(error);
    }
}

export const fetchTypePokemons = async () => {
    try {
        const types = await axios.get('https://pokeapi.co/api/v2/type/');
        
        return types.data.results;
    } catch(error) {
        console.error(error);
    }
}

export const fetchInfoPokemon = async (urlInfo) => {
    try {
        const url = `https://pokeapi.co/api/v2/pokemon/${urlInfo}`;
        const response = await axios.get(url);
        const data = response.data;

        const { sprites: { front_default }} = data;
                    
        const fetchedImage = await axios.get(front_default, { responseType: 'arraybuffer'}).then(response => {
            return `data:image/png;base64, ${Buffer.from(response.data, 'binary').toString('base64')}` ;
        });

        const complementInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${urlInfo}`).then(response => {
            const { data: { flavor_text_entries } } = response;

            const a = flavor_text_entries.find(description => {
                return description.language.name === 'en';
            });

            return a.flavor_text;
        });
        
        const infoPokemon = {...data, image: fetchedImage, complementInfo};
        
        return infoPokemon;
    } catch(error) {
        console.log(error)
    }
}