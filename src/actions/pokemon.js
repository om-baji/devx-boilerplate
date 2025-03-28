"use server";

export async function getPokemon() {
  try {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
    const data = await response.json();

    const pokemonDetails = await Promise.all(
      data.results.map(async (pokemon) => {
        const res = await fetch(pokemon.url);
        const details = await res.json();
        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          level: Math.floor(Math.random() * 100) + 1,
          type: details.types[0].type.name,
          rarity: ["Common", "Uncommon", "Rare", "Epic", "Legendary"][
            Math.floor(Math.random() * 5)
          ],
          owner: `Trainer${Math.floor(Math.random() * 100) + 1}`,
        };
      })
    );

    return {
      success: true,
      pokemons: pokemonDetails,
    };
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}

export async function ownPokemon() {
  try {
    if (globalThis.ownedPokemonCache) {
      return globalThis.ownedPokemonCache;
    }

    const randomOffsets = Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 1000) + 1
    );

    const ownedPokemons = await Promise.all(
      randomOffsets.map(async (id) => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const details = await res.json();

        const rarityLevels = ["Common", "Uncommon", "Rare", "Epic", "Legendary"];
        const rarity = rarityLevels[Math.floor(Math.random() * rarityLevels.length)];

        const priceMap = {
          Common: 0.01,
          Uncommon: 0.05,
          Rare: 0.1,
          Epic: 0.25,
          Legendary: 0.5,
        };

        return {
          id: details.id,
          name: details.name,
          image: details.sprites.other["official-artwork"].front_default,
          level: Math.floor(Math.random() * 100) + 1,
          type: details.types[0].type.name,
          rarity,
          owner: `Trainer${Math.floor(Math.random() * 100) + 1}`,
          price: priceMap[rarity].toFixed(3), 
        };
      })
    );

    globalThis.ownedPokemonCache = {
      success: true,
      ownedPokemons,
    };

    return globalThis.ownedPokemonCache;
  } catch (error) {
    return {
      success: false,
      message: error,
    };
  }
}
