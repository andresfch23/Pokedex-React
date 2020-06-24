export const removeHyphen = text => {
    return text.replace("-", " ");
};

export const formatText = (text, name) => {
    const upperCaseNamePok = name.toUpperCase();
    const regexNamePokemon = new RegExp(upperCaseNamePok, "g");

    // Change all the space Characters for a simple space " "
    const cleanSpaceCharacters = text.replace(/\s/g, " ");

     // Change the word "POKéMON" for "Pokemon"
    const formatWordpokemon = cleanSpaceCharacters.replace(/POKéMON/g, "Pokemon");

    // Change the Upper case name of the pokemon for capitalized name.
    const capitalizePokemonName = formatWordpokemon.replace(regexNamePokemon, `${name.charAt(0).toUpperCase()}${name.slice(1)}`);

    return capitalizePokemonName;
}

export const chooseWeaknesses = (typesPok, listTypes) => {
    const weaknesses = typesPok.reduce((acc, each) => {
        const selectedType = listTypes.find(type => type.name === each.type.name);
        
        if (selectedType) {
            acc.push(...selectedType.weaknesses);
        }
        
        return acc;
    }, []);
  
 
  return [...new Set(weaknesses)];
};

export const formatNumber = num => {
    let numPok;

    if (num < 10) {
        numPok = `00${num}`;
    } else if (num < 100) {
        numPok = `0${num}`
    } else {
        numPok = num;
    }

    return numPok;
}

export const filterExistentPokemons = (pokemons, text) => {
    const filteredPokemons = pokemons.filter(pokemon => {
        const { name } = pokemon;

        if (name.includes(text.toLowerCase())) {
            return true;
        }
    });
}

export const abbreviateWord = text => {
    const matchWord = 'special-';
    let word;

    if (text.includes(matchWord)) {
        word = text.replace(matchWord, 'Sp.');
    } else {
        word = text;
    }

    return word;
} 

export const autoScroll = () => {
    setTimeout(() => {
        window.scroll({
            top: 280
        });
    }, 100);
}