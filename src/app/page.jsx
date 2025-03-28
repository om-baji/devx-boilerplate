"use client"
import { ownPokemon } from '@/actions/pokemon'
import Navbar from '@/components/navbar'
import { useEffect, useState } from 'react'

const Home = () => {
  const [pokemonData, setPokemonData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const data = await ownPokemon()
      console.log(data)
      setPokemonData(data)
    }
    fetchData()

  }, [])

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
        <Navbar />
        <main className='flex justify-center items-center h-screen'>
            This is the Home page
        </main>
    </div>
  )
}

export default Home
