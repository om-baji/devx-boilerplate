"use client";
import React, { useState, useEffect } from "react";

const ClientPage = () => {
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("Starting computation on client...");

    let cnt = 0;
    for (let i = 0; i < 100000000; i++) {
      cnt++;
    }

    console.log("Client computation complete!");
    setCount(cnt);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h1 className="text-xl mb-4">Client Component</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div>Result: {count.toLocaleString()}</div>
          <p className="text-sm mt-2">Calculation happened in your browser!</p>
        </div>
      )}
    </div>
  );
};

export default ClientPage;
