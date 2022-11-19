import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useState } from "react";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import { Button, ThemeProvider, Typography } from "@mui/material";
import { THEME } from "../src/utils/theme";

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState(null);

  const connectWallet = async () => {
    new MyAlgoConnect()
      .connect()
      .then((accounts) => {
        const _account = accounts[0];
        setAddress(_account.address);
        console.log(_account.address);
      })
      .catch((error) => {
        console.log("Could not connect to MyAlgo wallet");
        console.error(error);
      });
  };

  return (
    <ThemeProvider theme={THEME}>
      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <Head>
          <title>Algo2Gether</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          {address ? (
            <Component {...pageProps} />
          ) : (
            <>
              <Typography className="text-blue-500" variant="h2">
                Algo2Gether - Community Area
              </Typography>

              <button
                onClick={connectWallet}
                className="m-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              >
                Connect MyAlgo Wallet Now
              </button>
            </>
          )}
        </main>

        <footer className="flex h-24 w-full items-center justify-center border-t">
          <p
            className="flex items-center justify-center gap-2 m-10 bg-blue-500 font-bold text-white py-2 px-4 rounded-full"
            //href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            //target="_blank"
            //rel="noopener noreferrer"
          >
            Built for HackaTUM 2022
          </p>
        </footer>
      </div>
      <style jsx global>
        {`
          body {
            background: ${THEME.palette.background}};
          }
        `}
      </style>
    </ThemeProvider>
  );
}

export default MyApp;
