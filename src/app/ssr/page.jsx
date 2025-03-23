"use server"
import React from 'react'

const ServerPage = () => {
    let count = 0;
    
    const getSlowerNumber = () => {
        console.log("Starting computation on server...");
        
        let cnt = 0;
        for(let i = 0; i < 100000000; i++) {
            cnt++;
        }
        
        console.log("Server computation complete!");
        return cnt;
    }

    count = getSlowerNumber();

    return (
        <div className='flex justify-center flex-col items-center h-screen'>
            <h1 className='text-xl mb-4'>Server Component (RSC)</h1>
            <div>Result: {count.toLocaleString()}</div>
            <p className='text-sm mt-2'>Calculation happened on the server!</p>
        </div>
    )
}

export default ServerPage