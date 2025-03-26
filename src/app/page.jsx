import Navbar from '@/components/navbar'

const Home = () => {

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
