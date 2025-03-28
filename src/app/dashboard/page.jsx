"use client";

import { ownPokemon } from "@/actions/pokemon";
import Navbar from "@/components/navbar";
import PokemonCard from "@/components/poke-card";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [pokemons, setPokemons] = useState([]);
  const [tradeRequests, setTradeRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        
        const pokemonDetails = await ownPokemon()

        setPokemons(pokemonDetails.ownedPokemons);

        setTradeRequests([
          {
            id: 1,
            from: "Ash",
            status: "pending",
            createdAt: new Date().toISOString(),
            offeringPokemon: {
              id: 25,
              name: "pikachu",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
              level: 42,
              type: "electric",
              rarity: "Rare",
            },
            requestingPokemon: pokemonDetails[0],
          },
          {
            id: 2,
            from: "Misty",
            status: "pending",
            createdAt: new Date(Date.now() - 86400000).toISOString(),
            offeringPokemon: {
              id: 7,
              name: "squirtle",
              image:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png",
              level: 36,
              type: "water",
              rarity: "Uncommon",
            },
            requestingPokemon: pokemonDetails[1],
          },
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="container mx-auto p-4 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>My Collection</CardTitle>
              <CardDescription>
                You have {pokemons.length} Pokémon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pokemons.length}</div>
            </CardContent>
            <CardFooter>
              <Link href="/collection">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Trade Requests</CardTitle>
              <CardDescription>
                You have {tradeRequests.length} pending requests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{tradeRequests.length}</div>
            </CardContent>
            <CardFooter>
              <Link href="/trades">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Completed Trades</CardTitle>
              <CardDescription>Your trading history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
            </CardContent>
            <CardFooter>
              <Link href="/history">
                <Button variant="outline" size="sm">
                  View History
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <Tabs defaultValue="collection" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="collection">My Collection</TabsTrigger>
            <TabsTrigger value="trades">Trade Requests</TabsTrigger>
          </TabsList>
          <TabsContent value="collection" className="mt-6">
            {pokemons.map((pokemon) => {
                return <PokemonCard pokemon={pokemon}  />
            })}
          </TabsContent>
          <TabsContent value="trades" className="mt-6">
            {/* <TradeRequests tradeRequests={tradeRequests} loading={loading} /> */}
          </TabsContent>
        </Tabs>
      </main>   
    </div>
  );
}