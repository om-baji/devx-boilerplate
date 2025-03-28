"use client";
import { ownPokemon } from "@/actions/pokemon";
import Navbar from "@/components/navbar";
import PokemonCard from "@/components/poke-card";
import { useEffect, useState } from "react";

const Home = () => {
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await ownPokemon();
      console.log(data);
      setPokemonData(data.ownedPokemons);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <Navbar />
      <main className="flex flex-col justify-center items-center h-screen">
        This is the Home page
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {pokemonData.map((pokemon) => (
              <PokemonCard
                key={pokemon.id}
                pokemon={pokemon}
              />
            ))}
          </div>
      </main>
    </div>
  );
};

export default Home;
