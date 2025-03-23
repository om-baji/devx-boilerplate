import React from "react";
import ServerPage from "../ssr/page";
import ClientPage from "../csr/page";

const page = () => {
  return (
    <div className="flex justify-center gap-4 items-center h-screen">
      <ServerPage />
      <ClientPage />
    </div>
  );
};

export default page;
