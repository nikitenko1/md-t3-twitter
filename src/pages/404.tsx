import React from "react";
import Error from "@/components/Error";
import Head from "next/head";

const PageNotFound = () => {
  return (
    <div>
      <Head>
        <title>Page not found | 404</title>
        <meta name="description" content="Page not found | 404" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Error />
    </div>
  );
};

export default PageNotFound;
