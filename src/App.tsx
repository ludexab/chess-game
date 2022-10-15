import { HomePage } from "./components/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChessPage } from "./components/games/Chess";
import Header from "./components/Header";
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Deposit } from "./components/profile/Deposit";
import { Withdraw } from "./components/profile/Withdraw";
import { History } from "./components/profile/History";
import { ProfilePage } from "./components/profile/ProfilePage";
import { contractAddress, ABI } from "./contract-details.json";

interface Props {
  walletConnected: boolean;
  connectWallet: React.MouseEventHandler<HTMLButtonElement>;
  account: string;
  staked: boolean;
  setStaked: React.Dispatch<React.SetStateAction<boolean>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  stakeAmount: string;
  setStakeAmount: React.Dispatch<React.SetStateAction<string>>;
  winner: string;
  setWinner: React.Dispatch<React.SetStateAction<string>>;
  usdBal: string;
  winBal: string;
  setWinBal: React.Dispatch<React.SetStateAction<string>>;
  stakeGame: React.MouseEventHandler<HTMLButtonElement>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setAccountBalance: () => Promise<void>;
  deposit: React.MouseEventHandler<HTMLButtonElement>;
  withdraw: React.MouseEventHandler<HTMLButtonElement>;
  chessStarted: Boolean;
  setChessStarted: React.Dispatch<React.SetStateAction<boolean>>;
  fen: string;
  setFen: React.Dispatch<React.SetStateAction<string>>;
  turn: string;
  setTurn: React.Dispatch<React.SetStateAction<string>>;
  playerColor: string;
  setPlayerColor: React.Dispatch<React.SetStateAction<string>>;
}

export const ChessinoContext = React.createContext({} as Props);

const App = () => {
  let company = "0xBec8B833c15738CBd85ecB6a838dD6A3B295f81B";
  let [walletConnected, setWalletConnected] = useState(true);
  let [account, setAccount] = useState("");
  let [usdBal, setUsdBal] = useState("27");
  let [winBal, setWinBal] = useState("0");
  let [staked, setStaked] = useState(false);
  let [stakeAmount, setStakeAmount] = useState("0");
  let [winner, setWinner] = useState("");
  let [win, setWin] = useState(false);
  let [category, setCategory] = useState("");
  const [chessStarted, setChessStarted] = useState(false);
  const [fen, setFen] = useState(String);
  const [turn, setTurn] = useState(String);
  const [playerColor, setPlayerColor] = useState("");

  const connectWallet: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setWalletConnected(true);
      let acc: Array<string> = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
      await setAccountBalance();
    }
  };

  const setAccountBalance = async () => {
    let bal = usdBal;
    setUsdBal(bal);
  };

  useEffect(() => {
    setAccountBalance();
  }, [usdBal]);

  const deposit: React.MouseEventHandler = async (e) => {
    e.preventDefault();
    const amount = document.querySelector<HTMLInputElement>("#deposit")
      ?.value as string;
    if (!amount) {
      window.alert("Invalid amount");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    let parsedEther = ethers.utils.parseUnits(amount, "ether");
    let txnHash;
    let txnValue;
    try {
      const sendTxn = await signer.sendTransaction({
        to: company,
        value: parsedEther,
      });
      if (sendTxn.to == company) {
        txnHash = sendTxn.hash;
        txnValue = ethers.utils.formatEther(sendTxn.value.toString());
        setUsdBal((Number(usdBal) + Number(txnValue)).toString());
        console.log("Deposit successful");
        console.log(usdBal);
      }
    } catch (error) {
      console.log("Deposit failed. Please try again.");
    }
  };

  const withdraw: React.MouseEventHandler = async (e) => {
    // API Call
  };

  const stakeGame: React.MouseEventHandler = async (e) => {
    // API Call
    e.preventDefault();
    const amount = document.querySelector<HTMLInputElement>("#stake")
      ?.value as string;
    if (Number(amount) < 2 && Number(amount) >= Number(usdBal)) {
      window.alert("Error, minimum stake amount is 2 usdt");
      return;
    } else {
      try {
        let curBal = Number(usdBal) - Number(amount);
        setUsdBal(curBal.toString());
        console.log(curBal);
        console.log("usd bal", usdBal);
        setStakeAmount(amount);
        setStaked(true);
        console.log("Stake successfull");
      } catch (error) {
        console.error;
        console.log("failed transaction");
        return;
      }
    }
  };

  return (
    <ChessinoContext.Provider
      value={{
        walletConnected,
        connectWallet,
        account,
        staked,
        setStaked,
        setStakeAmount,
        stakeAmount,
        usdBal,
        winBal,
        setWinBal,
        stakeGame,
        winner,
        setWinner,
        win,
        setWin,
        category,
        setCategory,
        setAccountBalance,
        deposit,
        withdraw,
        chessStarted,
        setChessStarted,
        fen,
        setFen,
        turn,
        setTurn,
        playerColor,
        setPlayerColor,
      }}
    >
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chess" element={<ChessPage />} />
            <Route path="/profile/deposit" element={<Deposit />} />
            <Route path="/profile/withdraw" element={<Withdraw />} />
            <Route path="/profile/history" element={<History />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </ChessinoContext.Provider>
  );
};

export default App;
