import { Grid, ThemeProvider, Typography } from "@mui/material";
import MyAlgoConnect from "@randlabs/myalgo-connect";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import { THEME } from "../src/utils/theme";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const [address, setAddress] = useState(null);

  // const algodToken = "";
  // const algodServer = "https://node.algoexplorerapi.io";
  // const algodPort = 443;
  // const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);

  const connectWallet = async () => {
    new MyAlgoConnect()
      .connect()
      .then((accounts) => {
        const _account = accounts[0];
        setAddress(_account.address);
        localStorage.setItem("address", _account.address);
        console.log(_account.address);
      })
      .catch((error) => {
        console.log("Could not connect to MyAlgo wallet");
        console.error(error);
      });
  };

  useEffect(() => {
    setAddress(localStorage.getItem("address"));
  }, []);

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
              <Grid
                container
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <Grid item>
                  <img
                    src="https://s3.coinmarketcap.com/static/img/portraits/62e27661ae5a2d740c063fd2.png"
                    width="300px"
                  />
                </Grid>
                <Grid item>
                  <img
                    src="https://uploads-ssl.webflow.com/631ad94cbdadc40fe03d6458/632091d7965a67571219e4be_tum_blockchain_logo_white-p-500.png"
                    width="300px"
                  />
                </Grid>
              </Grid>
              <Typography className="text-blue-500" variant="h2">
                TUM Blockchain Club - Members Area
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
